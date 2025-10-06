import { Dict } from '@/utils/dictionaries';
import { typesRenderer } from '@/lib/render-utils';
import { Box, Skeleton, Typography } from '@mui/material';
import { Suspense } from 'react';
import { Site } from '@prisma/client';
import { MapFlyTo } from './MapFlyTo';

interface SiteInfoWidgetProps {
  dict: Dict;
  sitePromise: Promise<Site> | null;
}

export const SiteInfoWidget = async ({
  sitePromise,
  dict,
}: SiteInfoWidgetProps) => {
  return (
    <div className="flex-1 overflow-hidden bg-neutral-95 rounded-xl lg:gap-6">
      <div className="bg-neutral-90 p-4 md:p-6 w-full flex items-center justify-between">
        <Typography variant="h2">Site Information</Typography>
      </div>

      <Suspense fallback={<SiteInfoSkeleton />}>
        <SiteInfoContent sitePromise={sitePromise} dict={dict} />
      </Suspense>
    </div>
  );
};

const SiteInfoSkeleton = () => (
  <Skeleton variant="rectangular" height={172} className="w-full" />
);

const SiteInfoContent = async ({ sitePromise, dict }: SiteInfoWidgetProps) => {
  const site = await sitePromise;
  if (!site) return null;
  return (
    <div className="flex flex-col justify-start items-start gap-4 p-4 md:p-6">
      <MapFlyTo lng={site.lng} lat={site.lat} zoom={10} />
      <Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: '#414942',
            marginBottom: '0.5rem',
          }}
        >
          {dict.sites.typeOfSite}
        </Typography>
        <Typography variant="body1">
          {typesRenderer(site.types, dict)}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: '#414942',
            marginBottom: '0.5rem',
          }}
        >
          Coordinates
        </Typography>
        <Typography variant="body1">
          {site.lat} {site.lng}
        </Typography>
      </Box>
    </div>
  );
};
