'use server';

import { Dict, getDictionaryWithDefault } from '@/app/[lang]/dictionaries';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { typesRenderer } from '@/lib/render-utils';
import { Box, Typography } from '@mui/material';

interface SiteInfoWidgetProps {
  lang: string;
  siteId: string;
}

export const SiteInfoWidget = async ({ siteId, lang }: SiteInfoWidgetProps) => {
  const dict: Dict = getDictionaryWithDefault(lang);
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User not found');
  }
  const site = await getSiteForUser(userId, siteId);
  if (!site) {
    throw new Error('Site not found');
  }

  return (
    <Box className="flex-1 overflow-hidden bg-neutral-95 rounded-xl lg:gap-6">
      <div className="bg-neutral-90 p-4 md:p-6 w-full flex items-center justify-between">
        <Typography variant="h2">Site Information</Typography>
      </div>
      <div className="flex flex-col justify-start items-start p-4 md:p-6 gap-4">
        <Box>
          <Typography
            sx={{
              fontSize: '0.75rem',
              color: '#414942',
              marginBottom: '0.5rem',
            }}
          >
            {dict.sites.typeOfSite}
          </Typography>
          <Typography variant="body1">
            {typesRenderer(site.types, dict)}
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
            Coordinates
          </Typography>
          <Typography variant="body1">
            {site.lat} {site.lng}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};
