import { GeoAutoComplete } from '@/app/components/GeoAutoComplete';
import { AddLocationAltOutlined } from '@mui/icons-material';
import { Layer, Marker, Source, useMap } from 'react-map-gl/maplibre';
import { useCallback, useEffect, useMemo } from 'react';
import { Slider, useMediaQuery } from '@mui/material';
import { useSitesMap } from './SitesMapProvider';
import { circle } from '@turf/turf';

export const SitesMapAddLayer = () => {
  const { newSiteLngLat, setNewSiteLngLat, newSiteRadius, setNewSiteRadius } =
    useSitesMap()!;

  const mapRef = useMap();

  const handleContextMenu = useCallback(
    (e: maplibregl.MapMouseEvent) => {
      e.preventDefault();
      setNewSiteLngLat(e.lngLat);
    },
    [setNewSiteLngLat]
  );

  useEffect(() => {
    const map = mapRef?.current;
    if (!map) return;
    const contextMenuHandler = (e: maplibregl.MapMouseEvent): void => {
      handleContextMenu(e);
    };
    map.on('contextmenu', contextMenuHandler);
    return () => {
      map.off('contextmenu', contextMenuHandler);
    };
  }, [handleContextMenu, mapRef]);

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    setNewSiteRadius(newValue as number);
  };

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const AddMarker = useMemo(() => {
    return (
      <Marker
        draggable
        className="z-10"
        onDragEnd={(e) => setNewSiteLngLat(e.lngLat)}
        anchor="bottom"
        latitude={newSiteLngLat?.lat ?? 0}
        longitude={newSiteLngLat?.lng ?? 0}
      >
        <div className="size-10 rounded-full flex justify-center items-center bg-neutral-90 text-black">
          <AddLocationAltOutlined />
        </div>
      </Marker>
    );
  }, [newSiteLngLat?.lat, newSiteLngLat?.lng, setNewSiteLngLat]);

  const circleData: GeoJSON.GeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        circle(
          [newSiteLngLat?.lng ?? 0, newSiteLngLat?.lat ?? 0],
          newSiteRadius ?? newSiteRadius ?? 0,
          { units: 'meters' }
        ),
      ],
    }),
    [newSiteLngLat, newSiteRadius]
  );

  return (
    <>
      {!isMobile && (
        <div className="absolute top-0 left-0 m-4 w-1/2">
          <GeoAutoComplete setLngLat={setNewSiteLngLat} />
          <div className="bg-neutral-95 rounded-xl flex flex-col items-center pt-2 pb-6 px-3 h-52 gap-6 w-min border border-neutral-90">
            {newSiteRadius}
            <Slider
              className="!bg-neutral-95 !text-neutral-20"
              orientation="vertical"
              min={100}
              max={1000}
              step={100}
              value={newSiteRadius ?? 0}
              onChange={handleSliderChange}
            />
          </div>
        </div>
      )}
      <Source id="circle-source" type="geojson" data={circleData}>
        <Layer
          id="circle-layer"
          type="fill"
          paint={{
            'fill-color': 'blue',
            'fill-opacity': 0.4,
          }}
        />
      </Source>
      {AddMarker}
    </>
  );
};
