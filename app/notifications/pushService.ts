import { getReadyServiceWorker } from "../utils/serviceWorker"

export const getCurrentPushSubscription = async (): Promise<PushSubscription | null> => {
    const serviceWorker = await getReadyServiceWorker();
    return serviceWorker.pushManager.getSubscription();
}

export const registerPushNotifications = async () => {
    if (!('PushManager' in window)) {
        throw Error("Push notifications are not supported by this browser")
    }

    const existingSubscription = await getCurrentPushSubscription();
    if(existingSubscription) {
       throw Error("Existing push subscription found")
    }

    const serviceWorker = await getReadyServiceWorker();
    const subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_NOTIFICATION_PUBLIC_KEY
    })

    await sendPushSubscriptionToServer(subscription);
}
export const unregisterPushNotifications = async () => {
    const existingSubscription = await getCurrentPushSubscription();

    if(!existingSubscription) {
        throw Error("No existing push subscription found")
    }

    await deletePushSubscriptionFromServer(existingSubscription);
    await existingSubscription.unsubscribe();
}

export const sendPushSubscriptionToServer = async (subscription: PushSubscription) => {
    const response = await fetch("/api/register-push", { //Endpoint to be added later
            method: 'POST',
            body: JSON.stringify(subscription)
        })
    if(!response.ok) {
        throw Error('Failed to send push subscription to server');
    }
}

export const deletePushSubscriptionFromServer = async (subscription: PushSubscription) => {
    const response = await fetch("/api/register-push", { //Endpoint to be added later
        method: 'DELETE',
        body: JSON.stringify(subscription)
    })
    if(!response.ok) {
        throw Error('Failed to delete push subscription from server');
    }}