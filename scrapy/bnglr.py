import requests
import json
import csv
import time
import random
from datetime import datetime

# API Key (replace with your actual key)
# API_KEY = "AIzaSyChZ2nc5lti2HVz5wMeQ4Pn0q33Rg2D0GQ"
API_KEY = "AIzaSyCaJzV7jF4TLTM4TlupYIzwQ4pOdmlamu4"

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

BANGALORE_CENTERS = [
    # City Core
    # {"lat": 12.9716, "lng": 77.5946, "name": "Bangalore Central"},      # City center/MG Road
    # {"lat": 12.9767, "lng": 77.5713, "name": "Cubbon Park"},            # Cubbon Park area
    # {"lat": 12.9857, "lng": 77.5938, "name": "Shivajinagar"},           # Shivajinagar
    # {"lat": 12.9558, "lng": 77.6087, "name": "Koramangala"},            # Koramangala
    # {"lat": 12.9825, "lng": 77.6076, "name": "Commercial Street"},      # Commercial St/Brigade Rd
    # {"lat": 12.9649, "lng": 77.5973, "name": "Richmond Road"},          # Richmond Road
    # {"lat": 12.9734, "lng": 77.6092, "name": "Brigade Road"},           # Brigade Road
    # {"lat": 12.9869, "lng": 77.5870, "name": "Cunningham Road"},        # Cunningham Road
    
    # # North Bangalore
    # {"lat": 13.0279, "lng": 77.5940, "name": "Hebbal"},                 # Hebbal
    # {"lat": 13.0632, "lng": 77.6372, "name": "Yelahanka"},              # Yelahanka
    # {"lat": 13.0155, "lng": 77.5644, "name": "Rajajinagar"},            # Rajajinagar
    # {"lat": 13.0211, "lng": 77.5053, "name": "Peenya"},                 # Peenya Industrial Area
    # {"lat": 13.0206, "lng": 77.6337, "name": "Kalyan Nagar"},           # Kalyan Nagar
    # {"lat": 13.0323, "lng": 77.5633, "name": "Sadashivanagar"},         # Sadashivanagar
    # {"lat": 13.0617, "lng": 77.5935, "name": "Jakkur"},                 # Jakkur
    # {"lat": 13.0417, "lng": 77.6212, "name": "Hennur"},                 # Hennur
    # {"lat": 13.0490, "lng": 77.5696, "name": "Jalahalli"},              # Jalahalli
    # {"lat": 13.0354, "lng": 77.6160, "name": "Banaswadi"},              # Banaswadi
    
    # # East Bangalore
    # {"lat": 12.9947, "lng": 77.6658, "name": "Indiranagar"},            # Indiranagar
    # {"lat": 12.9784, "lng": 77.6408, "name": "Ulsoor"},                 # Ulsoor
    # {"lat": 12.9513, "lng": 77.6841, "name": "Marathahalli"},           # Marathahalli
    # {"lat": 12.9783, "lng": 77.7478, "name": "Whitefield"},             # Whitefield
    # {"lat": 12.9302, "lng": 77.6876, "name": "HSR Layout"},             # HSR Layout
    # {"lat": 12.9653, "lng": 77.7130, "name": "Domlur"},                 # Domlur
    # {"lat": 12.9865, "lng": 77.6995, "name": "CV Raman Nagar"},         # CV Raman Nagar
    # {"lat": 12.9372, "lng": 77.7159, "name": "Kadubeesanahalli"},       # Kadubeesanahalli
    # {"lat": 12.9791, "lng": 77.6962, "name": "Old Airport Road"},       # Old Airport Road
    # {"lat": 12.9628, "lng": 77.7461, "name": "Mahadevapura"},           # Mahadevapura
    
    # # South Bangalore
    # {"lat": 12.9121, "lng": 77.6446, "name": "BTM Layout"},             # BTM Layout
    # {"lat": 12.9078, "lng": 77.5577, "name": "Banashankari"},           # Banashankari
    # {"lat": 12.9162, "lng": 77.5990, "name": "JP Nagar"},               # JP Nagar
    # {"lat": 12.8845, "lng": 77.6036, "name": "Jayanagar"},              # Jayanagar
    # {"lat": 12.8988, "lng": 77.5764, "name": "Basavanagudi"},           # Basavanagudi
    # {"lat": 12.9230, "lng": 77.6273, "name": "Koramangala 4th Block"},  # Koramangala 4th Block
    # {"lat": 12.9342, "lng": 77.6224, "name": "Ejipura"},                # Ejipura
    # {"lat": 12.9010, "lng": 77.5859, "name": "Lalbagh"},                # Lalbagh
    # {"lat": 12.9053, "lng": 77.5571, "name": "Kathriguppe"},            # Kathriguppe
    # {"lat": 12.9111, "lng": 77.5857, "name": "Jayanagar 4th Block"},    # Jayanagar 4th Block
    
    # # West Bangalore
    # {"lat": 12.9719, "lng": 77.5356, "name": "Vijayanagar"},            # Vijayanagar
    # {"lat": 13.0013, "lng": 77.5563, "name": "Malleswaram"},            # Malleswaram
    # {"lat": 12.9961, "lng": 77.5263, "name": "Yeshwanthpur"},           # Yeshwanthpur
    # {"lat": 12.9836, "lng": 77.5488, "name": "Basaveshwaranagar"},      # Basaveshwaranagar
    {"lat": 12.9881, "lng": 77.5400, "name": "Rajajinagar 1st Block"},  # Rajajinagar 1st Block
    {"lat": 13.0107, "lng": 77.5036, "name": "Nagasandra"},             # Nagasandra
    {"lat": 12.9515, "lng": 77.5380, "name": "Chandra Layout"},         # Chandra Layout
    {"lat": 13.0044, "lng": 77.5154, "name": "RR Nagar"},               # RR Nagar
    
    # Tech Corridors & Business Hubs
    {"lat": 12.9569, "lng": 77.7011, "name": "Bellandur"},              # Bellandur
    {"lat": 12.9304, "lng": 77.6784, "name": "Electronic City"},        # Electronic City
    {"lat": 13.0689, "lng": 77.6547, "name": "Manyata Tech Park"},      # Manyata Tech Park
    {"lat": 12.9081, "lng": 77.6476, "name": "Outer Ring Road"},        # ORR-Sarjapur
    {"lat": 12.8401, "lng": 77.6767, "name": "Electronic City Phase 1"}, # Electronic City Phase 1
    {"lat": 12.8462, "lng": 77.6608, "name": "Electronic City Phase 2"}, # Electronic City Phase 2
    {"lat": 12.9834, "lng": 77.6937, "name": "Bagmane Tech Park"},      # Bagmane Tech Park
    {"lat": 12.9698, "lng": 77.7499, "name": "ITPL"},                   # ITPL
    {"lat": 12.9772, "lng": 77.7178, "name": "Bagmane World Technology Center"}, # Bagmane WTC
    
    # Outer Zones
    {"lat": 13.0499, "lng": 77.7748, "name": "Devanahalli"},            # Devanahalli/Airport
    {"lat": 12.8384, "lng": 77.4830, "name": "Kengeri"},                # Kengeri
    {"lat": 12.9217, "lng": 77.8051, "name": "Varthur"},                # Varthur
    {"lat": 13.0987, "lng": 77.5920, "name": "Jakkur Plantation"},      # Jakkur Plantation
    {"lat": 12.8451, "lng": 77.6619, "name": "Bommanahalli"},           # Bommanahalli
    {"lat": 13.1279, "lng": 77.6271, "name": "Bagalur"},                # Bagalur
    {"lat": 12.8729, "lng": 77.7896, "name": "Hoskote"},                # Hoskote
    {"lat": 12.7969, "lng": 77.5870, "name": "Hulimavu"},               # Hulimavu
    {"lat": 13.1041, "lng": 77.5022, "name": "Nelamangala"},            # Nelamangala
    {"lat": 12.7247, "lng": 77.7807, "name": "Attibele"},               # Attibele
    
    # Shopping & Entertainment Hubs
    {"lat": 12.9766, "lng": 77.5993, "name": "UB City"},                # UB City
    {"lat": 12.9615, "lng": 77.6442, "name": "Phoenix Marketcity"},     # Phoenix Marketcity
    {"lat": 12.9906, "lng": 77.7260, "name": "Gopalan Mall Whitefield"}, # Gopalan Mall Whitefield
    {"lat": 12.9851, "lng": 77.7553, "name": "Forum Whitefield"},       # Forum Whitefield
    {"lat": 12.9977, "lng": 77.6974, "name": "Orion Mall East"},        # Orion Mall East
    {"lat": 12.9720, "lng": 77.5952, "name": "Garuda Mall"},            # Garuda Mall
    
    # Additional Strategic Points
    {"lat": 12.9128, "lng": 77.6271, "name": "Silk Board"},             # Silk Board Junction
    {"lat": 12.9980, "lng": 77.6179, "name": "Infantry Road"},          # Infantry Road
    {"lat": 13.0401, "lng": 77.6149, "name": "Sahakara Nagar"},         # Sahakara Nagar
    {"lat": 12.8895, "lng": 77.6393, "name": "Bannerghatta Road"},      # Bannerghatta Road
    {"lat": 12.9532, "lng": 77.5320, "name": "Kengeri Satellite Town"}, # Kengeri Satellite Town
    {"lat": 12.9338, "lng": 77.6186, "name": "Adugodi"},                # Adugodi
    {"lat": 12.9568, "lng": 77.7010, "name": "Bellandur Central"},      # Bellandur Central
    {"lat": 13.0004, "lng": 77.5563, "name": "Kempegowda Bus Station"}, # Majestic/KBS
    {"lat": 12.8400, "lng": 77.6848, "name": "Bommasandra"},            # Bommasandra
    {"lat": 12.9539, "lng": 77.6155, "name": "National Games Village"}, # National Games Village
    {"lat": 12.9951, "lng": 77.5965, "name": "Palace Grounds"},         # Palace Grounds
    {"lat": 12.9583, "lng": 77.6408, "name": "Diamond District"},       # Diamond District
    {"lat": 12.9777, "lng": 77.5619, "name": "Vidhana Soudha"},         # Vidhana Soudha
    {"lat": 12.9344, "lng": 77.6869, "name": "Bellandur Lake"}          # Bellandur Lake
]

