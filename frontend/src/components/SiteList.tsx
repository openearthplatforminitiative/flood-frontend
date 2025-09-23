'use client';

import SiteListItem from '@/components/SiteListItem';
import { intensityToColors } from '@/utils/intensityToColors';
import { floodIntensityRatingMap } from '@/lib/openepi-clients';
import { Warning } from '@mui/icons-material';
import { List, Skeleton } from '@mui/material';
import { useSitesMap } from '@/components/map/SitesMapProvider';
import { Dict } from '@/utils/dictionaries';

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

export const SiteList = ({ dict }: SiteListProps) => {
  const { sites } = useSitesMap();

  return (
    <List>
      {sites.map((site) => {
        let icon;
        const intensity = site.floodIntensity;
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
