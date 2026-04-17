const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { supabase } = require('../utils/supabase');
const { decryptOTP } = require('../utils/crypto');

// Optimized POST handler for Guru AI Chat
router.post('/', async (req, res) => {
    try {
        const { message, chatHistory, userId, sessionId: incomingSessionId, skipHistory, language } = req.body;

        const langInst = language === 'hi'
            ? "CRITICAL: The user has selected HINDI as the sacred language for this session. Regardless of the language the user speaks (English, Hinglish, etc.), you MUST respond EXCLUSIVELY in Hindi (Devanagari script) with a polite and divine tone. If the user asks in English, you must translate your guidance into pure Hindi."
            : "CRITICAL: The user has selected ENGLISH as the sacred language for this session. Regardless of the language the user speaks (Hindi, Hinglish, etc.), you MUST respond EXCLUSIVELY in English with a polite and serene spiritual tone. If the user asks in Hindi, you must translate your guidance into pure English.";

        const identifier = userId || incomingSessionId || 'anonymous';
        let sessionId = incomingSessionId;

        // 0. Fetch User Vedic Profile (Memory / Fallback)
        let profileContext = "";
        if (identifier !== 'anonymous') {
            const { data: basicProfile } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', identifier)
                .single();
                
            const uName = basicProfile?.full_name || 'Anonymous';

            const { data: profile } = await supabase
                .from('user_vedic_profiles')
                .select('*')
                .eq('user_id', identifier)
                .single();

            if (profile) {
                profileContext = `
--- USER VEDIC PROFILE (MEMORY) ---
The user is ${profile.full_name || uName}.
Birth Details: ${profile.date_of_birth || 'Unknown DOB'}, ${profile.time_of_birth || 'Unknown Time'}, ${profile.place_of_birth || 'Unknown Place'}.
Gender: ${profile.gender || 'Unknown'}.
Zodiac/Rashi: ${profile.rashi || 'Unknown'}.
Numerology Number: ${profile.numerology_number || 'Unknown'}.
Guru AI Knowledge: You already know this user. Use this data to provide deeply personalized astrological and spiritual guidance. Do not ask for these details again unless they want to update them.
----------------------------------
                `;
            } else {
                const { data: latestKundali } = await supabase
                    .from('user_kundalis')
                    .select('*')
                    .eq('user_id', identifier)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (latestKundali) {
                    profileContext = `
--- USER VEDIC PROFILE (DETECTED) ---
The user is ${latestKundali.full_name || uName}.
Birth Details: ${latestKundali.date_of_birth || 'Unknown DOB'}, ${latestKundali.time_of_birth || 'Unknown Time'}, ${latestKundali.place_of_birth || 'Unknown Place'}.
Gender: ${latestKundali.gender || 'Unknown'}.
Guru AI Knowledge: You have detected an existing Kundali for this user. Use these birth details for analysis.
----------------------------------
                    `;
                    
                    // Sync: Update profile for next time
                    await supabase.from('user_vedic_profiles').upsert({
                        user_id: identifier,
                        full_name: latestKundali.full_name,
                        date_of_birth: latestKundali.date_of_birth,
                        time_of_birth: latestKundali.time_of_birth,
                        place_of_birth: latestKundali.place_of_birth,
                        gender: latestKundali.gender,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' });
                } else {
                    profileContext = `
--- USER VEDIC PROFILE ---
The user's birth details are NOT yet known. 
MISSION: When the user asks for Kundali analysis, you MUST politely ask for these 5 keys: Full Name, Date of Birth, Time of Birth, Place of Birth, and Gender.
--------------------------
                    `;
                }
            }
        } else {
            profileContext = `
--- GUEST MODE (RESTRICTED) ---
The user is a GUEST (Anonymous).
KUNDALI RESTRICTION: If the user asks for Kundali analysis, Horoscope, or deep Personal Astrology, you MUST politely refuse. Tell them: "Jab aap LOGIN karenge, tabhi hum aapki Kundali ke gehre rahasya bata payenge."
ALTERNATIVE SUGGESTIONS: Instead, suggest they ask about mental peace, family harmony, or meanings of sacred mantras.
--------------------------
            `;
        }

        // 0.1 Fetch Puja Catalog
        const { data: allPujas } = await supabase
            .from('poojas')
            .select('name, slug')
            .eq('is_active', true);

        const pujaCatalog = allPujas?.map(p => `- ${p.name} (Link: /pooja-services/${p.slug})`).join('\n') || "Catalog updating...";

        // 1. Fetch encrypted settings
        const { data: settings, error: settingsError } = await supabase
            .from('settings')
            .select('key, value')
            .in('key', ['gemini_api_key', 'gemini_selected_model', 'core_prompt', 'rulebook', 'free_query_limit', 'guest_query_limit', 'chat_reset_hours', 'premium_upsell_message', 'chat_start_instruction', 'chat_end_instruction']);

        if (settingsError) throw settingsError;

        const apiKeyEncrypted = settings?.find(s => s.key === 'gemini_api_key')?.value;
        const selectedModel = settings?.find(s => s.key === 'gemini_selected_model')?.value || 'gemini-1.5-flash';
        const corePrompt = settings?.find(s => s.key === 'core_prompt')?.value || "You are a spiritual guide.";
        const rulebook = settings?.find(s => s.key === 'rulebook')?.value || "";
        const freeQueryLimit = parseInt(settings?.find(s => s.key === 'free_query_limit')?.value || '10', 10);
        const guestQueryLimit = parseInt(settings?.find(s => s.key === 'guest_query_limit')?.value || '3', 10);
        const chatResetHours = parseInt(settings?.find(s => s.key === 'chat_reset_hours')?.value || '3', 10);
        const startInstruction = settings?.find(s => s.key === 'chat_start_instruction')?.value || "";
        const endInstruction = settings?.find(s => s.key === 'chat_end_instruction')?.value || "";

        // 2. Usage Check
        const limit = userId ? freeQueryLimit : guestQueryLimit;
        const { data: usageData } = await supabase
            .from('ai_usage')
            .select('query_count, last_query_at')
            .eq('user_id', identifier)
            .single();

        let currentCount = usageData?.query_count || 0;
        const lastQueryAt = usageData?.last_query_at ? new Date(usageData.last_query_at) : null;
        const now = new Date();

        if (lastQueryAt) {
            const hoursSinceLastQuery = (now.getTime() - lastQueryAt.getTime()) / (1000 * 60 * 60);
            if (hoursSinceLastQuery >= chatResetHours) {
                currentCount = 0;
            }
        }

        if (currentCount >= limit) {
             const waitingText = language === 'hi'
                ? `प्रणाम! गुरु जी अभी गहन ध्यान (meditation) में हैं। कृपया कुछ समय बाद पुनः पधारें। 🙏`
                : `Pranaam! Guru Ji is currently in deep meditation. Please return after some time. 🙏`;
             return res.json({ text: waitingText });
        }

        // 3. API Key Decryption
        if (!apiKeyEncrypted) throw new Error('AI API Key not configured in settings table.');
        const decryptedKey = decryptOTP(apiKeyEncrypted);

        // 4. Gemini API Call
        const systemPrompt = `
${corePrompt}
${langInst}
${profileContext}
--- SACRED RITUAL CATALOG (OFFERINGS) ---
${pujaCatalog}
--- STRICT RULEBOOK & RESTRICTIONS ---
${rulebook}
CRITICAL INSTRUCTIONS:
1. You are Guru AI, the supreme spiritual guide for Mantra Puja.
2. RESPONSE START (DYNAMIC): ${startInstruction}
3. RESPONSE END (DYNAMIC): ${endInstruction}
4. FORMATTING: Use ### H3 for titles, #### H4 for subtopics, and Bullet points (- ) for lists.
5. MISSION: Answer spiritual queries directly. BASE analysis strictly on provided birth details.
6. CONTEXTUAL RECOMMENDATIONS: Append [[PUJA_LINK: Puja Name | slug]] when relevant.
7. KUNDLI FLOW: If data is missing for analysis, append [[START_KUNDLI_FLOW]].
------------------------
        `.trim();

        let apiResponse = null;
        let attempt = 0;
        const maxRetries = 2;

        while (attempt <= maxRetries) {
            const fetchRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${decryptedKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemPrompt }] },
                    contents: [...chatHistory || [], { parts: [{ text: message }] }]
                }),
            });

            apiResponse = await fetchRes.json();
            if (fetchRes.ok) break;

            if ((fetchRes.status === 503 || fetchRes.status === 429) && attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1)));
                attempt++;
                continue;
            }
            throw new Error(apiResponse.error?.message || 'Gemini API connection failed.');
        }

        let aiText = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text || "Guruji is meditating. Try again.";
        
        // 5. Automated Updates & Persistence
        const updateRegex = /\[\[VEDIC_UPDATE:\s*({[\s\S]*?})\]\]/;
        const match = aiText.match(updateRegex);
        if (match && identifier !== 'anonymous') {
            try {
                const updateData = JSON.parse(match[1]);
                await supabase.from('user_vedic_profiles').upsert({
                        user_id: identifier,
                        ...updateData,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' });
            } catch (pErr) { console.error("Update parse error:", pErr); }
        }

        aiText = aiText.replace(updateRegex, "").trim();

        if (!skipHistory) {
            if (!sessionId) {
                const { data: newSession } = await supabase.from('guru_chat_sessions')
                    .insert({ user_id: identifier, title: message.substring(0, 40) })
                    .select().single();
                sessionId = newSession?.id;
            } else {
                await supabase.from('guru_chat_sessions')
                    .update({ last_message_at: new Date().toISOString() })
                    .eq('id', sessionId);
            }

            if (sessionId) {
                await supabase.from('guru_chat_messages').insert([
                    { session_id: sessionId, user_id: identifier, role: 'user', content: message },
                    { session_id: sessionId, user_id: identifier, role: 'model', content: aiText }
                ]);
            }

            await supabase.from('ai_usage').upsert({
                user_id: identifier,
                query_count: currentCount + 1,
                last_query_at: new Date().toISOString()
            }, { onConflict: 'user_id' });
        }

        return res.json({ text: aiText, sessionId });

    } catch (err) {
        console.error("Backend Chat Error:", err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
