'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { WeatherForecastRows } from './WeatherForecastRows';
import { useState } from 'react';
import { WeatherForecastModal } from './WeatherForecastModal';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { WeatherDayForecast } from './WeatherForecastActions';
import { WeatherForecastCard } from './WeatherForecastCard';

type WeatherWidgetViewProps = {
  lang: string;
  weatherDaysForecast: WeatherDayForecast[];
};

export const WeatherWidgetView = ({
  lang,
  weatherDaysForecast: weatherDays,
}: WeatherWidgetViewProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(0);

  return (
    <>
      <div className="hidden lg:flex flex-col justify-start items-start bg-neutral-95 rounded-xl p-4 md:p-6 gap-4 lg:gap-6">
        <h2 className="text-4xl">{dict.sites.weather.weatherForecast}</h2>
        <Table
          className="-mx-4 md:-mx-6 w-inherit"
          sx={{ width: '-webkit-fill-available' }}
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">{dict.sites.weather.night}</TableCell>
              <TableCell align="center">{dict.sites.weather.day}</TableCell>
              <TableCell align="center">{dict.sites.weather.noon}</TableCell>
              <TableCell align="center">{dict.sites.weather.evening}</TableCell>
              <TableCell align="right">
                {dict.sites.weather.temperatureMaxMin}
              </TableCell>
              <TableCell align="right">
                {dict.sites.weather.precipitation}
              </TableCell>
              <TableCell align="right">{dict.sites.weather.wind}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weatherDays &&
              weatherDays.map((Weather, index) => (
                <TableRow
                  key={index}
                  hover
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedDate(index);
                    setOpen(true);
                  }}
                >
                  <WeatherForecastRows key={index} weatherDay={Weather} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex lg:hidden flex-col">
        <h2 className="text-3xl">{dict.sites.weather.weatherForecast}</h2>
        {weatherDays && (
          <div className="flex flex-col gap-4 mt-4">
            {weatherDays.map((weather, index) => (
              <WeatherForecastCard
                key={index}
                weatherDay={weather}
                onClick={() => {
                  setSelectedDate(index);
                  setOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <WeatherForecastModal
        lang={lang}
        open={open}
        dayIndex={selectedDate}
        handleClose={() => setOpen(!open)}
        weatherDaysForecast={weatherDays}
        handleNext={(index) => setSelectedDate(index)}
      />
    </>
  );
};
