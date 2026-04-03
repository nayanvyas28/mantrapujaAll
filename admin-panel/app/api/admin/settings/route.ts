import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { encryptOTP, decryptOTP } from '@/utils/encryption';

export async function GET() {
    try {
        const supabase = await createClient();

        // Fetch all active settings
        const { data, error } = await supabase
            .from('admin_settings')
            .select('setting_key, encrypted_value');

        if (error) {
            console.error('Error fetching settings:', error);
            return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
        }

        // Decrypt the values before sending them to the UI
        const decryptedSettings = data?.map(setting => {
            let decryptedValue = setting.encrypted_value;
            // Only decrypt keys that we know are encrypted (WhatsApp keys)
            if (setting.setting_key.startsWith('WHATSAPP_')) {
                try {
                    decryptedValue = decryptOTP(setting.encrypted_value);
                } catch (err) {
                    console.error(`Failed to decrypt ${setting.setting_key}`, err);
                    decryptedValue = ''; // Mask or clear on fail
                }
            }
            return { key: setting.setting_key, value: decryptedValue };
        }) || [];

        return NextResponse.json({ data: decryptedSettings }, { status: 200 });

    } catch (error) {
        console.error('Settings GET Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { settings } = body;

        if (!Array.isArray(settings)) {
            return NextResponse.json({ error: 'Invalid payload format. Settings must be an array.' }, { status: 400 });
        }

        const supabase = await createClient();

        for (const setting of settings) {
            const { key, value } = setting;

            if (!key || value === undefined) continue;

            let valueToSave = value;

            // Encrypt WhatsApp related keys before saving
            if (key.startsWith('WHATSAPP_')) {
                valueToSave = encryptOTP(value);
            }

            // Upsert the setting
            const { error } = await supabase
                .from('admin_settings')
                .upsert({ setting_key: key, encrypted_value: valueToSave, updated_at: new Date().toISOString() }, { onConflict: 'setting_key' });

            if (error) {
                console.error(`Failed to upsert setting ${key}:`, error);
                return NextResponse.json({ error: `Failed to save setting ${key}` }, { status: 500 });
            }
        }

        return NextResponse.json({ message: 'Settings encrypted and saved successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Settings POST Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
