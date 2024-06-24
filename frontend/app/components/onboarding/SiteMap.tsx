'use client';

import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { DragEndEvent, LatLng, LocationEvent } from 'leaflet';
import LocateControl from '@/app/components/onboarding/LocateControl';

interface SiteMapProps {
  lat: number;
  lng: number;
  radius: number;
  setRadius: (value: number) => void;
  setLat: (value: number) => void;
  setLng: (value: number) => void;
}

const SiteMap = ({ lat, lng, radius, setLat, setLng }: SiteMapProps) => {
  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (lat === undefined || lng === undefined) {
        map.locate().on('locationfound', function (e: LocationEvent) {
          setLat(e.latlng.lat);
          setLng(e.latlng.lng);
          map.setView(e.latlng, map.getZoom());
        });
      } else {
        map.setView({ lat, lng }, map.getZoom());
      }
    }, [map]);

    const handleDragEnd = (event: DragEndEvent) => {
      const nextPosition: LatLng = event.target.getLatLng();
      setLat(nextPosition.lat);
      setLng(nextPosition.lng);
    };

    return (
      <Marker
        draggable
        position={{ lat, lng }}
        eventHandlers={{ dragend: handleDragEnd }}
      >
        {radius > 0 && <Circle center={{ lat, lng }} radius={radius * 30} />}
      </Marker>
    );
  };

  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
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
      <LocateControl
        position="topleft"
        lat={lat}
        lng={lng}
        setLat={setLat}
        setLng={setLng}
      />
    </MapContainer>
  );
};

export default SiteMap;
