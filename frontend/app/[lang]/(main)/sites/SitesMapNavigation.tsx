import {
  Add,
  LocationSearching,
  MapOutlined,
  Navigation,
  NavigationOutlined,
  Remove,
  SatelliteAltOutlined,
} from '@mui/icons-material';
import { GeolocateControl, useMap } from 'react-map-gl/maplibre';
import maplibregl, { LngLat, LngLatBounds } from 'maplibre-gl';
import { useSitesMap } from './SitesMapProvider';
import { createRef, useEffect, useMemo, useState } from 'react';

type SiteMapNavigationProps = {
  currentPage: string;
};

export const SiteMapNavigation = ({ currentPage }: SiteMapNavigationProps) => {
  const {
    defaultCoordinates,
    defaultZoom,
    setDefaultCoordinates,
    setDefaultZoom,
    currentSite,
    newSiteLngLat,
    sites,
    setMapStyle,
    mapStyle,
  } = useSitesMap();
  const geoControlRef = createRef<maplibregl.GeolocateControl>();
  const [currentBearing, setCurrentBearing] = useState(0);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [userHasMoved, setUserHasMoved] = useState(false);

  const map = useMap();

  const sitesBounds = useMemo(() => {
    if (sites.length === 0) {
      return new LngLatBounds(new LngLat(-180, -90), new LngLat(180, 90));
    }
    return new LngLatBounds(
      new LngLat(
        Math.min(...sites.map((site) => site.lng)),
        Math.min(...sites.map((site) => site.lat))
      ),
      new LngLat(
        Math.max(...sites.map((site) => site.lng)),
        Math.max(...sites.map((site) => site.lat))
      )
    );
  }, [sites]);

  useEffect(() => {
    if (currentPage === 'sites') {
      const bounds = sitesBounds;
      setDefaultCoordinates(bounds.getCenter());
      setDefaultZoom(undefined);
    } else if (currentPage === 'site') {
      if (currentSite) {
        setDefaultCoordinates(new LngLat(currentSite.lng, currentSite.lat));
        setDefaultZoom(14);
      }
    } else if (currentPage === 'add') {
      setDefaultCoordinates(newSiteLngLat);
      setDefaultZoom(undefined);
    } else if (currentPage === 'edit') {
      if (currentSite) {
        setDefaultCoordinates(
          newSiteLngLat ?? new LngLat(currentSite.lng, currentSite.lat)
        );
        setDefaultZoom(undefined);
      }
    }
  }, [currentPage, currentSite, newSiteLngLat, sitesBounds]);

  const handleUserMove = (centerCoordinates?: LngLat) => {
    if (centerCoordinates) {
      if (
        Math.abs(
          centerCoordinates.lat - (map.current?.getCenter()?.lat || 0)
        ) <= 0.05 &&
        Math.abs(
          centerCoordinates.lng - (map.current?.getCenter()?.lng || 0)
        ) <= 0.05
      ) {
        setUserHasMoved(false);
      } else {
        setUserHasMoved(true);
      }
    } else {
      setUserHasMoved(false);
    }
  };

  const handleRotate = (bearing: number, pitch: number) => {
    setCurrentBearing(bearing);
    setCurrentPitch(pitch);
  };

  useEffect(() => {
    if (map.current) {
      const handleMove = () => handleUserMove(defaultCoordinates);
      const handleRotateEvent = (e: any) =>
        handleRotate(e.target.getBearing(), e.target.getPitch());

      map.current.on('zoom', handleMove);
      map.current.on('move', handleMove);
      map.current.on('rotate', handleRotateEvent);
      map.current.on('pitch', handleRotateEvent);

      return () => {
        map.current?.off('zoom', handleMove);
        map.current?.off('move', handleMove);
        map.current?.off('rotate', handleRotateEvent);
        map.current?.off('pitch', handleRotateEvent);
      };
    }
  }, [defaultCoordinates]);

  useEffect(() => {
    setTimeout(() => {
      zoomToLocation();
    }, 200);
  }, [defaultCoordinates, defaultZoom]);

  const zoomToLocation = () => {
    if (currentPage == 'sites') {
      map.current?.fitBounds(sitesBounds, {
        padding: 100,
        maxZoom: 14,
        screenSpeed: 3,
      });
    } else {
      map.current?.flyTo({
        center: defaultCoordinates,
        zoom: defaultZoom,
        screenSpeed: 3,
      });
    }
  };

  const handleCompassClick = () => {
    map.current?.resetNorthPitch();
    if (userHasMoved) {
      zoomToLocation();
    }
  };

  const handleZoomIn = () => {
    map.current?.zoomIn();
  };

  const handleZoomOut = () => {
    map.current?.zoomOut();
  };

  const handleMapStyleChange = () => {
    setMapStyle(mapStyle === 'streets' ? 'hybrid' : 'streets');
  };

  const buttonStyle =
    'bg-neutral-95 hover:bg-neutral-90 border p-2 first:rounded-t-lg last:rounded-b-lg';

  return (
    <>
      <GeolocateControl ref={geoControlRef} style={{ display: 'none' }} />
      <div className="absolute top-0 right-0 m-4 flex flex-col gap-2">
        <div className="flex flex-col shadow-md rounded-lg">
          <button onClick={handleZoomIn} className={buttonStyle}>
            <Add />
          </button>
          <button onClick={handleZoomOut} className={buttonStyle}>
            <Remove />
          </button>
          <button className={buttonStyle} onClick={handleCompassClick}>
            {userHasMoved ? (
              <NavigationOutlined
                style={{
                  transform: `rotateZ(${currentBearing}deg) rotateX(${currentPitch}deg)`,
                  perspective: '100px',
                }}
              />
            ) : (
              <Navigation
                style={{
                  transform: `rotateZ(${currentBearing}deg) rotateX(${currentPitch}deg)`,
                  perspective: '100px',
                }}
              />
            )}
          </button>
        </div>
        <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
          <button
            onClick={() => geoControlRef.current?.trigger()}
            className={buttonStyle}
          >
            <LocationSearching />
          </button>
        </div>
        <div className="flex flex-col overflow-hidden rounded-lg shadow-md">
          <button onClick={handleMapStyleChange} className={buttonStyle}>
            {mapStyle === 'streets' ? (
              <SatelliteAltOutlined />
            ) : (
              <MapOutlined />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
