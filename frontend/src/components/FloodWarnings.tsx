import FloodWarningBox from '@/components/FloodWarningBox';
import { floodClient } from '@/lib/openepi-clients';
import { getUserId } from '@/lib/auth-utils';
import { getUserIncludingSites } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';
import { Dict } from '@/utils/dictionaries';

type FloodWarningsProps = {
  dict: Dict;
};

export const FloodWarnings = async ({ dict }: FloodWarningsProps) => {
  const userId = await getUserId();
  if (!userId) redirect('/');

  const user = await getUserIncludingSites(userId);
  if (!user) redirect('/');

  const floodSummaries = await Promise.all(
    user.sites.map((site) =>
      floodClient.getSummaryForecast({
        lat: site.lat,
        lon: site.lng,
      })
    )
  );

  const floodProperties = floodSummaries.map((summary) => {
    return summary.data?.queried_location.features[0]?.properties;
  });

  const noFloodWarnings = floodProperties.every(
    (properties) => properties === undefined || properties.intensity === 'G'
  );

  if (noFloodWarnings) {
    return <FloodWarningBox dict={dict} intensity="G" />;
  } else {
    return (
      <Box className="w-full md:w-fit flex flex-col lg:flex-row gap-2 lg:gap-4 lg:flex-wrap">
        {floodProperties.map((properties, index) => {
          if (!properties || properties.intensity === 'G') return null;
          return (
            <FloodWarningBox
              key={user.sites[index].id}
              dict={dict}
              intensity={properties.intensity}
              timing={properties.peak_timing}
              siteName={user.sites[index].name}
            />
          );
        })}
      </Box>
    );
  }
};
