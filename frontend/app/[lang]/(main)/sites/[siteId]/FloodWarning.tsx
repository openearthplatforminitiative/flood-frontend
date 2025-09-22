import { getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import FloodWarningBox from '@/app/components/FloodWarningBox';
import { getUserId } from '@/lib/auth-utils';
import { floodClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { redirect } from 'next/navigation';

type WeatherWidgetProps = {
  siteId: string;
  lang: string;
};

export const FloodWarning = async ({ siteId, lang }: WeatherWidgetProps) => {
  const dict = getDictionaryWithDefault(lang);

  const userId = await getUserId();
  if (!userId) redirect('/');

  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  const floodSummary = await floodClient.getSummaryForecast({
    lat: site.lat,
    lon: site.lng,
  });

  const floodProperties =
    floodSummary.data?.queried_location.features[0]?.properties;

  const noFloodWarnings =
    floodProperties === undefined || floodProperties.intensity === 'G';

  if (noFloodWarnings) {
    return <FloodWarningBox dict={dict} intensity="G" />;
  } else {
    return (
      <FloodWarningBox
        dict={dict}
        intensity={floodProperties.intensity}
        timing={floodProperties.peak_timing}
        siteName={site.name}
      />
    );
  }
};
