import {
  Add,
  MapOutlined,
  Navigation,
  NavigationOutlined,
  Remove,
  SatelliteAltOutlined,
} from '@mui/icons-material';
import { useMap } from 'react-map-gl/maplibre';
import { useSitesMap } from './SitesMapProvider';
import { useEffect, useState } from 'react';

type SiteMapNavigationProps = {
  currentPage: string;
  currentSite?: any;
};

export const SiteMapNavigation = ({
  currentPage,
  currentSite,
}: SiteMapNavigationProps) => {
  const { newSiteLngLat, sites, setMapStyle, mapStyle } = useSitesMap();
  const [currentBearing, setCurrentBearing] = useState(0);
  const [userHasMoved, setUserHasMoved] = useState(false);

  const mapRef = useMap();

  // on moving around map, set userHasMoved to true
  useEffect(() => {
    if (mapRef.current) {
      const handleUserMove = () => {
        setUserHasMoved(true);
      };

      mapRef.current.on('dragstart', handleUserMove);
      mapRef.current.on('dblclick', handleUserMove);
      mapRef.current.on('wheel', handleUserMove);

      return () => {
        mapRef.current?.off('dragstart', handleUserMove);
        mapRef.current?.off('dblclick', handleUserMove);
        mapRef.current?.off('wheel', handleUserMove);
      };
    }
  }, [mapRef]);

  useEffect(() => {
    setTimeout(() => {
      zoomToLocation();
    }, 200);
  }, [
    currentPage,
    currentSite,
    mapRef,
    newSiteLngLat?.lat,
    newSiteLngLat?.lng,
    sites,
  ]);

  const zoomToLocation = () => {
    if (mapRef.current) {
      if (currentPage === 'site' && currentSite) {
        setUserHasMoved(false);
        mapRef.current?.flyTo({
          center: { lat: currentSite.lat, lng: currentSite.lng },
          zoom: 14,
          speed: 3,
        });
      } else if (currentPage === 'edit') {
        setUserHasMoved(false);
        mapRef.current?.flyTo({
          center: {
            lat: newSiteLngLat?.lat ?? currentSite?.lat ?? 0,
            lng: newSiteLngLat?.lng ?? currentSite?.lng ?? 0,
          },
          screenSpeed: 3,
        });
      } else if (currentPage === 'add') {
        setUserHasMoved(false);
        mapRef.current?.flyTo({
          center: {
            lat: newSiteLngLat?.lat ?? 0,
            lng: newSiteLngLat?.lng ?? 0,
          },
          screenSpeed: 3,
        });
      } else if (currentPage === 'sites' && sites && sites.length > 0) {
        setUserHasMoved(false);
        mapRef.current?.fitBounds(
          [
            [
              Math.min(...sites.map((site) => site.lng)),
              Math.min(...sites.map((site) => site.lat)),
            ],
            [
              Math.max(...sites.map((site) => site.lng)),
              Math.max(...sites.map((site) => site.lat)),
            ],
          ],
          {
            maxZoom: 14,
            padding: 100,
            speed: 3,
          }
        );
      }
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      const handleRotate = (e) => {
        const bearing = e.target.getBearing();
        setCurrentBearing(bearing);
      };

      mapRef.current.on('rotate', handleRotate);

      return () => {
        mapRef.current?.off('rotate', handleRotate);
      };
    }
  }, [mapRef]);

  const handleCompassClick = () => {
    mapRef.current?.resetNorth();
    if (userHasMoved) {
      zoomToLocation();
    }
  };

  const handleZoomIn = () => {
    mapRef.current?.setZoom(mapRef.current.getZoom() + 1);
  };

  const handleZoomOut = () => {
    mapRef.current?.setZoom(mapRef.current.getZoom() - 1);
  };

  const handleMapStyleChange = () => {
    setMapStyle(mapStyle === 'streets' ? 'hybrid' : 'streets');
  };

  const buttonStyle =
    'bg-neutral-95 border p-2 first:rounded-t-lg last:rounded-b-lg';

  return (
    <div className="absolute top-0 right-0 m-4 flex flex-col gap-2">
      <div className="flex flex-col">
        <button onClick={handleZoomIn} className={buttonStyle}>
          <Add />
        </button>
        <button onClick={handleZoomOut} className={buttonStyle}>
          <Remove />
        </button>
        <button className={buttonStyle} onClick={handleCompassClick}>
          {userHasMoved ? (
            <NavigationOutlined style={{ rotate: currentBearing + 'deg' }} />
          ) : (
            <Navigation style={{ rotate: currentBearing + 'deg' }} />
          )}
        </button>
      </div>
      <div className="flex flex-col overflow-hidden rounded-lg">
        <button onClick={handleMapStyleChange} className={buttonStyle}>
          {mapStyle === 'streets' ? <SatelliteAltOutlined /> : <MapOutlined />}
        </button>
      </div>
    </div>
  );
};
