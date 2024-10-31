import { getDictonaryWithDefault, type Dict } from '@/app/[lang]/dictionaries';
import NotificationsForm from '@/app/components/forms/NotificationsForm';
import IconHeader from '@/app/components/onboarding/IconHeader';
import { getUserId } from '@/lib/auth-utils';
import { getUser } from '@/lib/prisma';
import { ArrowBack, SpeakerPhone } from '@mui/icons-material';
import { Box } from '@mui/material';

const NotificationsPermissionsPage = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  const dict: Dict = getDictonaryWithDefault(lang);
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  const user = await getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '32px 32px 40px 32px',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <IconHeader
          text={dict.onBoarding.allowNotifications}
          icon={<SpeakerPhone />}
        />
        <NotificationsForm
          initialAllowWebPush={!!user.allowPushNotifications}
          initialAllowSms={!!user.allowSMSNotifications}
          redirectPath={`/${lang}/onboarding/sites`}
          dict={dict}
        />
      </Box>
    </Box>
  );
};

export default NotificationsPermissionsPage;
