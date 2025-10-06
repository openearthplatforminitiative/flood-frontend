'use client';

import { useFitBounds } from '@/hooks/useFitBounds';
import { PaddingOptions } from 'react-map-gl/maplibre';

type MapFitBoundsProps = {
  maxLat: number;
  minLat: number;
  maxLng: number;
  minLng: number;
  padding: number | PaddingOptions;
}

export const MapFitBounds = (props: MapFitBoundsProps) => {
  const { maxLat, minLat, maxLng, minLng, padding } = props;
  useFitBounds(maxLat, minLat, maxLng, minLng, padding);
  return null;
};
