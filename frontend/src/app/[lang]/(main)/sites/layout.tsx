'use client';

import { SitesMap } from '@/components/map/SitesMap';
import { SitesMapProvider } from '@/components/map/SitesMapProvider';
import { Skeleton, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Suspense, use, useMemo } from 'react';

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
            className={`w-full ${isSites ? 'max-w-lg' : 'max-w-3xl'} flex flex-col transition-all`}
          >
            {children}
          </div>
        </div>
      )}
    </SitesMapProvider>
  );
};

export default SitesLayout;
