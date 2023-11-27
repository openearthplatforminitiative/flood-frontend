'use client';

import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { DragEndEvent, LatLngExpression, LocationEvent } from 'leaflet';
import LocateControl from '@/app/components/onboarding/LocateControl';

interface SiteMapProps {
  radius: number;
  position: LatLngExpression | null;
  setPosition: (value: LatLngExpression) => void;
}

const SiteMap = ({ radius, position, setPosition }: SiteMapProps) => {
  const center: LatLngExpression = [51.505, -0.09];

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (position === null) {
        map.locate().on('locationfound', function (e: LocationEvent) {
          setPosition(e.latlng);
          map.setView(e.latlng, map.getZoom());
        });
      } else {
        map.setView(position, map.getZoom());
      }
    }, [map]);

    const handleDragEnd = (event: DragEndEvent) => {
      setPosition(event.target.getLatLng());
    };

    return (
      <Marker
        draggable
        position={position ?? center}
        eventHandlers={{ dragend: handleDragEnd }}
      >
        {radius > 0 && (
          <Circle center={position ?? center} radius={radius * 30} />
        )}
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
      <LocateControl position={'topleft'} setPosition={setPosition} />
    </MapContainer>
  );
};

export default SiteMap;
