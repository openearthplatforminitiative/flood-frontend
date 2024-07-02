'use client';

import { Dict } from '@/app/[lang]/dictionaries';
import { submitPushPermissions } from '@/app/actions';
import { Switch, Box, Button } from '@mui/material';
import { useState } from 'react';

interface NotificationFormProps {
  initialAllowWebPush: boolean;
  initialAllowSms: boolean;
  redirectPath: string;
  dict: Dict;
}

const NotificationForm = ({
  initialAllowWebPush,
  initialAllowSms,
  redirectPath,
  dict,
}: NotificationFormProps) => {
  const [allowWebPush, setAllowWebPush] = useState(initialAllowWebPush);
  const [allowSms, setAllowSms] = useState(initialAllowSms);

  const handleSubmit = () => {
    submitPushPermissions(allowWebPush, allowSms, redirectPath);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {dict.onBoarding.allowNotifications}
        <Switch
          checked={allowWebPush || allowSms}
          onChange={() => {
            const nextValue = !allowWebPush && !allowSms;
            setAllowSms(nextValue);
            setAllowWebPush(nextValue);
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: '15px',
        }}
      >
        {dict.onBoarding.allowPushNotifications}
        <Switch
          checked={allowWebPush}
          onChange={(e) => setAllowWebPush(e.target.checked)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: '15px',
        }}
      >
        {dict.onBoarding.allowSMSNotifications}
        <Switch
          checked={allowSms}
          onChange={(e) => setAllowSms(e.target.checked)}
        />
      </Box>
      <Button
        variant={'contained'}
        sx={{ marginTop: '55px', width: '100%' }}
        onClick={handleSubmit}
      >
        {dict.onBoarding.buttons.nextStep}
      </Button>
    </Box>
  );
};

export default NotificationForm;