def get_search_radius(center_name):
    high_density_areas = ["Bangalore Central", "Koramangala", "Indiranagar", "Commercial Street"]
    medium_density_areas = ["BTM Layout", "HSR Layout", "Whitefield", "Electronic City"]
    
    if center_name in high_density_areas:
        return 3000.0  # Smaller radius for dense areas to avoid duplication
    elif center_name in medium_density_areas:
        return 4000.0
    else:
        return 5000.0  # Larger radius for less dense areas

# Output CSV file
OUTPUT_FILE = "bangalore_places_data.csv"

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
                "radius": get_search_radius(center["name"])
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
        break_outer_loop = False
        # Loop through each center point
        for center in BANGALORE_CENTERS:
            print(f"Searching around {center['name']}...")
            if break_outer_loop:
                break
            # Reset API hit count for each center

            # Loop through each category
            for category in CATEGORIES:
                print(f"  Processing category: {category['name']}...")
                
                if break_outer_loop:
                    break
                # Use different types in the category to maximize results
                for type_name in category["types"]:
                    page_token = None
                    
                    # Make initial request
                    response = search_nearby_places(center, [type_name], page_token)
                    
                    if API_HIT_COUNT >= 40000:  # Set a safe threshold
                        print(f"Warning: Approaching API limit. Current count: {API_HIT_COUNT}")
                        break_outer_loop = True
                        break

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
                        # time.sleep(random.uniform(1.0, 2.0))
                        
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
                    
                    # # Sleep between different type requests
                    # time.sleep(random.uniform(0.5, 1.0))
                
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