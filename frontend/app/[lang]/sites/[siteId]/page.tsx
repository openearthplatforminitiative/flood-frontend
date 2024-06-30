import TitleBar from '@/app/components/onboarding/TitleBar';
import { Box, Button, Divider, Link, Typography } from '@mui/material';
import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { ArrowBack, EditOutlined } from '@mui/icons-material';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { weatherClient } from '@/lib/openepi-clients';
import WeatherIcon from '@/app/components/icons/WeatherIcon';
import { typesRenderer } from '@/lib/render-utils';

interface EditSitePageProps {
  params: {
    lang: string;
    siteId: string;
  };
}

const EditSitePage = async ({
  params: { lang, siteId },
}: EditSitePageProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  const response = await weatherClient.getLocationForecast({
    lat: site.lat,
    lon: site.lng,
  });

  // Current weather does not hold all the information we need, so we need to look at the next hour as well
  const currentWeather = response.data?.properties.timeseries[0].data.instant;
  const nextHourWeather =
    response.data?.properties.timeseries[0].data.next_1_hours;
  const weatherSymbolCode = nextHourWeather?.summary.symbol_code;

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <TitleBar
        dict={dict}
        icon={<ArrowBack fontSize="small" />}
        text={dict.back}
        href={`/${lang}/sites`}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h1" sx={{ fontSize: '1.75rem' }}>
          {site.name}
        </Typography>
        <Box sx={{ marginBottom: '1.5rem' }}>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: '#414942',
              marginBottom: '0.25rem',
            }}
          >
            {dict.sites.typeOfSite}
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {typesRenderer(site.types, dict)}
          </Typography>
        </Box>
        <Divider />
        {currentWeather && nextHourWeather && weatherSymbolCode && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '5rem',
              marginBottom: '0.75rem',
            }}
          >
            <WeatherIcon iconType={weatherSymbolCode} />
            <Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#414942',
                  marginBottom: '0.5rem',
                }}
              >
                {dict.sites.weather.temperature}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {currentWeather.details?.air_temperature}°C
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#414942',
                  marginBottom: '0.5rem',
                }}
              >
                {dict.sites.weather.precipitation}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {nextHourWeather.details?.precipitation_amount} mm
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: '#414942',
                  marginBottom: '0.5rem',
                }}
              >
                {dict.sites.weather.wind}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {currentWeather.details?.wind_speed} m/s
              </Typography>
            </Box>
          </Box>
        )}
        <Divider />
      </Box>
      <Link href={`/${lang}/sites/${site.id}/edit`}>
        <Button
          variant={'outlined'}
          startIcon={<EditOutlined />}
          sx={{ width: '100%' }}
        >
          {dict.sites.editSite}
        </Button>
      </Link>
    </Box>
  );
};

export default EditSitePage;
