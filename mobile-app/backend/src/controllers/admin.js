const { supabase } = require('../utils/supabase');

/**
 * Handle Notification Broadcasts from Admin Panel
 * Expected fields in req.body: { secret, title, message, target_user_id (optional), type, image_url }
 */
const sendCustomNotification = async (req, res) => {
    try {
        const { secret, title, message, target_user_id, type = 'GENERAL', image_url } = req.body;

        // 1. Simple Security Check
        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'mantrapuja-admin-keys';
        if (secret !== ADMIN_SECRET) {
            return res.status(401).json({ error: "Unauthorized access." });
        }

        if (!title || !message) {
            return res.status(400).json({ error: "Title and message are required." });
        }

        // 2. Insert into Supabase `notifications` table so it appears in the App Inbox permanently
        const { data: newNotification, error: dbError } = await supabase
            .from('notifications')
            .insert([{ title, message, target_user_id, type, image_url }])
            .select()
            .single();

        if (dbError) {
            throw new Error(`Database insert failed: ${dbError.message}`);
        }

        // 3. Fetch physical Expo Push Tokens from users who should receive it
        let query = supabase.from('profiles').select('expo_push_token').not('expo_push_token', 'is', null);

        if (target_user_id) {
            query = query.eq('id', target_user_id);
        }

        const { data: users, error: userError } = await query;
        if (userError) throw userError;

        if (!users || users.length === 0) {
            // No registered physical devices, but we did save it to the inbox so return success
            return res.status(200).json({ message: "Notification saved to Inbox (no active push tokens found).", data: newNotification });
        }

        // Extract push tokens
        const pushTokens = users.map(u => u.expo_push_token).filter(token => typeof token === 'string' && token.startsWith('ExpoPushToken'));

        // 4. Batch send tokens through Expo Push API
        let messages = [];
        for (let pushToken of pushTokens) {
            messages.push({
                to: pushToken,
                sound: 'default',
                title: title,
                body: message,
                data: { notificationId: newNotification.id, type },
            });
        }

        // Expo limits batches to 100 max
        let chunks = chunkArray(messages, 100);
        let tickets = [];

        for (let chunk of chunks) {
            try {
                let req = await fetch('https://exp.host/--/api/v2/push/send', {
                    method: 'POST',
                    headers: { 'Accept': 'application/json', 'Accept-encoding': 'gzip, deflate', 'Content-Type': 'application/json' },
                    body: JSON.stringify(chunk)
                });
                let receipt = await req.json();
                tickets.push(receipt);
            } catch (error) {
                console.error("Error sending chunk to Expo:", error);
            }
        }

        return res.status(200).json({
            message: "Push Notifications dispatched successfully!",
            db_record: newNotification,
            tickets,
            devicesAlerted: pushTokens.length
        });

    } catch (err) {
        console.error("Custom Notification Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Utility function to batch array into chunks
 */
function chunkArray(array, size) {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

module.exports = {
    sendCustomNotification
};
