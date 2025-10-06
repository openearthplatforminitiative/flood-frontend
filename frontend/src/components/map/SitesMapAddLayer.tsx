import { GeoAutoComplete } from '@/components/GeoAutoComplete';
import { AddLocationAltOutlined } from '@mui/icons-material';
import { Layer, Marker, Source, useMap } from 'react-map-gl/maplibre';
import { useCallback, useEffect, useMemo } from 'react';
import { Slider, useMediaQuery } from '@mui/material';
import { circle } from '@turf/turf';
import { activeLngLatAtom, newSiteRadiusAtom } from '@/store/atoms/mapAtom';
import { useAtom } from 'jotai';

export const SitesMapAddLayer = () => {
  const [activeLngLat, setActiveLngLat] = useAtom(activeLngLatAtom);
  const [newSiteRadius, setNewSiteRadius] = useAtom(newSiteRadiusAtom);

  const mapRef = useMap();

  const handleContextMenu = useCallback(
    (e: maplibregl.MapMouseEvent) => {
      e.preventDefault();
      setActiveLngLat(e.lngLat);
    },
    [setActiveLngLat]
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
        onDragEnd={(e) => setActiveLngLat(e.lngLat)}
        anchor="center"
        latitude={activeLngLat?.lat ?? 0}
        longitude={activeLngLat?.lng ?? 0}
      >
        <div className="size-10 rounded-full flex justify-center items-center bg-neutral-90 text-black">
          <AddLocationAltOutlined />
        </div>
      </Marker>
    );
  }, [activeLngLat?.lat, activeLngLat?.lng, setActiveLngLat]);

  const circleData: GeoJSON.GeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        circle(
          [activeLngLat?.lng ?? 0, activeLngLat?.lat ?? 0],
          newSiteRadius ?? newSiteRadius ?? 0,
          { units: 'meters' }
        ),
      ],
    }),
    [activeLngLat, newSiteRadius]
  );

  return (
    <>
      {!isMobile && (
        <div className="absolute top-0 left-0 m-4 w-1/2">
          <GeoAutoComplete setLngLat={setActiveLngLat} />
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
