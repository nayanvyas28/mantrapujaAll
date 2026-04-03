import { createClient } from '@/utils/supabase/server';
import { encrypt } from '@/utils/encryption';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const {
            gemini_api_key,
            gemini_selected_model,
            core_prompt,
            rulebook,
            free_query_limit,
            premium_upsell_message
        } = await request.json();

        // Allow updating any of the configuration flags
        if (gemini_api_key === undefined &&
            gemini_selected_model === undefined &&
            core_prompt === undefined &&
            rulebook === undefined &&
            free_query_limit === undefined &&
            premium_upsell_message === undefined) {
            return NextResponse.json({ error: 'No configuration provided' }, { status: 400 });
        }

        const updates = [];
        const timestamp = new Date().toISOString();

        if (gemini_api_key) {
            updates.push({
                key: 'gemini_api_key',
                value: encrypt(gemini_api_key),
                updated_at: timestamp
            });
        }

        if (gemini_selected_model !== undefined) {
            updates.push({
                key: 'gemini_selected_model',
                value: gemini_selected_model,
                updated_at: timestamp
            });
        }

        if (core_prompt !== undefined) {
            updates.push({
                key: 'core_prompt',
                value: core_prompt,
                updated_at: timestamp
            });
        }

        if (rulebook !== undefined) {
            updates.push({
                key: 'rulebook',
                value: rulebook,
                updated_at: timestamp
            });
        }

        if (free_query_limit !== undefined) {
            updates.push({
                key: 'free_query_limit',
                value: free_query_limit.toString(), // Ensure string for DB
                updated_at: timestamp
            });
        }

        if (premium_upsell_message !== undefined) {
            updates.push({
                key: 'premium_upsell_message',
                value: premium_upsell_message,
                updated_at: timestamp
            });
        }

        // Store in Supabase
        const { error } = await supabase
            .from('settings')
            .upsert(updates, { onConflict: 'key' });

        if (error) {
            console.error('Database error:', error);
            return NextResponse.json({ error: 'Failed to save configuration' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'AI configuration updated successfully' });
    } catch (error: any) {
        console.error('Config API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('settings')
            .select('key, value, updated_at')
            .in('key', [
                'gemini_api_key',
                'gemini_selected_model',
                'core_prompt',
                'rulebook',
                'free_query_limit',
                'premium_upsell_message'
            ]);

        if (error && error.code !== 'PGRST116') {
            return NextResponse.json({ error: 'Failed to fetch configuration status' }, { status: 500 });
        }

        const apiKeySetting = data?.find(s => s.key === 'gemini_api_key');
        const selectedModelSetting = data?.find(s => s.key === 'gemini_selected_model');
        const corePromptSetting = data?.find(s => s.key === 'core_prompt');
        const rulebookSetting = data?.find(s => s.key === 'rulebook');
        const limitSetting = data?.find(s => s.key === 'free_query_limit');
        const upsellSetting = data?.find(s => s.key === 'premium_upsell_message');

        return NextResponse.json({
            isConfigured: !!apiKeySetting,
            selectedModel: selectedModelSetting?.value || null,
            corePrompt: corePromptSetting?.value || '',
            rulebook: rulebookSetting?.value || '',
            freeQueryLimit: limitSetting ? parseInt(limitSetting.value, 10) : 5, // Default to 5
            premiumUpsellMessage: upsellSetting?.value || 'Guruji says you have reached your free query limit. Please upgrade to Pro to unlock unlimited spiritual guidance.',
            updatedAt: apiKeySetting?.updated_at || null
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
