import { getSubscriptionsFromDb } from '@/utils/in-memory-db';
import { NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';

export async function GET(_: NextRequest) {
  try {
    const subscriptions = getSubscriptionsFromDb();
    const notifications = subscriptions.map((subscription) => {
      const payload = JSON.stringify({
        title: 'WebPush Notification!',
        body: 'Hello World',
      });
      webPush.sendNotification(subscription, payload);
    });

    await Promise.all(notifications);

    return NextResponse.json({
      message: `${subscriptions.length} messages sent!`,
    });
  } catch (error) {
    console.error(error);
    throw NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
