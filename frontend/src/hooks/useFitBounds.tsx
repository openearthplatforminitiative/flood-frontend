'use client';

import { PaddingOptions } from 'maplibre-gl';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

export const useFitBounds = (
  maxLat: number,
  minLat: number,
  maxLng: number,
  minLng: number,
  padding: number | PaddingOptions
) => {
  const map = useMap();

  useEffect(() => {
    const mapRef = map?.['sites-map'];
    if (!mapRef) return;
    mapRef.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding });
  }, [map, maxLat, minLat, maxLng, minLng, padding]);

  return null;
};
