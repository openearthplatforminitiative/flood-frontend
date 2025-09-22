import {
  defaultLocale,
  getDictionaryWithDefault,
  isLang,
} from '../dictionaries';
import { Box, Typography } from '@mui/material';
import SignInButton from '@/app/components/buttons/SignInButton';
import { Water } from '@mui/icons-material';

interface SignInPageProps {
  params: Promise<{ lang: string }>;
}

const SignInPage = async ({ params }: SignInPageProps) => {
  const { lang } = await params;
  const dict = getDictionaryWithDefault(lang);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: ['column', 'column', 'column', 'row'],
        justifyContent: 'stretch',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          backgroundImage: 'url(/assets/images/clima_safe.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'start',
          bgcolor: 'primary.98',
        }}
      >
        <Box
          sx={{
            maxWidth: '800px',
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            gap: ['16px', '32px', '32px', '36px'],
            marginX: ['20px', '20px', '20px', '40px'],
            marginY: '40px',
          }}
        >
          <Typography
            variant="h1"
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <Water sx={{ fontSize: '72px' }} />
            {dict.title}
          </Typography>
          <Typography variant="h2">{dict.signInPage.description}</Typography>
          <SignInButton
            callbackUrl="/"
            keycloakLocale={isLang(lang) ? lang : defaultLocale}
          >
            {dict.signIn} / {dict.onBoarding.buttons.createAccount}
          </SignInButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
