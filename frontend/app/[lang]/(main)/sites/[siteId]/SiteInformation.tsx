import { Dict, getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { getUserId } from '@/lib/auth-utils';
import { getSiteForUser } from '@/lib/prisma';
import { typesRenderer } from '@/lib/render-utils';
import { Box, Typography } from '@mui/material';

type SiteInformationProps = {
  siteId: string;
  lang: string;
};

export const SiteInformation = async ({
  siteId,
  lang,
}: SiteInformationProps) => {
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
    <Box sx={{ marginBottom: '1.5rem' }}>
      <Typography>{dict.sites.typeOfSite}</Typography>
      <Typography sx={{ fontSize: '1rem' }}>
        {typesRenderer(site.types, dict)}
      </Typography>
    </Box>
  );
};
