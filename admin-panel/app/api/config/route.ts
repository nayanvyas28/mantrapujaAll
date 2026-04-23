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
            guest_query_limit,
            chat_reset_hours,
            premium_upsell_message,
            referral_message,
            referral_bonus_referrer,
            referral_bonus_referred,
            chat_start_instruction,
            chat_end_instruction
        } = await request.json();

        // Allow updating any of the configuration flags
        if (gemini_api_key === undefined &&
            gemini_selected_model === undefined &&
            core_prompt === undefined &&
            rulebook === undefined &&
            free_query_limit === undefined &&
            guest_query_limit === undefined &&
            chat_reset_hours === undefined &&
            premium_upsell_message === undefined &&
            referral_message === undefined &&
            referral_bonus_referrer === undefined &&
            referral_bonus_referred === undefined &&
            chat_start_instruction === undefined &&
            chat_end_instruction === undefined) {
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
                value: free_query_limit.toString(),
                updated_at: timestamp
            });
        }

        if (guest_query_limit !== undefined) {
            updates.push({
                key: 'guest_query_limit',
                value: guest_query_limit.toString(),
                updated_at: timestamp
            });
        }

        if (chat_reset_hours !== undefined) {
            updates.push({
                key: 'chat_reset_hours',
                value: chat_reset_hours.toString(),
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

        if (referral_message !== undefined) {
            updates.push({
                key: 'referral_message',
                value: referral_message,
                updated_at: timestamp
            });
        }

        if (referral_bonus_referrer !== undefined) {
            updates.push({
                key: 'referral_bonus_referrer',
                value: referral_bonus_referrer.toString(),
                updated_at: timestamp
            });
        }

        if (referral_bonus_referred !== undefined) {
            updates.push({
                key: 'referral_bonus_referred',
                value: referral_bonus_referred.toString(),
                updated_at: timestamp
            });
        }

        if (chat_start_instruction !== undefined) {
            updates.push({
                key: 'chat_start_instruction',
                value: chat_start_instruction,
                updated_at: timestamp
            });
        }

        if (chat_end_instruction !== undefined) {
            updates.push({
                key: 'chat_end_instruction',
                value: chat_end_instruction,
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
    } catch (error) {
        console.error('Config API Error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
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
                'guest_query_limit',
                'chat_reset_hours',
                'premium_upsell_message',
                'referral_message',
                'referral_bonus_referrer',
                'referral_bonus_referred',
                'chat_start_instruction',
                'chat_end_instruction'
            ]);

        if (error && error.code !== 'PGRST116') {
            return NextResponse.json({ error: 'Failed to fetch configuration status' }, { status: 500 });
        }

        const apiKeySetting = data?.find(s => s.key === 'gemini_api_key');
        const selectedModelSetting = data?.find(s => s.key === 'gemini_selected_model');
        const corePromptSetting = data?.find(s => s.key === 'core_prompt');
        const rulebookSetting = data?.find(s => s.key === 'rulebook');
        const limitSetting = data?.find(s => s.key === 'free_query_limit');
        const guestLimitSetting = data?.find(s => s.key === 'guest_query_limit');
        const resetHoursSetting = data?.find(s => s.key === 'chat_reset_hours');
        const upsellSetting = data?.find(s => s.key === 'premium_upsell_message');
        const referralSetting = data?.find(s => s.key === 'referral_message');
        const refBonusReferrerSetting = data?.find(s => s.key === 'referral_bonus_referrer');
        const refBonusReferredSetting = data?.find(s => s.key === 'referral_bonus_referred');
        const startInstSetting = data?.find(s => s.key === 'chat_start_instruction');
        const endInstSetting = data?.find(s => s.key === 'chat_end_instruction');

        return NextResponse.json({
            isConfigured: !!apiKeySetting,
            selectedModel: selectedModelSetting?.value || null,
            corePrompt: corePromptSetting?.value || '',
            rulebook: rulebookSetting?.value || '',
            freeQueryLimit: limitSetting ? parseInt(limitSetting.value, 10) : 10, 
            guestQueryLimit: guestLimitSetting ? parseInt(guestLimitSetting.value, 10) : 3,
            chatResetHours: resetHoursSetting ? parseInt(resetHoursSetting.value, 10) : 3,
            premiumUpsellMessage: upsellSetting?.value || 'Guruji says you have reached your free query limit. Please upgrade to Pro to unlock unlimited spiritual guidance.',
            referralMessage: referralSetting?.value || 'Join me on Mantra Puja and unlock your spiritual journey! Use my referral code ${referralCode} to join.\n\nDownload now: https://mantrapuja.com/app',
            referralBonusReferrer: refBonusReferrerSetting ? parseInt(refBonusReferrerSetting.value, 10) : 500,
            referralBonusReferred: refBonusReferredSetting ? parseInt(refBonusReferredSetting.value, 10) : 100,
            chatStartInstruction: startInstSetting?.value || '',
            chatEndInstruction: endInstSetting?.value || '',
            updatedAt: apiKeySetting?.updated_at || null
        });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
    }
}
