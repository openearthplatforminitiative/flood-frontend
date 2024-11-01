import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import dynamic from 'next/dynamic';

type MapLoaderProps = {
  siteId: string;
};

const SiteMap = dynamic(
  () => import('./StaticSiteMap'),
  { ssr: false } // This will prevent server-side rendering for SiteMap component
);

export const MapLoader = async ({ siteId }: MapLoaderProps) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  const { lat, lng, radius } = site;

  return <SiteMap lat={lat} lng={lng} radius={radius} />;
};
