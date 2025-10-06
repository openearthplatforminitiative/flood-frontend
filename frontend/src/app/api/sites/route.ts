import { floodClient } from '@/lib/openepi-clients';
import { getUserIncludingSites } from '@/lib/prisma';
import { SiteWithFloodData } from '@/types/SitesWithFloodData';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) redirect('/');

  try {
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
    return NextResponse.json(SitesWithFloodData);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
