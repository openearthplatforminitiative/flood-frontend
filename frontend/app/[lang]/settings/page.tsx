import { Box, Button, List, Typography } from '@mui/material';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import SignOutButton from '@/app/components/buttons/SignOutButton';
import Navbar from '@/app/components/Navbar';
import Title from '@/app/components/Title';

const Settings = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 2rem 2.5rem 2rem',
        }}
      >
        <Title dict={dict} />
        <Box sx={{ flexGrow: 1, marginTop: '2rem' }}>
          <Typography
            variant={'h1'}
            sx={{
              fontSize: '2rem',
              marginTop: '1rem',
              marginBottom: '2rem 1rem',
            }}
          >
            {dict.settings.title}
          </Typography>
        </Box>
        <SignOutButton>{dict.signOut}</SignOutButton>
      </Box>
      <Navbar dict={dict} lang={lang} currentPath={`/${lang}/settings`} />
    </Box>
  );
};

export default Settings;