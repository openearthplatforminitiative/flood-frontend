import { getReadyServiceWorker } from '@/utils/serviceWorker';

export const getCurrentPushSubscription =
  async (): Promise<PushSubscription | null> => {
    const serviceWorker = await getReadyServiceWorker();
    return serviceWorker.pushManager.getSubscription();
  };

export const registerPushNotifications = async () => {
  if (!('PushManager' in window)) {
    throw Error('Push notifications are not supported by this browser');
  }

  const existingSubscription = await getCurrentPushSubscription();
  if (existingSubscription) {
    throw Error('Existing push subscription found');
  }

  const serviceWorker = await getReadyServiceWorker();
  const subscription = await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.NOTIFICATION_PUBLIC_KEY,
  });

  await sendPushSubscriptionToServer(subscription);
};
export const unregisterPushNotifications = async () => {
  const existingSubscription = await getCurrentPushSubscription();

  if (!existingSubscription) {
    throw Error('No existing push subscription found');
  }

  await deletePushSubscriptionFromServer(existingSubscription);
  await existingSubscription.unsubscribe();
};

export const sendPushSubscriptionToServer = async (
  subscription: PushSubscription
) => {
  const response = await fetch('/api/push-subscriptions', {
    method: 'POST',
    body: JSON.stringify(subscription),
  });
  if (!response.ok) {
    throw Error('Failed to send push subscription to server');
  }
};

export const deletePushSubscriptionFromServer = async (
  subscription: PushSubscription
) => {
  const response = await fetch('/api/push-subscriptions', {
    method: 'DELETE',
    body: JSON.stringify(subscription),
  });
  if (!response.ok) {
    throw Error('Failed to delete push subscription from server');
  }
};

export const getPushNotificationFromServer = async () => {
  const response = await fetch('/api/push-notifications', {
    method: 'GET',
  });
  if (!response.ok) {
    throw Error('Failed to send push notification');
  }
};
