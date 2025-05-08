import React, { useEffect, useRef, useState } from "react";
import { OlaMaps } from "olamaps-web-sdk";
import { Place } from "../types";
import MapHoverCard from "./MapHoverCard";
import { MapPin, Coffee, Music, Utensils, ShoppingBag, TentIcon, Bike, Soup } from "lucide-react";

// Define the categories
const categories = [
  { id: "all", name: "All Places", icon: MapPin },
  { id: "coffee", name: "Cafes", icon: Coffee },
  { id: "nightlife", name: "Nightlife", icon: Music },
  { id: "dining", name: "Restaurants", icon: Utensils },
  { id: "shopping", name: "Shopping", icon: ShoppingBag },
  { id: "entertainment", name: "Entertainment", icon: Music },
  { id: "culture", name: "Culture", icon: TentIcon },
  { id: "outdoor", name: "Outdoor", icon: Bike },
  { id: "wellness", name: "Wellness", icon: Soup },
];

// Define areas with colors
const areaColors = {
  jayanagar: "#F7374F",
  koramangala: "#102E50",
  "hsr layout": "#E78B48",
  "hsr layout 5th sector": "#E78B48",
};

// Define category colors (for secondary visual differentiation)
const categoryColors = {
  coffee: "#C07F00", // Brown
  nightlife: "#7F00FF", // Purple
  dining: "#336D82", // Pink
  shopping: "#A5158C", // Yellow
  entertainment: "#00FF7F", // Green
  culture: "#FF00FF", // Magenta
  outdoor: "#FF0000", // Red
  wellness: "#00FFFF", // Cyan
  all: "#FFFFFF", // White (default)
};

interface MapProps {
  places: Array<Place>;
  onPlaceSelect: (placeId: string) => void;
  selectedCategory?: string;
}

