'use client';

import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type StaticSiteMapProps = {
  lat?: number;
  lng?: number;
  radius?: number;
};

const StaticSiteMap = ({ lat, lng, radius }: StaticSiteMapProps) => {
  lat ??= 51.505;
  lng ??= -0.09;
  radius ??= 100;

  return (
    <MapContainer
      center={{ lat: lat, lng: lng }}
      zoom={12}
      dragging={false}
      zoomControl={false}
      scrollWheelZoom={false}
      className="w-full h-[25vh] z-0"
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={{ lat: lat, lng: lng }}>
        {radius > 0 && (
          <Circle center={{ lat: lat, lng: lng }} radius={radius * 30} />
        )}
      </Marker>
    </MapContainer>
  );
};

export default StaticSiteMap;
