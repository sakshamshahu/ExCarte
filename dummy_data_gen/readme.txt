# Location-Based Heatmap Database Schema

## Overview:
This database schema is designed to support an interactive map application that generates heatmaps based on location data, classifications, and operating hours. The heatmaps visualize different aspects of locations such as nightlife activity, tourist attractions, and real estate opportunities.

## Database Setup
Currently, I plan on implementing it using PostgreSQL in a Docker container.

## Schema defintion
```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS postgis;    -- For geographic data handling
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- For UUID generation

-- Custom type for days of the week
CREATE TYPE day_of_week AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- Table to store distinct classes (e.g., 'nightlife', 'family-friendly')
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(50) UNIQUE NOT NULL
);

-- Core table for places
CREATE TABLE places (
    place_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location geography(Point,4326) NOT NULL,          -- Stores longitude and latitude
    name VARCHAR(255),
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 1),  -- Normalized rating between 0 and 1
    sources JSONB NOT NULL DEFAULT '{}',              -- Metadata from scraped sources
    address TEXT,
    data_gathered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- Timestamp of initial data collection
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),   -- Timestamp of last update
    search_vector tsvector                            -- For full-text search optimization
);

-- Junction table linking places to classes with weightages
CREATE TABLE place_classifications (
    place_id UUID NOT NULL,
    class_id INT NOT NULL,
    weightage DECIMAL(3,2) CHECK (weightage >= 0 AND weightage <= 1),  -- Weight between 0.00 and 1.00
    PRIMARY KEY (place_id, class_id),
    FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(class_id) ON DELETE RESTRICT
);

-- Table for regular operating hours
CREATE TABLE operating_hours (
    place_id UUID REFERENCES places(place_id) ON DELETE CASCADE,
    day_of_week day_of_week NOT NULL,
    opens_at TIME NOT NULL,
    closes_at TIME NOT NULL,
    PRIMARY KEY (place_id, day_of_week)
);

-- Table for holiday-specific hours
CREATE TABLE holiday_hours (
    place_id UUID REFERENCES places(place_id) ON DELETE CASCADE,
    holiday_date DATE NOT NULL,
    opens_at TIME,
    closes_at TIME,
    is_closed BOOLEAN DEFAULT false,
    PRIMARY KEY (place_id, holiday_date)
);

-- Indexes for performance optimization
CREATE INDEX idx_places_location ON places USING GIST(location);               -- Spatial queries
CREATE INDEX idx_places_search ON places USING GIN(search_vector);             -- Full-text search
CREATE INDEX idx_holiday_hours_date ON holiday_hours(holiday_date);            -- Date-based queries
CREATE INDEX idx_place_classifications_place_id ON place_classifications(place_id);  -- Joins by place
CREATE INDEX idx_place_classifications_class_id ON place_classifications(class_id);  -- Joins by class
```

## Tables explained

##### TABLE places
- place_id: 
    - UUID that is also the primar key
- location: 
    - point (x float, y float) store - longitude and latitude
- rating: 
    - A normalized value b/w 0 and 1. 1 implies best rating, 0 implies lowest rating. 
    - Can be de-normalized for display purposes.    
    - Rating will be part of the weightage considered for a place when the heatmap will be generated. 
    - Should be generated from webscraping and sentiment analysis.
- sources: 
    - A jsonb value that stores sources from where the rating was derived from, i.e websites, etc.
    - Example:
    ```json
    {
        "google_maps": {
            "last_scraped": "2024-02-22T10:00:00Z",
            "rating": 0.9,
            "review_count": 120
        },
        "yelp": {
            "last_scraped": "2024-02-22T09:00:00Z",
            "rating": 0.82,
            "review_count": 89
        }
    }
    ```
- address:
    - Stores the address of the place.
   
- data_gathered_at: 
    - Stores the time this data (rating, etc) was first put into the table.
    - Might be useful in a time series/time sensitive calculation for heatmap/ranking.
- last_updated_at:
    - Stores the last time stamp when this row was refreshed.
    - Same purpose as data_gathered_at.
- search_vector:
    - For optimizing any vector operations.

#### TABLE classes
- Stores all possible classes (e.g., "nightlife", "family-friendly") to ensure consistency.
- Separating classes into its own table prevents typos and supports easy addition of new classes.
- Columns:
    - class_id: Auto-incrementing integer primary key.
    - class_name: Unique name of the class (e.g., "nightlife"), limited to 50 characters.

#### TABLE places_classifications
- Links places to classes with a weightage
- Columns:
    - place_id: Foreign key to places.
    - class_id: Foreign key to classes.
    - weightage: Decimal (0.00 to 1.00) indicating relevance to the class.
- Constraints: 
    - Primary key is (place_id, class_id) to ensure a place has only one weight per class.
    - ON DELETE CASCADE on place_id: Deleting a place removes its classifications.
    - ON DELETE RESTRICT on class_id: Prevents deleting a class if places reference it.


##### TABLE operating_hours
- place_id: 
    - Foreign key for relating to places.
- day_of_week:
    - An enum datatype that stores the day value.
    - Allows for maximum flexibility in storing the working hours of a place.
- opens_at:
    - Stores when the place will be open for business, and thus the times it can contribute to a heatmap.
- closes_at:
    - Stores when the place will not be open, and thus can not contribute to the generation of a heatmap.

