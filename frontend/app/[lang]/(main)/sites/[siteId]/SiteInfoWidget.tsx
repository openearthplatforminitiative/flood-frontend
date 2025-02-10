import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { typesRenderer } from '@/lib/render-utils';
import { Box, Typography } from '@mui/material';

interface SiteInfoWidgetProps {
  lang: string;
  siteId: string;
}

export const SiteInfoWidget = async ({ siteId, lang }: SiteInfoWidgetProps) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  return (
    <Box className="flex-1 flex flex-col justify-start items-start bg-neutral-95 rounded-xl p-4 md:p-6 gap-4 lg:gap-6">
      <Typography variant="h2">{site.name}</Typography>
      <Box>
        <Typography
          sx={{ fontSize: '0.75rem', color: '#414942', marginBottom: '0.5rem' }}
        >
          {dict.sites.typeOfSite}
        </Typography>
        <Typography variant="body1">
          {typesRenderer(site.types, dict)}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{ fontSize: '0.75rem', color: '#414942', marginBottom: '0.5rem' }}
        >
          Coordinates
        </Typography>
        <Typography variant="body1">
          {site.lat} {site.lng}
        </Typography>
      </Box>
    </Box>
  );
};
