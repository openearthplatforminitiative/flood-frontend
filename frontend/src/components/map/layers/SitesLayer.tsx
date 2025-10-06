import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Layer,
  MapGeoJSONFeature,
  MapMouseEvent,
  useMap,
} from 'react-map-gl/maplibre';

export const SitesLayer = () => {
  const map = useMap();
  const navigate = useRouter();
  const { lang } = useParams<{ lang: string }>();

  useEffect(() => {
    const mapRef = map['sites-map'];
    if (!mapRef) return;

    const handleSiteClick = (
      e: MapMouseEvent & {
        features?: MapGeoJSONFeature[];
      }
    ) => {
      const features = e.features;
      if (!features || features.length === 0) return;

      const feature = features[0];
      const featureId = feature.properties?.id;

      if (!featureId) return;

      navigate.push(`/${lang}/sites/${featureId}`);
    };

    mapRef.on('click', 'sites', handleSiteClick);
    return () => {
      mapRef.off('click', 'sites', handleSiteClick);
    };
  }, [lang, map, navigate]);

  return (
    <>
      <Layer
        id="sites"
        source="sites"
        type="circle"
        filter={['!', ['has', 'point_count']]}
        paint={{
          'circle-radius': 20,
          'circle-color': [
            'case',
            ['==', ['get', 'isEditable'], true],
            '#E1E3DE',
            '#006D41',
          ],
          'circle-stroke-width': [
            'case',
            ['==', ['get', 'isEditable'], true],
            0,
            ['==', ['get', 'isSelected'], true],
            3,
            0,
          ],
          'circle-stroke-color': '#000',
          'circle-opacity': [
            'case',
            ['==', ['get', 'isEditable'], true],
            0.75,
            1,
          ],
        }}
      />
      <Layer
        id="sites-symbol"
        source="sites"
        type="symbol"
        filter={['!', ['has', 'point_count']]}
        layout={{
          'icon-image': [
            'case',
            ['==', ['get', 'isEditable'], true],
            'edit-location',
            'location',
          ],
          'icon-size': 0.5,
        }}
      />
    </>
  );
};
