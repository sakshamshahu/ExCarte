import random
from faker import Faker
from datetime import datetime
import numpy as np

# Initialize Faker for realistic data generation
fake = Faker()
random.seed(42)  # For reproducibility

# Predefined data
CLASSES = ["sports", "nightlife", "tourism", "education"]
SOURCES = ["google_maps", "yelp", "tripadvisor"]
PLACE_TYPES = {
    "gym": {"sports": 0.9, "nightlife": 0.1, "tourism": 0.2, "education": 0.3},
    "club": {"sports": 0.2, "nightlife": 0.9, "tourism": 0.3, "education": 0.1},
    "museum": {"sports": 0.1, "nightlife": 0.2, "tourism": 0.9, "education": 0.7},
    "school": {"sports": 0.3, "nightlife": 0.1, "tourism": 0.2, "education": 0.9},
    "park": {"sports": 0.4, "nightlife": 0.1, "tourism": 0.6, "education": 0.3}
}

# Bounding box for a hypothetical city (e.g., part of NYC)
LAT_MIN, LAT_MAX = 40.0, 40.1
LON_MIN, LON_MAX = -74.0, -73.9

def generate_rating():
    """
    Generate a rating using a bimodal distribution: mostly moderate to high, some low, few very low.
    Returns a float between 0.1 and 0.99, rounded to 2 decimal places.
    """
    if random.random() < 0.8:  # 80% chance for higher ratings
        rating = np.random.normal(0.7, 0.1)
    else:  # 20% chance for lower ratings
        rating = np.random.normal(0.4, 0.1)
    rating = max(0.1, min(0.99, rating))  # Clamp between 0.1 and 0.99
    if rating < 0.3 and random.random() > 0.05:  # Only 5% chance to stay below 0.3
        rating = 0.3 + random.random() * 0.2  # Bump to 0.3-0.5
    return round(rating, 2)

