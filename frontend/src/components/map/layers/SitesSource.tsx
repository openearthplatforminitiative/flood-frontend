import { fetchSites } from '@/actions/SitesAction';
import { SITES_UPDATED_EVENT } from '@/utils/events';
import { Site } from '@prisma/client';
import {
  useParams,
  useSelectedLayoutSegments,
} from 'next/dist/client/components/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Source } from 'react-map-gl/maplibre';

export const SitesSource = () => {
  const [sites, setSites] = useState<Site[]>([]);

  const { siteId } = useParams<{ siteId?: string }>();

  const segments = useSelectedLayoutSegments();

  useEffect(() => {
    const getSites = async () => {
      try {
        const response = await fetchSites();
        setSites(response);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };
    getSites();

    window.addEventListener(SITES_UPDATED_EVENT, getSites);
    return () => {
      window.removeEventListener(SITES_UPDATED_EVENT, getSites);
    };
  }, []);

  const sitesFeatureCollection: GeoJSON.FeatureCollection = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: sites.map((site) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [site.lng, site.lat],
        },
        properties: {
          id: site.id,
          name: site.name,
          types: site.types,
          isSelected: siteId === site.id,
          isEditable: siteId === site.id && segments.includes('edit'),
        },
      })),
    }),
    [segments, siteId, sites]
  );

  return (
    <Source id="sites" type="geojson" cluster data={sitesFeatureCollection} />
  );
};
