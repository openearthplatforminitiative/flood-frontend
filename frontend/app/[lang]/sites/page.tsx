import { Box, Button, List, Typography } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import Title from '@/app/components/Title';
import { getUserId } from '@/lib/auth-utils';
import { getUserIncludingSites } from '@/lib/prisma';
import SiteListItem from '@/app/components/SiteListItem';
import Link from 'next/link';
import { Add } from '@mui/icons-material';

const Sites = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);

  const userId = await getUserId();
  if (!userId) redirect('/');

  const user = await getUserIncludingSites(userId);
  if (!user) redirect('/');

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
        <Box
          sx={{
            backgroundColor: '#E7E9E4',
            padding: '1rem',
            borderRadius: '0.75rem',
          }}
        >
          At the moment we are not receiving any flood warnings associated with
          your sites.
        </Box>

        <List>
          <List>
            {user.sites.map((site) => (
              <SiteListItem
                key={site.id}
                dict={dict}
                href={`/${lang}/sites/${site.id}`}
                site={site}
              />
            ))}
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
