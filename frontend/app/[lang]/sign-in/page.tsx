import {
  defaultLocale,
  getDictonaryWithDefault,
  isLang,
} from '../dictionaries';
import { Box, Typography } from '@mui/material';
import Title from '@/app/components/Title';
import background from '@/public/assets/images/start-screen-image.png';
import SignInButton from '@/app/components/buttons/SignInButton';

interface SignInPageProps {
  params: { lang: string };
}

const SignInPage = async ({ params: { lang } }: SignInPageProps) => {
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
          display: 'flex',
          backgroundImage: `url(${background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '50%',
        }}
      >
        <Title dict={dict} large margin={'0 0 200px 0'} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 2rem 2.5rem 2rem',
        }}
      >
        <Typography sx={{ flexGrow: 1 }}>
          {dict.signInPage.description}
        </Typography>
        <SignInButton
          callbackUrl="/"
          keycloakLocale={isLang(lang) ? lang : defaultLocale}
        >
          {dict.signIn} / {dict.onBoarding.buttons.createAccount}
        </SignInButton>
      </Box>
    </Box>
  );
};

export default SignInPage;
