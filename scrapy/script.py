import requests
import json
import csv
import time
import random
from datetime import datetime

# API Key (replace with your actual key)
API_KEY = "AIzaSyChZ2nc5lti2HVz5wMeQ4Pn0q33Rg2D0GQ"

# Define categories matching your schema
# CATEGORIES = [
#     {"id": "coffee", "types": ["cafe", "coffee_shop"], "name": "Cafes"},
#     {"id": "nightlife", "types": ["night_club", "bar"], "name": "Nightlife"},
#     {"id": "outdoor", "types": ["park", "campground", "natural_feature"], "name": "Outdoor"},
#     {"id": "shopping", "types": ["shopping_mall", "clothing_store", "department_store"], "name": "Shopping"},
#     {"id": "dining", "types": ["restaurant", "food"], "name": "Restaurants"},
#     {"id": "culture", "types": ["museum", "art_gallery", "tourist_attraction"], "name": "Culture"},
# ]

CATEGORIES = [
    {
        "id": "coffee", 
        "types": ["cafe", "coffee_shop", "tea_house", "bakery", "dessert_shop"], 
        "name": "Cafes & Bakeries"
    },
    {
        "id": "nightlife", 
        "types": ["night_club", "bar", "pub", "wine_bar", "karaoke", "comedy_club"], 
        "name": "Nightlife"
    },
    {
        "id": "outdoor", 
        "types": ["park", "campground", "beach", "hiking_area", "state_park", "national_park", "garden", "botanical_garden", "marina", "wildlife_park"], 
        "name": "Outdoor"
    },
    {
        "id": "shopping", 
        "types": ["shopping_mall", "clothing_store", "department_store", "grocery_store", "supermarket", "book_store", "electronics_store", "furniture_store", "jewelry_store", "shoe_store"], 
        "name": "Shopping"
    },
    {
        "id": "dining", 
        # "food" 
        "types": ["restaurant", "meal_delivery", "meal_takeaway", "fast_food_restaurant", "fine_dining_restaurant", "american_restaurant", "chinese_restaurant", "italian_restaurant", "japanese_restaurant", "mexican_restaurant", "indian_restaurant", "thai_restaurant", "seafood_restaurant", "steak_house"], 
        "name": "Restaurants"
    },
    {
        "id": "culture", 
        "types": ["museum", "art_gallery", "tourist_attraction", "cultural_landmark", "historical_place", "monument", "performing_arts_theater", "cultural_center", "historical_landmark"], 
        "name": "Culture"
    },
    {
        "id": "entertainment", 
        "types": ["movie_theater", "amusement_park", "aquarium", "bowling_alley", "casino", "zoo", "concert_hall", "water_park", "planetarium"], 
        "name": "Entertainment"
    },
    {
        "id": "wellness", 
        "types": ["spa", "gym", "fitness_center", "yoga_studio", "wellness_center", "massage", "beauty_salon", "hair_salon"], 
        "name": "Wellness & Beauty"
    }
]
# Define multiple center points around Dehradun to ensure comprehensive coverage
DEHRADUN_CENTERS = [
    {"lat": 30.3165, "lng": 78.0322, "name": "Dehradun Central"},  # City center
    {"lat": 30.3243, "lng": 78.0418, "name": "Dehradun East"},     # Eastern part
    {"lat": 30.3396, "lng": 78.0138, "name": "Dehradun North"},    # Northern part
    {"lat": 30.2967, "lng": 78.0297, "name": "Dehradun South"},    # Southern part
    {"lat": 30.3252, "lng": 78.0219, "name": "Dehradun West"},     # Western part
    {"lat": 30.3400, "lng": 78.0700, "name": "Mussoorie Road"},    # Towards Mussoorie
    {"lat": 30.2809, "lng": 78.0398, "name": "Doiwala"},           # Towards Doiwala
    {"lat": 30.3588, "lng": 78.0734, "name": "Rajpur Area"}        # Rajpur area
]

# Search radius in meters - using 5000m to avoid missing places but not too large
SEARCH_RADIUS = 5000.0

# Output CSV file
OUTPUT_FILE = "dehradun_places_data.csv"

