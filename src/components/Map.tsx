import React, { useEffect, useRef } from 'react';
import { useStore } from '../store';

interface MapProps {
  places: Array<{
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    heatScore: number;
  }>;
  onPlaceSelect: (placeId: string) => void;
}

declare global {
  interface Window {
    ola: any;
  }
}

const Map: React.FC<MapProps> = ({ places, onPlaceSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const heatmapRef = useRef<any>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!window.ola || !mapRef.current) return;

      const map = new window.ola.Map({
        container: mapRef.current,
        center: [78.0322, 30.3165], // Dehradun
        zoom: 13,
        style: 'https://api.maptiler.com/maps/streets/style.json'
      });

      mapInstanceRef.current = map;

      // Initialize heatmap layer
      const heatmapData = places.map(place => ({
        coordinates: [place.longitude, place.latitude],
        weight: place.heatScore
      }));

      const heatmapLayer = new window.ola.HeatmapLayer({
        data: heatmapData,
        radius: 20,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)'
        ]
      });

      map.addLayer(heatmapLayer);
      heatmapRef.current = heatmapLayer;
    };

    // Load OLA Maps SDK
    const script = document.createElement('script');
    script.src = `https://api.olamaps.com/v1/maps?key=${import.meta.env.VITE_OLA_MAPS_API_KEY}`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    places.forEach(place => {
      const marker = new window.ola.Marker()
        .setLngLat([place.longitude, place.latitude])
        .addTo(mapInstanceRef.current);

      marker.getElement().addEventListener('click', () => {
        onPlaceSelect(place.id);
      });

      markersRef.current.push(marker);
    });

    // Update heatmap data
    if (heatmapRef.current) {
      const heatmapData = places.map(place => ({
        coordinates: [place.longitude, place.latitude],
        weight: place.heatScore
      }));
      heatmapRef.current.setData(heatmapData);
    }
  }, [places, onPlaceSelect]);

  return (
    <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow-lg" />
  );
};

export default Map;