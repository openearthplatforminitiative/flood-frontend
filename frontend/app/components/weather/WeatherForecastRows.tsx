'use client';

import { ArrowForward } from '@mui/icons-material';
import { TableCell, Typography } from '@mui/material';
import Image from 'next/image';
import { WeatherDayForecast } from './WeatherForecastActions';

export type WeatherForecastRowsProps = {
  weatherDay: WeatherDayForecast;
};

export const WeatherForecastRows = ({
  weatherDay,
}: WeatherForecastRowsProps) => {
  return (
    <>
      <TableCell>
        <Typography>{weatherDay.formatted}</Typography>
      </TableCell>
      <TableCell>
        {weatherDay.night && (
          <Image
            width={50}
            height={50}
            alt={weatherDay.night}
            className="mx-auto"
            src={`/assets/images/weather-icons/${weatherDay.night}.svg`}
          />
        )}
      </TableCell>
      <TableCell>
        {weatherDay.day && (
          <Image
            width={50}
            height={50}
            alt={weatherDay.day}
            className="mx-auto"
            src={`/assets/images/weather-icons/${weatherDay.day}.svg`}
          />
        )}
      </TableCell>
      <TableCell>
        {weatherDay.noon && (
          <Image
            width={50}
            height={50}
            alt={weatherDay.noon}
            className="mx-auto"
            src={`/assets/images/weather-icons/${weatherDay.noon}.svg`}
          />
        )}
      </TableCell>
      <TableCell>
        {weatherDay.evening && (
          <Image
            width={50}
            height={50}
            alt={weatherDay.evening}
            className="mx-auto"
            src={`/assets/images/weather-icons/${weatherDay.evening}.svg`}
          />
        )}
      </TableCell>
      <TableCell align="right">
        <Typography>
          <span
            className={
              weatherDay.temperatureMax > 0 ? 'text-red-800' : 'text-blue-800'
            }
          >
            {weatherDay.temperatureMax}°C
          </span>{' '}
          /{' '}
          <span
            className={
              weatherDay.temperatureMin > 0 ? 'text-red-800' : 'text-blue-800'
            }
          >
            {weatherDay.temperatureMin}°C
          </span>
        </Typography>
      </TableCell>
      <TableCell align="right">
        {weatherDay.precipitation > 0 && (
          <Typography className="text-blue-800">
            {weatherDay.precipitation}mm
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        <Typography>{weatherDay.wind.toFixed(0)}m/s</Typography>
      </TableCell>
      <TableCell align="right">
        <ArrowForward />
      </TableCell>
    </>
  );
};
