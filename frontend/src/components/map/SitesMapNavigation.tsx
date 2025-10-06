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
import maplibregl, { LngLat, MapLibreEvent } from 'maplibre-gl';
import { createRef, useCallback, useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  defaultCoordinatesAtom,
  mapStyleAtom,
} from '@/store/atoms/mapAtom';

export const SiteMapNavigation = () => {
  const defaultCoordinates = useAtomValue(
    defaultCoordinatesAtom
  );
  const [mapStyle, setMapStyle] = useAtom(mapStyleAtom);
  const geoControlRef = createRef<maplibregl.GeolocateControl>();
  const [currentBearing, setCurrentBearing] = useState(0);
  const [currentPitch, setCurrentPitch] = useState(0);
  const [userHasMoved, setUserHasMoved] = useState(false);

  const mapRef = useMap();

  const handleUserMove = useCallback(
    (centerCoordinates?: LngLat) => {
      if (centerCoordinates) {
        if (
          Math.abs(
            centerCoordinates.lat - (mapRef.current?.getCenter()?.lat || 0)
          ) <= 0.05 &&
          Math.abs(
            centerCoordinates.lng - (mapRef.current?.getCenter()?.lng || 0)
          ) <= 0.05
        ) {
          setUserHasMoved(false);
        } else {
          setUserHasMoved(true);
        }
      } else {
        setUserHasMoved(false);
      }
    },
    [mapRef]
  );

  const handleRotate = (bearing: number, pitch: number) => {
    setCurrentBearing(bearing);
    setCurrentPitch(pitch);
  };

  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;
    const handleMove = () => handleUserMove(defaultCoordinates);
    const handleRotateEvent = (
      e: MapLibreEvent<MouseEvent | TouchEvent | undefined>
    ) => handleRotate(e.target.getBearing(), e.target.getPitch());

    map.on('zoom', handleMove);
    map.on('move', handleMove);
    map.on('rotate', handleRotateEvent);
    map.on('pitch', handleRotateEvent);

    return () => {
      map?.off('zoom', handleMove);
      map?.off('move', handleMove);
      map?.off('rotate', handleRotateEvent);
      map?.off('pitch', handleRotateEvent);
    };
  }, [defaultCoordinates, handleUserMove, mapRef]);

  const handleCompassClick = () => {
    mapRef.current?.resetNorthPitch();
  };

  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleMapStyleChange = () => {
    setMapStyle(mapStyle === 'streets' ? 'hybrid' : 'streets');
  };

  const buttonStyle =
    'bg-neutral-95 hover:bg-neutral-90 border border-neutral-90 p-2 first:rounded-t-lg last:rounded-b-lg';

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
