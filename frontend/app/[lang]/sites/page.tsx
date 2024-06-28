import { Box, Button, List, Typography } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import Title from '@/app/components/Title';
import { getUserId } from '@/lib/auth-utils';
import { getUserIncludingSites } from '@/lib/prisma';
import SiteListItem from '@/app/components/SiteListItem';
import Link from 'next/link';
import { Add, Warning } from '@mui/icons-material';
import {
  floodClient,
  FloodIntensity,
  FloodTiming,
} from '@/lib/openepi-clients';
import FloodWarningBox from '@/app/components/FloodWarningBox';

const Sites = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);

  const userId = await getUserId();
  if (!userId) redirect('/');

  const user = await getUserIncludingSites(userId);
  if (!user) redirect('/');

  const floodSummaryReponses = await Promise.all(
    user.sites.map(async (site) =>
      floodClient.getSummaryForecast({
        lat: site.lat,
        lon: site.lng,
      })
    )
  );

  //const topPrediction = floodPredictions.reduce((a, b) => {
  //  if (!a?.intensity && !b?.intensity) return undefined;
  //  if (!a?.intensity) return a;
  //  if (!b?.intensity) return b;
  //  return FloodIntensity[a.intensity] > FloodIntensity[b.intensity] ? a : b;
  //}, undefined);

  const highestIntensities: FloodIntensity[] = [];

  let topIntensity: FloodIntensity = FloodIntensity.G;
  let topIntensityTiming: FloodTiming = FloodTiming.GB;
  let topIntensitySiteName = '';
  for (let i = 0; i < floodSummaryReponses.length; i++) {
    const properties =
      floodSummaryReponses[i].data?.queried_location.features[0]?.properties;
    if (properties) {
      highestIntensities.push(FloodIntensity[properties.intensity]);
      if (FloodIntensity[properties.intensity] > topIntensity) {
        topIntensity = FloodIntensity[properties.intensity];
        topIntensityTiming = FloodTiming[properties.peak_timing];
        topIntensitySiteName = user.sites[i].name;
      }
    } else {
      highestIntensities.push(FloodIntensity.G);
    }
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 2rem 2.5rem 2rem',
      }}
    >
      <Title dict={dict} />
      <Typography
        variant={'h1'}
        sx={{
          fontSize: '2rem',
          marginTop: '3.5rem',
          marginBottom: '2rem 1rem',
        }}
      >
        My sites
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <FloodWarningBox
          dict={dict}
          intensity={topIntensity}
          timing={topIntensityTiming}
          siteName={topIntensitySiteName}
        />

        <List>
          <List>
            {user.sites.map((site, index) => {
              let icon;
              if (highestIntensities[index] > FloodIntensity.G)
                icon = <Warning />;
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
    </Box>
  );
};

export default Sites;
