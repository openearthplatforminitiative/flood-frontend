'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { WeatherForecast } from './WeatherForecastRows';
import { useState } from 'react';
import { WeatherForecastModal } from './WeatherForecastModal';
import { WeatherDay } from './WeatherWidget';
import { WeatherForecastCard } from './WeatherForecastCard';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';

type WeatherWidgetProps = {
  lang: string;
  weatherDays: WeatherDay[];
};

export const WeatherWidgetView = ({
  lang,
  weatherDays,
}: WeatherWidgetProps) => {
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
              <TableCell>{dict.sites.weather.night}</TableCell>
              <TableCell>{dict.sites.weather.day}</TableCell>
              <TableCell>{dict.sites.weather.noon}</TableCell>
              <TableCell>{dict.sites.weather.evening}</TableCell>
              <TableCell>{dict.sites.weather.temperatureMaxMin}</TableCell>
              <TableCell>{dict.sites.weather.precipitation}</TableCell>
              <TableCell>{dict.sites.weather.wind}</TableCell>
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
                  <WeatherForecast
                    key={index}
                    lang={lang}
                    dayIndex={index}
                    weather={Weather}
                  />
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
                lang={lang}
                dayIndex={index}
                weather={weather}
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
        weatherDays={weatherDays}
        handleNext={(index) => setSelectedDate(index)}
      />
    </>
  );
};
