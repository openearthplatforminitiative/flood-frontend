'use client';

import { MapLibreEvent } from 'maplibre-gl';
import { useEffect } from 'react';
import { useMap } from 'react-map-gl/maplibre';

export const useImageLoader = () => {
  const mapRef = useMap();

  useEffect(() => {
    const map = mapRef['sites-map'];

    if (!map) return;
    const handleStyleImageMissing = async (
      e: MapLibreEvent<unknown> & {
        type: 'styleimagemissing';
        id: string;
      }
    ) => {
      const { id } = e;
      if (!id) return;
      if (!map.hasImage(id)) {
        try {
          const { data: image } = await map.loadImage(
            `/assets/map-icons/${id}.png`
          );
          if (!image) return;
          map.addImage(id, image);
        } catch (error) {
          console.error(`Error adding ${id}.png to map:`, error);
          console.error(error);
        }
      }
    };

    map.on('styleimagemissing', handleStyleImageMissing);
    return () => {
      map.off('styleimagemissing', handleStyleImageMissing);
    };
  }, [mapRef]);
};
