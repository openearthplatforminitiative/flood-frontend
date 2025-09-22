'use server';

import { getUserId } from '@/lib/auth-utils';
import { weatherClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { CurrentWeatherView } from './CurrentWeatherView';

type WeatherWidgetProps = {
  siteId: string;
  lang: string;
};

export const CurrentWeatherWidget = async ({
  siteId,
  lang,
}: WeatherWidgetProps) => {
  const userId = await getUserId();

  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  const response = await weatherClient.getLocationForecast({
    lat: site.lat,
    lon: site.lng,
  });

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
