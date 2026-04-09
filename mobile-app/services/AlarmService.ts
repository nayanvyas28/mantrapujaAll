import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const isExpoGo = Constants.appOwnership === 'expo';
let Notifications: any = null;

if (!isExpoGo) {
    try {
        Notifications = require('expo-notifications');
    } catch (error) {
        console.log("Warning: expo-notifications not loaded.");
    }
}

const ALARMS_STORAGE_KEY = 'spiritual_alarms';

export interface Alarm {
    id: string;
    songId: string;
    songTitle: string;
    audioUrl: string;
    imageUrl?: string;
    time: string; // ISO string or HH:mm
    days: number[]; // 0-6 (Sunday-Saturday) - currently focusing on one-time, can expand later
    enabled: boolean;
    notificationId?: string;
}

class AlarmService {
    constructor() {
        if (Notifications) {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                    shouldShowBanner: true,
                    shouldShowList: true,
                    priority: Notifications.AndroidNotificationPriority.MAX,
                }),
            });
        }
    }

    async requestPermissions() {
        if (!Notifications) return false;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        return finalStatus === 'granted';
    }

    async scheduleAlarm(song: any, date: Date): Promise<string | undefined> {
        if (isExpoGo) {
            throw new Error('Alarms are not supported in Expo Go. Please use a development build.');
        }

        if (!Notifications) {
            throw new Error('Notification service is not available.');
        }

        const hasPermission = await this.requestPermissions();
        if (!hasPermission) {
            throw new Error('Notification permissions not granted');
        }

        // Generate unique ID
        const id = Math.random().toString(36).substring(7);

        // Schedule the notification
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: "🪔 Spiritual Alarm",
                body: `Time for your devotional music: ${song.title}`,
                data: { songId: song.id, audioUrl: song.audio_url, type: 'ALARM' },
                sound: true,
                priority: Notifications.AndroidNotificationPriority.MAX,
            },
            trigger: {
                date: date,
            } as any,
        });

        // Save to storage
        const newAlarm: Alarm = {
            id,
            songId: song.id,
            songTitle: song.title,
            audioUrl: song.audio_url,
            imageUrl: song.image_url,
            time: date.toISOString(),
            days: [],
            enabled: true,
            notificationId,
        };

        await this.saveAlarm(newAlarm);
        return notificationId;
    }

    private async saveAlarm(alarm: Alarm) {
        const alarmsStr = await AsyncStorage.getItem(ALARMS_STORAGE_KEY);
        const alarms: Alarm[] = alarmsStr ? JSON.parse(alarmsStr) : [];
        alarms.push(alarm);
        await AsyncStorage.setItem(ALARMS_STORAGE_KEY, JSON.stringify(alarms));
    }

    async getAlarms(): Promise<Alarm[]> {
        const alarmsStr = await AsyncStorage.getItem(ALARMS_STORAGE_KEY);
        return alarmsStr ? JSON.parse(alarmsStr) : [];
    }

    async cancelAlarm(alarmId: string) {
        const alarms = await this.getAlarms();
        const alarm = alarms.find(a => a.id === alarmId);
        if (alarm?.notificationId) {
            await Notifications.cancelScheduledNotificationAsync(alarm.notificationId);
        }
        const updatedAlarms = alarms.filter(a => a.id !== alarmId);
        await AsyncStorage.setItem(ALARMS_STORAGE_KEY, JSON.stringify(updatedAlarms));
    }

    async cancelAllAlarms() {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await AsyncStorage.removeItem(ALARMS_STORAGE_KEY);
    }
}

export const alarmService = new AlarmService();