API_HIT_COUNT = 0
# Function to make API call
def search_nearby_places(center, included_types, page_token=None):
    url = "https://places.googleapis.com/v1/places:searchNearby"
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "*"
    }
    
    body = {
        "includedTypes": included_types,
        "maxResultCount": 20,
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": center["lat"],
                    "longitude": center["lng"]
                },
                "radius": SEARCH_RADIUS
            }
        }
    }
    
    if page_token:
        body["pageToken"] = page_token
    
    response = requests.post(url, headers=headers, json=body)
    
    global API_HIT_COUNT
    API_HIT_COUNT += 1
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

# Function to extract tags from place types
def extract_tags(place):
    tags = []
    if "types" in place:
        tags = place["types"]
    return tags

# Function to extract images URLs
def extract_images(place):
    images = []
    if "photos" in place:
        for photo in place["photos"]:
            if "name" in photo:
                # Fetch all googleMapsUri for the place
                if "googleMapsUri" in photo:
                    images.append(photo["googleMapsUri"])
    return images

# Function to extract opening hours
def extract_opening_hours(place):
    opening_hours = []
    if "regularOpeningHours" in place:
        opening_hours = [
            description.replace('""', '"')
                .replace("\u202f", " ")
                .replace("\u2009", "")
                .replace("\u2013", "-")
            for description in place["regularOpeningHours"].get("weekdayDescriptions", [])
        ]
        # ""Wednesday: 9:00\u202fAM\u2009\u2013\u200911:00\u202fPM""
        # Decode any unicode special characters in the descriptions
    # This would need to be adapted based on the actual structure in the API response
    # For now, return an empty dict as placeholder
    return opening_hours

# Function to map Google place to our schema
def map_place_to_schema(place, category_id):
    try:
        name = place.get("displayName", {}).get("text", "Unknown Place")
        
        # Extract address
        address = place.get("formattedAddress", "")
        
        # Get location coordinates
        latitude = place.get("location", {}).get("latitude", 0.0)
        longitude = place.get("location", {}).get("longitude", 0.0)
        
        # Extract city (assuming it's in addressComponents)
        city = "Dehradun"  # Default
        if "addressComponents" in place:
            for component in place["addressComponents"]:
                if "locality" in component.get("types", []):
                    city = component.get("longText", "Dehradun")
                    break
        
        # Create description from editorial summary or construct from other fields
        description = ""
        if "editorialSummary" in place:
            description = place["editorialSummary"].get("text", "")
        if not description and "reviews" in place and len(place["reviews"]) > 0:
            # Use first review as fallback description
            description = place["reviews"][0].get("text", {}).get("text", "")[:200] + "..."
            
        # Extract images
        images = extract_images(place)
        
        # Extract tags
        tags = extract_tags(place)
        
        # Extract opening hours
        opening_hours = extract_opening_hours(place)
        
        googleMapsUri = place.get("googleMapsUri", "")
        websiteUri = place.get("websiteUri", "")  
        nationalPhoneNumber = place.get("nationalPhoneNumber", "")
        internationalPhoneNumber = place.get("internationalPhoneNumber", "")
        
        take_out = place.get("takeout", False)
        delivery = place.get("delivery", False)
        dine_in = place.get("dineIn", False)
        reservable = place.get("reservable", False)
        serves_breakfast = place.get("servesBreakfast", False)
        serves_lunch = place.get("servesLunch", False)
        serves_dinner = place.get("servesDinner", False)
        serves_beer = place.get("servesBeer", False)
        serves_wine = place.get("servesWine", False)
        serves_brunch = place.get("servesBrunch", False)
        serves_vegetarian_food = place.get("servesVegetarianFood", False)
        outdoor_seating = place.get("outdoorSeating", False)
        live_music = place.get("liveMusic", False)
        menu_for_children = place.get("menuForChildren", False)
        serves_cocktails = place.get("servesCocktails", False)
        serves_dessert = place.get("servesDessert", False)
        serves_coffee = place.get("servesCoffee", False)
        good_for_children = place.get("goodForChildren", False)
        restroom = place.get("restroom", False)
        good_for_groups = place.get("goodForGroups", False)
        good_for_watching_sports = place.get("goodForWatchingSports", False)
        
        google_maps_links = place.get("googleMapsLinks", {
            "directionsUri": "",
            "placeUri": "",
            "writeAReviewUri": "",
            "reviewsUri": "",
            "photosUri": ""
        })
        reviews = place.get("reviews", [])
        priceLevel = place.get("priceLevel", "PRICE_LEVEL_UNSPECIFIED")
        timeZone = place.get("timeZone", "").get("id", "")
        
        # Get rating and review count
        average_rating = place.get("rating", 0.0)
        total_reviews = place.get("userRatingCount", 0)
        
        # Calculate heat score (simplified algorithm)
        # This combines rating and popularity
        heat_score = (average_rating * 0.7) + (min(total_reviews, 1000) / 1000 * 0.3) * 5
        
        # Create unique ID (using Google's place ID or generate UUID)
        place_id = place.get("id", "")
        
        return {
            "id": place_id,
            "name": name,
            "category": category_id,
            "description": description[:500],  # Limit description length
            "googleMapsUri": googleMapsUri,
            "websiteUri": websiteUri,
            "nationalPhoneNumber": nationalPhoneNumber,
            "internationalPhoneNumber": internationalPhoneNumber,
            "take_out": take_out,
            "delivery": delivery,
            "dine_in": dine_in,
            "reservable": reservable,
            "serves_breakfast": serves_breakfast,
            "serves_lunch": serves_lunch,
            "serves_dinner": serves_dinner,
            "serves_beer": serves_beer,
            "serves_wine": serves_wine,
            "serves_brunch": serves_brunch,
            "serves_vegetarian_food": serves_vegetarian_food,
            "outdoor_seating": outdoor_seating,
            "live_music": live_music,
            "menu_for_children": menu_for_children,
            "serves_cocktails": serves_cocktails,
            "serves_dessert": serves_dessert,
            "serves_coffee": serves_coffee,
            "good_for_children": good_for_children,
            "restroom": restroom,
            "good_for_groups": good_for_groups,
            "good_for_watching_sports": good_for_watching_sports,
            "google_maps_links": google_maps_links,
            "reviews": reviews,
            "priceLevel": priceLevel,
            "timeZone": timeZone,
            "latitude": latitude,
            "longitude": longitude,
            "address": address,
            "city": city,
            "images": images,
            "tags": tags,
            "opening_hours": opening_hours,
            "average_rating": average_rating,
            "total_reviews": total_reviews,
            "heat_score": heat_score
        }
    except Exception as e:
        print(f"Error mapping place: {e}")
        return None

