import { defaultLocale, getDictionary, isLang } from '../dictionaries';
import { Box } from '@mui/material';
import Title from '@/app/components/Title';
import background from '@/public/assets/images/start-screen-image.png';
import SignInButton from '@/app/components/buttons/SignInButton';

interface SignInPageProps {
  params: { lang: string };
}

const SignInPage = async ({ params: { lang } }: SignInPageProps) => {
  const dict = getDictionary(isLang(lang) ? lang : defaultLocale);
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: 'no-repeat',
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
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '15px',
        }}
      >
        {dict.signInPage.description}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <SignInButton callbackUrl="/">
          {dict.signIn} / {dict.onBoarding.buttons.createAccount}
        </SignInButton>
      </Box>
    </Box>
  );
};

export default SignInPage;
