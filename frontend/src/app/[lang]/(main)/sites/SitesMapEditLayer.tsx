import { GeoAutoComplete } from '@/components/GeoAutoComplete';
import { AddLocationAltOutlined } from '@mui/icons-material';
import { Layer, Marker, Source } from 'react-map-gl/maplibre';
import { LngLat } from 'maplibre-gl';
import { useMemo } from 'react';
import { Slider, useMediaQuery } from '@mui/material';
import { useSitesMap } from './SitesMapProvider';
import { circle } from '@turf/turf';

export const SitesMapEditLayer = () => {
  const {
    currentSite,
    newSiteLngLat,
    setNewSiteLngLat,
    newSiteRadius,
    setNewSiteRadius,
  } = useSitesMap()!;

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handleSliderChange = (_: unknown, newValue: number | number[]) => {
    setNewSiteRadius(newValue as number);
  };

  const latlng = useMemo(() => {
    if (!newSiteLngLat) {
      if (!currentSite) {
        return { lat: 0, lng: 0 };
      }
      return { lat: currentSite.lat, lng: currentSite.lng };
    }
    return newSiteLngLat;
  }, [newSiteLngLat, currentSite]);

  const movedFromOriginalSite = useMemo(() => {
    if (
      newSiteLngLat?.lng !== currentSite?.lng &&
      newSiteLngLat?.lat !== currentSite?.lat
    ) {
      return true;
    }
    return false;
  }, [newSiteLngLat, currentSite]);

  const handleResetLocation = () => {
    setNewSiteLngLat(new LngLat(currentSite?.lng ?? 0, currentSite?.lat ?? 0));
  };

  const newMarker = useMemo(() => {
    return (
      <Marker
        draggable
        className="z-10"
        onDragEnd={(e) => setNewSiteLngLat(e.lngLat)}
        anchor="bottom"
        latitude={latlng?.lat}
        longitude={latlng?.lng}
      >
        <div className="size-10 rounded-full flex justify-center items-center bg-neutral-90 text-black">
          <AddLocationAltOutlined />
        </div>
      </Marker>
    );
  }, [latlng?.lat, latlng?.lng, setNewSiteLngLat]);

  const circleData: GeoJSON.GeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: [
        circle(
          [latlng?.lng ?? 0, latlng?.lat ?? 0],
          newSiteRadius ?? currentSite?.radius ?? 0,
          { units: 'meters' }
        ),
      ],
    }),
    [latlng?.lat, latlng?.lng, newSiteRadius, currentSite]
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
              value={newSiteRadius ?? currentSite?.radius ?? 0}
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

      {movedFromOriginalSite && (
        <div className="absolute left-0 right-0 bottom-5 w-full flex justify-center">
          <button
            className="bg-neutral-95 hover:bg-neutral-90 rounded-full shadow-md px-4 py-2 text-lg"
            onClick={handleResetLocation}
          >
            Reset Location
          </button>
        </div>
      )}
      {newMarker}
    </>
  );
};
