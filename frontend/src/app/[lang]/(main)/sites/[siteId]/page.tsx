import { Button, IconButton, Skeleton, Tooltip } from '@mui/material';
import { Dict, getDictionaryWithDefault } from '@/utils/dictionaries';
import { Settings } from '@mui/icons-material';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import { FloodWarning } from '@/components/FloodWarning';
import { SiteInfoWidget } from '@/components/SiteInfoWidget';
import { CurrentWeatherWidget } from '@/components/weather/CurrentWeatherWidget';
import { WeatherWidget } from '@/components/weather/WeatherWidget';
import { fetchSite } from '@/actions/SitesAction';
import { Site } from '@prisma/client';

interface SitePageProps {
  params: Promise<{
    lang: string;
    siteId: string;
  }>;
}

const HeaderSkeleton = () => <Header title="" />;

const HeaderContent = async ({
  siteId,
  lang,
  sitePromise,
  dict,
}: {
  siteId: string;
  lang: string;
  sitePromise: Promise<Site>;
  dict: Dict;
}) => {
  const site = await sitePromise;
  return (
    <Header
      title={site.name}
      actions={
        <>
          <div className="text-black lg:hidden">
            <Link href={`/${lang}/sites/${siteId}/edit`}>
              <Tooltip title={dict.sites.editSite}>
                <IconButton color="inherit">
                  <Settings />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
          <div className="hidden lg:inline">
            <Link href={`/${lang}/sites/${siteId}/edit`}>
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
  );
};

const SiteHeader = ({
  siteId,
  lang,
  sitePromise,
  dict,
}: {
  siteId: string;
  lang: string;
  sitePromise: Promise<Site>;
  dict: Dict;
}) => (
  <Suspense fallback={<HeaderSkeleton />}>
    <HeaderContent
      siteId={siteId}
      lang={lang}
      sitePromise={sitePromise}
      dict={dict}
    />
  </Suspense>
);

export default async function Page({ params }: SitePageProps) {
  const { lang, siteId } = await params;
  console.log('siteId', siteId);
  const dict: Dict = getDictionaryWithDefault(lang);
  const sitePromise = fetchSite(siteId);

  return (
    <div className="relative">
      <SiteHeader
        siteId={siteId}
        lang={lang}
        sitePromise={sitePromise}
        dict={dict}
      />
      <div className="px-4 pb-4 lg:px-6 lg:pb-6 bg-neutralvariant-99 flex flex-col gap-4 lg:gap-6">
        <div className="flex flex-col lg:flex-row justify-start gap-4 lg:gap-6 items-stretch flex-wrap">
          <div className="w-full min-w-1/2">
            <SiteInfoWidget sitePromise={sitePromise} dict={dict} />
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
            <CurrentWeatherWidget latLngPromise={sitePromise} lang={lang} />
          </div>
        </div>
        <WeatherWidget lang={lang} dict={dict} latLngPromise={sitePromise} />
      </div>
    </div>
  );
}
