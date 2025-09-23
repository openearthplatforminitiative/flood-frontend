'use client';

import { createRef } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre';
import { sentinelStyleGl } from '@/utils/sentinelStyleGl';
import { SitesMapAddLayer } from '../map/SitesMapAddLayer';
import { SitesMapEditLayer } from '../map/SitesMapEditLayer';
import { SiteMapNavigation } from '../map/SitesMapNavigation';
import { useSitesMap } from '../map/SitesMapProvider';
import { SiteMarkers } from '../map/SitesMapSitesLayer';

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
