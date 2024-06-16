import { Box } from '@mui/material';
import LanguageSelectionScreen from '@/app/components/LanguageSelectionScreen';
import { hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import type { Dict } from '@/app/[lang]/dictionaries';
import {
  defaultLocale,
  getDictionary,
  isLang,
} from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth-utils';
import { getOrCreateUser, prisma } from '@/lib/prisma';

const Home = async ({ params: { lang } }: { params: { lang: string } }) => {
  const dict: Dict = getDictionary(isLang(lang) ? lang : defaultLocale);

  if (hasCookie('language', { cookies })) {
    const session = await auth();
    const userId = session.user.id;

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
        width={'100%'}
        height={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <LanguageSelectionScreen dict={dict} />
      </Box>
    );
  }
};

export default Home;
