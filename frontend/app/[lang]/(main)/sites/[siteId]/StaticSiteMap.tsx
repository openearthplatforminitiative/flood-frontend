'use client';

import { MapContainer, TileLayer } from 'react-leaflet';

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
      zoom={15}
      dragging={false}
      zoomControl={false}
      scrollWheelZoom={false}
      className="w-full h-full z-0"
      attributionControl={false}
      doubleClickZoom={false}
      touchZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=yKbUfk8FeU9lYSvB92QQ"
      />
    </MapContainer>
  );
};

export default StaticSiteMap;
