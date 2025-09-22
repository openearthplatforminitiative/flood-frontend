import { Box } from '@mui/material';
import { hasCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import type { Dict } from '@/app/[lang]/dictionaries';
import { getDictonaryWithDefault } from '@/app/[lang]/dictionaries';
import { redirect } from 'next/navigation';
import { getUserId } from '@/lib/auth-utils';
import { getOrCreateUser } from '@/lib/prisma';
import LanguageModal from '../components/LanguageModal';

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const dict: Dict = getDictonaryWithDefault(lang);

  if (hasCookie('language', { cookies })) {
    const userId = await getUserId();

    if (userId) {
      const user = await getOrCreateUser(userId);
      if (user.completedOnboarding) {
        redirect(`/${lang}/sites`);
      } else {
        redirect(`/${lang}/sites`);
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
