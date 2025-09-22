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
  const symbol = (weather?: string) => {
    if (weather) {
      return (
        <Image
          width={40}
          height={40}
          alt={weather}
          src={`/assets/images/weather-icons/${weather}.svg`}
        />
      );
    } else {
      return <div className="size-[40px] overflow-hidden" />;
    }
  };
  return (
    <div
      className="flex flex-row justify-between items-center bg-neutral-95 hover:bg-neutral-90 cursor-pointer rounded-xl gap-4 p-4 peer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">{weatherDay.formatted}</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 flex-wrap min-w-[13ch]">
              <Typography
                variant="body1"
                className={
                  weatherDay.temperatureMax > 0
                    ? 'text-red-800'
                    : 'text-blue-800'
                }
              >
                {weatherDay.temperatureMax}°C
              </Typography>
              /
              <Typography
                variant="body1"
                className={
                  weatherDay.temperatureMin > 0
                    ? 'text-red-800'
                    : 'text-blue-800'
                }
              >
                {weatherDay.temperatureMin}°C
              </Typography>
            </span>
            <div className="flex gap-4 items-center min-w-[14ch]">
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
          <div className="hidden sm:flex gap-4 items-center flex-wrap">
            {symbol(weatherDay.night)}
            {symbol(weatherDay.day)}
            {symbol(weatherDay.noon)}
            {symbol(weatherDay.evening)}
          </div>
          <div className="flex sm:hidden">
            {availableSymbol && (
              <Image
                width={40}
                height={40}
                alt={availableSymbol}
                src={`/assets/images/weather-icons/${availableSymbol}.svg`}
              />
            )}
          </div>
        </div>
      </div>
      <span className="peer-hover:translate-x-2 transform transition-transform">
        <ArrowForward />
      </span>
    </div>
  );
};
