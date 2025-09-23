'use client';

import { Typography } from '@mui/material';
import { useState } from 'react';
import { WeatherForecastModal } from './WeatherForecastModal';
import { Dict, getDictionaryWithDefault } from '@/utils/dictionaries';
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
  const dict: Dict = getDictionaryWithDefault(lang);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-3xl">{dict.sites.weather.weatherForecast}</h2>
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
      </div>
      {weatherDays && weatherDays.length > 0 && (
        <WeatherForecastModal
          lang={lang}
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
