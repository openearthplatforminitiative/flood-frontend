'use client';

import { Dict } from '@/app/[lang]/dictionaries';
import { submitPushPermissions } from '@/app/actions';
import { Switch, Box, Button } from '@mui/material';
import { useState } from 'react';

interface NotificationFormProps {
  initialAllowWebPush: boolean;
  initialAllowSms: boolean;
  dict: Dict;
  onSuccess: () => void;
}

const NotificationForm = ({
  initialAllowWebPush,
  initialAllowSms,
  dict,
  onSuccess,
}: NotificationFormProps) => {
  const [allowWebPush, setAllowWebPush] = useState(initialAllowWebPush);
  const [allowSms, setAllowSms] = useState(initialAllowSms);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitPushPermissions(allowWebPush, allowSms);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error updating push permissions:', error);
    } finally {
      setLoading(false);
    }
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
