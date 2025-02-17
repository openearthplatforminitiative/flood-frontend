import { Box } from '@mui/material';
import { hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import type { Dict } from '@/app/[lang]/dictionaries';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth-utils';
import { getOrCreateUser } from '@/lib/prisma';
import LanguageModal from '../components/LanguageModal';
import { OnboardingModal } from '../components/onboarding/OnboardingModal';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  let showOnboardingModal = false;

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
          redirect(`/${lang}/sites`);
          showOnboardingModal = true;
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
          backgroundImage: `url(/assets/images/clima_safe.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <LanguageModal dict={dict} />
      </Box>
    );
  }
};

export default Home;
