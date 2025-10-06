import { weatherClient } from '@/lib/openepi-clients';
import { WeatherWidgetView } from './WeatherWidgetView';
import {
  getMutadedWeatherForecast,
  WeatherDayForecast,
} from './WeatherForecastActions';
import { Suspense } from 'react';
import { Skeleton } from '@mui/material';
import { Dict } from '@/utils/dictionaries';

type WeatherWidgetProps = {
  latLngPromise: Promise<{ lat: number; lng: number }>;
  lang: string;
  dict: Dict;
};

export const WeatherWidget = ({
  latLngPromise,
  lang,
  dict,
}: WeatherWidgetProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-3xl">{dict.sites.weather.weatherForecast}</h2>
      <Suspense fallback={<WeatherWidgetSkeleton />}>
        <WeatherWidgetContent
          latLngPromise={latLngPromise}
          lang={lang}
          dict={dict}
        />
      </Suspense>
    </div>
  );
};

const WeatherWidgetSkeleton = () => (
  <div className="flex flex-col gap-4 mt-4">
    {Array.from({ length: 9 }).map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        height={137}
        width={400}
        className="w-full flex rounded-xl"
      />
    ))}
  </div>
);

const WeatherWidgetContent = async ({
  lang,
  dict,
  latLngPromise,
}: WeatherWidgetProps) => {
  const { lat, lng: lon } = await latLngPromise;

  const locationForecast = await weatherClient.getLocationForecast({
    lat,
    lon,
  });

  const weatherDaysForecast: WeatherDayForecast[] =
    await getMutadedWeatherForecast(lat, lon, lang, locationForecast);

  return (
    <WeatherWidgetView dict={dict} weatherDaysForecast={weatherDaysForecast} />
  );
};
