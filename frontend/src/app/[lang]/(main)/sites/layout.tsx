'use client';

import { SitesMap } from '@/components/map/SitesMap';
import { useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { use, useMemo } from 'react';
import { MapProvider } from 'react-map-gl/maplibre';

type SitesLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

const SitesLayout = ({ children, params }: SitesLayoutProps) => {
  const { lang } = use(params);
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const isSites = useMemo(() => pathname?.endsWith('sites'), [pathname]);

  if (isMobile) return children;

  return (
    <MapProvider>
      <div className="flex min-h-full ">
        <div className="min-w-1/2 w-full h-screen pl-10 py-10 pr-4 sticky top-0 overflow-hidden">
          <div className="rounded-xl h-full w-full overflow-hidden">
            <SitesMap lang={lang} />
          </div>
        </div>
        <div
          className={`w-full ${isSites ? 'max-w-lg' : 'max-w-3xl'} flex flex-col transition-all`}
        >
          {children}
        </div>
      </div>
    </MapProvider>
  );
};

export default SitesLayout;
