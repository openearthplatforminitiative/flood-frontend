import { Button, IconButton, Skeleton, Tooltip } from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { Settings } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { ComponentProps, Suspense } from 'react';
import { WeatherWidget } from '../../../../components/weather/WeatherWidget';
import { FloodWarning } from './FloodWarning';
import { CurrentWeatherWidget } from '../../../../components/weather/CurrentWeatherWidget';
import { SiteInfoWidget } from './SiteInfoWidget';
import { weatherClient } from '@/lib/openepi-clients';
import Header from '@/app/components/Header';
import Link from 'next/link';

interface SitePageProps {
  params: {
    lang: string;
    siteId: string;
  };
}

type HeaderPropsWithoutTitle = Omit<ComponentProps<typeof Header>, 'title'>;

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

  return <Header {...props} title={site.name} />;
};

const Page = ({ params: { lang, siteId } }: SitePageProps) => {
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
      <Suspense fallback={<Header title="" />}>
        <HeaderLoader
          siteId={siteId}
          actions={
            <>
              <div className="text-black lg:hidden">
                <Link href={`/en/sites/${siteId}/edit`}>
                  <Tooltip title={dict.sites.editSite}>
                    <IconButton color="inherit">
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </Link>
              </div>
              <div className="hidden lg:inline">
                <Link href={`/en/sites/${siteId}/edit`}>
                  <Tooltip title={dict.sites.editSite}>
                    <Button variant="contained" endIcon={<Settings />}>
                      {dict.sites.editSite}
                    </Button>
                  </Tooltip>
                </Link>
              </div>
            </>
          }
        />
      </Suspense>
      <div className="px-4 pb-4 lg:px-6 lg:pb-6 bg-neutralVariant-99 flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col lg:flex-row justify-start gap-4 lg:gap-6 items-stretch flex-wrap">
          <div className="w-full min-w-1/2">
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
          </div>
          <div className="w-full min-w-1/2">
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
          </div>
          <div className="w-full min-w-1/2">
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
      </div>
    </div>
  );
};

export default Page;
