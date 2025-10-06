import {
  defaultLocale,
  getDictionaryWithDefault,
  isLang,
} from '../../../utils/dictionaries';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import SignInButton from '@/components/buttons/SignInButton';

interface TokenExpirePageProps {
  params: Promise<{ lang: string }>;
}

const TokenExpiredPage = async ({ params }: TokenExpirePageProps) => {
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
          justifyContent: { xs: 'end', lg: 'start' },
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'end' },
          marginLeft: { lg: '-5%' },
          bgcolor: 'primary.70',
        }}
      >
        <Image
          width={400}
          height={400}
          style={{
            width: '80%',
            maxWidth: '600px',
            height: 'auto',
          }}
          alt="illustration of person"
          src="/assets/images/person-green-transparent.svg"
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'start',
          bgcolor: 'secondary.90',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            flexDirection: 'column',
            gap: ['36px', '32px', '32px', '36px'],
            marginX: ['20px', '20px', '20px', '40px'],
            marginY: '40px',
          }}
        >
          <Typography
            variant="h1"
            sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            Oops
          </Typography>
          <Typography variant="h4">
            {dict.tokenExpiredPage.description}
          </Typography>
          <SignInButton
            callbackUrl={`/${lang}/sites`}
            keycloakLocale={isLang(lang) ? lang : defaultLocale}
          >
            {dict.signBackIn}
          </SignInButton>
        </Box>
      </Box>
    </Box>
  );
};

export default TokenExpiredPage;
