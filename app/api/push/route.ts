import {deleteSubscriptionFromDb, getSubscriptionsFromDb, saveSubscriptionToDb } from '@/app/utils/in-memory-db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const newSubscription: PushSubscription | undefined = await request.json();
        if (!newSubscription) {
            throw NextResponse.json(
                { error: 'Missing push subscription in body ', status: 400}
            );
        }

        console.log("Received push subscription to add: ", newSubscription);

        const updatedDb = await saveSubscriptionToDb(newSubscription)
        return NextResponse.json({ message: 'Push subscription saved', status: 200, updatedDb })
    } catch (error) {
        console.error(error);
        throw NextResponse.json(
        { error: 'Internal server error '},
        {status: 500}
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const subscriptionToDelete: PushSubscription | undefined = await request.json();
        if (!subscriptionToDelete) {
            throw NextResponse.json(
                { error: 'Missing push subscription in body ', status: 400}
            );
        }

        console.log("Received push subscription to delete: ", subscriptionToDelete);

        const updatedDb = await deleteSubscriptionFromDb(subscriptionToDelete)
        return NextResponse.json({ message: 'Push subscription deleted', status: 200, updatedDb })
    } catch(error) {
        console.error(error);
        throw NextResponse.json(
            { error: 'Internal server error '},
            {status: 500}
        );
    }
}

/*
export async function GET() {
    const subscriptions = await getSubscriptionsFromDb()

    subscriptions.forEach((s) => {
        const payload = JSON.stringify({
            title: 'WebPush Notification!',
            body: 'Hello World',
        })
        webpush.sendNotification(s, payload)
    })

    return NextResponse.json({
        message: `${subscriptions.length} messages sent!`,
    })
}*/