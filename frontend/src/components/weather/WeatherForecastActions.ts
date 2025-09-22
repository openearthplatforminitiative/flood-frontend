import { weatherClient } from '@/lib/openepi-clients';
import {
  getLocalTime,
  getMetDate,
  getMETHour,
} from '@/helpers/timestampToLocalDate';
import { DateTime } from 'luxon';
import { Dict, getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import { Site } from '@prisma/client';

export type WeatherDayForecast = {
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
  weatherHours: WeatherHourForecast[];
};

export type WeatherHourForecast = {
  from: string;
  formatted: string;
  to?: string;
  symbol?: string;
  temperature?: number;
  precipitation: number;
  wind?: number;
  windDirection?: number;
};

export const getMutadedWeatherForecast = async (
  site: Site,
  lang: string,
  locationForecast: Awaited<
    ReturnType<typeof weatherClient.getLocationForecast>
  >
) => {
  const dict: Dict = getDictionaryWithDefault(lang);
  const timeSeries = locationForecast.data?.properties.timeseries;

  if (!timeSeries || timeSeries.length === 0) {
    console.error('No weather data found');
    return [];
  }

  // Last timeSeries is not containing full information, so we remove it
  timeSeries.pop();

  const currentTimeUTC = DateTime.utc().set({
    minute: 0,
    second: 0,
    millisecond: 0,
  });
  const currentTimeLocal = getLocalTime(currentTimeUTC, [site.lat, site.lng]);
  const lastForecastDate = getLocalTime(
    DateTime.fromISO(timeSeries[timeSeries.length - 1].time),
    [site.lat, site.lng]
  );

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

  const locationForecastIndexed = new Map<string, (typeof timeSeries)[0]>();
  timeSeries.forEach((entry) => {
    const localDate = getLocalTime(DateTime.fromISO(entry.time), [
      site.lat,
      site.lng,
    ]).toISO();
    if (localDate) {
      locationForecastIndexed.set(localDate, entry);
    }
  });

  const weatherDays: WeatherDayForecast[] = [];

  for (
    let localDay = currentTimeLocal;
    localDay <= lastForecastDate;
    localDay = localDay.set({ hour: 0 }).plus({ days: 1 })
  ) {
    const fromDateTime = locationForecastIndexed.get(localDay.toISO()!)
      ? localDay
      : getMetDate(localDay);

    if (!locationForecastIndexed.get(fromDateTime.toISO()!)) {
      continue;
    }

    const toDateTime =
      localDay == currentTimeLocal
        ? localDay.set({ hour: 23 })
        : locationForecastIndexed.get(localDay.set({ hour: 19 }).toISO()!)
          ? localDay.set({ hour: 23 })
          : getMetDate(localDay.set({ hour: 18 }));

    let temperatureMax = -Infinity,
      temperatureMin = Infinity,
      precipitation = 0,
      wind = 0;

    const weatherHours: WeatherHourForecast[] = [];

    // for each hour form getDatesFrom to getDatesTo, access the locationForecastIndexed[date] to get the weather data
    for (
      let hour = fromDateTime;
      hour <= toDateTime;
      hour = hour.plus({ hour: 1 })
    ) {
      const forecast = locationForecastIndexed.get(hour.toISO()!);
      if (!forecast) continue;

      const temp = forecast.data.instant.details?.air_temperature ?? 0;
      temperatureMax = Math.max(temperatureMax, temp);
      temperatureMin = Math.min(temperatureMin, temp);

      precipitation +=
        forecast.data.next_1_hours?.details?.precipitation_amount ?? 0;
      wind = Math.max(wind, forecast.data.instant.details?.wind_speed ?? 0);

      weatherHours.push({
        from: hour.toFormat('HH'),
        formatted:
          hour.toFormat('HH') +
          (!locationForecastIndexed.has(hour.plus({ hours: 1 }).toISO()!)
            ? `-${hour.plus({ hours: 6 }).toFormat('HH')}`
            : ''),
        to: locationForecastIndexed.has(hour.plus({ hours: 1 }).toISO()!)
          ? undefined
          : hour.plus({ hours: 6 }).toISO()!,
        symbol:
          forecast.data.next_1_hours?.summary.symbol_code ??
          forecast.data.next_6_hours?.summary.symbol_code ??
          '',
        temperature: temp ? Math.round(temp) : undefined,
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
    }

    const getSymbols = (symbolHours: { accurate: number; nearest: number }) => {
      const symbolDate = localDay.set({ hour: symbolHours.accurate });

      const symbol = locationForecastIndexed.get(symbolDate.toISO()!)?.data
        .next_6_hours?.summary.symbol_code;
      if (symbol) return symbol;

      if (localDay == currentTimeLocal) {
        const firstTimestampHour = currentTimeLocal.hour;
        // use floor on hours to get either 1, 7, 13, 19
        const floorHour = Math.floor(firstTimestampHour / 6) * 6;
        if (symbolHours.accurate == floorHour) {
          return locationForecastIndexed.get(currentTimeLocal.toISO()!)?.data
            .next_1_hours?.summary.symbol_code;
        }
      }
      const nearestSymbolDate = localDay.set({ hour: symbolHours.nearest });
      return locationForecastIndexed.get(nearestSymbolDate.toISO()!)?.data
        .next_6_hours?.summary.symbol_code;
    };

    const dateTimeFormatted = (date: DateTime) => {
      const localeDate = date.setLocale(lang);
      return localDay == currentTimeLocal
        ? `${dict.time.today} ${localeDate.toFormat('dd LLLL')}`
        : localeDate.toFormat('cccc dd LLLL');
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

  return weatherDays;
};
