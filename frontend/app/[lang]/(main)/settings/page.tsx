import { Box, Typography } from '@mui/material';
import {
  defaultLocale,
  getDictonaryWithDefault,
  isLang,
} from '@/app/[lang]/dictionaries';
import SignOutButton from '@/app/components/buttons/SignOutButton';
import Title from '@/app/components/Title';
import LanguageDropdown from '@/app/components/LanguageDropdown';

const Settings = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);
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
        {dict.settings.title}
      </Typography>
      <Box sx={{ flexGrow: 1, marginTop: '2rem' }}>
        <LanguageDropdown
          dict={dict}
          lang={isLang(lang) ? lang : defaultLocale}
        />
      </Box>
      <SignOutButton callbackUrl={`/${lang}`}>{dict.signOut}</SignOutButton>
    </>
  );
};

export default Settings;
