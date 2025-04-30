import React, { useEffect, useRef, useState } from "react";
import { OlaMaps } from "olamaps-web-sdk";
import { Place } from "../types";
import MapHoverCard from "./MapHoverCard";

interface MapProps {
  places: Array<Place>;
  onPlaceSelect: (placeId: string) => void;
}

const Map: React.FC<MapProps> = ({ places, onPlaceSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  
  // Add timeout ref to handle hover delays
  const hoverTimeoutRef = useRef<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the map container exists
    if (!mapRef.current) return;

    // Initialize Ola Maps
    const olaMaps = new OlaMaps({
      apiKey: import.meta.env.VITE_OLA_MAPS_API_KEY,
    });

    // Initialize the map
    const myMap = olaMaps.init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: mapRef.current,
      center: [77.6014, 12.9757], //map center coordinates
      zoom: 13,
    });

    mapInstanceRef.current = myMap;

    // Wait for map to load before adding sources and layers
    myMap.on("load", () => {
      // Prepare GeoJSON data for heatmap
      const heatmapData = {
        type: "FeatureCollection",
        features: places.map((place) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [place.longitude, place.latitude],
          },
          properties: {
            ...place,
          },
        })),
      };

      // Add the source
      myMap.addSource("places-heatmap", {
        type: "geojson",
        data: heatmapData,
      });

      // Add heatmap layer
      myMap.addLayer({
        id: "places-heatmap-layer",
        type: "heatmap",
        source: "places-heatmap",
        paint: {
          // Heatmap weight based on intensity
          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0,
            0,
            6,
            1,
          ],
          // Increase heatmap intensity based on zoom level
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            9,
            3,
          ],
          // Color ramp for heatmap
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(178,24,43)",
            1,
            "rgb(178,24,43)",
          ],
          // Adjust heatmap radius by zoom level
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
          // Decrease opacity by zoom level
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0],
        },
      });

      // Add individual point markers
      myMap.addLayer({
        id: "places-points",
        type: "circle",
        source: "places-heatmap",
        minzoom: 7,
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 7, 4, 16, 12],
          "circle-color": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            1,
            "rgba(33,102,172,0)",
            2,
            "rgb(103,169,207)",
            3,
            "rgb(209,229,240)",
            4,
            "rgb(253,219,199)",
            5,
            "rgb(239,138,98)",
            6,
            "rgb(178,24,43)",
          ],
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          "circle-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0, 8, 1],
        },
      });

      // Add click events to points
      myMap.on("click", "places-points", (e: any) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const placeId = feature.properties.id;

          if (placeId) {
            onPlaceSelect(placeId);
          }
        }
      });

      // Change the cursor to a pointer when hovering over points
      myMap.on("mouseenter", "places-points", (e: any) => {
        myMap.getCanvas().style.cursor = "pointer";

        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const properties = feature.properties;

          // Set hovered place and popup position
          const place = {
            id: properties.id,
            name: properties.name,
            description: properties.description || '',
            category: properties.category || '',
            average_rating: properties.average_rating || properties.google_average_rating || 0,
            total_reviews: properties.total_reviews || properties.google_total_reviews || 0,
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
            address: properties.address || '',
            images: properties.images ? JSON.parse(properties.images) : [],
            tags: properties.tags ? JSON.parse(properties.tags) : [],
            serves_coffee: properties.serves_coffee === 'true' || properties.serves_coffee === true,
            acceptsCreditCards: properties.acceptsCreditCards === 'true' || properties.acceptsCreditCards === true,
            priceLevel: properties.priceLevel || '',
            opening_hours: properties.opening_hours ? JSON.parse(properties.opening_hours) : [],
          };

          // Clear any existing timeout
          if (hoverTimeoutRef.current !== null) {
            window.clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }

          // Set hovered place and popup position
          setHoveredPlace(place);

          const canvasRect = myMap.getCanvasContainer().getBoundingClientRect();
          const mouseEvent = e.originalEvent;
          setPopupPosition({
            x: mouseEvent.clientX - canvasRect.left,
            y: mouseEvent.clientY - canvasRect.top,
          });
        }
      });

      myMap.on("mouseleave", "places-points", () => {
        myMap.getCanvas().style.cursor = "";
        
        // Set a short timeout before closing the popup
        // This gives time for the mouse to move to the popup if that's where it's heading
        hoverTimeoutRef.current = window.setTimeout(() => {
          // Check if the mouse is over the popup before closing it
          if (popupRef.current && !isMouseOverElement(popupRef.current)) {
            setHoveredPlace(null);
            setPopupPosition(null);
          }
        }, 50);
      });
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      // Clear any remaining timeouts
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [places, onPlaceSelect]);

  // Helper function to check if mouse is over an element
  const isMouseOverElement = (element: HTMLElement): boolean => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const mouseX = window.mouseX || 0;
    const mouseY = window.mouseY || 0;
    
    return (
      mouseX >= rect.left &&
      mouseX <= rect.right &&
      mouseY >= rect.top &&
      mouseY <= rect.bottom
    );
  };

  // Track mouse position globally
  useEffect(() => {
    const trackMousePosition = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', trackMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', trackMousePosition);
    };
  }, []);

  // Handle mouse events on the popup
  const handlePopupMouseEnter = () => {
    // Clear any timeout that might close the popup
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    // Close the popup when mouse leaves
    setHoveredPlace(null);
    setPopupPosition(null);
  };

  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  const cardMeasureRef = useRef<HTMLDivElement>(null);

  // Measure card size after render
  useEffect(() => {
    if (popupRef.current && cardMeasureRef.current) {
      const rect = cardMeasureRef.current.getBoundingClientRect();
      setCardSize({ width: rect.width, height: rect.height });
    }
  }, [hoveredPlace]);

  // Define a type for our constrained position
  type ConstrainedPosition = {
    x: number;
    y: number;
    transform: string;
  };

  // Calculate constrained position to keep card in viewport
  const getConstrainedPosition = (): ConstrainedPosition | null => {
    if (!popupPosition || !mapRef.current) return null;

    const mapRect = mapRef.current.getBoundingClientRect();
    const padding = 10; // Padding from viewport edges
    
    // Default position (centered above point)
    let transformStyle = 'translate(-50%, -100%)';
    let left = popupPosition.x;
    let top = popupPosition.y;
    
    // Check if card would go beyond the top of the map
    if (popupPosition.y - cardSize.height < mapRect.top + padding) {
      // Position below the point instead of above
      top = popupPosition.y;
      transformStyle = 'translate(-50%, 10px)';
    }
    
    // Check if card would go beyond the left edge of the map
    if (popupPosition.x - (cardSize.width / 2) < mapRect.left + padding) {
      // Align left edge with padding
      left = mapRect.left + padding + (cardSize.width / 2);
    }
    
    // Check if card would go beyond the right edge of the map
    if (popupPosition.x + (cardSize.width / 2) > mapRect.right - padding) {
      // Align right edge with padding
      left = mapRect.right - padding - (cardSize.width / 2);
    }
    
    return { x: left, y: top, transform: transformStyle };
  };

  const constrainedPosition = getConstrainedPosition();

  return (
    <div className="relative w-full h-[400px] rounded-lg shadow-lg">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0" />

      {/* Hidden div to measure card size */}
      {hoveredPlace && (
        <div 
          ref={cardMeasureRef} 
          className="absolute opacity-0 pointer-events-none"
          style={{ visibility: 'hidden' }}
        >
          <MapHoverCard place={hoveredPlace} />
        </div>
      )}

      {/* Custom Popup */}
      {hoveredPlace && popupPosition && constrainedPosition && (
        <div
          ref={popupRef}
          className="absolute text-sm mb-2 z-50 mouse-pointer"
          style={{
            left: constrainedPosition.x,
            top: constrainedPosition.y,
            transform: constrainedPosition.transform,
            pointerEvents: 'auto', // Changed from 'none' to allow hover events
          }}
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
          onClick={() => onPlaceSelect(hoveredPlace?.id || "")}
        >
          <MapHoverCard place={hoveredPlace} />
        </div>
      )}
    </div>
  );
};

// Add this to make TypeScript happy with our global mouse tracking
declare global {
  interface Window {
    mouseX?: number;
    mouseY?: number;
  }
}

export default Map;