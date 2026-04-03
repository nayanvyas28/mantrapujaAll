const { supabase } = require('../utils/supabase');
const { encryptOTP, decryptOTP } = require('../utils/crypto');

/**
 * Handle saving encrypted settings via Admin Panel
 * Expected fields in req.body: { secret, settings } 
 *    where settings is an array like [{ key: "WHATSAPP_API_URL", value: "https://your-api-url.com/api/sendmsg" }]
 */
const saveSettings = async (req, res) => {
    try {
        const { secret, settings } = req.body;

        // Simple Admin Secret Check
        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'mantrapuja-admin-keys';
        if (secret !== ADMIN_SECRET) {
            return res.status(401).json({ error: "Unauthorized access." });
        }

        if (!settings || !Array.isArray(settings)) {
            return res.status(400).json({ error: "Invalid settings format. Must be an array of key-value pairs." });
        }

        const upsertPromises = settings.map(async (setting) => {
            if (!setting.key || !setting.value) return;

            // Secure the credential right away with your AES 16-character key logic from crypto.js
            const encryptedValue = encryptOTP(setting.value);

            return supabase
                .from('admin_settings')
                .upsert(
                    { setting_key: setting.key, encrypted_value: encryptedValue },
                    { onConflict: 'setting_key' }
                );
        });

        await Promise.all(upsertPromises);
        return res.status(200).json({ message: "Settings encrypted and saved successfully!" });

    } catch (err) {
        console.error("Save Settings Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Fetch and completely decrypt existing Admin Settings for display in the Admin Panel
 */
const getSettings = async (req, res) => {
    try {
        const { secret } = req.query;

        // Protect viewing settings with the Admin Secret
        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'mantrapuja-admin-keys';
        if (secret !== ADMIN_SECRET) {
            return res.status(401).json({ error: "Unauthorized access." });
        }

        const { data: settings, error } = await supabase.from('admin_settings').select('setting_key, encrypted_value');

        if (error) throw error;

        // Restore real API endpoints/passwords for the Admin to see
        const decryptedSettings = settings.map((s) => ({
            key: s.setting_key,
            value: decryptOTP(s.encrypted_value) // Converts back into readable format
        }));

        return res.status(200).json({ data: decryptedSettings });

    } catch (err) {
        console.error("Get Settings Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Handle saving complex JSON settings in kundli_settings table
 * This is used for API configs and Notification configs.
 */
const saveKundliSettings = async (req, res) => {
    try {
        const { secret, key, value } = req.body;

        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'mantrapuja-admin-keys';
        if (secret !== ADMIN_SECRET) {
            return res.status(401).json({ error: "Unauthorized access." });
        }

        if (!key || !value) {
            return res.status(400).json({ error: "Key and value are required." });
        }

        const { error } = await supabase
            .from('kundli_settings')
            .upsert({ 
                setting_key: key, 
                setting_value: value, 
                updated_at: new Date().toISOString() 
            }, { onConflict: 'setting_key' });

        if (error) throw error;

        // If it's the notification config, refresh the scheduler
        if (key === 'notification_config') {
            const { refreshSettings } = require('../services/notificationService');
            refreshSettings();
        }

        return res.status(200).json({ message: "Settings saved and synchronized." });

    } catch (err) {
        console.error("Save Kundli Settings Error:", err);
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Get internal kundli_settings (Admin only)
 */
const getKundliSettings = async (req, res) => {
    try {
        const { secret, key } = req.query;
        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'mantrapuja-admin-keys';
        if (secret !== ADMIN_SECRET) {
            return res.status(401).json({ error: "Unauthorized access." });
        }

        const { data, error } = await supabase
            .from('kundli_settings')
            .select('*')
            .eq('setting_key', key)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        return res.status(200).json({ data: data ? data.setting_value : null });
    } catch (err) {
        console.error("Get Kundli Settings Error:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    saveSettings,
    getSettings,
    saveKundliSettings,
    getKundliSettings
};
