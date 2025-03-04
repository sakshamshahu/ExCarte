import React, { useEffect, useRef } from 'react';
import { OlaMaps } from 'olamaps-web-sdk';

interface MapProps {
  places: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    // intensity: number;
  }>;
  onPlaceSelect: (placeId: string) => void;
}

const Map: React.FC<MapProps> = ({ places, onPlaceSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Ensure the map container exists
    if (!mapRef.current) return;

    // Initialize Ola Maps
    const olaMaps = new OlaMaps({
      apiKey: import.meta.env.VITE_OLA_MAPS_API_KEY,
    });

    // Initialize the map
    const myMap = olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: mapRef.current,
      center: [78.0322, 30.3165], // Dehradun coordinates
      zoom: 13
    });

    mapInstanceRef.current = myMap;

    // Wait for map to load before adding sources and layers
    myMap.on('load', () => {
      // Prepare GeoJSON data for heatmap
      const heatmapData = {
        type: 'FeatureCollection',
        features: places.map(place => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [place.longitude, place.latitude]
          },
          properties: {
            id: place.id,
            // intensity: place.intensity
          }
        }))
      };

      // Add the source
      myMap.addSource('places-heatmap', {
        type: 'geojson',
        data: heatmapData
      });

      // Add heatmap layer
      myMap.addLayer({
        id: 'places-heatmap-layer',
        type: 'heatmap',
        source: 'places-heatmap',
        paint: {
          // Heatmap weight based on intensity
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0,
            6, 1
          ],
          // Increase heatmap intensity based on zoom level
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
          // Color ramp for heatmap
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(178,24,43)',
            1, 'rgb(178,24,43)'
          ],
          // Adjust heatmap radius by zoom level
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20],
          // Decrease opacity by zoom level
          'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0]
        }
      });

      // Add individual point markers
      myMap.addLayer({
        id: 'places-points',
        type: 'circle',
        source: 'places-heatmap',
        minzoom: 7,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 7, 4, 16, 12],
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            1, 'rgba(33,102,172,0)',
            2, 'rgb(103,169,207)',
            3, 'rgb(209,229,240)',
            4, 'rgb(253,219,199)',
            5, 'rgb(239,138,98)',
            6, 'rgb(178,24,43)'
          ],
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
        }
      });

      // Add click events to points
      myMap.on('click', 'places-points', (e : any) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const placeId = feature.properties.id;
          
          if (placeId) {
            onPlaceSelect(placeId);
          }
        }
      });

      // Change the cursor to a pointer when hovering over points
      myMap.on('mouseenter', 'places-points', () => {
        myMap.getCanvas().style.cursor = 'pointer';
      });

      myMap.on('mouseleave', 'places-points', () => {
        myMap.getCanvas().style.cursor = '';
      });
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [places, onPlaceSelect]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-lg" 
    />
  );
};

export default Map;