'use server';

import { GeocoderClient } from 'openepi-client';

export const geoCodingAction = async (searchQuery: string, lang: string) => {
  const client = new GeocoderClient();
  return client
    .getGeocoding({ q: searchQuery, lang: lang })
    .then((result) => {
      const { data, error } = result;
      if (error) {
        console.error(error);
        throw new Error('Failed to get geocoding data');
      } else {
        return data;
      }
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Failed to get geocoding data');
    });
};
