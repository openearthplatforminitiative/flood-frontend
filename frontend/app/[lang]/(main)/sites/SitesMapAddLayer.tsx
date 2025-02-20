import { GeoAutoComplete } from '@/app/components/GeoAutoComplete';
import { AddLocationAltOutlined } from '@mui/icons-material';
import { Layer, Marker, Source } from 'react-map-gl/maplibre';
import { useMemo } from 'react';
import { Slider } from '@mui/material';
import { useSitesMap } from './SitesMapProvider';
import { circle } from '@turf/turf';

export const SitesMapAddLayer = () => {
  const { newSiteLngLat, setNewSiteLngLat, newSiteRadius, setNewSiteRadius } =
    useSitesMap()!;

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setNewSiteRadius(newValue as number);
  };

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
      <div className="absolute top-0 left-0 m-4 w-1/2">
        <GeoAutoComplete setLngLat={setNewSiteLngLat} />
        {newSiteRadius}
        <Slider
          min={100}
          max={1000}
          step={100}
          value={newSiteRadius ?? 0}
          onChange={handleSliderChange}
        />
      </div>
      <div className="absolute bottom-10 left-8 right-8">
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
      </div>
      {AddMarker}
    </>
  );
};
