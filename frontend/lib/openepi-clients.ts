import { WeatherClient, FloodClient, GeocoderClient, CropHealthClient } from 'openepi-client';

export const weatherClient = new WeatherClient('https://api.openepi.io/weather');
export const floodClient = new FloodClient('https://api.openepi.io/flood');
export const geocoderClient = new GeocoderClient('https://api.openepi.io/geocoding');
export const cropHealthClient = new CropHealthClient('https://api.openepi.io/crop-health');

type FloodSummaryProperties = NonNullable<
  Awaited<ReturnType<typeof floodClient.getSummaryForecast>>['data']
>['queried_location']['features'][0]['properties'];

export type FloodIntensity = FloodSummaryProperties['intensity'];
export type FloodTiming = FloodSummaryProperties['peak_timing'];

export const floodIntensityRatingMap: { [key in FloodIntensity]: number } = {
  G: 1,
  Y: 2,
  R: 3,
  P: 4,
};
