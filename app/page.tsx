'use client'
import { useEffect, useState } from "react";
import { registerServiceWorker } from "./utils/serviceWorker";
import {Box, Button, FormControlLabel, Switch, Typography } from "@mui/material";
import {
    getCurrentPushSubscription, getPushNotificationFromServer,
    registerPushNotifications,
    unregisterPushNotifications
} from "./notifications/pushService";

const Home = () => {
    const [hasActivePushSubscription, setHasActivePushSubscription] = useState<boolean>();

    useEffect(() => {
        const getActivePushSubscription = async () => {
            const activeSubscription = await getCurrentPushSubscription();
            setHasActivePushSubscription(!!activeSubscription);
        }
        getActivePushSubscription();
    }, []);

    useEffect(() => {
        const  setUpServiceWorker = async () => {
            try {
                await registerServiceWorker();
            } catch ( error ) {
                console.error(error);
            }
        }
        setUpServiceWorker();
    }, []);

    const PushSubscriptionToggleButton = () => {

        const setPushNotificationsEnabled = async (enabled: boolean) => {
            try {
                if(enabled) {
                    await registerPushNotifications();
                } else {
                    await unregisterPushNotifications();
                }
                setHasActivePushSubscription(enabled);
            } catch (error) {
                console.error(error);
                if(enabled && Notification.permission === 'denied') {
                    alert('Please enable push notifications in your browser settings')
                } else {
                    alert('Something went wrong, please try again.')
                }
            }
        }

        if(hasActivePushSubscription === undefined) return null;

        return (
            <Box>
                <FormControlLabel control={<Switch checked={hasActivePushSubscription} onChange={() => setPushNotificationsEnabled(!hasActivePushSubscription)}/>} label={hasActivePushSubscription ? 'Disable push notifications' : "Enable push notifications"} />
            </Box>
        )
    }

    const handleSendNotification = async () => {
        try {
            if(hasActivePushSubscription) {
                await getPushNotificationFromServer();
            }
        } catch (error) {
            console.error(error);
            if(hasActivePushSubscription && Notification.permission === 'denied') {
                alert('Please enable push notifications in your browser settings')
            } else {
                alert('Something went wrong, please try again.')
            }
        }
    }

    return (
        <Box width={'100%'}>
            <Typography variant={'h1'}>Floodsafe</Typography>
            <Box sx={{ width: 'fit-content' ,mt: 20, p: 5, border: '1px solid black'}}>
            <PushSubscriptionToggleButton/>
            <Button disabled={!hasActivePushSubscription} variant={'contained'} onClick={() => handleSendNotification()}>Send notification!</Button>
            </Box>
        </Box>
    )
}

export default Home;
