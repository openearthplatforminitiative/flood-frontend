import SiteListItem from '@/components/SiteListItem';
import { intensityToColors } from '@/utils/intensityToColors';
import { floodIntensityRatingMap } from '@/lib/openepi-clients';
import { Warning } from '@mui/icons-material';
import { List, Skeleton } from '@mui/material';
import { Dict } from '@/utils/dictionaries';
import { fetchSites } from '@/actions/SitesAction';
import { Suspense } from 'react';
import { LngLatBounds } from 'maplibre-gl';
import { MapFlyTo } from './MapFlyTo';
import { MapFitBounds } from './MapFitBounds';

type SiteListProps = {
  dict: Dict;
};

export function SiteList({ dict }: SiteListProps) {
  return (
    <Suspense fallback={<SiteListSkeleton />}>
      <SiteListContent dict={dict} />
    </Suspense>
  );
}

export function SiteListSkeleton() {
  return (
    <div className="flex flex-col gap-[1px] py-2">
      <Skeleton
        variant="rectangular"
        height={74}
        width={150}
        className="w-full"
      />
      <Skeleton
        variant="rectangular"
        height={74}
        width={150}
        className="w-full"
      />
      <Skeleton
        variant="rectangular"
        height={74}
        width={150}
        className="w-full"
      />
    </div>
  );
}

export async function SiteListContent({ dict }: SiteListProps) {
  const sites = await fetchSites();

  async function computeBounds() {
    const validCoords = sites
      .filter(
        (site) => typeof site.lng === 'number' && typeof site.lat === 'number'
      )
      .map((site) => [site.lng, site.lat] as [number, number]);

    if (validCoords.length === 0) return null;

    const sitesBounds = new LngLatBounds();
    validCoords.forEach((coord) => sitesBounds.extend(coord));
    const sw = sitesBounds.getSouthWest();
    const ne = sitesBounds.getNorthEast();
    return [
      [sw.lng, sw.lat],
      [ne.lng, ne.lat],
    ] as [[number, number], [number, number]];
  }

  const bounds = await computeBounds();

  return (
    <List>
      {bounds ? (
        <MapFitBounds
          maxLat={bounds[1][1]}
          minLat={bounds[0][1]}
          maxLng={bounds[1][0]}
          minLng={bounds[0][0]}
          padding={100}
        />
      ) : (
        <MapFlyTo lat={0} lng={0} zoom={1} />
      )}
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
}
