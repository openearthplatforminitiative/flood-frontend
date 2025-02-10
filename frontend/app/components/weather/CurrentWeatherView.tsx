'use client';

import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowDownward } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Image from 'next/image';

type CurrentWeatherViewProps = {
  lang: string;
  currentWeather: any;
};

export const CurrentWeatherView = ({
  lang,
  currentWeather,
}: CurrentWeatherViewProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  const nextHourWeather = currentWeather?.next_1_hours;
  const weatherSymbolCode = currentWeather?.next_1_hours.summary?.symbol_code;

  const temperature = Math.round(
    currentWeather.instant.details?.air_temperature!
  );
  const wind = Math.round(currentWeather.instant.details?.wind_speed) + 'm/s';
  const windDirection = currentWeather.instant.details?.wind_from_direction;
  const precipitation = nextHourWeather.details.precipitation_amount
    ? `${nextHourWeather.details.precipitation_amount}mm`
    : '0.0mm';

  const labelStyle = {
    fontSize: '0.75rem',
    color: '#414942',
    marginBottom: '0.5rem',
  };
  return (
    <div className="flex-1 flex flex-row lg:flex-col items-center justify-start lg:items-start bg-neutral-95 rounded-xl p-4 lg:p-6 gap-4 lg:gap-6">
      <div className="flex lg:hidden">
        {weatherSymbolCode && (
          <Image
            width={50}
            height={50}
            alt={weatherSymbolCode}
            src={require(
              `@/public/assets/images/weather-icons/${weatherSymbolCode}.svg`
            )}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="h4">
          {dict.sites.weather.currentWeather}
        </Typography>
        <div className=" hidden lg:flex gap-4 items-center">
          {weatherSymbolCode && (
            <Image
              width={50}
              height={50}
              alt={weatherSymbolCode}
              src={require(
                `@/public/assets/images/weather-icons/${weatherSymbolCode}.svg`
              )}
            />
          )}
          <span
            className={`text-5xl ${temperature > 0 ? 'text-red-800' : 'text-blue-800'}`}
          >
            {temperature}°C
          </span>
        </div>
        <div className="flex gap-4">
          <div className="lg:hidden">
            <Typography
              variant="body1"
              className={temperature > 0 ? 'text-red-800' : 'text-blue-800'}
            >
              {temperature}°C
            </Typography>
          </div>
          <div>
            <Typography sx={labelStyle} className="hidden lg:flex">
              {dict.sites.weather.precipitation}
            </Typography>
            <Typography className=" text-blue-800" variant="body1">
              {precipitation}
            </Typography>
          </div>
          <div>
            <Typography sx={labelStyle} className="hidden lg:flex">
              {dict.sites.weather.wind}
            </Typography>
            <Typography variant="body1" className="flex items-center">
              {wind}
              <ArrowDownward
                sx={{
                  rotate: `${windDirection}deg`,
                }}
              />
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
