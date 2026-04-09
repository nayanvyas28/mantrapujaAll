const schedule = require('node-schedule');
const { Expo } = require('expo-server-sdk');
const { supabase } = require('../utils/supabase');
const { callInternalAstro } = require('../utils/astroInternal');

let expo = new Expo();
let dailyJob = null;

/**
 * Initializes the notification scheduler by fetching config from Supabase.
 */
async function initializeScheduler() {
    try {
        const { data: settings, error } = await supabase
            .from('kundli_settings')
            .select('setting_value')
            .eq('setting_key', 'notification_config')
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('[NotificationService] Scheduler Init Error:', error);
            return;
        }

        const config = settings?.setting_value || {
            enabled: false,
            schedule_time: '07:00',
            title: 'Auspicious Morning from Mantra Puja',
            body: 'Today is {tithi}. Festivals: {festivals}. Have a blessed day!'
        };

        if (config.enabled) {
            scheduleDailyJob(config.schedule_time, config);
            console.log(`[NotificationService] Daily job scheduled for ${config.schedule_time}`);
        } else {
            console.log('[NotificationService] Daily notifications are currently disabled.');
        }
    } catch (err) {
        console.error('[NotificationService] Critical Scheduler Failure:', err);
    }
}

/**
 * Schedules or reschedules the node-schedule job.
 */
function scheduleDailyJob(timeStr, config) {
    if (dailyJob) {
        dailyJob.cancel();
    }

    const [hour, minute] = timeStr.split(':').map(Number);
    const rule = new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.minute = minute;
    rule.tz = 'Asia/Kolkata'; // Default target timezone

    dailyJob = schedule.scheduleJob(rule, () => sendDailyNotification(config));
}

/**
 * Main logic to fetch data and send notifications to all users.
 */
async function sendDailyNotification(config) {
    console.log('[NotificationService] Starting daily broadcast...');

    try {
        // 1. Fetch Today's Astrology Data
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        let tithiName = 'Unknown';
        try {
            const panchang = await callInternalAstro('panchang/daily', {});
            tithiName = panchang.tithi?.details?.tithi_name || 'Today';
        } catch (e) {
            console.error('[NotificationService] Failed to fetch Tithi:', e.message);
        }

        // 2. Fetch Today's Festivals
        let festivalNames = 'Regular Day';
        const { data: festivals } = await supabase
            .from('festivals')
            .select('name')
            .eq('date', dateStr);
        
        if (festivals && festivals.length > 0) {
            festivalNames = festivals.map(f => f.name).join(', ');
        }

        // 3. Prepare Message
        const title = config.title.replace('{tithi}', tithiName).replace('{festivals}', festivalNames);
        const body = config.body.replace('{tithi}', tithiName).replace('{festivals}', festivalNames);

        // 3.1. Save to Database so it appears in App History
        const { data: dbEntry, error: dbError } = await supabase
            .from('notifications')
            .insert([{
                title,
                message: body,
                type: 'DAILY_SUMMARY',
                // target_user_id is NULL for broadcast
            }])
            .select()
            .single();

        if (dbError) {
            console.error('[NotificationService] Failed to save notification to DB:', dbError.message);
        }

        const notificationId = dbEntry?.id;

        // 4. Fetch User Tokens (Expo)
        const { data: profiles } = await supabase
            .from('profiles')
            .select('expo_push_token')
            .not('expo_push_token', 'is', null);

        if (!profiles || profiles.length === 0) return;

        let messages = [];
        for (let profile of profiles) {
            if (!Expo.isExpoPushToken(profile.expo_push_token)) continue;
            messages.push({
                to: profile.expo_push_token,
                sound: 'default',
                title,
                body,
                data: { notificationId, type: 'DAILY_SUMMARY', date: dateStr }
            });
        }

        // 5. Send in chunks
        let chunks = expo.chunkPushNotifications(messages);
        for (let chunk of chunks) {
            try {
                await expo.sendPushNotificationsAsync(chunk);
            } catch (error) {
                console.error('[NotificationService] Chunk Send Error:', error);
            }
        }

        console.log(`[NotificationService] Successfully sent to ${messages.length} users.`);
    } catch (err) {
        console.error('[NotificationService] Broadcast Failure:', err);
    }
}

/**
 * Public trigger to refresh settings (e.g. after Admin update)
 */
async function refreshSettings() {
    console.log('[NotificationService] Refreshing settings from DB...');
    await initializeScheduler();
}

module.exports = {
    initializeScheduler,
    refreshSettings
};
