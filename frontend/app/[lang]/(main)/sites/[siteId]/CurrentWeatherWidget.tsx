'use server';

import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import WeatherIcon from '@/app/components/icons/WeatherIcon';
import { getUserId } from '@/lib/auth-utils';
import { weatherClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { ArrowUpward } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

type WeatherWidgetProps = {
  siteId: string;
  lang: string;
};

export const CurrentWeatherWidget = async ({
  siteId,
  lang,
}: WeatherWidgetProps) => {
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

  const labelStyle = {
    fontSize: '0.75rem',
    color: '#414942',
    marginBottom: '0.5rem',
  };

  if (currentWeather && nextHourWeather && weatherSymbolCode)
    return (
      <Box className="flex-1 flex flex-col justify-start items-start bg-neutral-95 rounded-xl p-2 lg:p-6 gap-4 lg:gap-6">
        <h2 className="text-4xl">Current Weather</h2>
        <Box className="flex gap-4 items-center">
          <Image
            width={50}
            height={50}
            alt={weatherSymbolCode}
            src={require(
              `@/public/assets/images/weather-icons/${weatherSymbolCode}.svg`
            )}
          />
          <Typography
            variant="h2"
            sx={{ fontSize: '5rem' }}
            className="text-4xl text-red-700"
          >
            {currentWeather.details?.air_temperature}°C
          </Typography>
        </Box>
        <Box className="flex gap-4">
          <Box>
            <Typography sx={labelStyle}>
              {dict.sites.weather.precipitation}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: '5rem' }}
              className="text-4xl text-purple-700"
            >
              {nextHourWeather.details.precipitation_amount
                ? `${nextHourWeather.details.precipitation_amount}mm`
                : '0.0mm'}
            </Typography>
          </Box>
          <Box>
            <Typography sx={labelStyle}>
              {dict.sites.weather.precipitation} (m/s)
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: '5rem' }}
              className="text-4xl flex items-center"
            >
              {currentWeather.details?.wind_speed}
              <ArrowUpward
                sx={{
                  rotate: `${currentWeather.details?.wind_from_direction}deg`,
                }}
              />
            </Typography>
          </Box>
        </Box>
        {/* <Typography sx={labelStyle}></Typography>
          <Box className="flex gap-2 w-full justify-end">
            <Box className="w-auto">
              <Typography sx={labelStyle}>
                {dict.sites.weather.temperature}
              </Typography>
            </Box>
            <Box>
              <Typography sx={labelStyle}>{dict.sites.weather.wind}</Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {currentWeather.details?.wind_speed} m/s
              </Typography>
            </Box>
          </Box>
        </Box>
        {nextHourWeather && (
          <Box>
            <Typography sx={labelStyle}>Next Hour</Typography>
            <Weather dict={dict} weather={nextHourWeather} />
          </Box>
        )}
        {nextSixHoursWeather && (
          <Box>
            <Typography sx={labelStyle}>Next Six Hours</Typography>
            <Weather dict={dict} weather={nextSixHoursWeather} />
          </Box>
        )}
        {nextTwelveHoursWeather && (
          <Box>
            <Typography sx={labelStyle}>Next Twelve Hours</Typography>
            <Weather dict={dict} weather={nextTwelveHoursWeather} />
          </Box>
        )} */}
      </Box>
    );
};

type WeatherProps = {
  weather: any;
  dict: Dict;
};

const Weather = ({ weather, dict }: WeatherProps) => {
  const weatherSymbolCode = weather?.summary.symbol_code;
  const { air_temperature_min, air_temperature_max, precipitation_amount } =
    weather.details;

  const labelStyle = {
    fontSize: '0.75rem',
    color: '#414942',
    marginBottom: '0.5rem',
  };

  return (
    <Box className="flex gap-4 lg:gap-6 items-center justify-between">
      <Box>
        <Typography sx={labelStyle}>
          {dict.sites.weather.temperature}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          {air_temperature_min ? `${air_temperature_min}°C` : 'N/A'}{' '}
          {air_temperature_max ? `${air_temperature_max}°C` : 'N/A'}
        </Typography>
      </Box>
      <Box>
        <Typography sx={labelStyle}>
          {dict.sites.weather.precipitation}
        </Typography>
        <Typography sx={{ fontSize: '1rem' }}>
          {precipitation_amount ? `${precipitation_amount} mm` : 'N/A'}
        </Typography>
      </Box>
    </Box>
  );
};
