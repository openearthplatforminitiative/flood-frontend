import { IconButton, Link, Skeleton, Tooltip } from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { Settings } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { ComponentProps, Suspense } from 'react';
import { WeatherWidget } from '../../../../components/weather/WeatherWidget';
import { MapLoader } from './MapLoader';
import { FloodWarning } from './FloodWarning';
import { CurrentWeatherWidget } from '../../../../components/weather/CurrentWeatherWidget';
import { SiteInfoWidget } from './SiteInfoWidget';
import { weatherClient } from '@/lib/openepi-clients';
import SiteHeader from '@/app/components/SiteHeader';

interface EditSitePageProps {
  params: {
    lang: string;
    siteId: string;
  };
}

type HeaderPropsWithoutTitle = Omit<ComponentProps<typeof SiteHeader>, 'title'>;

// Usage example
const HeaderLoader = async ({
  siteId,
  ...props
}: { siteId: string } & HeaderPropsWithoutTitle) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  return <SiteHeader {...props} title={site.name} />;
};

const EditSitePage = ({ params: { lang, siteId } }: EditSitePageProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  const getSite = async (
    userIdPromise: ReturnType<typeof getUserId>,
    siteId: string
  ) => {
    const userId = await userIdPromise;
    if (!userId) {
      throw new Error('User not found');
    }
    const site = await getSiteForUser(userId, siteId);
    if (!site) {
      throw new Error('Site not found');
    }
    return site;
  };

  const getLocationForecast = async (
    site: Promise<{ lat: number; lng: number }>
  ) => {
    const awaitedSite = await site;
    return await weatherClient.getLocationForecast({
      lat: awaitedSite.lat,
      lon: awaitedSite.lng,
    });
  };

  const userId = getUserId();
  const site = getSite(userId, siteId);
  const locationForecast = getLocationForecast(site);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-96 -z-50">
        <MapLoader siteId={siteId} />
      </div>
      <div>
        <Suspense fallback={<SiteHeader title="" />}>
          <HeaderLoader
            siteId={siteId}
            actions={
              <Link href={`/${lang}/sites/${siteId}/edit`}>
                <Tooltip title={dict.sites.editSite}>
                  <IconButton>
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Link>
            }
          />
        </Suspense>
      </div>
      <div className="relative px-4 pb-4 lg:px-6 lg:pb-6 mt-80">
        <div className="flex flex-col lg:flex-row justify-start gap-5 items-stretch flex-wrap mb-5">
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                sx={{ display: 'flex', height: 'auto' }}
                className="flex-1 flex h-full rounded-xl"
              />
            }
          >
            <SiteInfoWidget siteId={siteId} lang={lang} />
          </Suspense>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                sx={{ display: 'flex', height: 'auto' }}
                className="flex-1 flex h-full rounded-xl"
              />
            }
          >
            <FloodWarning siteId={siteId} lang={lang} />
          </Suspense>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                sx={{ display: 'flex', height: 'auto' }}
                className="flex-1 flex h-full rounded-xl"
              />
            }
          >
            <CurrentWeatherWidget siteId={siteId} lang={lang} />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{ display: 'flex' }}
              className="flex-1 flex rounded-xl"
            />
          }
        >
          <WeatherWidget
            sitePromise={site}
            lang={lang}
            locationForecastPromise={locationForecast}
          />
        </Suspense>
        <div className="absolute bottom-0 left-0 w-full top-16 bg-neutralVariant-99 -z-10 shadow-md"></div>
      </div>
    </div>
  );
};

export default EditSitePage;
