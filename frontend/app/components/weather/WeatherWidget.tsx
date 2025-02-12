import { weatherClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { WeatherWidgetView } from './WeatherWidgetView';
import {
  getMutadedWeatherForecast,
  WeatherDayForecast,
} from './WeatherForecastActions';

type WeatherWidgetProps = {
  sitePromise: ReturnType<typeof getSiteForUser>;
  lang: string;
  locationForecastPromise: ReturnType<typeof weatherClient.getLocationForecast>;
};

export const WeatherWidget = async ({
  sitePromise,
  lang,
  locationForecastPromise,
}: WeatherWidgetProps) => {
  const site = await sitePromise;

  if (!site) {
    throw new Error('Site not found');
  }

  const locationForecast = await locationForecastPromise;

  const weatherForecast: WeatherDayForecast[] = await getMutadedWeatherForecast(
    site,
    lang,
    locationForecast
  );

  return (
    <WeatherWidgetView lang={lang} weatherDaysForecast={weatherForecast} />
  );
};
