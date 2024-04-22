import { Box, Typography } from '@mui/material';
import {
  defaultLocale,
  Dict,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import { getServerSession } from 'next-auth';
import LogoutButton from '@/app/components/LogoutButton';
import { redirect } from 'next/navigation';

const Sites = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);
  const callBackURL = `/${lang}/onboarding`;
  const session = await getServerSession();

  if (!session) redirect(callBackURL);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        border: '2px solid black',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 32px 40px 32px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          margin: '57px 0 25px 0',
        }}
      >
        <Typography variant={'h5'}>My sites</Typography>
        <LogoutButton callBackURL={callBackURL} />
      </Box>
      {session !== null ? (
        <Box>User logged in: {session?.user?.name}</Box>
      ) : (
        <Box>No user session active</Box>
      )}
    </Box>
  );
};

export default Sites;
