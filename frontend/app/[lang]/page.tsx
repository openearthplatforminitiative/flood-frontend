import { Box } from '@mui/material';
import background from '@/public/assets/images/clima_safe.png';
import { hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import type { Dict } from '@/app/[lang]/dictionaries';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth-utils';
import { getOrCreateUser } from '@/lib/prisma';
import Header from '../components/Header';
import LanguageModal from '../components/LanguageModal';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictonaryWithDefault(lang);

  if (hasCookie('language', { cookies })) {
    const userId = await getUserId();

    if (userId) {
      const user = await getOrCreateUser(userId);
      if (user.completedOnboarding) {
        redirect(`/${lang}/sites`);
      } else {
        if (
          user.allowPushNotifications === null ||
          user.allowSMSNotifications === null
        ) {
          redirect(`/${lang}/onboarding/notifications`);
        } else {
          redirect(`/${lang}/onboarding/sites`);
        }
      }
    } else {
      redirect(`/${lang}/sign-in`);
    }
  } else {
    return (
      <Box
        sx={{
          display: 'flex',
          backgroundImage: `url(${background.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Header dict={dict} margin={'0 0 200px 0'} lang={lang} />
        <LanguageModal dict={dict} />
      </Box>
    );
  }
};

export default Home;
