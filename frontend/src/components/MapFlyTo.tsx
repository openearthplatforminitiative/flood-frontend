'use client';

import { useFlyTo } from '@/hooks/useFlyTo';

type MapFlyToProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
};

export const MapFlyTo = ({ lng, lat, zoom }: MapFlyToProps) => {
  useFlyTo(lng, lat, zoom);
  return null;
};
