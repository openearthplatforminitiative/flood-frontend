import {
  deleteSubscriptionFromDb,
  saveSubscriptionToDb,
} from '@/utils/in-memory-db';
import { NextRequest, NextResponse } from 'next/server';
import webPush, { PushSubscription } from 'web-push';

export async function POST(request: NextRequest) {
  try {
    webPush.setVapidDetails(
      'mailto:test@example.com',
      process.env.NOTIFICATION_PUBLIC_KEY ?? '',
      process.env.NOTIFICATION_PRIVATE_KEY ?? ''
    );

    const newSubscription: PushSubscription | undefined = await request.json();
    if (!newSubscription) {
      throw NextResponse.json({
        error: 'Missing push subscription in body ',
        status: 400,
      });
    }

    console.log('Received push subscription to add: ', newSubscription);

    const updatedDb = await saveSubscriptionToDb(newSubscription);
    return NextResponse.json({
      message: 'Push subscription saved',
      status: 200,
      updatedDb,
    });
  } catch (error) {
    console.error(error);
    throw NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    webPush.setVapidDetails(
      'mailto:test@example.com',
      process.env.NOTIFICATION_PUBLIC_KEY ?? '',
      process.env.NOTIFICATION_PRIVATE_KEY ?? ''
    );

    const subscriptionToDelete: PushSubscription | undefined =
      await request.json();
    if (!subscriptionToDelete) {
      throw NextResponse.json({
        error: 'Missing push subscription in body ',
        status: 400,
      });
    }

    console.log('Received push subscription to delete: ', subscriptionToDelete);

    const updatedDb = await deleteSubscriptionFromDb(subscriptionToDelete);
    return NextResponse.json({
      message: 'Push subscription deleted',
      status: 200,
      updatedDb,
    });
  } catch (error) {
    console.error(error);
    throw NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
