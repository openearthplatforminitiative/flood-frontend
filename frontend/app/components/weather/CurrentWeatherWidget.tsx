'use server';

import { getUserId } from '@/lib/auth-utils';
import { weatherClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { Box } from '@mui/material';
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

  // Current weather does not hold all the information we need, so we need to look at the next hour as well
  const currentWeather = response.data?.properties.timeseries[0].data;

  if (currentWeather)
    return <CurrentWeatherView currentWeather={currentWeather} lang={lang} />;
  else {
    return <Box>Could not get current data</Box>;
  }
};