##### TABLE holiday_hours (name might change)
- This table is made to account for the specific days a place might be closed, or have different working hours.
- Holiday working hours will have precedence over operating_hours in queries.
- Might add a "name" column. If required.

###### Columns:
- place_id: 
    - Foreign key, relating to places table.
- holiday_date:
    - Stores when the holiday is.
- opens_at:
    - Stores when the place will be open for business, and thus the times it can contribute to a heatmap.
- closes_at:
    - Stores when the place will not be open, and thus can not contribute to the generation of a heatmap.
- is_closed:
    - A bool that displays if the place is closed full day.

Additional note: All timestamp fields (data_gathered_at, last_updated_at) use TIMESTAMPTZ to ensure proper timezone handling.

## Indexes
There's some basic indexes:
- idx_places_location: Optimizes spatial queries using GiST
- idx_places_classifications: Enables efficient JSONB queries on classifications
- idx_places_search: Supports full-text search capabilities
- idx_holiday_hours_date: Optimizes queries for specific dates


## Heatmap Generation Overview
The heatmap is generated by considering:

- Place classifications (weighted by relevance)
- Current rating
- Operating status (based on time and date)
- Data freshness (using gathered/updated timestamps)

## Sample Data insert

```sql
-- Insert classes
INSERT INTO classes (class_name) VALUES 
    ('nightlife'), 
    ('family-friendly'), 
    ('tourism');

-- Insert a place
INSERT INTO places (location, name, rating, sources, address, data_gathered_at, last_updated_at) 
VALUES 
    ('POINT(-73.935242 40.730610)', 'Club XYZ', 0.85, 
     '{"url1": 0.4, "url2": 0.6, "url3": 0.3}', 
     '123 Night St, NYC', 
     '2024-10-01T12:00:00Z', 
     '2024-10-01T12:00:00Z');

-- Link place to classes with weightages
INSERT INTO place_classifications (place_id, class_id, weightage) 
VALUES 
    ((SELECT place_id FROM places WHERE name = 'Club XYZ'), 
     (SELECT class_id FROM classes WHERE class_name = 'nightlife'), 0.9),
    ((SELECT place_id FROM places WHERE name = 'Club XYZ'), 
     (SELECT class_id FROM classes WHERE class_name = 'tourism'), 0.3);
```

## Query examples:
Querying for all operational shops for 2-22-2025 at night and of the class "nightlife", with their ratings as the output.

```sql
-- Function to check if a given time falls within an open interval
CREATE OR REPLACE FUNCTION is_time_within_interval(
    check_time TIME, 
    open_time TIME, 
    close_time TIME
) RETURNS BOOLEAN AS $$
BEGIN
    IF open_time <= close_time THEN
        RETURN check_time BETWEEN open_time AND close_time;
    ELSE
        RETURN check_time >= open_time OR check_time < close_time;
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to check if a place is open on a holiday
CREATE OR REPLACE FUNCTION is_place_open_on_holiday(
    p_place_id UUID, 
    p_date DATE, 
    p_check_time TIME
) RETURNS BOOLEAN AS $$
DECLARE 
    is_closed BOOLEAN;
    opens_at TIME;
    closes_at TIME;
BEGIN
    SELECT hh.is_closed, hh.opens_at, hh.closes_at
    INTO is_closed, opens_at, closes_at
    FROM holiday_hours hh
    WHERE hh.place_id = p_place_id 
      AND hh.holiday_date = p_date;

    IF is_closed THEN
        RETURN FALSE;
    ELSIF opens_at IS NOT NULL AND closes_at IS NOT NULL THEN
        RETURN is_time_within_interval(p_check_time, opens_at, closes_at);
    ELSE
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to check if a place is open on a regular weekday
CREATE OR REPLACE FUNCTION is_place_open_on_weekday(
    p_place_id UUID, 
    p_day day_of_week, 
    p_check_time TIME
) RETURNS BOOLEAN AS $$
DECLARE 
    is_open BOOLEAN;
BEGIN
    SELECT EXISTS (
        SELECT 1 
        FROM operating_hours oh
        WHERE oh.place_id = p_place_id 
          AND oh.day_of_week = p_day
          AND is_time_within_interval(p_check_time, oh.opens_at, oh.closes_at)
    ) INTO is_open;

    RETURN is_open;
END;
$$ LANGUAGE plpgsql STABLE;

-- Finaly query to retrieve required rows
WITH current_status AS (
    SELECT 
        p.place_id,
        p.name,
        p.address,
        p.location,
        p.rating,
        pc.weightage AS nightlife_score,
        COALESCE(
            is_place_open_on_holiday(p.place_id, DATE '2025-02-22', TIME '20:00'),
            is_place_open_on_weekday(p.place_id, 'saturday', TIME '20:00'),
            FALSE
        ) AS is_open
    FROM places p
    JOIN place_classifications pc ON p.place_id = pc.place_id
    JOIN classes c ON pc.class_id = c.class_id
    WHERE c.class_name = 'nightlife'
)
SELECT 
    name,
    address,
    location,
    rating
FROM current_status
WHERE 
    is_open = true 
    AND nightlife_score > 0.3
ORDER BY 
    nightlife_score DESC,
    rating DESC;
```

expected output:
... (to be decided)