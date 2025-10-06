import { useEffect } from 'react';
import {
  Layer,
  MapGeoJSONFeature,
  MapMouseEvent,
  useMap,
} from 'react-map-gl/maplibre';

export const SitesClusterLayer = () => {
  const map = useMap();

  useEffect(() => {
    const mapRef = map['sites-map'];
    if (!mapRef) return;

    const handleClusterClick = (
      e: MapMouseEvent & {
        features?: MapGeoJSONFeature[];
      }
    ) => {
      const cluster = e.features;
      if (!cluster || cluster.length === 0) return;

      // zoom in on cluster
      const clusterFeature = cluster[0];
      const coordinates =
        clusterFeature.geometry.type === 'Point'
          ? (clusterFeature.geometry.coordinates?.slice() as [number, number])
          : null;

      if (!coordinates || coordinates.length !== 2) return;

      mapRef.easeTo({
        center: coordinates,
        zoom: mapRef.getZoom() + 2,
      });
    };

    mapRef.on('click', 'sites-cluster', handleClusterClick);
    return () => {
      mapRef.off('click', 'sites-cluster', handleClusterClick);
    };
  }, [map]);

  return (
    <>
      <Layer
        id="sites-cluster"
        source="sites"
        type="circle"
        filter={['has', 'point_count']}
        paint={{
          'circle-radius': 20,
          'circle-color': '#006D41',
          'circle-opacity': 1,
        }}
      />
      <Layer
        id="sites-cluster-symbol"
        source="sites"
        filter={['has', 'point_count']}
        type="symbol"
        layout={{
          'icon-image': 'location',
          'icon-size': 0.5,
          'icon-allow-overlap': true,
        }}
      />
      <Layer
        id="sites-cluster-text-circle"
        source="sites"
        type="circle"
        filter={['has', 'point_count']}
        paint={{
          'circle-radius': 10,
          'circle-color': '#FFFFFF',
          'circle-opacity': 1,
          'circle-translate': [15, -15],
        }}
      />
      <Layer
        id="sites-cluster-text"
        source="sites"
        filter={['has', 'point_count']}
        type="symbol"
        layout={{
          'text-field': ['get', 'point_count'],
          'text-font': ['Noto Sans Regular'],
          'text-size': 12,
          'text-offset': [1.3, -1.3],
        }}
        paint={{
          'text-color': '#000',
        }}
      />
    </>
  );
};
