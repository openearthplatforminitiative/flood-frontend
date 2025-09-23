'use server';

import { getUserId } from '@/lib/auth-utils';
import { floodClient } from '@/lib/openepi-clients';
import { getUserIncludingSites } from '@/lib/prisma';
import { SiteWithFloodData } from '@/types/SitesWithFloodData';

export const fetchSites = async () => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error('User not found');
    }
    const user = await getUserIncludingSites(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const SitesWithFloodData: SiteWithFloodData[] = await Promise.all(
      user.sites.map((site) =>
        floodClient
          .getSummaryForecast({
            lat: site.lat,
            lon: site.lng,
          })
          .then((summary) => {
            return {
              ...site,
              floodIntensity:
                summary.data?.queried_location.features[0]?.properties
                  .intensity,
            };
          })
          .catch((error) => {
            console.error('Error fetching flood data:', error);
            return {
              ...site,
            };
          })
      )
    );
    return SitesWithFloodData;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