def generate_place():
    """
    Generate a dictionary representing a single place with random yet realistic attributes.
    Returns a dictionary with name, address, rating, sources, timestamps, weightages, hours, and location.
    """
    # Select a random place type and generate a name
    place_type = random.choice(list(PLACE_TYPES.keys()))
    name = fake.company() if place_type != "park" else fake.city() + " Park"
    
    # Generate address and rating
    address = fake.address().replace("\n", ", ")
    rating = generate_rating()
    
    # Generate source ratings (1-3 sources with random ratings)
    source_ratings = {
        random.choice(SOURCES): round(random.uniform(0.1, 1.0), 2)
        for _ in range(random.randint(1, 3))
    }
    
    # Generate timestamp within the last year
    timestamp = fake.date_time_between(start_date="-1y", end_date="now")
    
    # Generate weightages for each class with slight random variation
    weightages = {
        cls: max(0.0, min(1.0, PLACE_TYPES[place_type][cls] + random.uniform(-0.1, 0.1)))
        for cls in CLASSES
    }
    
    # Generate operating hours based on place type
    operating_hours = {
        day: (
            f"{random.randint(8, 10)}:00-{random.randint(18, 22)}:00"
            if place_type != "club"
            else f"{random.randint(20, 22)}:00-{random.randint(2, 4)}:00"
        )
        for day in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
    
    # Generate holiday hours for specific dates
    holiday_hours = {
        "2025-01-01": "Closed",
        "2025-07-04": f"{random.randint(10, 12)}:00-{random.randint(16, 18)}:00",
        "2025-12-25": "Closed"
    }
    
    # Generate random location within bounding box
    lat = random.uniform(LAT_MIN, LAT_MAX)
    lon = random.uniform(LON_MIN, LON_MAX)
    
    # Return the place as a dictionary
    return {
        "name": name,
        "address": address,
        "rating": rating,
        "sources": source_ratings,
        "data_gathered_at": timestamp,
        "last_updated_at": timestamp,
        "weightages": weightages,
        "operating_hours": operating_hours,
        "holiday_hours": holiday_hours,
        "location": (lat, lon)
    }


import psycopg2
import json
from datetime import datetime

# Mapping of day abbreviations to PostgreSQL enum values for day_of_week
DAY_MAPPING = {
    "Mon": "monday",
    "Tue": "tuesday",
    "Wed": "wednesday",
    "Thu": "thursday",
    "Fri": "friday",
    "Sat": "saturday",
    "Sun": "sunday"
}

def insert_places_to_db(places, db_params):
    """
    Insert a list of places into a PostgreSQL database.

    :param places: List of dictionaries, where each dictionary contains place details
                   (e.g., location, name, rating, sources, address, weightages,
                   operating_hours, holiday_hours, data_gathered_at, last_updated_at).
    :param db_params: Dictionary with database connection parameters (host, database, user, password).
    :return: None (prints success or error messages).
    """
    try:
        # Establish connection to the PostgreSQL database
        conn = psycopg2.connect(**db_params)
        cur = conn.cursor()

        # Step 1: Insert predefined classes into the classes table (if they don't exist)
        for class_name in CLASSES:
            cur.execute("""
                INSERT INTO classes (class_name)
                VALUES (%s)
                ON CONFLICT (class_name) DO NOTHING
            """, (class_name,))

        # Step 2: Insert each place and its related data
        for place in places:
            # Prepare the location as a geography point (longitude, latitude)
            lon, lat = place['location']
            location_wkt = f'POINT({lon} {lat})'

            # Insert into the places table and retrieve the generated place_id
            cur.execute("""
                INSERT INTO places (location, name, rating, sources, address, data_gathered_at, last_updated_at)
                VALUES (ST_GeogFromText(%s), %s, %s, %s, %s, %s, %s)
                RETURNING place_id
            """, (
                location_wkt,                    # Geography type using PostGIS
                place['name'],                   # Name of the place
                place['rating'],                 # Rating (e.g., float between 0-5)
                json.dumps(place['sources']),    # Sources as JSONB
                place['address'],                # Address as text
                place['data_gathered_at'].isoformat(),  # Timestamps in ISO format
                place['last_updated_at'].isoformat()
            ))
            place_id = cur.fetchone()[0]  # Get the UUID of the newly inserted place

            # Step 3: Insert classifications into place_classifications
            for class_name, weight in place['weightages'].items():
                # Fetch the class_id for the given class_name
                cur.execute("SELECT class_id FROM classes WHERE class_name = %s", (class_name,))
                class_id = cur.fetchone()[0]
                cur.execute("""
                    INSERT INTO place_classifications (place_id, class_id, weightage)
                    VALUES (%s, %s, %s)
                """, (place_id, class_id, weight))

            # Step 4: Insert operating hours into operating_hours
            for day_abbr, hours in place['operating_hours'].items():
                day_enum = DAY_MAPPING[day_abbr]  # Convert abbreviation to enum value
                opens_at, closes_at = hours.split('-')  # Split "HH:MM-HH:MM" into open/close times
                cur.execute("""
                    INSERT INTO operating_hours (place_id, day_of_week, opens_at, closes_at)
                    VALUES (%s, %s, %s, %s)
                """, (place_id, day_enum, opens_at, closes_at))

            # Step 5: Insert holiday hours into holiday_hours
            for date_str, hours in place['holiday_hours'].items():
                holiday_date = datetime.strptime(date_str, "%Y-%m-%d").date()  # Convert string to date
                if hours == "Closed":
                    cur.execute("""
                        INSERT INTO holiday_hours (place_id, holiday_date, is_closed)
                        VALUES (%s, %s, %s)
                    """, (place_id, holiday_date, True))
                else:
                    opens_at, closes_at = hours.split('-')
                    cur.execute("""
                        INSERT INTO holiday_hours (place_id, holiday_date, opens_at, closes_at, is_closed)
                        VALUES (%s, %s, %s, %s, %s)
                    """, (place_id, holiday_date, opens_at, closes_at, False))

        # Commit the transaction
        conn.commit()
        print(f"Successfully inserted {len(places)} places into the database.")

    except Exception as e:
        # Roll back the transaction if an error occurs
        print(f"Error inserting places into the database: {e}")
        conn.rollback()

    finally:
        # Close the cursor and connection
        cur.close()
        conn.close()

# Example usage:
if __name__ == "__main__":
    # Sample database connection parameters
    db_params = {
        "host": "localhost",
        "database": "your_db_name",
        "user": "your_username",
        "password": "your_password"
    }

    # Sample place data
    # sample_places = [
    #     {
    #         "location": (-73.935242, 40.730610),  # (longitude, latitude)
    #         "name": "Central Park",
    #         "rating": 4.8,
    #         "sources": {"google": "maps.google.com", "yelp": "yelp.com"},
    #         "address": "New York, NY 10024",
    #         "weightages": {"tourism": 0.9, "sports": 0.6},
    #         "operating_hours": {"Mon": "06:00-22:00", "Tue": "06:00-22:00"},
    #         "holiday_hours": {"2023-12-25": "Closed"},
    #         "data_gathered_at": datetime(2023, 10, 1, 12, 0),
    #         "last_updated_at": datetime(2023, 10, 2, 15, 0)
    #     }
    # ]

    sample_places = generate_place()

    import json
    print(json.dumps(place, default=str, indent=2))

    # Insert the place
    insert_places_to_db(sample_places, db_params)
