from fastapi import FastAPI, Request, Query, HTTPException
from typing import List, Dict, Any
import httpx
from pydantic import RootModel, BaseModel

app = FastAPI()

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3"

class OllamaRequest(BaseModel):
    model: str
    prompt: str
    stream: bool = False
    
class PlaceList(RootModel[List[Dict[str, Any]]]):
    pass

@app.get("/ask")
async def ask_llm(search_phrase: str = Query(..., description="The phrase to search/query")):
    payload = OllamaRequest(model=OLLAMA_MODEL, prompt=search_phrase)

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(OLLAMA_URL, json=payload.dict())
            response.raise_for_status()
            result = response.json()
            return {"response": result.get("response", "").strip()}
        except httpx.HTTPError as e:
            return {"error": f"Failed to contact Ollama: {str(e)}"}
     

REQUIRED_FIELDS = [
    "id", "name", "description", "category", "city", "tags", "opening_hours",
    "take_out", "delivery", "dine_in", "reservable", "serves_breakfast",
    "serves_lunch", "serves_dinner", "serves_beer", "serves_wine", "serves_brunch",
    "serves_vegetarian_food", "outdoor_seating", "live_music", "menu_for_children",
    "serves_cocktails", "serves_dessert", "serves_coffee", "good_for_children",
    "restroom", "good_for_groups", "good_for_watching_sports", "priceLevel",
    "acceptsCreditCards", "acceptsDebitCards", "acceptsCashOnly", "acceptsNfc",
    "freeParkingLot", "freeStreetParking", "paidParkingLot", "valetParking",
    "wheelchairAccessibleParking", "wheelchairAccessibleEntrance",
    "wheelchairAccessibleRestroom", "wheelchairAccessibleSeating",
    "average_rating", "total_reviews", "heat_score", "area"
]

@app.post("/filter_places")
async def filter_places_by_area(
    places: PlaceList,
    area: str = Query(..., description="Area to filter by")
):
    filtered = []
    for place in places.root:
        if place.get("area", "").strip().lower() == area.strip().lower():
            reduced = {key: place.get(key) for key in REQUIRED_FIELDS}
            filtered.append(reduced)

    if not filtered:
        raise HTTPException(status_code=404, detail="No matching places found for the given area.")

    return filtered