import { GeoAutoComplete } from '@/app/components/GeoAutoComplete';
import { AddLocationAltOutlined } from '@mui/icons-material';
import { Layer, Marker, Source } from 'react-map-gl/maplibre';
import { LngLat } from 'maplibre-gl';
import { useMemo } from 'react';
import { Slider } from '@mui/material';
import { useSitesMap } from './SitesMapProvider';
import { useSelectedLayoutSegments } from 'next/navigation';
import { circle } from '@turf/turf';

export const SitesMapEditLayer = () => {
  const {
    sites,
    newSiteLngLat,
    setNewSiteLngLat,
    newSiteRadius,
    setNewSiteRadius,
  } = useSitesMap()!;

  const siteId = useSelectedLayoutSegments()[0];
  const site = sites.find((site) => site.id === siteId);

  const handleSliderChange = (_: any, newValue: number | number[]) => {
    setNewSiteRadius(newValue as number);
  };

  const latlng = useMemo(() => {
    if (!newSiteLngLat) {
      if (!site) {
        return { lat: 0, lng: 0 };
      }
      return { lat: site.lat, lng: site.lng };
    }
    return newSiteLngLat;
  }, [newSiteLngLat, site]);

  const movedFromOriginalSite = useMemo(() => {
    if (newSiteLngLat?.lng !== site?.lng && newSiteLngLat?.lat !== site?.lat) {
      return true;
    }
    return false;
  }, [newSiteLngLat, site]);

  const handleResetLocation = () => {
    setNewSiteLngLat(new LngLat(site?.lng ?? 0, site?.lat ?? 0));
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
          newSiteRadius ?? site?.radius ?? 0,
          { units: 'meters' }
        ),
      ],
    }),
    [newSiteLngLat, newSiteRadius, site]
  );

  return (
    <>
      <div className="absolute top-0 left-0 m-4 w-1/2">
        <GeoAutoComplete setLngLat={setNewSiteLngLat} />
        {newSiteRadius ?? site?.radius}
        <Slider
          min={100}
          max={1000}
          step={100}
          value={newSiteRadius ?? site?.radius ?? 0}
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
