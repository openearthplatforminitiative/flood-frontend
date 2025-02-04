'use server';

import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import WeatherIcon from '@/app/components/icons/WeatherIcon';
import { getUserId } from '@/lib/auth-utils';
import { weatherClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

type WeatherWidgetProps = {
  siteId: string;
  lang: string;
};

export const WeatherWidget = async ({ siteId, lang }: WeatherWidgetProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  const userId = await getUserId();

  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  const response = await weatherClient.getLocationForecast({
    lat: site.lat,
    lon: site.lng,
  });

  // Current weather does not hold all the information we need, so we need to look at the next hour as well
  const currentWeather = response.data?.properties.timeseries[0].data.instant;
  const nextHourWeather =
    response.data?.properties.timeseries[0].data.next_1_hours;
  const nextSixHoursWeather =
    response.data?.properties.timeseries[0].data?.next_6_hours;
  const nextTwelveHoursWeather =
    response.data?.properties.timeseries[0].data?.next_12_hours;
  const weatherSymbolCode = nextHourWeather?.summary.symbol_code;

  // Sort timeseries by days
  const timeseriesByDay = response.data?.properties.timeseries.reduce<
    Array<{
      day: number;
      timeseries: typeof response.data.properties.timeseries;
    }>
  >((acc, curr) => {
    const date = new Date(curr.time);
    const day = date.getDate();
    const existingDay = acc.find((item) => item.day === day);
    if (existingDay) {
      existingDay.timeseries.push(curr);
    } else {
      acc.push({ day, timeseries: [curr] });
    }
    return acc;
  }, []);

  const labelStyle = {
    fontSize: '0.75rem',
    color: '#414942',
    marginBottom: '0.5rem',
  };

  if (currentWeather && nextHourWeather && weatherSymbolCode)
    return (
      <Box className="flex flex-col justify-start items-start bg-neutral-95 rounded-xl p-2 lg:p-6 gap-4 lg:gap-6">
        <h2 className="text-4xl">Weather Forecast</h2>
        {timeseriesByDay &&
          timeseriesByDay.map((dayWeather, index) => (
            <WeatherByDay key={index} weather={dayWeather} dict={dict} />
          ))}
      </Box>
    );
};

type WeatherProps = {
  weather: any;
  dict: Dict;
};

const WeatherByDay = ({ weather, dict }: WeatherProps) => {
  type WeatherDay = {
    night?: string;
    day?: string;
    afternoon?: string;
    noon?: string;
    temperatureMax: number;
    temperatureMin: number;
    precipitation: number;
    wind: number;
  };

  const getWeatherByHour = (timeseries: any, hour: number) => {
    return timeseries.find((item: any) => {
      const date = new Date(item.time);
      return date.getHours() === hour;
    });
  };

  const getNight = (timeseries: any) => getWeatherByHour(timeseries, 0);
  const getDay = (timeseries: any) => getWeatherByHour(timeseries, 6);
  const getNoon = (timeseries: any) => getWeatherByHour(timeseries, 12);
  const getAfternoon = (timeseries: any) => getWeatherByHour(timeseries, 18);

  const getHighestTemperature = (timeseries: any) => {
    return timeseries.reduce((acc: number, curr: any) => {
      return Math.max(acc, curr.data.instant.details.air_temperature);
    }, 0);
  };

  const getLowestTemperature = (timeseries: any) => {
    return timeseries.reduce((acc: number, curr: any) => {
      return Math.min(acc, curr.data.instant.details.air_temperature);
    }, 1000);
  };

  const medianWind = (timeseries: any) => {
    return (
      timeseries.reduce((acc: number, curr: any) => {
        return acc + curr.data.instant.details.wind_speed;
      }, 0) / timeseries.length
    );
  };

  const medianPrecipitation = (timeseries: any) => {
    return (
      timeseries.reduce((acc: number, curr: any) => {
        return acc + curr.data.next_1_hours?.details.precipitation_amount;
      }, 0) / timeseries.length
    );
  };

  const WeatherDay: WeatherDay = {
    night: getNight(weather.timeseries)?.data.next_6_hours?.summary.symbol_code,
    day: getDay(weather.timeseries)?.data.next_6_hours?.summary.symbol_code,
    noon: getNoon(weather.timeseries)?.data.next_6_hours?.summary.symbol_code,
    afternoon: getAfternoon(weather.timeseries)?.data.next_6_hours?.summary
      .symbol_code,
    temperatureMax: getHighestTemperature(weather.timeseries),
    temperatureMin: getLowestTemperature(weather.timeseries),
    precipitation: medianPrecipitation(weather.timeseries),
    wind: medianWind(weather.timeseries),
  };

  return (
    <Box className="flex gap-4 lg:gap-6 items-center justify-between">
      {WeatherDay.night && (
        <Image
          width={50}
          height={50}
          alt={WeatherDay.night}
          src={require(
            `@/public/assets/images/weather-icons/${WeatherDay.night}.svg`
          )}
        />
      )}
      {WeatherDay.day && (
        <Image
          width={50}
          height={50}
          alt={WeatherDay.day}
          src={require(
            `@/public/assets/images/weather-icons/${WeatherDay.day}.svg`
          )}
        />
      )}
      {WeatherDay.afternoon && (
        <Image
          width={50}
          height={50}
          alt={WeatherDay.afternoon}
          src={require(
            `@/public/assets/images/weather-icons/${WeatherDay.afternoon}.svg`
          )}
        />
      )}
      {WeatherDay.noon && (
        <Image
          width={50}
          height={50}
          alt={WeatherDay.noon}
          src={require(
            `@/public/assets/images/weather-icons/${WeatherDay.noon}.svg`
          )}
        />
      )}
      {WeatherDay.temperatureMax}°C
      {WeatherDay.temperatureMin}°C
      {WeatherDay.precipitation}mm
      {WeatherDay.wind.toFixed(0)}m/s
    </Box>
  );
};
