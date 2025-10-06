'use client';

import { createRef } from 'react';
import Map, { MapRef } from 'react-map-gl/maplibre';
import { sentinelStyleGl } from '@/utils/sentinelStyleGl';
import { SitesMapAddLayer } from '../map/SitesMapAddLayer';
import { SitesMapEditLayer } from '../map/SitesMapEditLayer';
import { SiteMapNavigation } from '../map/SitesMapNavigation';
import { mapStyleAtom } from '@/store/atoms/mapAtom';
import { useAtomValue } from 'jotai';

type SiteMapProps = {
  mode: 'add' | 'edit';
};

const SiteMap = ({ mode }: SiteMapProps) => {
  const mapRef = createRef<MapRef>();

  const mapStyle = useAtomValue(mapStyleAtom);

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
      <SiteMapNavigation />
    </Map>
  );
};

export default SiteMap;
