import SiteListItem from '@/app/components/SiteListItem';
import { intensityToColors } from '@/app/helpers/intensityToColors';
import { getUserId } from '@/lib/auth-utils';
import { floodClient, floodIntensityRatingMap } from '@/lib/openepi-clients';
import { getUserIncludingSites } from '@/lib/prisma';
import { Warning } from '@mui/icons-material';
import { List, Skeleton } from '@mui/material';
import { redirect } from 'next/navigation';
import { Dict } from '../../dictionaries';

type SiteListProps = {
  dict: Dict;
};

export const SiteListSkeleton = () => (
  <>
    <Skeleton />
    <Skeleton />
    <Skeleton />
  </>
);

export const SiteList = async ({ dict }: SiteListProps) => {
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

  return (
    <List>
      {user.sites.map((site, index) => {
        let icon;
        if (floodProperties) {
          const intensity = floodProperties[index]?.intensity;
          if (intensity) {
            const floodIntensityRating = floodIntensityRatingMap[intensity];
            if (floodIntensityRating > 0)
              icon = (
                <Warning
                  sx={{
                    background: intensityToColors(intensity).background,
                    color: intensityToColors(intensity).text,
                    padding: '0.25rem',
                    borderRadius: '10rem',
                  }}
                />
              );
          }
        }
        return (
          <SiteListItem
            key={site.id}
            dict={dict}
            href={`sites/${site.id}`}
            site={site}
            isExample={false}
            icon={icon}
          />
        );
      })}
    </List>
  );
};
