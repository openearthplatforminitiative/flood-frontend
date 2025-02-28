'use client';

import { Skeleton, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useMemo } from 'react';
import { SitesMap } from './SitesMap';
import { SitesMapProvider } from './SitesMapProvider';

type SitesLayoutProps = {
  children: React.ReactNode;
  params: {
    lang: string;
  };
};

const SitesLayout = ({ children, params: { lang } }: SitesLayoutProps) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const isSites = useMemo(() => pathname?.endsWith('sites'), [pathname]);

  return (
    <SitesMapProvider>
      {isMobile ? (
        children
      ) : (
        <div className="flex min-h-full ">
          <div className="min-w-1/2 w-full h-screen pl-10 py-10 pr-4 sticky top-0 overflow-hidden">
            <div className="rounded-xl h-full w-full overflow-hidden">
              <Suspense
                fallback={
                  <Skeleton variant="rectangular" height="100%" width="100%" />
                }
              >
                <SitesMap lang={lang} />
              </Suspense>
            </div>
          </div>
          <div
            className={`w-full ${isSites ? 'max-w-[32rem]' : 'max-w-[48rem]'} flex flex-col transition-all`}
          >
            {children}
          </div>
        </div>
      )}
    </SitesMapProvider>
  );
};

export default SitesLayout;
