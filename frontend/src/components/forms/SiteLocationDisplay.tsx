'use client';

import { activeLngLatAtom } from '@/store/atoms/mapAtom';
import { PlaceOutlined } from '@mui/icons-material';
import { useAtomValue } from 'jotai';
import { GeocoderClient } from 'openepi-client';
import { useEffect, useState } from 'react';

export const SiteLocationDisplay = () => {
  const [locationString, setLocationString] = useState<string>();

  const activeLngLat = useAtomValue(activeLngLatAtom);

  useEffect(() => {
    if (activeLngLat) {
      const client = new GeocoderClient();
      client
        .getReverseGeocoding({
          lon: activeLngLat.lng,
          lat: activeLngLat.lat,
        })
        .then((result) => {
          const { data, error } = result;

          if (error) {
            console.error(error);
          } else {
            if (data.features && data.features[0]) {
              const locationProperties = data.features[0].properties;

              const { county, city, country } = locationProperties;

              const something = [county, city, country].filter(
                (item) => item !== null && item !== undefined
              );
              return setLocationString(something.join(', '));
            }
          }
          setLocationString('Unknown');
        });
    }
  }, [activeLngLat]);

  return (
    <div className="flex items-center gap-2 mt-2 mb-4">
      <PlaceOutlined />
      <div className="flex flex-col">
        Current location set to: {locationString}
        <div className="text-sm text-muted-foreground hidden md:block">
          Drag the pin on the map to change the location
        </div>
      </div>
    </div>
  );
};
