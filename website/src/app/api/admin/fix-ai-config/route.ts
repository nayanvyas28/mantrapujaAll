import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { persistSession: false } }
        );

        const geminiKey = process.env.GEMINI_API_KEY;
        const encryptionKey = process.env.ENCRYPTION_STRING_KEY || 'your_encryption_key_here';

        if (!geminiKey || geminiKey.includes('*')) {
            return NextResponse.json({ 
                success: false, 
                error: 'Please set a valid GEMINI_API_KEY in your .env.local first.' 
            }, { status: 400 });
        }

        if (encryptionKey === 'your_encryption_key_here') {
             return NextResponse.json({ 
                success: false, 
                error: 'Please set a real ENCRYPTION_STRING_KEY (16 chars) in your .env.local first.' 
            }, { status: 400 });
        }

        // --- Robust Encryption Logic ---
        const encrypt = (text: string) => {
            // Use SHA-256 to hash the key into a fixed 16-byte buffer for AES-128
            const key = crypto.createHash('sha256').update(encryptionKey).digest().slice(0, 16);
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
            let encrypted = cipher.update(text, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return `${iv.toString('hex')}:${encrypted}`;
        };

        const encryptedKey = encrypt(geminiKey);

        // --- Save to Settings Table ---
        const { error } = await supabase
            .from('settings')
            .upsert({ 
                key: 'gemini_api_key', 
                value: encryptedKey,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

        if (error) throw error;

        return NextResponse.json({
            success: true,
            message: 'Gemini API Key has been encrypted and saved to database settings.',
            hint: 'Your Guru AI Chat should now work perfectly!'
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
