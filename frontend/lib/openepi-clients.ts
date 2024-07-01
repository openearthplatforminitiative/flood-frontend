import { WeatherClient, FloodClient, GeocoderClient } from 'openepi-client';

export const weatherClient = new WeatherClient();
export const floodClient = new FloodClient();
export const geocoderClient = new GeocoderClient();

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
