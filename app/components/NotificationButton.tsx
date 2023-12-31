'use client';
import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import {
  getCurrentPushSubscription,
  getPushNotificationFromServer,
  registerPushNotifications,
  unregisterPushNotifications,
} from '@/app/notifications/pushService';
import { useEffect, useState } from 'react';
import { registerServiceWorker } from '@/utils/serviceWorker';
import type { Dict } from '@/app/[lang]/dictionaries';

interface NotificationProps {
  dict: Dict;
}

const NotificationButton = ({ dict }: NotificationProps) => {
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>();
  const handleSendNotification = async () => {
    try {
      if (hasActivePushSubscription) {
        await getPushNotificationFromServer();
      }
    } catch (error) {
      console.error(error);
      if (hasActivePushSubscription && Notification.permission === 'denied') {
        alert('Please enable push notifications in your browser settings');
      } else {
        alert('Something went wrong, please try again.');
      }
    }
  };

  useEffect(() => {
    const getActivePushSubscription = async () => {
      const activeSubscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!activeSubscription);
    };
    getActivePushSubscription();

    const setUpServiceWorker = async () => {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.error(error);
      }
    };
    setUpServiceWorker();
  }, []);

  const PushSubscriptionToggleButton = () => {
    const setPushNotificationsEnabled = async (enabled: boolean) => {
      try {
        if (enabled) {
          await registerPushNotifications();
        } else {
          await unregisterPushNotifications();
        }
        setHasActivePushSubscription(enabled);
      } catch (error) {
        console.error(error);
        if (enabled && Notification.permission === 'denied') {
          alert('Please enable push notifications in your browser settings');
        } else {
          alert('Something went wrong, please try again.');
        }
      }
    };

    if (hasActivePushSubscription === undefined) return null;

    return (
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={hasActivePushSubscription}
              onChange={() =>
                setPushNotificationsEnabled(!hasActivePushSubscription)
              }
            />
          }
          label={
            hasActivePushSubscription
              ? 'Disable push notifications'
              : 'Enable push notifications'
          }
        />
      </Box>
    );
  };
  return (
    <Box sx={{ width: 'fit-content', mt: 20, p: 5, border: '1px solid black' }}>
      <PushSubscriptionToggleButton />
      <Button
        disabled={!hasActivePushSubscription}
        variant={'contained'}
        onClick={() => handleSendNotification()}
      >
        {dict.notifications.sendNotification}
      </Button>
    </Box>
  );
};

export default NotificationButton;