# Main function to scrape places data
def scrape_places_data():
    all_places = []
    places_ids = set()  # To track duplicate places
    
    # Create CSV file and write header
    with open(OUTPUT_FILE, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = [
            "id", "name", "description", "category", "latitude", "longitude", 
            "address", "city", "images", "tags", "opening_hours", "googleMapsUri",
            "websiteUri", "nationalPhoneNumber", "internationalPhoneNumber",
            "take_out", "delivery", "dine_in", "reservable", "serves_breakfast",
            "serves_lunch", "serves_dinner", "serves_beer", "serves_wine",
            "serves_brunch", "serves_vegetarian_food", "outdoor_seating",
            "live_music", "menu_for_children", "serves_cocktails", "serves_dessert",
            "serves_coffee", "good_for_children", "restroom", "good_for_groups",
            "good_for_watching_sports", "google_maps_links", "reviews", "priceLevel",
            "timeZone", "acceptsCreditCards", "acceptsDebitCards", "acceptsCashOnly",
            "acceptsNfc", "freeParkingLot", "freeStreetParking", "paidParkingLot",
            "valetParking", "wheelchairAccessibleParking", "wheelchairAccessibleEntrance",
            "wheelchairAccessibleRestroom", "wheelchairAccessibleSeating",
            "directionsUri", "placeUri", "writeAReviewUri", "reviewsUri", "photosUri",
            "average_rating", "total_reviews", "heat_score"
        ]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        
        # Loop through each center point
        for center in DEHRADUN_CENTERS:
            print(f"Searching around {center['name']}...")
            
            # Loop through each category
            for category in CATEGORIES:
                print(f"  Processing category: {category['name']}...")
                
                # Use different types in the category to maximize results
                for type_name in category["types"]:
                    page_token = None
                    
                    # Make initial request
                    response = search_nearby_places(center, [type_name], page_token)
                    
                    if not response or "places" not in response:
                        print(f"    No results for {type_name}")
                        continue
                    
                    # Process and save results
                    for place in response.get("places", []):
                        if place.get("id") in places_ids:
                            continue  # Skip duplicates
                            
                        places_ids.add(place.get("id"))
                        mapped_place = map_place_to_schema(place, category["id"])
                        
                        if mapped_place:
                            # Convert lists and dicts to strings for CSV
                            mapped_place["images"] = json.dumps(mapped_place["images"])
                            mapped_place["tags"] = json.dumps(mapped_place["tags"])
                            mapped_place["opening_hours"] = json.dumps(mapped_place["opening_hours"])
                            mapped_place["google_maps_links"] = json.dumps(place.get("googleMapsLinks", {}))
                            mapped_place["directionsUri"] = place.get("googleMapsLinks", {}).get("directionsUri", "")
                            mapped_place["placeUri"] = place.get("googleMapsLinks", {}).get("placeUri", "")
                            mapped_place["writeAReviewUri"] = place.get("googleMapsLinks", {}).get("writeAReviewUri", "")
                            mapped_place["reviewsUri"] = place.get("googleMapsLinks", {}).get("reviewsUri", "")
                            mapped_place["photosUri"] = place.get("googleMapsLinks", {}).get("photosUri", "")
                            mapped_place["googleMapsUri"] = place.get("googleMapsUri", "")
                            mapped_place["reviews"] = json.dumps(place.get("reviews", []))
                            mapped_place["priceLevel"] = place.get("priceLevel", "PRICE_LEVEL_UNSPECIFIED")
                            mapped_place["timeZone"] = place.get("timeZone", {}).get("id", "")
                            mapped_place["acceptsCreditCards"] = place.get("paymentOptions", {}).get("acceptsCreditCards", False)
                            mapped_place["acceptsDebitCards"] = place.get("paymentOptions", {}).get("acceptsDebitCards", False)
                            mapped_place["acceptsCashOnly"] = place.get("paymentOptions", {}).get("acceptsCashOnly", False)
                            mapped_place["acceptsNfc"] = place.get("paymentOptions", {}).get("acceptsNfc", False)
                            mapped_place["freeParkingLot"] = place.get("parkingOptions", {}).get("freeParkingLot", False)
                            mapped_place["freeStreetParking"] = place.get("parkingOptions", {}).get("freeStreetParking", False)
                            mapped_place["paidParkingLot"] = place.get("parkingOptions", {}).get("paidParkingLot", False)
                            mapped_place["valetParking"] = place.get("parkingOptions", {}).get("valetParking", False)
                            mapped_place["wheelchairAccessibleParking"] = place.get("accessibilityOptions", {}).get("wheelchairAccessibleParking", False)
                            mapped_place["wheelchairAccessibleEntrance"] = place.get("accessibilityOptions", {}).get("wheelchairAccessibleEntrance", False)
                            mapped_place["wheelchairAccessibleRestroom"] = place.get("accessibilityOptions", {}).get("wheelchairAccessibleRestroom", False)
                            mapped_place["wheelchairAccessibleSeating"] = place.get("accessibilityOptions", {}).get("wheelchairAccessibleSeating", False)
                         # regularOpeningHours
                            writer.writerow(mapped_place)
                            all_places.append(mapped_place)
                    
                    # Follow pagination if available
                    while "nextPageToken" in response:
                        # Sleep to avoid rate limiting
                        time.sleep(random.uniform(1.0, 2.0))
                        
                        page_token = response["nextPageToken"]
                        response = search_nearby_places(center, [type_name], page_token)
                        
                        if not response or "places" not in response:
                            break
                            
                        for place in response.get("places", []):
                            if place.get("id") in places_ids:
                                continue  # Skip duplicates
                                
                            places_ids.add(place.get("id"))
                            mapped_place = map_place_to_schema(place, category["id"])
                            
                            if mapped_place:
                                # Convert lists and dicts to strings for CSV
                                mapped_place["images"] = json.dumps(mapped_place["images"])
                                mapped_place["tags"] = json.dumps(mapped_place["tags"])
                                mapped_place["opening_hours"] = json.dumps(mapped_place["opening_hours"])
                                
                                writer.writerow(mapped_place)
                                all_places.append(mapped_place)
                    
                    # Sleep between different type requests
                    time.sleep(random.uniform(0.5, 1.0))
                
                print(f"    Found {len(all_places)} places so far")
                
            # Sleep between center changes
            time.sleep(random.uniform(1.0, 2.0))
    
    print(f"Scraping complete! Total places found: {len(all_places)}")
    # Save the total API hits
    print(f"Total API hits: {API_HIT_COUNT}")
    # Save the data to CSV
    print(f"Data saved to {OUTPUT_FILE}")
# Scraping complete! Total places found: 1516
# Total API hits: 568
# Data saved to dehradun_places_data.csv
if __name__ == "__main__":
    scrape_places_data()