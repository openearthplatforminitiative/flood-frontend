import { Box, Typography } from '@mui/material';
import {
  defaultLocale,
  getDictonaryWithDefault,
  isLang,
} from '@/app/[lang]/dictionaries';
import SignOutButton from '@/app/components/buttons/SignOutButton';
import Header from '@/app/components/Header';
import LanguageDropdown from '@/app/components/LanguageDropdown';

const Settings = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict = getDictonaryWithDefault(lang);
  return (
    <>
      <Header title={dict.settings.title} />
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
