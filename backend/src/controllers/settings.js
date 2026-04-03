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

module.exports = {
    saveSettings,
    getSettings
};
