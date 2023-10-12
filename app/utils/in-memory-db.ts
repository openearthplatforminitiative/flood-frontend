import {PushSubscription as DatabasePushSubscription} from 'web-push';

type DummyDb = {
    subscriptions: DatabasePushSubscription[]
}

export const dummyDb: DummyDb = { subscriptions: [] }

// fake Promise to simulate async call
export const saveSubscriptionToDb = async (
    subscription: DatabasePushSubscription
): Promise<DummyDb> => {
    dummyDb.subscriptions.push(subscription)
    return Promise.resolve(dummyDb);
}

export const deleteSubscriptionFromDb = async (subscription: DatabasePushSubscription): Promise<DummyDb> => {
    const updatedSubscriptions = dummyDb.subscriptions.filter((oldSubscription) => subscription.endpoint !== oldSubscription.endpoint);
    dummyDb.subscriptions = updatedSubscriptions;
    return Promise.resolve(dummyDb);
}

export const getSubscriptionsFromDb = () => {
    return dummyDb.subscriptions;
}