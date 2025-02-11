'use client';

import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';
import { WeatherDay } from './WeatherWidget';
import { Typography } from '@mui/material';

export type WeatherProps = {
  weather: WeatherDay;
  onClick: () => void;
};

export const WeatherForecastCard = ({ weather, onClick }: WeatherProps) => {
  const availableSymbol =
    weather.noon || weather.day || weather.night || weather.evening;
  return (
    <div
      className="flex flex-row justify-between items-center bg-neutral-95 rounded-xl p-4 peer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">{weather.formatted}</h2>
        <div className="flex gap-4 items-center">
          <div className=" hidden lg:flex gap-4 items-center">
            {availableSymbol && (
              <Image
                width={50}
                height={50}
                alt={availableSymbol}
                src={require(
                  `@/public/assets/images/weather-icons/${availableSymbol}.svg`
                )}
              />
            )}
          </div>
          <span className="flex items-center gap-2 flex-wrap">
            <Typography
              variant="body1"
              className={
                weather.temperatureMax > 0 ? 'text-red-800' : 'text-blue-800'
              }
            >
              {weather.temperatureMax}°C
            </Typography>
            /
            <Typography
              variant="body1"
              className={
                weather.temperatureMin > 0 ? 'text-red-800' : 'text-blue-800'
              }
            >
              {weather.temperatureMin}°C
            </Typography>
          </span>
          {weather.precipitation > 0 && (
            <Typography variant="body1" className="text-blue-800">
              {weather.precipitation}mm
            </Typography>
          )}
          <Typography variant="body1">{Math.round(weather.wind)}m/s</Typography>
        </div>
      </div>
      <span className="peer-hover:translate-x-2 transform transition-transform">
        <ArrowForward />
      </span>
    </div>
  );
};
