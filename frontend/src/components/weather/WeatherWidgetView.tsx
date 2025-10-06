'use client';

import { Typography } from '@mui/material';
import { useState } from 'react';
import { WeatherForecastModal } from './WeatherForecastModal';
import { WeatherDayForecast } from './WeatherForecastActions';
import { WeatherForecastCard } from './WeatherForecastCard';
import { Dict } from '@/utils/dictionaries';

type WeatherWidgetViewProps = {
  dict: Dict;
  weatherDaysForecast: WeatherDayForecast[];
};

export const WeatherWidgetView = ({
  dict,
  weatherDaysForecast: weatherDays,
}: WeatherWidgetViewProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(0);

  return (
    <>
      {weatherDays && weatherDays.length > 0 ? (
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
      ) : (
        <Typography>Could not retrieve data</Typography>
      )}
      {weatherDays && weatherDays.length > 0 && (
        <WeatherForecastModal
          dict={dict}
          open={open}
          dayIndex={selectedDate}
          handleClose={() => setOpen(!open)}
          weatherDaysForecast={weatherDays}
          handleNext={(index) => setSelectedDate(index)}
        />
      )}
    </>
  );
};
