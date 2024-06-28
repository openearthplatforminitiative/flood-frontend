import { WeatherClient, FloodClient, GeocoderClient } from 'openepi-client';

export const weatherClient = new WeatherClient();
export const floodClient = new FloodClient();
export const geocoderClient = new GeocoderClient();

export enum FloodIntensity {
  G = 1, // Gray, no flood signal (2-year <30%).
  Y = 2, // Yellow, maximum for 5-year <30% and 2-year >=30%
  R = 3, // Red, maximum for 20-year <30% and 5-year >=30%
  P = 4, // Purple, maximum 20-year exceedance probability >=30%
}

export enum FloodTiming {
  BB = 1, // Black border, peak forecasted within days 1-3
  GC = 2, // Grayed color, peak forecasted after day 10 with <30% probability of exceeding the 2-year return period threshold in first 10 days
  GB = 3, // Gray border, floods of some severity in first 10 days and peak after day 3
}
