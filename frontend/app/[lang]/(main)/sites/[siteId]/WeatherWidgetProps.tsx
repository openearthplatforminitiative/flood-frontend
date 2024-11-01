import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import WeatherIcon from '@/app/components/icons/WeatherIcon';
import { getUserId } from '@/lib/auth-utils';
import { weatherClient } from '@/lib/openepi-clients';
import { getSiteForUser } from '@/lib/prisma';
import { Box, Typography } from '@mui/material';

type WeatherWidgetProps = {
  siteId: string;
  lang: string;
};

export const WeatherWidget = async ({ siteId, lang }: WeatherWidgetProps) => {
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

  const labelStyle = {
    fontSize: '0.75rem',
    color: '#414942',
    marginBottom: '0.5rem',
  };

  if (currentWeather && nextHourWeather && weatherSymbolCode)
    return (
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
          <Typography sx={labelStyle}>
            {dict.sites.weather.temperature}
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {currentWeather.details?.air_temperature}°C
          </Typography>
        </Box>
        <Box>
          <Typography sx={labelStyle}>
            {dict.sites.weather.precipitation}
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {nextHourWeather.details?.precipitation_amount} mm
          </Typography>
        </Box>
        <Box>
          <Typography sx={labelStyle}>{dict.sites.weather.wind}</Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {currentWeather.details?.wind_speed} m/s
          </Typography>
        </Box>
      </Box>
    );
};
