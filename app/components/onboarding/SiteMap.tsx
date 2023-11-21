'use client';

import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { LatLngExpression, LocationEvent } from 'leaflet';
import LocateControl from '@/app/components/onboarding/CustomLeafletControl';

interface SiteMapProps {
  radius: number;
}

const SiteMap = ({ radius }: SiteMapProps) => {
  const center: LatLngExpression = [51.505, -0.09];

  const LocationMarker = () => {
    const [position, setPosition] = useState<LatLngExpression | undefined>(
      undefined
    );
    const map = useMap();

    useEffect(() => {
      map.locate().on('locationfound', function (e: LocationEvent) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      });
    }, [map]);

    return position === undefined ? null : (
      <Marker draggable position={position}>
        <Circle center={position} radius={radius * 30} />
      </Marker>
    );
  };

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      style={{ width: '312px', height: '320px', flexShrink: '0' }}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      <LocateControl position={'topleft'} />
    </MapContainer>
  );
};

export default SiteMap;
