import { weatherClient } from '@/lib/openepi-clients';
import { CurrentWeatherView } from './CurrentWeatherView';
import { Skeleton } from '@mui/material';
import { Suspense } from 'react';

type WeatherWidgetProps = {
  latLngPromise: Promise<{ lat: number; lng: number }>;
  lang: string;
};

export const CurrentWeatherWidget = ({
  latLngPromise,
  lang,
}: WeatherWidgetProps) => (
  <Suspense fallback={<CurrentWeatherViewSkeleton />}>
    <CurrentWeatherViewContent latLngPromise={latLngPromise} lang={lang} />
  </Suspense>
);

const CurrentWeatherViewSkeleton = () => (
  <Skeleton
    variant="rectangular"
    height={200}
    width={400}
    className="w-full h-24 lg:h-52 rounded-xl"
  />
);

const CurrentWeatherViewContent = async ({
  latLngPromise,
  lang,
}: WeatherWidgetProps) => {
  const { lat, lng: lon } = await latLngPromise;
  const response = await weatherClient.getLocationForecast({ lat, lon });

  const currentWeather = response.data?.properties.timeseries[0].data;

  if (currentWeather)
    return <CurrentWeatherView currentWeather={currentWeather} lang={lang} />;
  else {
    return (
      <div className="flex-1 flex flex-row lg:flex-col items-center justify-start lg:items-start bg-neutral-95 rounded-xl p-4 lg:p-6 gap-4 lg:gap-6">
        Could not retrieve data
      </div>
    );
  }
};
