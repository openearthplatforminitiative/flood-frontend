'use client';

import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

export const useFlyTo = (
  lng?: number,
  lat?: number,
  zoom?: number
) => {
  const map = useMap();

  useEffect(() => {
    if (!lng || !lat || !zoom) return;
    const mapRef = map?.['sites-map'];
    if (!mapRef) return;

    mapRef.flyTo({ center: [lng, lat], zoom });
  }, [map, lng, lat, zoom]);

  return null;
};
