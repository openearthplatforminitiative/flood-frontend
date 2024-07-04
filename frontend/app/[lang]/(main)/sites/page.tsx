import { Box, Button, List, Typography } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import Title from '@/app/components/Title';
import { getUserId } from '@/lib/auth-utils';
import { getUserIncludingSites } from '@/lib/prisma';
import SiteListItem from '@/app/components/SiteListItem';
import Link from 'next/link';
import { Add, Warning } from '@mui/icons-material';
import { floodClient, floodIntensityRatingMap } from '@/lib/openepi-clients';
import FloodWarningBox from '@/app/components/FloodWarningBox';

const Sites = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);

  const userId = await getUserId();
  if (!userId) redirect('/');

  const user = await getUserIncludingSites(userId);
  if (!user) redirect('/');

  const floodSummaries = await Promise.all(
    user.sites.map((site) =>
      floodClient.getSummaryForecast({
        lat: site.lat,
        lon: site.lng,
      })
    )
  );

  const floodProperties = floodSummaries.map((summary) => {
    return summary.data?.queried_location.features[0]?.properties;
  });

  const noFloodWarnings = floodProperties.every(
    (properties) => properties === undefined || properties.intensity === 'G'
  );

  return (
    <>
      <Title dict={dict} />
      <Typography
        variant={'h1'}
        sx={{
          fontSize: '2rem',
          marginTop: '1rem',
          marginBottom: '2rem 1rem',
        }}
      >
        {dict.sites.title}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        {noFloodWarnings ? (
          <FloodWarningBox dict={dict} intensity="G" />
        ) : (
          floodProperties.map((properties, index) => {
            if (!properties || properties.intensity === 'G') return null;
            return (
              <FloodWarningBox
                key={user.sites[index].id}
                dict={dict}
                intensity={properties.intensity}
                timing={properties.peak_timing}
                siteName={user.sites[index].name}
              />
            );
          })
        )}

        <List>
          {user.sites.map((site, index) => {
            let icon;
            if (floodProperties) {
              const intensity = floodProperties[index]?.intensity;
              if (intensity) {
                const floodIntensityRating = floodIntensityRatingMap[intensity];
                if (floodIntensityRating > 0) icon = <Warning />;
              }
            }
            return (
              <SiteListItem
                key={site.id}
                dict={dict}
                href={`/${lang}/sites/${site.id}`}
                site={site}
                icon={icon}
              />
            );
          })}
        </List>
      </Box>
      <Link href={`/${lang}/sites/add`}>
        <Button
          variant={'outlined'}
          sx={{ width: '100%', marginTop: '24px' }}
          startIcon={<Add />}
        >
          {dict.onBoarding.sites.addNewSite}
        </Button>
      </Link>
    </>
  );
};

export default Sites;
