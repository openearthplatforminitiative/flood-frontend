'use client';

import { ArrowForward } from '@mui/icons-material';
import { TableRow, TableCell, Typography } from '@mui/material';
import Image from 'next/image';
import { WeatherDay } from './WeatherWidget';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { getDayOfWeek } from '@/app/helpers/timestampToLocalDate';

export type WeatherProps = {
  weather: WeatherDay;
  lang: string;
  dayIndex: number;
};

export const WeatherForecast = ({ weather, dayIndex, lang }: WeatherProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  const dateFormatted = (date: Date) => {
    if (dayIndex === 0) {
      return dict.time.today + ' ' + date.toLocaleDateString();
    } else {
      return getDayOfWeek(date, lang) + ' ' + date.toLocaleDateString();
    }
  };

  const availableSymbol =
    weather.noon || weather.day || weather.night || weather.evening;
  return (
    <>
      <TableCell>
        <Typography>{dateFormatted(weather.date)}</Typography>
      </TableCell>
      <TableCell>
        {weather.night && (
          <Image
            width={50}
            height={50}
            alt={weather.night}
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
            src={require(
              `@/public/assets/images/weather-icons/${weather.evening}.svg`
            )}
          />
        )}
      </TableCell>
      <TableCell>
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
      <TableCell>
        {weather.precipitation > 0 && (
          <Typography className="text-blue-800">
            {weather.precipitation}mm
          </Typography>
        )}
      </TableCell>
      <TableCell>
        <Typography>{weather.wind.toFixed(0)}m/s</Typography>
      </TableCell>
      <TableCell>
        <ArrowForward />
      </TableCell>
    </>
  );
};
