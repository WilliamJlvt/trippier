'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 37.78825,
  lng: -122.4324
};

// Dark mode style from mobile app
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#2c2c2c' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }],
  },
  { featureType: 'poi', stylers: [{ visibility: 'on' }] },
  { featureType: 'transit', stylers: [{ visibility: 'on' }] },
];

interface CustomMarker {
  id: number;
  lat: number;
  lng: number;
  type: 'Tourist' | 'Business' | 'Transport';
}

const FILTERS = ['Tourist', 'Business', 'Transport'] as const;

// SVG Paths for Icons (Simplified versions of FontAwesome/Ionicons)
const ICON_PATHS = {
  Tourist: "M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z", // Camera
  Business: "M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z", // Briefcase
  Transport: "M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 6l2-2h10l2 2v5H5V6z" // Bus
};

const PIN_PATH = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z";

const getMarkerIcon = (type: 'Tourist' | 'Business' | 'Transport') => {
  const iconPath = ICON_PATHS[type];
  
  // Create an SVG string
  const svg = `
    <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <!-- Drop Shadow (optional) -->
      <filter id="shadow">
        <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.3"/>
      </filter>
      
      <!-- Pin Shape (White) -->
      <path d="${PIN_PATH}" fill="#FFFFFF" stroke="#000000" stroke-width="0.5" filter="url(#shadow)" />
      
      <!-- Inner Icon (Black) - Scaled and Centered -->
      <g transform="translate(7, 4) scale(0.40)">
        <path d="${iconPath}" fill="#000000" />
      </g>
    </svg>
  `;

  return {
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
    scaledSize: new google.maps.Size(45, 45), // Match mobile size roughly
    anchor: new google.maps.Point(22.5, 45) // Anchor at bottom center
  };
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const [markers, setMarkers] = useState<CustomMarker[]>([]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const randomType = FILTERS[Math.floor(Math.random() * FILTERS.length)];
      const newMarker: CustomMarker = {
        id: Date.now(),
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        type: randomType,
      };
      setMarkers((current) => [...current, newMarker]);
    }
  }, []);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // Optional: Set initial bounds if needed
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    // cleanup
  }, []);

  if (!isLoaded) {
    return <div className="w-full h-full bg-[#212121] flex items-center justify-center text-white">Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyle,
        disableDefaultUI: true, // cleaner look like mobile
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
      onClick={onMapClick}
    >
      <MarkerClusterer>
        {(clusterer) => (
          <>
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                clusterer={clusterer}
                icon={getMarkerIcon(marker.type)}
                // Removed label, using icon for visual fidelity
              />
            ))}
          </>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
}
