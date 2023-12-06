'use client';

import { Circle, MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { DragEndEvent, LatLng, LocationEvent } from 'leaflet';
import LocateControl from '@/app/components/onboarding/LocateControl';
import { SiteData } from '@/app/components/onboarding/OnboardingDashboard';

interface SiteMapProps {
  radius: number;
  siteValues: SiteData;
  setSiteValues: (value: SiteData) => void;
}

const SiteMap = ({ radius, siteValues, setSiteValues }: SiteMapProps) => {
  const placeholderPosition: LatLng = new LatLng(51.505, -0.09);

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (siteValues.lng === undefined || siteValues.lat === undefined) {
        map.locate().on('locationfound', function (e: LocationEvent) {
          setSiteValues({
            ...siteValues,
            lat: e.latlng.lat,
            lng: e.latlng.lng,
          });
          map.setView(e.latlng, map.getZoom());
        });
      } else {
        const position = new LatLng(siteValues.lat, siteValues.lng);
        map.setView(position, map.getZoom());
      }
    }, [map]);

    const handleDragEnd = (event: DragEndEvent) => {
      const position: LatLng = event.target.getLatLng();
      setSiteValues({ ...siteValues, lat: position.lat, lng: position.lng });
    };

    return (
      <Marker
        draggable
        position={
          siteValues.lng && siteValues.lat
            ? new LatLng(siteValues.lat, siteValues.lng)
            : placeholderPosition
        }
        eventHandlers={{ dragend: handleDragEnd }}
      >
        {radius > 0 && (
          <Circle
            center={
              siteValues.lng && siteValues.lat
                ? new LatLng(siteValues.lat, siteValues.lng)
                : placeholderPosition
            }
            radius={radius * 30}
          />
        )}
      </Marker>
    );
  };

  return (
    <MapContainer
      center={placeholderPosition}
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
        position={'topleft'}
        siteValues={siteValues}
        setSiteValues={setSiteValues}
      />
    </MapContainer>
  );
};

export default SiteMap;
