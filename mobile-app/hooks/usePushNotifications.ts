import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { supabase } from '../utils/supabase';

const isExpoGo = Constants.appOwnership === 'expo';

let Notifications: any = null;

if (!isExpoGo) {
    try {
        Notifications = require('expo-notifications');
        // Behavior for how incoming notifications should behave when app is foregrounded
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
                shouldShowBanner: true,
                shouldShowList: true,
            }),
        });
    } catch (error) {
        console.log("Warning: expo-notifications not loaded in this environment.");
    }
}

export const usePushNotifications = () => {
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
    const [notification, setNotification] = useState<any | undefined>();

    const notificationListener = useRef<any | null>(null);
    const responseListener = useRef<any | null>(null);

    useEffect(() => {
        let isMounted = true;

        const setupNotifications = async () => {
            const token = await registerForPushNotificationsAsync();
            if (token && isMounted) {
                setExpoPushToken(token);
                // Fire and forget, don't await the DB update to block the hook
                storeTokenInSupabase(token);
            }
        };

        setupNotifications();

        if (Notifications) {
            notificationListener.current = Notifications.addNotificationReceivedListener((notification: any) => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener((response: any) => {
                const { songId, audioUrl, type } = response.notification.request.content.data;
                console.log("User tapped notification. Type:", type);

                if (type === 'ALARM') {
                    // Navigate to music tab with song details
                    router.push({
                        pathname: '/music',
                        params: { songId, audioUrl, autoPlay: 'true' }
                    });
                } else {
                    // General fallback: Go to notifications history
                    router.push('/notifications');
                }
            });
        }

        return () => {
            isMounted = false;
            if (notificationListener.current) notificationListener.current.remove();
            if (responseListener.current) responseListener.current.remove();
        };
    }, []);

    const storeTokenInSupabase = async (token: string) => {
        // Now storing real tokens even in Expo Go

        try {
            // Use a short timeout for the session check
            const sessionPromise = supabase.auth.getSession();
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject('timeout'), 5000));
            
            const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;
            
            if (session?.user?.id) {
                await supabase
                    .from('profiles')
                    .update({ expo_push_token: token })
                    .eq('id', session.user.id);
                console.log("Successfully stored Push Token in Supabase Profiles");
            }
        } catch (error) {
            // Non-critical: ignore timeouts or errors in push registration
            if (error !== 'timeout') console.error("Error storing push token in DB:", error);
        }
    };

    return {
        expoPushToken,
        notification,
    };
};

async function registerForPushNotificationsAsync() {
    let token;

    try {
        if (!Notifications) return undefined;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                console.log('Push Provider Error: User denied push notification permissions.');
                return undefined;
            }

            const projectId = "6cb5cb96-7d37-4911-b040-3ee0cbee926f"; // Corrected Project ID from app.json
            token = (await Notifications.getExpoPushTokenAsync({
                projectId,
            })).data;
            console.log("Successfully generated real Push Token:", token);
        } else {
            console.log('Must use physical device for real Push Notifications.');
        }
    } catch (error: any) {
        // Safe-Mode Fallback: Expo Go (SDK 53+) no longer supports remote notifications for Android
        if (error?.message?.includes('removed from Expo Go')) {
            console.warn("⚠️ [SafeMode] Expo Go SDK limitation detected. Using mock token for stability.");
            console.warn("To test real notifications, please use a Development Build.");
        } else {
            console.error("Failed to register for push notifications:", error);
        }
        
        // Return a mock token to prevent app crashes and allow testing of other features
        return `ExpoPushToken[mock-safe-mode-${Date.now()}]`;
    }

    return token;
}
