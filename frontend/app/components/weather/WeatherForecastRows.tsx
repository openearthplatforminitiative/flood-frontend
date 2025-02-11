'use client';

import { ArrowForward } from '@mui/icons-material';
import { TableCell, Typography } from '@mui/material';
import Image from 'next/image';
import { WeatherDay } from './WeatherWidget';

export type WeatherProps = {
  weather: WeatherDay;
};

export const WeatherForecast = ({ weather }: WeatherProps) => {
  return (
    <>
      <TableCell>
        <Typography>{weather.formatted}</Typography>
      </TableCell>
      <TableCell>
        {weather.night && (
          <Image
            width={50}
            height={50}
            alt={weather.night}
            className="mx-auto"
            src={require(
              `@/public/assets/images/weather-icons/${weather.night}.svg`
            )}
          />
        )}
      </TableCell>
      <TableCell>
        {weather.day && (
          <Image
            width={50}
            height={50}
            alt={weather.day}
            className="mx-auto"
            src={require(
              `@/public/assets/images/weather-icons/${weather.day}.svg`
            )}
          />
        )}
      </TableCell>
      <TableCell>
        {weather.noon && (
          <Image
            width={50}
            height={50}
            alt={weather.noon}
            className="mx-auto"
            src={require(
              `@/public/assets/images/weather-icons/${weather.noon}.svg`
            )}
          />
        )}
      </TableCell>
      <TableCell>
        {weather.evening && (
          <Image
            width={50}
            height={50}
            alt={weather.evening}
            className="mx-auto"
            src={require(
              `@/public/assets/images/weather-icons/${weather.evening}.svg`
            )}
          />
        )}
      </TableCell>
      <TableCell align="right">
        <Typography>
          <span
            className={
              weather.temperatureMax > 0 ? 'text-red-800' : 'text-blue-800'
            }
          >
            {weather.temperatureMax}°C
          </span>{' '}
          /{' '}
          <span
            className={
              weather.temperatureMin > 0 ? 'text-red-800' : 'text-blue-800'
            }
          >
            {weather.temperatureMin}°C
          </span>
        </Typography>
      </TableCell>
      <TableCell align="right">
        {weather.precipitation > 0 && (
          <Typography className="text-blue-800">
            {weather.precipitation}mm
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        <Typography>{weather.wind.toFixed(0)}m/s</Typography>
      </TableCell>
      <TableCell align="right">
        <ArrowForward />
      </TableCell>
    </>
  );
};