const Map: React.FC<MapProps> = ({
  places,
  onPlaceSelect,
  selectedCategory = "all",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [hoveredPlace, setHoveredPlace] = useState<Place | null>(null);
  const [showLegend, setShowLegend] = useState(false);
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
      center: [77.6214, 12.9257], // Map center coordinates
      zoom: 12,
    });

    mapInstanceRef.current = myMap;

    // Wait for map to load before adding sources and layers
    myMap.on("load", () => {
      const layers = myMap.getStyle().layers;

      // Find and modify label layers
      for (const layer of layers) {
        // Check if it's a label layer (typically has symbol type with text)
        if (
          (layer.type === "symbol" &&
            layer.layout &&
            layer.layout["text-field"]) ||
          (layer.id && layer.id.includes("label"))
        ) {
          // Hide the text by setting visibility to none
        if(layer.id === "poi") 
          myMap.setLayoutProperty(layer.id, "visibility", "none");
        }
      }
      // Filter places based on selected category if needed
      const filteredPlaces =
        selectedCategory === "all"
          ? places
          : places.filter((place) => place.category === selectedCategory);

      // Prepare GeoJSON data for each area
      const areas = [
        "jayanagar",
        "koramangala",
        "hsr layout",
        "hsr layout 5th sector",
      ];

      areas.forEach((area) => {
        // Filter places for this area
        const areaPlaces = filteredPlaces.filter(
          (place) => place.area?.toLowerCase() === area.toLowerCase()
        );

        if (areaPlaces.length === 0) return; // Skip if no places in this area

        // Create GeoJSON for this area
        const areaData = {
          type: "FeatureCollection",
          features: areaPlaces.map((place) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [place.longitude, place.latitude],
            },
            properties: {
              ...place,
              areaColor:
                areaColors[area as keyof typeof areaColors] || "#999999",
              categoryColor:
                categoryColors[place.category as keyof typeof categoryColors] ||
                categoryColors.all,
            },
          })),
        };

        // Source ID based on area
        const sourceId = `places-${area.replace(/\s+/g, "-")}`;

        // Add the source
        myMap.addSource(sourceId, {
          type: "geojson",
          data: areaData,
        });

        // Base config for reuse
        const heatmapPaintBase = {
          "heatmap-opacity": 0.9,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 0, 0)",
            1,
            areaColors[area as keyof typeof areaColors] || "#999999",
          ],
        };

        // High zoom (10–15) - Detailed layer
        myMap.addLayer({
          id: `${sourceId}-heatmap-high`,
          type: "heatmap",
          source: sourceId,
          minzoom: 10,
          maxzoom: 15,
          paint: {
            ...heatmapPaintBase,
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              0.5,
              15,
              2,
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              10,
              15,
              30,
            ],
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "0.8"], // or your desired metric
              0,
              0,
              5,
              1,
            ],
          },
        });

        // Mid zoom (5–10) - Broader layer
        myMap.addLayer({
          id: `${sourceId}-heatmap-mid`,
          type: "heatmap",
          source: sourceId,
          minzoom: 0,
          maxzoom: 13,
          paint: {
            ...heatmapPaintBase,
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5,
              0.3,
              10,
              1,
            ],
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5,
              20,
              10,
              40,
            ],
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "0.8"],
              0,
              0,
              5,
              1,
            ],
          },
        });

        // // Low zoom (0–5) - Very broad overview
        // myMap.addLayer({
        //   id: `${sourceId}-heatmap-low`,
        //   type: "heatmap",
        //   source: sourceId,
        //   minzoom: 0,
        //   maxzoom: 8,
        //   paint: {
        //     ...heatmapPaintBase,
        //     "heatmap-intensity": [
        //       "interpolate",
        //       ["linear"],
        //       ["zoom"],
        //       0,
        //       0.2,
        //       5,
        //       0.8,
        //     ],
        //     "heatmap-radius": [
        //       "interpolate",
        //       ["linear"],
        //       ["zoom"],
        //       0,
        //       30,
        //       5,
        //       60,
        //     ],
        //     "heatmap-weight": [
        //       "interpolate",
        //       ["linear"],
        //       ["get", "0.8"],
        //       0,
        //       0,
        //       5,
        //       1,
        //     ],
        //   },
        // });

        // Add points layer for this area
        myMap.addLayer({
          id: `${sourceId}-points`,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              4,
              16,
              12,
            ],
            "circle-color": ["get", "areaColor"],
            "circle-stroke-color": ["get", "categoryColor"],
            "circle-stroke-width": 1,
            "circle-opacity": 0.8,
          },
        });

        // Add click events to points
        myMap.on("click", `${sourceId}-points`, (e: any) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const placeId = feature.properties.id;

            if (placeId) {
              onPlaceSelect(placeId);
            }
          }
        });

        // Change the cursor to a pointer when hovering over points
        myMap.on("mouseenter", `${sourceId}-points`, (e: any) => {
          myMap.getCanvas().style.cursor = "pointer";

          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const properties = feature.properties;

            // Set hovered place and popup position
            const place = {
              id: properties.id,
              name: properties.name,
              description: properties.description || "",
              category: properties.category || "",
              area: properties.area || "",
              average_rating: properties.average_rating || 0,
              google_average_rating: properties.google_average_rating || 0,
              total_reviews: properties.total_reviews || 0,
              google_total_reviews: properties.google_total_reviews || 0,
              latitude: feature.geometry.coordinates[1],
              longitude: feature.geometry.coordinates[0],
              address: properties.address || "",
              images: properties.images ? JSON.parse(properties.images) : [],
              tags: properties.tags ? JSON.parse(properties.tags) : [],
              serves_coffee:
                properties.serves_coffee === "true" ||
                properties.serves_coffee === true,
              acceptsCreditCards:
                properties.acceptsCreditCards === "true" ||
                properties.acceptsCreditCards === true,
              priceLevel: properties.priceLevel || "",
              opening_hours: properties.opening_hours
                ? JSON.parse(properties.opening_hours)
                : [],
            };

            // Clear any existing timeout
            if (hoverTimeoutRef.current !== null) {
              window.clearTimeout(hoverTimeoutRef.current);
              hoverTimeoutRef.current = null;
            }

            // Set hovered place and popup position
            setHoveredPlace(place);

            const canvasRect = myMap
              .getCanvasContainer()
              .getBoundingClientRect();
            const mouseEvent = e.originalEvent;

            setPopupPosition({
              x: mouseEvent.clientX - canvasRect.left,
              y: mouseEvent.clientY - canvasRect.top,
            });
          }
        });

        myMap.on("mouseleave", `${sourceId}-points`, () => {
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
  }, [places, onPlaceSelect, selectedCategory]);

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

    window.addEventListener("mousemove", trackMousePosition);

    return () => {
      window.removeEventListener("mousemove", trackMousePosition);
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
    if (hoveredPlace && cardMeasureRef.current) {
      const rect = cardMeasureRef.current.getBoundingClientRect();
      setCardSize({ width: rect.width, height: rect.height });
    }
  }, [hoveredPlace]);

  // Calculate the optimal position for the hover card
  const getOptimalPosition = () => {
    if (
      !popupPosition ||
      !mapRef.current ||
      !cardSize.width ||
      !cardSize.height
    )
      return null;

    const mapRect = mapRef.current.getBoundingClientRect();
    const padding = 10; // Padding from map edges

    // Default position (pointer coordinates)
    let x = popupPosition.x;
    let y = popupPosition.y;

    // Initial placement strategy - prefer above and centered on point
    let placement = "top"; // can be: top, bottom, left, right

    // Calculate available space in each direction
    const spaceAbove = y;
    const spaceBelow = mapRect.height - y;
    const spaceLeft = x;
    const spaceRight = mapRect.width - x;

    // Check if card fits above the point
    if (spaceAbove >= cardSize.height + padding) {
      placement = "top";
      y -= padding; // Add some space between point and card
    }
    // If not above, check if it fits below
    else if (spaceBelow >= cardSize.height + padding) {
      placement = "bottom";
      y += padding; // Add some space between point and card
    }
    // If neither above nor below works well, try left or right
    else if (spaceLeft > spaceRight && spaceLeft >= cardSize.width + padding) {
      placement = "left";
      x -= padding; // Add some space between point and card
    } else if (spaceRight >= cardSize.width + padding) {
      placement = "right";
      x += padding; // Add some space between point and card
    }
    // If all else fails, place it where there's most space
    else {
      const spaces = [
        { dir: "top", space: spaceAbove },
        { dir: "bottom", space: spaceBelow },
        { dir: "left", space: spaceLeft },
        { dir: "right", space: spaceRight },
      ];

      const bestPlacement = spaces.sort((a, b) => b.space - a.space)[0];
      placement = bestPlacement.dir;

      // Adjust position based on best placement
      if (placement === "top") y -= padding;
      else if (placement === "bottom") y += padding;
      else if (placement === "left") x -= padding;
      else if (placement === "right") x += padding;
    }

    // Apply CSS transform based on placement
    let transform = "";
    switch (placement) {
      case "top":
        transform = "translate(-50%, -100%)";
        break;
      case "bottom":
        transform = "translate(-50%, 0)";
        break;
      case "left":
        transform = "translate(-100%, -50%)";
        break;
      case "right":
        transform = "translate(0, -50%)";
        break;
    }

    // Ensure the card stays within map boundaries
    // For left and right positions, ensure vertical bounds
    if (placement === "left" || placement === "right") {
      // Adjust if too close to top
      if (y - cardSize.height / 2 < padding) {
        y = cardSize.height / 2 + padding;
      }
      // Adjust if too close to bottom
      else if (y + cardSize.height / 2 > mapRect.height - padding) {
        y = mapRect.height - cardSize.height / 2 - padding;
      }
    }

    // For top and bottom positions, ensure horizontal bounds
    if (placement === "top" || placement === "bottom") {
      // Adjust if too close to left
      if (x - cardSize.width / 2 < padding) {
        x = cardSize.width / 2 + padding;
      }
      // Adjust if too close to right
      else if (x + cardSize.width / 2 > mapRect.width - padding) {
        x = mapRect.width - cardSize.width / 2 - padding;
      }
    }

    return { x, y, transform, placement };
  };

  const optimalPosition = getOptimalPosition();

  // Render the map legend
  const renderLegend = () => {
    return (
      <div
        onClick={() => setShowLegend(false)}
        className="absolute bottom-4 left-4 bg-white p-3 cursor-pointer shadow-md z-20 text-xs rounded-lg"
      >
        <h3 className="font-semibold mb-2">Map Legend</h3>

        <div className="mb-2">
          <h4 className="font-medium mb-1">Areas:</h4>
          <div className="grid grid-cols-2 gap-x-4">
            {Object.entries(areaColors).map(([area, color], index) => {
              // Only display HSR Layout once since both use the same color
              if (area === "hsr layout 5th sector") return null;

              // Rename HSR Layout to include both areas
              const displayName =
                area === "hsr layout"
                  ? "HSR Layout"
                  : area.charAt(0).toUpperCase() + area.slice(1);

              return (
                <div key={index} className="flex items-center mb-1">
                  <div
                    className="w-4 h-4 rounded-full mr-1"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span>{displayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-1">Categories:</h4>
          <div className="grid grid-cols-2 gap-x-4">
            {categories
              .filter((cat) => cat.id !== "all")
              .map((category, index) => (
                <div key={index} className="flex items-center mb-1">
                  <div
                    className="w-4 h-4 rounded-full mr-1 border-2"
                    style={{
                      borderColor:
                        categoryColors[
                          category.id as keyof typeof categoryColors
                        ],
                    }}
                  ></div>
                  <span>{category.name}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={mapRef}
      className="relative w-full h-[400px] rounded-lg shadow-lg"
    >
      {/* Map Container */}
      <div className="absolute inset-0" />

      {/* Info Button to Toggle Legend */}
      {!showLegend && (
        <button
          onClick={() => setShowLegend((prev) => !prev)}
          className="absolute bottom-4 left-4 w-8 h-8 bg-white border-2 border-black/80 rounded-full shadow-md flex items-center justify-center z-50 hover:scale-105 transition-transform duration-200"
          aria-label="Toggle Legend"
        >
          <span className="text-lg font-bold">i</span>
        </button>
      )}

      {/* Map Legend */}
      {showLegend && renderLegend()}

      {/* Hidden div to measure card size */}
      {hoveredPlace && (
        <div
          ref={cardMeasureRef}
          className="absolute opacity-0 pointer-events-none"
          style={{ visibility: "hidden" }}
        >
          <MapHoverCard place={hoveredPlace} />
        </div>
      )}

      {/* Custom Popup */}
      {hoveredPlace && popupPosition && optimalPosition && (
        <div
          ref={popupRef}
          className="absolute text-sm z-10"
          style={{
            left: optimalPosition.x,
            top: optimalPosition.y,
            transform: optimalPosition.transform,
            pointerEvents: "auto", // Allow interaction with the card
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
