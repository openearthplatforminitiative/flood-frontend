'use client';

import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { WeatherDayForecast } from './WeatherForecastActions';

export type WeatherForecastCardProps = {
  weatherDay: WeatherDayForecast;
  onClick: () => void;
};

export const WeatherForecastCard = ({
  weatherDay,
  onClick,
}: WeatherForecastCardProps) => {
  const availableSymbol =
    weatherDay.noon || weatherDay.day || weatherDay.night || weatherDay.evening;
  return (
    <div
      className="flex flex-row justify-between items-center bg-neutral-95 rounded-xl p-4 peer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">{weatherDay.formatted}</h2>
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
                weatherDay.temperatureMax > 0 ? 'text-red-800' : 'text-blue-800'
              }
            >
              {weatherDay.temperatureMax}°C
            </Typography>
            /
            <Typography
              variant="body1"
              className={
                weatherDay.temperatureMin > 0 ? 'text-red-800' : 'text-blue-800'
              }
            >
              {weatherDay.temperatureMin}°C
            </Typography>
          </span>
          {weatherDay.precipitation > 0 && (
            <Typography variant="body1" className="text-blue-800">
              {weatherDay.precipitation}mm
            </Typography>
          )}
          <Typography variant="body1">
            {Math.round(weatherDay.wind)}m/s
          </Typography>
        </div>
      </div>
      <span className="peer-hover:translate-x-2 transform transition-transform">
        <ArrowForward />
      </span>
    </div>
  );
};
