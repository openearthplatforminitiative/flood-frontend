'use client';

import { createRef } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre';
import { sentinelStyleGl } from '@/utils/sentinelStyleGl';
import { useSitesMap } from '@/app/[lang]/(main)/sites/SitesMapProvider';
import { SitesMapAddLayer } from '@/app/[lang]/(main)/sites/SitesMapAddLayer';
import { SitesMapEditLayer } from '@/app/[lang]/(main)/sites/SitesMapEditLayer';
import { SiteMarkers } from '@/app/[lang]/(main)/sites/SitesMapSitesLayer';
import { SiteMapNavigation } from '@/app/[lang]/(main)/sites/SitesMapNavigation';
import { Site } from '@prisma/client';

type SiteMapProps = {
  mode: 'add' | 'edit';
};

const SiteMap = ({ mode }: SiteMapProps) => {
  const lang = 'en';

  const mapRef = createRef<MapRef>();
  const { currentSite, sites, mapStyle } = useSitesMap()!;

  return (
    <Map
      attributionControl={false}
      mapStyle={
        mapStyle === 'streets'
          ? 'https://tiles.openfreemap.org/styles/liberty'
          : sentinelStyleGl
      }
      ref={mapRef}
    >
      {mode === 'add' && <SitesMapAddLayer />}
      {mode === 'edit' && <SitesMapEditLayer />}
      {SiteMarkers(lang, sites, mode, currentSite)}
      <SiteMapNavigation currentPage={mode} />
    </Map>
  );
};

export default SiteMap;
