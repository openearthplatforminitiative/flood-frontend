'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { createRef, useMemo, useState } from 'react';
import {
  Map,
  MapLayerMouseEvent,
  MapProvider,
  MapRef,
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

type SitesMapProps = {
  lang: string;
};

export const SitesMap = ({ lang }: SitesMapProps) => {
  const segments = useSelectedLayoutSegments();
  const mapRef = createRef<MapRef>();
  const [showPopup, setShowPopup] = useState(false);
  const { sites, newSiteLngLat, setNewSiteLngLat, mapStyle, setMapStyle } =
    useSitesMap()!;

  const currentPage = useMemo(() => {
    console.log(segments);
    if (!segments || segments.length === 0) return 'sites';
    const lastSegment = segments[segments.length - 1] ?? '';
    if (lastSegment === 'add') return 'add';
    if (lastSegment === 'edit') return 'edit';
    return 'site';
  }, [segments]);

  const handleContextMenu = (e: MapLayerMouseEvent) => {
    e.preventDefault();
    setNewSiteLngLat(e.lngLat);
    if (currentPage !== 'add') {
      setShowPopup(true);
    }
  };

  const currentSite = useMemo(() => {
    if (currentPage === 'site' || currentPage === 'edit') {
      return sites.find((site) => site.id === segments[0]);
    }
    return undefined;
  }, [currentPage, segments, sites]);

  return (
    <MapProvider>
      <Map
        mapStyle={`https://api.maptiler.com/maps/${mapStyle}/style.json?key=HDOhgcsYJqejWL2p8lA6`}
        ref={mapRef}
        onContextMenu={handleContextMenu}
      >
        {currentPage === 'add' && <SitesMapAddLayer />}
        {currentPage === 'edit' && <SitesMapEditLayer />}
        {SiteMarkers(lang, sites, currentPage, currentSite)}
        <SiteMapNavigation
          currentPage={currentPage}
          currentSite={currentSite}
        />

        {showPopup && newSiteLngLat && (
          <Popup
            latitude={newSiteLngLat?.lat}
            longitude={newSiteLngLat?.lng}
            closeOnClick={true}
            onClose={() => setShowPopup(false)}
            style={{ visibility: 'hidden' }}
            className="!rounded-xl !bg-transparent"
            anchor="top"
          >
            <Link
              className="absolute visible w-32 top-0 left-1/2 transform -translate-x-1/2"
              href={`/${lang}/sites/add`}
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
