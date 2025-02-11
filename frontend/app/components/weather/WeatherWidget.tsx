import { weatherClient } from '@/lib/openepi-clients';
import {
  getLocalTime,
  getMetDate,
  getMETHour,
} from '@/app/helpers/timestampToLocalDate';
import { getSiteForUser } from '@/lib/prisma';
import { WeatherForecast } from './WeatherForecastRows';
import { WeatherWidgetView } from './WeatherWidgetView';
import { DateTime } from 'luxon';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';

type WeatherWidgetProps = {
  sitePromise: ReturnType<typeof getSiteForUser>;
  lang: string;
  locationForecastPromise: ReturnType<typeof weatherClient.getLocationForecast>;
};

export type WeatherDay = {
  date: Date;
  formatted: string;
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
  from: string;
  formatted: string;
  to?: string;
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
  locationForecast.data?.properties.timeseries.pop();

  const currentTimeUTC = DateTime.utc().set({
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const currentTimeLocal = getLocalTime(currentTimeUTC, [site.lat, site.lng]);

  const symbolHours = {
    night: {
      accurate: 0,
      nearest: getMETHour(currentTimeLocal, 0),
    },
    day: {
      accurate: 6,
      nearest: getMETHour(currentTimeLocal, 6),
    },
    noon: {
      accurate: 12,
      nearest: getMETHour(currentTimeLocal, 12),
    },
    evening: {
      accurate: 18,
      nearest: getMETHour(currentTimeLocal, 18),
    },
  };

  const locationForecastIndexed =
    locationForecast.data?.properties.timeseries.reduce<
      Record<string, (typeof locationForecast.data.properties.timeseries)[0]>
    >((acc, curr) => {
      const newCurr = {
        ...curr,
        localDate: getLocalTime(DateTime.fromISO(curr.time), [
          site.lat,
          site.lng,
        ]),
      };
      acc[newCurr.localDate.toISO()!] = newCurr;
      return acc;
    }, {});

  const weatherDays: WeatherDay[] = [];

  const days = 10;
  for (let i = 0; i < days; i++) {
    const localDay = currentTimeLocal
      .set({
        hour: 0,
      })
      .plus({ days: i });

    const fromDateTime =
      i === 0
        ? currentTimeLocal
        : locationForecastIndexed![localDay.toISO()!]
          ? localDay
          : getMetDate(localDay);

    if (!locationForecastIndexed![fromDateTime.toISO()!]) {
      continue;
    }

    const toDateTime =
      i === 0
        ? currentTimeLocal.set({ hour: 23 })
        : locationForecastIndexed![localDay.set({ hour: 19 }).toISO()!]
          ? localDay.set({ hour: 23 })
          : getMetDate(localDay.set({ hour: 18 }));

    let temperatureMax = -1000,
      temperatureMin = 1000,
      precipitation = 0,
      wind = 0;

    let weatherHours: WeatherForecast[] = [];

    // for each hour form getDatesFrom to getDatesTo, access the locationForecastIndexed[date] to get the weather data
    for (let i = 0; localDay.plus({ hour: i }) <= toDateTime; i++) {
      const hour = fromDateTime.plus({ hour: i });

      const forecast = locationForecastIndexed![hour.toISO()!];
      if (!forecast) continue;

      weatherHours.push({
        from: hour.toFormat('HH'),
        formatted:
          hour.toFormat('HH') +
          (!locationForecastIndexed![hour.plus({ hour: 1 }).toISO()!]
            ? '-' + hour.plus({ hour: 6 }).toFormat('HH')
            : ''),
        to: locationForecastIndexed![hour.plus({ hour: 1 }).toISO()!]
          ? undefined
          : hour.plus({ hour: 6 }).toISO()!,

        symbol:
          forecast.data.next_1_hours?.summary.symbol_code ??
          forecast.data.next_6_hours?.summary.symbol_code ??
          '',
        temperature: forecast.data.instant.details?.air_temperature
          ? Math.round(forecast.data.instant.details?.air_temperature)
          : undefined,
        precipitation:
          forecast.data.next_1_hours?.details?.precipitation_amount ??
          forecast.data.next_6_hours?.details?.precipitation_amount ??
          0,
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
      if (
        forecast.data.next_1_hours?.details?.precipitation_amount != undefined
      )
        precipitation +=
          forecast.data.next_1_hours.details.precipitation_amount;
      else
        precipitation +=
          forecast.data.next_6_hours?.details?.precipitation_amount ?? 0;
      wind = Math.max(wind, forecast.data.instant.details?.wind_speed ?? 0);
    }

    const getSymbols = (symbolHours: { accurate: number; nearest: number }) => {
      const symbolDate = localDay.set({ hour: symbolHours.accurate });

      const symbol =
        locationForecastIndexed![symbolDate.toISO()!]?.data.next_6_hours
          ?.summary.symbol_code;
      if (symbol) return symbol;

      if (i === 0) {
        const firstTimestampHour = currentTimeLocal.hour;
        // use floor on hours to get either 1, 7, 13, 19
        const floorHour = Math.floor(firstTimestampHour / 6) * 6;
        if (symbolHours.accurate == floorHour) {
          return locationForecastIndexed![currentTimeLocal.toISO()!].data
            .next_1_hours?.summary.symbol_code;
        }
      }
      const nearestSymbolDate = localDay.set({ hour: symbolHours.nearest });
      return locationForecastIndexed![nearestSymbolDate.toISO()!]?.data
        .next_6_hours?.summary.symbol_code;
    };

    const dateTimeFormatted = (date: DateTime) => {
      const localeDate = date.setLocale(lang);
      if (i === 0) {
        return dict.time.today + ' ' + localeDate.toFormat('dd LLLL');
      } else {
        return localeDate.toFormat('cccc dd LLLL');
      }
    };

    weatherDays.push({
      night: getSymbols(symbolHours.night),
      day: getSymbols(symbolHours.day),
      noon: getSymbols(symbolHours.noon),
      evening: getSymbols(symbolHours.evening),
      date: localDay.toJSDate(),
      formatted: dateTimeFormatted(localDay),
      temperatureMax: Math.round(temperatureMax),
      temperatureMin: Math.round(temperatureMin),
      precipitation: Math.ceil(precipitation * 10) / 10,
      wind: Math.round(wind),
      weatherHours: weatherHours,
    });
  }

  return <WeatherWidgetView lang={lang} weatherDays={weatherDays} />;
};
