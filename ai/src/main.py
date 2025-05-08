from fastapi import FastAPI, Request, Query, HTTPException
from typing import List, Dict, Any
import httpx
from pydantic import RootModel, BaseModel
import json
import os
import logging
from fastapi.middleware.cors import CORSMiddleware


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma3-custom:latest"
DATA_DIR = "ai/places" 

# Configure httpx client with timeout
TIMEOUT = httpx.Timeout(30.0, connect=5.0)

async def query_llm_for_single_place(place: Dict[str, Any], search: str) -> Dict[str, str]:
    """Send a single place to LLM and get result."""
    system_prompt = """You are an AI assistant that evaluates a single place based on a user's query. The place is described as a JSON object, and your job is to return whether it matches the query strictly.

The place may include fields like:
- id: unique identifier (string)
- name, description: textual information
- category: e.g. "coffee", "restaurant", "bar"
- city, area: location details
- tags: list of descriptive labels
- serves_*: booleans (e.g. serves_coffee, serves_brunch)
- amenities/features: booleans (e.g. outdoor_seating, live_music, good_for_children)
- average_rating: float between 0–5

### Your job:
- Determine if the place matches the user query.
- Match intent, not just keywords: check name, tags, description, category, services, amenities, and location.
- Be strict: only return "Yes" if all major parts of the query are satisfied.
- Return a JSON object with id and answer fields: {"id": "place_id", "answer": "Yes" or "No"}

### Examples:

User query: "cafes in Jayanagar that serve brunch and have outdoor seating"  
Response:  
{"id": "ChIJj_p0CaQVrjsRKQwchm_wZww", "answer": "Yes"}

User query: "coffee shops in Bengaluru with good ratings and child-friendly"  
Response:  
{"id": "ChIJj_p0CaQVrjsRKQwchm_wZww", "answer": "No"}"""

    prompt = f"""System: {system_prompt}

User query: {search}

Place to evaluate:
{json.dumps(place, indent=2)}

Please evaluate this place and return a JSON object with id and answer fields."""

    logger.info(f"Sending prompt to LLM for place {place['id']}: {prompt[:100]}...")

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }

    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            logger.info(f"Attempting to connect to Ollama at {OLLAMA_URL}")
            try:
                response = await client.post(OLLAMA_URL, json=payload)
                response.raise_for_status()
                result = response.json().get("response", "").strip()
                print("\n=== Raw LLM Response ===")
                print(result)
                print("=======================\n")
                
                logger.info(f"Received LLM response: {result[:100]}...")
                logger.info(f"Full LLM response: {result}")

                # Try to clean the response if it's not valid JSON
                cleaned_result = result.strip()
                if cleaned_result.startswith('```json'):
                    cleaned_result = cleaned_result[7:]
                if cleaned_result.endswith('```'):
                    cleaned_result = cleaned_result[:-3]
                cleaned_result = cleaned_result.strip()

                try:
                    parsed_result = json.loads(cleaned_result)
                    if not isinstance(parsed_result, dict) or "id" not in parsed_result or "answer" not in parsed_result:
                        raise ValueError("Invalid response format")
                    return parsed_result
                except json.JSONDecodeError as e:
                    logger.error(f"Failed to parse LLM response as JSON: {e}")
                    logger.error(f"Raw response: {result}")
                    logger.error(f"Cleaned response: {cleaned_result}")
                    raise ValueError(f"Failed to parse LLM response as JSON: {str(e)}")
            except httpx.ConnectError as e:
                logger.error(f"Failed to connect to Ollama service: {str(e)}")
                raise ValueError(f"Could not connect to Ollama service. Please ensure it's running at {OLLAMA_URL}")
            except httpx.ReadTimeout as e:
                logger.error(f"Timeout while waiting for Ollama response: {str(e)}")
                raise ValueError("Request timed out while waiting for Ollama response")
            except httpx.HTTPStatusError as e:
                logger.error(f"HTTP error from Ollama service: {str(e)}")
                raise ValueError(f"Ollama service returned error: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error in LLM query: {str(e)}", exc_info=True)
        raise ValueError(f"Failed to query LLM: {str(e)}")

async def query_llm_for_places(places: List[Dict[str, Any]], search: str) -> List[Dict[str, str]]:
    """Send places one by one to LLM and get results."""
    results = []
    yes_count = 0
    MAX_YES_MATCHES = 10

    for place in places:
        try:
            result = await query_llm_for_single_place(place, search)
            results.append(result)
            
            # Count "Yes" responses
            if result.get("answer", "").lower() == "yes":
                yes_count += 1
                logger.info(f"Found match #{yes_count}: {place.get('name', 'Unknown')}")
                
                if yes_count >= MAX_YES_MATCHES:
                    logger.info(f"Reached maximum of {MAX_YES_MATCHES} matches, stopping evaluation")
                    break
                    
        except Exception as e:
            logger.error(f"Error evaluating place {place.get('id', 'unknown')}: {str(e)}")
            results.append({"id": place["id"], "answer": "No"})
    
    logger.info(f"Finished evaluation with {yes_count} matches out of {len(results)} places evaluated")
    return results

@app.get("/query_places")
async def query_places(area: str = Query(...), search: str = Query(...)):
    """API endpoint to query places based on user input."""
    try:
        file_path = os.path.join(DATA_DIR, f"{area.lower()}.json")
        logger.info(f"Looking for places file at: {file_path}")
        
        if not os.path.exists(file_path):
            logger.error(f"Area file not found: {file_path}")
            raise HTTPException(status_code=404, detail="Area not found")

        try:
            with open(file_path, "r") as f:
                places_data = f.read()
                logger.info(f"Raw places data: {places_data[:200]}...")  # Log first 200 chars
                data = json.loads(places_data)
                if not isinstance(data, dict) or "places" not in data:
                    raise ValueError("Places data must be an object with a 'places' array")
                places = data["places"]
                if not isinstance(places, list):
                    raise ValueError("Places data must be a list")
                logger.info(f"Successfully loaded {len(places)} places from {file_path}")
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse places JSON file: {str(e)}")
            raise HTTPException(status_code=500, detail="Invalid places data format")
        except ValueError as e:
            logger.error(f"Invalid places data structure: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))

        try:
            llm_results = await query_llm_for_places(places, search)
            logger.info(f"Received {len(llm_results)} results from LLM")
        except Exception as e:
            logger.error(f"Error querying LLM: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error querying LLM: {str(e)}")

        place_lookup = {place["id"]: place for place in places}
        final_results = []
        
        for item in llm_results:
            if not isinstance(item, dict) or "id" not in item or "answer" not in item:
                logger.warning(f"Skipping invalid result format: {item}")
                continue
            place_id = item["id"]
            decision = item["answer"]
            place_info = place_lookup.get(place_id, {})
            final_results.append({
                "id": place_id,
                "name": place_info.get("name", "Unknown"),
                "decision": decision
            })

        logger.info(f"Returning {len(final_results)} final results")
        return final_results
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in query_places: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")