import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { weatherClient } from '@/lib/openepi-clients';
import {
  getLocalTime,
  getMetDate,
  getMETHour,
  getTimezoneDifferenceInHours,
} from '@/app/helpers/timestampToLocalDate';
import { getSiteForUser } from '@/lib/prisma';
import { WeatherForecast } from './WeatherForecastRows';
import { WeatherWidgetView } from './WeatherWidgetView';

type WeatherWidgetProps = {
  sitePromise: ReturnType<typeof getSiteForUser>;
  lang: string;
  locationForecastPromise: ReturnType<typeof weatherClient.getLocationForecast>;
};

export type WeatherDay = {
  date: Date;
  night?: string;
  day?: string;
  noon?: string;
  evening?: string;
  temperatureMax: number;
  temperatureMin: number;
  precipitation: number;
  wind: number;
  weatherHours: WeatherForecast[];
};

export type WeatherForecast = {
  from: Date;
  to?: Date;
  symbol?: string;
  temperature?: number;
  precipitation: number;
  wind?: number;
  windDirection?: number;
};

export const WeatherWidget = async ({
  sitePromise,
  lang,
  locationForecastPromise,
}: WeatherWidgetProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  const site = await sitePromise;

  if (!site) {
    throw new Error('Site not found');
  }

  const locationForecast = await locationForecastPromise;

  const timezoneDiffHours = getTimezoneDifferenceInHours([site.lat, site.lng]);

  const currentTimeUTC = new Date();
  const currentTimeLocal = getLocalTime(currentTimeUTC, [site.lat, site.lng]);

  const firstTimeseriesDateUTC = new Date(
    locationForecast.data?.properties.timeseries[0].time!
  );
  const firstTimeseriesDateLocal = getLocalTime(firstTimeseriesDateUTC, [
    site.lat,
    site.lng,
  ]);

  const symbolHours = {
    night: {
      accurate: 1,
      nearest: getMETHour(timezoneDiffHours, 1),
    },
    day: {
      accurate: 7,
      nearest: getMETHour(timezoneDiffHours, 7),
    },
    noon: {
      accurate: 13,
      nearest: getMETHour(timezoneDiffHours, 13),
    },
    evening: {
      accurate: 19,
      nearest: getMETHour(timezoneDiffHours, 19),
    },
  };

  const locationForecastIndexed =
    locationForecast.data?.properties.timeseries.reduce<
      Record<string, (typeof locationForecast.data.properties.timeseries)[0]>
    >((acc, curr) => {
      const newCurr = {
        ...curr,
        localDate: getLocalTime(curr.time, [site.lat, site.lng]),
      };
      acc[newCurr.localDate.toISOString()] = newCurr;
      return acc;
    }, {});

  const weatherDays: WeatherDay[] = [];

  const days = 10;
  for (let i = 0; i < days; i++) {
    const localDay = new Date(
      new Date(firstTimeseriesDateLocal).setDate(
        firstTimeseriesDateLocal.getDate() + i
      )
    );
    localDay.setHours(1);

    const getDatesFrom =
      i === 0
        ? new Date(firstTimeseriesDateLocal)
        : locationForecastIndexed![localDay.toISOString()]
          ? localDay.toISOString()
          : getMetDate(timezoneDiffHours, localDay);

    const getDatesTo = locationForecastIndexed![
      new Date(localDay.setHours(19)).toISOString()
    ]
      ? new Date(new Date(localDay).setHours(24))
      : getMetDate(timezoneDiffHours, new Date(localDay.setHours(24)));

    let temperatureMax = -100,
      temperatureMin = 100,
      precipitation = 0,
      wind = 0,
      numberOfWindMeasurements = 0;

    let weatherHours: WeatherForecast[] = [];

    // for each hour form getDatesFrom to getDatesTo, access the locationForecastIndexed[date] to get the weather data
    for (
      let hour = new Date(getDatesFrom);
      hour <= getDatesTo;
      new Date(hour.setHours(hour.getHours() + 1))
    ) {
      const forecast = locationForecastIndexed![hour.toISOString()];
      if (!forecast) continue;

      weatherHours.push({
        from: new Date(hour),
        to: locationForecastIndexed![
          new Date(new Date(hour).setHours(hour.getHours() + 1)).toISOString()
        ]
          ? undefined
          : new Date(new Date(hour).setHours(hour.getHours() + 6)),
        symbol:
          forecast.data.next_1_hours?.summary.symbol_code ??
          forecast.data.next_6_hours?.summary.symbol_code ??
          '',
        temperature: forecast.data.instant.details?.air_temperature
          ? Math.round(forecast.data.instant.details?.air_temperature)
          : undefined,
        precipitation:
          forecast.data.next_1_hours?.details?.precipitation_amount ?? 0,
        wind: forecast.data.instant.details?.wind_speed
          ? Math.round(forecast.data.instant.details?.wind_speed)
          : undefined,
        windDirection:
          forecast.data.instant.details?.wind_from_direction ?? undefined,
      });

      temperatureMax = Math.max(
        temperatureMax,
        forecast.data.instant.details?.air_temperature ?? 0
      );
      temperatureMin = Math.min(
        temperatureMin,
        forecast.data.instant.details?.air_temperature ?? 1000
      );
      if (forecast.data.next_1_hours?.details?.precipitation_amount)
        precipitation +=
          forecast.data.next_1_hours?.details?.precipitation_amount;
      else if (hour.getHours() < 18)
        precipitation +=
          forecast.data.next_6_hours?.details?.precipitation_amount ?? 0;
      if (forecast.data.instant.details?.wind_speed) {
        wind += forecast.data.instant.details?.wind_speed;
        numberOfWindMeasurements = numberOfWindMeasurements + 1;
      }
    }

    const getSymbols = (symbolHours: { accurate: number; nearest: number }) => {
      const symbolDate = new Date(localDay);
      symbolDate.setHours(symbolHours.accurate);

      const symbol =
        locationForecastIndexed![symbolDate.toISOString()]?.data.next_6_hours
          ?.summary.symbol_code;
      if (symbol) return symbol;

      if (i === 0) {
        const firstTimestampHour = currentTimeLocal.getHours();
        // use floor on hours to get either 1, 7, 13, 19
        const floorHour = Math.floor(firstTimestampHour / 6) * 6 + 1;
        if (symbolHours.accurate == floorHour) {
          return locationForecastIndexed![
            firstTimeseriesDateLocal.toISOString()
          ].data.next_1_hours?.summary.symbol_code;
        }
      }
      const nearestSymbolDate = new Date(localDay);
      nearestSymbolDate.setHours(symbolHours.nearest);
      return locationForecastIndexed![nearestSymbolDate.toISOString()]?.data
        .next_6_hours?.summary.symbol_code;
    };

    weatherDays.push({
      night: getSymbols(symbolHours.night),
      day: getSymbols(symbolHours.day),
      noon: getSymbols(symbolHours.noon),
      evening: getSymbols(symbolHours.evening),
      date: localDay,
      temperatureMax: Math.round(temperatureMax),
      temperatureMin: Math.round(temperatureMin),
      precipitation: Math.ceil(precipitation * 10) / 10,
      wind: wind / numberOfWindMeasurements,
      weatherHours: weatherHours,
    });
  }

  return <WeatherWidgetView lang={lang} weatherDays={weatherDays} />;
};
