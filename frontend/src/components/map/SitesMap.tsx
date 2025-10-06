'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { useMemo, useState } from 'react';
import { LngLat, Map, MapLayerMouseEvent, Popup } from 'react-map-gl/maplibre';
import Link from 'next/link';
import { Button } from '@mui/material';
import { sentinelStyleGl } from '@/utils/sentinelStyleGl';
import { useAtomValue } from 'jotai';
import { mapStyleAtom } from '@/store/atoms/mapAtom';
import { SitesSource } from './layers/SitesSource';
import { SitesLayer } from './layers/SitesLayer';
import { useImageLoader } from './utils/ImageLoader';
import { SitesClusterLayer } from './layers/SitesClusterLayer';
import { SitesMapAddLayer } from './SitesMapAddLayer';
import { SitesMapEditLayer } from './SitesMapEditLayer';
import { SiteMapNavigation } from './SitesMapNavigation';
import 'maplibre-gl/dist/maplibre-gl.css';

type SitesMapProps = {
  lang: string;
};

export const SitesMap = ({ lang }: SitesMapProps) => {
  const segments = useSelectedLayoutSegments();

  const [showPopup, setShowPopup] = useState(false);
  const [popupLngLat, setPopupLngLat] = useState<LngLat | undefined>();

  const mapStyle = useAtomValue(mapStyleAtom);

  useImageLoader();

  const handleContextMenu = (e: MapLayerMouseEvent) => {
    e.preventDefault();
    if (segments.includes('add') || segments.includes('edit')) return;
    setPopupLngLat(e.lngLat);
    setShowPopup(true);
  };

  const mapStyleUrl = useMemo(() =>
    mapStyle === 'streets'
      ? 'https://tiles.openfreemap.org/styles/liberty'
      : sentinelStyleGl,
    [mapStyle]
  );

  return (
    <Map
      id="sites-map"
      attributionControl={false}
      mapStyle={mapStyleUrl}
      onContextMenu={handleContextMenu}
    >
      {segments.includes('add') && <SitesMapAddLayer />}
      {segments.includes('edit') && <SitesMapEditLayer />}
      <SiteMapNavigation />
      <SitesSource />
      <SitesLayer />
      <SitesClusterLayer />

      {showPopup && popupLngLat && (
        <Popup
          latitude={popupLngLat.lat}
          longitude={popupLngLat.lng}
          closeOnClick={true}
          onClose={() => setShowPopup(false)}
          style={{ visibility: 'hidden' }}
          className="rounded-xl! bg-transparent!"
          anchor="top"
        >
          <Link
            className="absolute visible w-32 top-0 left-1/2 transform -translate-x-1/2"
            href={`/${lang}/sites/add?lat=${popupLngLat.lat}&lng=${popupLngLat.lng}`}
            onClick={() => setShowPopup(false)}
          >
            <Button variant="contained" color="primary">
              Add Site
            </Button>
          </Link>
        </Popup>
      )}
    </Map>
  );
};
