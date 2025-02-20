'use client';

import { Skeleton, useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Suspense, useMemo } from 'react';
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
          <div className="flex-1 shrink-1 h-screen p-10 sticky top-0 overflow-hidden">
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
            className={`${isSites ? 'w-[32rem]' : 'w-1/2'} flex flex-col transition-all`}
          >
            {children}
          </div>
        </div>
      )}
    </SitesMapProvider>
  );
};

export default SitesLayout;
