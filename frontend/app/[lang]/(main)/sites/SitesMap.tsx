'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  LngLat,
  Map,
  MapLayerMouseEvent,
  MapProvider,
  Popup,
} from 'react-map-gl/maplibre';
import Link from 'next/link';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Button } from '@mui/material';
import { SitesMapAddLayer } from './SitesMapAddLayer';
import { SiteMapNavigation } from './SitesMapNavigation';
import { SiteMarkers } from './SitesMapSitesLayer';
import { useSitesMap } from './SitesMapProvider';
import { SitesMapEditLayer } from './SitesMapEditLayer';
import { sentinelStyleGl } from '@/utils/sentinelStyleGl';

type SitesMapProps = {
  lang: string;
};

export const SitesMap = ({ lang }: SitesMapProps) => {
  const segments = useSelectedLayoutSegments();

  const [showPopup, setShowPopup] = useState(false);
  const [popupLngLat, setPopupLngLat] = useState<LngLat | undefined>();
  const { currentSite, sites, mapStyle } = useSitesMap()!;

  const currentPage = useMemo(() => {
    if (!segments || segments.length === 0) return 'sites';
    const lastSegment = segments[segments.length - 1] ?? '';
    if (lastSegment === 'add') return 'add';
    if (lastSegment === 'edit') return 'edit';
    return 'site';
  }, [segments]);

  const handleContextMenu = (e: MapLayerMouseEvent) => {
    e.preventDefault();
    console.log(currentPage);
    if (currentPage == 'add' || currentPage == 'edit') return;
    setPopupLngLat(e.lngLat);
    setShowPopup(true);
  };

  return (
    <MapProvider>
      <Map
        attributionControl={false}
        mapStyle={
          mapStyle === 'streets'
            ? 'https://tiles.openfreemap.org/styles/liberty'
            : sentinelStyleGl
        }
        onContextMenu={handleContextMenu}
      >
        {currentPage === 'add' && <SitesMapAddLayer />}
        {currentPage === 'edit' && <SitesMapEditLayer />}
        {SiteMarkers(lang, sites, currentPage, currentSite)}
        <SiteMapNavigation currentPage={currentPage} />

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
    </MapProvider>
  );
};
