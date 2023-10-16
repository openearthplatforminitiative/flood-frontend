import { getSubscriptionsFromDb } from "@/utils/in-memory-db";
import {NextRequest, NextResponse } from "next/server";
import webPush, { PushSubscription } from 'web-push';

export async function GET(_: NextRequest) {
    try{
        const subscriptions = getSubscriptionsFromDb();
        const notifications = subscriptions.map((subscription) => { //Noe som ikke funker her. Notification blir ikke sendt
            const payload = JSON.stringify({
                title: 'WebPush Notification!',
                body: 'Hello World',
            })
            webPush.sendNotification(subscription, payload)
        })

        await Promise.all(notifications);

        return NextResponse.json({
            message: `${subscriptions.length} messages sent!`,
        })
    } catch(error) {
        console.error(error);
        throw NextResponse.json(
            { error: 'Internal server error '},
            {status: 500}
        );
    }
}