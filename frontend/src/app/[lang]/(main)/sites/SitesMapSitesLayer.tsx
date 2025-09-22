'use client';

import { PlaceOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { useMemo } from 'react';
import { Marker } from 'react-map-gl/maplibre';
import { SiteWithFloodData } from './SitesAction';

export const SiteMarkers = (
  lang: string,
  sites: SiteWithFloodData[],
  currentPage: string,
  site?: SiteWithFloodData
) =>
  useMemo(() => {
    return sites.map((marker) =>
      currentPage === 'edit' && site?.id === marker.id ? (
        <Marker
          key={marker.id}
          anchor="bottom"
          latitude={marker.lat}
          longitude={marker.lng}
        >
          <div className="size-10 rounded-full flex justify-center items-center bg-neutral-90/50 text-black">
            <PlaceOutlined />
          </div>
        </Marker>
      ) : (
        <Link key={marker.id} href={`/${lang}/sites/${marker.id}`}>
          <Marker anchor="bottom" latitude={marker.lat} longitude={marker.lng}>
            {!marker.floodIntensity || marker.floodIntensity === 'G' ? (
              <div className="size-10 rounded-full flex justify-center items-center bg-primary-40 text-white">
                <PlaceOutlined />
              </div>
            ) : (
              <div className="size-10 flex relative justify-center items-center">
                {marker.floodIntensity === 'P' && (
                  <>
                    <div className="absolute -z-10 size-14 animate-pulse rounded-full flex justify-center items-center bg-error-80 text-error-10" />
                    <div className="size-10 rounded-full flex justify-center items-center bg-error-70 text-error-10">
                      <PlaceOutlined />
                    </div>
                  </>
                )}
                {marker.floodIntensity === 'Y' && (
                  <>
                    <div className="absolute -z-10 size-14 animate-pulse rounded-full flex justify-center items-center bg-error-80 text-error-10" />
                    <div className="size-10 rounded-full flex justify-center items-center bg-error-70 text-error-10">
                      <PlaceOutlined />
                    </div>
                  </>
                )}
                {marker.floodIntensity === 'R' && (
                  <>
                    <div className="absolute -z-10 size-14 animate-pulse rounded-full flex justify-center items-center bg-error-80 text-error-10" />
                    <div className="size-10 rounded-full flex justify-center items-center bg-error-70 text-error-10">
                      <PlaceOutlined />
                    </div>
                  </>
                )}
              </div>
            )}
          </Marker>
        </Link>
      )
    );
  }, [lang, sites, currentPage, site]);
