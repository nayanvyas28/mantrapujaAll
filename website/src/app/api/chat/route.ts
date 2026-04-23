import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { HoroscopeService } from '@/lib/horoscopeService';
import { PanchangService } from '@/lib/panchangService';

// Setup Supabase Admin (Bypass RLS to get settings)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, chatHistory, userId, sessionId: incomingSessionId, skipHistory, language, templateInstruction } = body;

        const langInst = language === 'hi'
            ? "CRITICAL: The user has selected HINDI as the sacred language for this session. Regardless of the language the user speaks (English, Hinglish, etc.), you MUST respond EXCLUSIVELY in Hindi (Devanagari script) with a polite and divine tone. If the user asks in English, you must translate your guidance into pure Hindi."
            : "CRITICAL: The user has selected ENGLISH as the sacred language for this session. Regardless of the language the user speaks (Hindi, Hinglish, etc.), you MUST respond EXCLUSIVELY in English with a polite and serene spiritual tone. If the user asks in Hindi, you must translate your guidance into pure English.";

        const identifier = userId || incomingSessionId || 'anonymous';
        let sessionId = incomingSessionId;

        // 0. Fetch User Vedic Profile & FULL Kundali Analysis Data
        let profileContext = "";
        if (identifier !== 'anonymous') {
            const { data: basicProfile } = await supabaseAdmin
                .from('profiles')
                .select('full_name')
                .eq('id', identifier)
                .single();
                
            const uName = basicProfile?.full_name || 'Anonymous';

            // Get the MOST RECENT and COMPLETE Kundali data for deep analysis
            const { data: latestKundali } = await supabaseAdmin
                .from('user_kundalis')
                .select('*')
                .eq('user_id', identifier)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (latestKundali) {
                // Ensure we update the Vedic Profile for consistency
                await supabaseAdmin.from('user_vedic_profiles').upsert({
                    user_id: identifier,
                    full_name: latestKundali.full_name,
                    date_of_birth: latestKundali.date_of_birth,
                    time_of_birth: latestKundali.time_of_birth,
                    place_of_birth: latestKundali.place_of_birth,
                    gender: latestKundali.gender,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'user_id' });

                profileContext = `
--- USER VEDIC PROFILE & FULL KUNDALI ANALYSIS ---
User Name: ${latestKundali.full_name || uName}
Birth Details: ${latestKundali.date_of_birth}, ${latestKundali.time_of_birth}, ${latestKundali.place_of_birth}
Gender: ${latestKundali.gender || 'Unknown'}

KUNDALI DATA (RAW ANALYSIS FROM VEDALUNA):
${JSON.stringify(latestKundali.full_data || {}, null, 2)}

STRICT MISSION:
1. Deeply analyze the "KUNDALI DATA" block above (Planet positions, Lagna, Houses, etc.) before answering.
2. DO NOT echo the user's input or intent as a title (Avoid: "Priya [Input]"). 
3. Start directly with a divine planetary insight.
4. Your analysis must be based on the RAW JSON above, not generic knowledge.
--------------------------------------------------
                `;
            } else {
                profileContext = `
--- USER VEDIC PROFILE (MISSING) ---
The user is ${uName}, but their birth chart is NOT in our sacred records.
STRICT MISSION: You are NOT allowed to give any specific astrological predictions. 
You MUST politely explain that you need their birth details to provide accurate divine guidance. 
TAG REQUIRED: ALWAYS append [[START_KUNDLI_FLOW]] after asking for their details.
------------------------------------
                `;
            }
        } else {
            profileContext = `
--- GUEST MODE (RESTRICTED) ---
The user is a GUEST.
STRICT MISSION: Tell them "Jab aap LOGIN karenge, tabhi hum aapki Kundali ke gehre rahasya bata payenge." 
Focus ON guest-friendly topics like general Puja or Mantras.
--------------------------
            `;
        }

        // 0.1 Fetch Puja Catalog (Knowledge)
        const { data: allPujas } = await supabaseAdmin
            .from('poojas')
            .select('name, slug')
            .eq('is_active', true);

        const pujaCatalog = allPujas?.map(p => `- ${p.name} (Link: /pooja-services/${p.slug})`).join('\n') || "Catalog updating...";

        // 0.2 Check for Horoscope Intent & Fetch Data
        let horoscopeContext = "";
        const lowerMsg = message.toLowerCase();
        const horoscopeKeywords = ['rashifal', 'horoscope', 'rashi phal', 'aaj ka din', 'weekly forecast', 'monthly forecast', 'yearly forecast'];
        const matchesHoroscope = horoscopeKeywords.some(key => lowerMsg.includes(key));

        if (matchesHoroscope) {
            // Determine sign: 1. From message, 2. From profile rashi
            const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            const hindiSigns: Record<string, string> = {
                'mesh': 'aries', 'vrishabh': 'taurus', 'mithun': 'gemini', 'kark': 'cancer', 'singh': 'leo', 'kanya': 'virgo',
                'tula': 'libra', 'vrischika': 'scorpio', 'vrischick': 'scorpio', 'dhanu': 'sagittarius', 'makar': 'capricorn', 'kumbh': 'aquarius', 'meen': 'pisces'
            };

            let targetSign = signs.find(s => lowerMsg.includes(s));
            if (!targetSign) {
                const hindiMatch = Object.keys(hindiSigns).find(h => lowerMsg.includes(h));
                if (hindiMatch) targetSign = hindiSigns[hindiMatch];
            }

            // Fallback to profile moon sign (rashi) if logged in
            if (!targetSign && identifier !== 'anonymous') {
                const { data: kundali } = await supabaseAdmin
                    .from('user_kundalis')
                    .select('full_data')
                    .eq('user_id', identifier)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();
                
                const rashi = (kundali?.full_data as any)?.rashi?.toLowerCase() || (kundali?.full_data as any)?.moon_sign?.toLowerCase();
                if (rashi && signs.includes(rashi)) targetSign = rashi;
            }

            // Determine period
            let period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily';
            if (lowerMsg.includes('week')) period = 'weekly';
            else if (lowerMsg.includes('month')) period = 'monthly';
            else if (lowerMsg.includes('year')) period = 'yearly';

            if (targetSign) {
                try {
                    const hData = await HoroscopeService.getHoroscope(targetSign, period);
                    horoscopeContext = `
--- REAL-TIME HOROSCOPE DATA (ASTROSAGE) ---
Sign: ${targetSign}
Period: ${period}
Date/Label: ${hData.date_label || 'Current'}
Main Prediction: ${hData.content}
${hData.lucky_number ? `Lucky Number: ${hData.lucky_number}` : ''}
${hData.lucky_color ? `Lucky Color: ${hData.lucky_color}` : ''}
${hData.remedy ? `Remedy: ${hData.remedy}` : ''}
${hData.sections?.map(s => `Section [${s.heading}]: ${s.body}`).join('\n') || ''}
${hData.ratings?.map(r => `Rating - ${r.label}: ${r.score}/5`).join('\n') || ''}
--------------------------------------------
                    `;
                } catch (hErr) {
                    console.error("Chat API: Horoscope fetch failed:", hErr);
                }
            }
        }

        // 0.3 Fetch Panchang Data (ALWAYS for real-time context)
        let panchangContext = "";
        try {
            const pData = await PanchangService.getTodayPanchang();
            panchangContext = `
--- REAL-TIME VEDIC PANCHANG (MANDATORY CONTEXT) ---
Current Date: ${pData.reference_date}
Daily Pillars: Tithi: ${pData.panchang_for_today?.tithi || 'Analyze'}, Nakshatra: ${pData.panchang_for_today?.nakshatra || 'Analyze'}, Yog: ${pData.panchang_for_today?.yog || 'Analyze'}
Sun/Moon Status: ${JSON.stringify(pData.sun_moon_calculations)}
Auspicious Muhurats: ${JSON.stringify(pData.auspicious_timings)}
Inauspicious Rahu Kaal: ${JSON.stringify(pData.inauspicious_timings?.rahu_kaal || 'Standard')}
-------------------------------------------
            `;
        } catch (pErr) {
            console.error("Chat API: Panchang fetch failed:", pErr);
        }

        // 1. Fetch encrypted Gemini Key, Selected Model & Prompts
        const { data: settings, error } = await supabaseAdmin
            .from('settings')
            .select('key, value')
            .in('key', [
                'gemini_api_key', 
                'gemini_api_keys',
                'gemini_selected_model', 
                'core_prompt', 
                'rulebook', 
                'free_query_limit', 
                'guest_query_limit', 
                'chat_reset_hours', 
                'premium_upsell_message', 
                'chat_start_instruction', 
                'chat_end_instruction', 
                'guru_ai_instruction'
            ]);

        if (error) {
            console.error("Website Chat API: Failed to fetch settings:", error);
            return NextResponse.json({ error: 'Database access error' }, { status: 500 });
        }

        const apiKeyEncrypted = settings?.find(s => s.key === 'gemini_api_key')?.value;
        const apiKeysEncrypted = settings?.find(s => s.key === 'gemini_api_keys')?.value;
        const selectedModel = settings?.find(s => s.key === 'gemini_selected_model')?.value || 'gemini-1.5-flash';

        const defaultCorePrompt = "You are a spiritual guide.";
        const defaultRulebook = "1. Only answer questions related to spirituality, religion, and internal peace.\n2. You must refuse to answer any questions about technology, logic, math, backend systems, AI models, or other irrelevant topics.";

        const corePrompt = settings?.find(s => s.key === 'core_prompt')?.value || defaultCorePrompt;
        const rulebook = settings?.find(s => s.key === 'rulebook')?.value || defaultRulebook;
        const freeQueryLimitStr = settings?.find(s => s.key === 'free_query_limit')?.value;
        const freeQueryLimit = freeQueryLimitStr ? parseInt(freeQueryLimitStr, 10) : 10; 
        const guestQueryLimitStr = settings?.find(s => s.key === 'guest_query_limit')?.value;
        const guestQueryLimit = guestQueryLimitStr ? parseInt(guestQueryLimitStr, 10) : 3;
        const chatResetHoursStr = settings?.find(s => s.key === 'chat_reset_hours')?.value;
        const chatResetHours = chatResetHoursStr ? parseInt(chatResetHoursStr, 10) : 3;

        const premiumUpsellMessage = settings?.find(s => s.key === 'premium_upsell_message')?.value || "Guruji says you have reached your free query limit. Please upgrade to Pro to unlock unlimited spiritual guidance.";

        const startInstruction = settings?.find(s => s.key === 'chat_start_instruction')?.value || "Begin EVERY response by analyzing the current planetary positions (Grahas) and Houses in the user's birth chart (2-3 lines). Example: 'Aapki kundali mein Shani ka prabhav abhi prabal hai...'";
        const endInstruction = settings?.find(s => s.key === 'chat_end_instruction')?.value || "Always end your message with a short, topic-related mystery or curiosity question (e.g., 'Kya aap janna chahenge aapka Career kaisa rahega?').";
        const guruAiInstruction = settings?.find(s => s.key === 'guru_ai_instruction')?.value || "";

        // --- Usage Check with Time-Based Reset ---
        const limit = userId ? freeQueryLimit : guestQueryLimit;

        const { data: usageData, error: usageError } = await supabaseAdmin
            .from('ai_usage')
            .select('query_count, last_query_at')
            .eq('user_id', identifier)
            .single();

        if (usageError && usageError.code !== 'PGRST116') {
            console.error("Failed to fetch usage:", usageError);
        }

        let currentCount = usageData?.query_count || 0;
        const lastQueryAt = usageData?.last_query_at ? new Date(usageData.last_query_at) : null;
        const now = new Date();

        if (lastQueryAt) {
            const hoursSinceLastQuery = (now.getTime() - lastQueryAt.getTime()) / (1000 * 60 * 60);
            
            // If the reset period has passed, we treat the count as 0
            if (hoursSinceLastQuery >= chatResetHours) {
                currentCount = 0;
                // Proactively reset in DB so the next check is clean
                await supabaseAdmin
                    .from('ai_usage')
                    .update({ query_count: 0 })
                    .eq('user_id', identifier);
            }
        }

        if (currentCount >= limit) {
            // Calculate remaining wait time
            if (lastQueryAt) {
                const waitMs = (chatResetHours * 60 * 60 * 1000) - (now.getTime() - lastQueryAt.getTime());
                const waitHours = Math.floor(waitMs / (1000 * 60 * 60));
                const waitMinutes = Math.floor((waitMs % (1000 * 60 * 60)) / (1000 * 60));

                const timeMsg = language === 'hi'
                    ? (waitHours > 0 ? `${waitHours} घंटे और ${waitMinutes} मिनट` : `${waitMinutes} मिनट`)
                    : (waitHours > 0 ? `${waitHours} hours and ${waitMinutes} minutes` : `${waitMinutes} minutes`);

                const waitingText = language === 'hi'
                    ? `प्रणाम! गुरु जी अभी गहन ध्यान (meditation) में हैं ताकि वह आपकी समस्याओं का दिव्य समाधान खोज सकें। 🙏\n\nवैसे, आपकी कुंडली में मुझे कुछ बहुत ही विलक्षण और खास दिख रहा है... इसके बारे में मैं आपको अगली बार विस्तार से बताऊंगा जब आपकी आध्यात्मिक शक्तियां पुनः संचित हो जाएंगी। कृपया ${timeMsg} बाद पुनः पधारें। ✨`
                    : `Pranaam! Guru Ji is currently in deep meditation to find the most divine solution for your concerns. 🙏\n\nI see something very unique and special in your birth chart... I will reveal more about it next time when your spiritual energies are replenished. Please return after ${timeMsg}. ✨`;

                return NextResponse.json({ text: waitingText });
            }
            
            return NextResponse.json({ 
                text: `Guru Ji abhi dhyan mein hain. Vaise aapki kundali mein kuch bahut hi vishesh yog ban raha hai... Kirpaya ${chatResetHours} ghante baad punah aayein. 🙏`
            });
        }
        // -------------------------------------------

        // Combine prompts into strict system instruction
        const combinedSystemPrompt = `
${corePrompt}

${guruAiInstruction}

${templateInstruction ? `--- SPECIFIC TEMPLATE INSTRUCTION ---
${templateInstruction}
` : ''}
${langInst}

${profileContext}

--- MANDATORY 3-STEP INTERNAL ANALYSIS (SILENT CHECK) ---
Before you generate even a single word of your response, you MUST silently perform this internal check:
1. PANCHANG CHECK: Analyze the 'REAL-TIME VEDIC PANCHANG' block above. Is today's Tithi or Nakshatra auspicious for the user's intent? Identify current Rahu Kaal.
2. KUNDALI CHECK: Deeply analyze the 'USER VEDIC PROFILE' (Planet positions, Lagna, Current Dasha). How do the user's natal planets react to today's cosmic energies?
3. RASHIFAL CHECK: If Rashifal data is present, evaluate how the daily transit specifically impacts the user's sign.
ONLY AFTER this silent synthesis should you begin your response. Your final answer must be a distilled conclusion of this 3-step analysis, providing guidance that feels like a divine realization.

${horoscopeContext}

${panchangContext}

--- SACRED RITUAL CATALOG (OFFERINGS) ---
You must recommend these authentic rituals when users seek specific solutions:
${pujaCatalog}

--- STRICT RULEBOOK & RESTRICTIONS ---
${rulebook}

--- REQUIRED TECHNICAL FORMATS (SYSTEM INTEGRATION) ---
The following are mandatory guidelines for your output:
- OPENING: ${startInstruction}
- CLOSING: ${endInstruction}
- LINE-BY-LINE FORMATTING: You MUST provide your answers in a line-by-line structured format. Use very short, concise sentences. Use a double newline (\n\n) between every distinct thought or point. Never write more than 2 sentences without a line break.
3. KUNDALI REQUESTS: If profile data is missing, ALWAYS append [[START_KUNDLI_FLOW]] after asking for details.
4. RITUAL RECOMMENDATIONS: When recommending a puja from the catalog, you MUST output a button using this exact format: [[PUJA_LINK: Puja Name | slug]] (Example: [[PUJA_LINK: Shiv Puja | shiv-puja]])
5. PROFILE UPDATES: When the user provides their birth details (Name, DOB, POB, TOB), you MUST generate a hidden tag at the end of your message in this exact format: [[VEDIC_UPDATE: {"full_name": "NAME_AS_PROVIDED_BY_USER", "dob": "YYYY-MM-DD", "pob": "...", "tob": "HH:MM", "gender": "..."}]]. You MUST use the exact name the user provided as 'full_name'.
6. MEMORY: Always base your advice on the user's birth data provided in the USER VEDIC PROFILE above.
------------------------
        `.trim();


        // 2. Decrypt API Key(s)
        const encryptionKey = process.env.ENCRYPTION_STRING_KEY || '';
        if (encryptionKey.length !== 16) {
            throw new Error('Server misconfiguration: Encryption key must be 16 characters');
        }

        const decrypt = (encrypted: string) => {
            try {
                const [ivHex, encryptedText] = encrypted.split(':');
                if (!ivHex || !encryptedText) return null;
                const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(encryptionKey), Buffer.from(ivHex, 'hex'));
                let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            } catch (e) {
                console.error("Decryption failed for a key:", e);
                return null;
            }
        };

        let keys: string[] = [];
        if (apiKeysEncrypted) {
            try {
                const encryptedList = JSON.parse(apiKeysEncrypted);
                if (Array.isArray(encryptedList)) {
                    keys = encryptedList.map(decrypt).filter((k): k is string => k !== null);
                }
            } catch (e) {
                console.error("Failed to parse gemini_api_keys JSON:", e);
            }
        }
        
        // Fallback to single legacy key if no multiple keys found
        if (keys.length === 0 && apiKeyEncrypted) {
            const singleKey = decrypt(apiKeyEncrypted);
            if (singleKey) keys.push(singleKey);
        }

        if (keys.length === 0) {
            return NextResponse.json({ error: 'AI Not Configured (API Keys missing)' }, { status: 500 });
        }

        // 3. Call Gemini API with Automatic Failover & Shuffle (Rotation)
        let response: any = null;
        let data: any;
        let lastError: any = null;

        // Shuffle keys to distribute traffic better (Load Balancing)
        const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);

        for (let keyIndex = 0; keyIndex < shuffledKeys.length; keyIndex++) {
            const currentKey = shuffledKeys[keyIndex];
            try {
                response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${currentKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: combinedSystemPrompt }] },
                        contents: [...chatHistory || [], { parts: [{ text: message }] }]
                    }),
                });

                data = await response.json();

                if (response.ok) {
                    // Success!
                    break;
                }

                // If failing (Demand spikes, Quotas, etc.), we move to the next key immediately
                console.warn(`Gemini Key ${keyIndex + 1} failed with ${response.status}: ${data.error?.message || 'Unknown'}`);
                lastError = data.error?.message || `Error ${response.status}`;
                
                // If it's a 429 or 503, just move to the next key without retrying this specific key
                if (response.status === 429 || response.status === 503) {
                    continue; 
                } else {
                    // For other errors, we might still try other keys but it's likely a terminal model/prompt issue
                    continue; 
                }
            } catch (fetchErr: any) {
                console.error(`Fetch error with key ${keyIndex + 1}:`, fetchErr);
                lastError = fetchErr.message;
                continue;
            }
        }

        if (!response || !response.ok) {
            console.error("Gemini Multi-Key API Error: All keys exhausted.", lastError);
            throw new Error(lastError || 'Failed to generate content from AI after trying all available keys');
        }

        let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Guruji is meditating. Try again.";
        
        // --- Automated Profile Update Capture ---
        const updateRegex = /\[\[VEDIC_UPDATE:\s*({[\s\S]*?})\]\]/;
        const match = aiText.match(updateRegex);
        
        if (match && identifier !== 'anonymous') {
            try {
                const updateData = JSON.parse(match[1]);
                
                // 1. Upsert to main user_vedic_profiles (Source of Truth for User's Own Profile)
                await supabaseAdmin
                    .from('user_vedic_profiles')
                    .upsert({
                        user_id: identifier,
                        ...updateData,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' });

                // 2. Multi-Kundali Management (RECENT KUNDALIS)
                // Check if this Kundali already exists for this user by name
                const { data: existingKundalis } = await supabaseAdmin
                    .from('user_kundalis')
                    .select('id, full_name')
                    .eq('user_id', identifier);

                const existingK = existingKundalis?.find(k => k.full_name?.toLowerCase() === updateData.full_name?.toLowerCase());
                
                if (existingK) {
                    // Update existing
                    await supabaseAdmin
                        .from('user_kundalis')
                        .update({
                            ...updateData,
                        })
                        .eq('id', existingK.id);
                } else if ((existingKundalis?.length || 0) < 3) {
                    // Insert new (Under limit of 3)
                    await supabaseAdmin
                        .from('user_kundalis')
                        .insert({
                            user_id: identifier,
                            ...updateData
                        });
                }
            } catch (pErr) {
                console.error("Failed to parse/save Vedic Update:", pErr);
            }
        }

        // ALWAYS clean the text for user display
        aiText = aiText.replace(updateRegex, "").trim();
        
        // UUID Check: only store if it's a valid UUID
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

        // --- Persistent Storage Logic (Sessions & Messages) ---
        if (!skipHistory) {
            // 1. Session Management
            if (!sessionId) {
                const { data: newSession, error: sessionError } = await supabaseAdmin
                    .from('guru_chat_sessions')
                    .insert({
                        user_id: identifier,
                        title: message.substring(0, 40) + (message.length > 40 ? '...' : ''),
                    })
                    .select()
                    .single();
                
                if (sessionError) {
                    console.error("Failed to create session:", sessionError);
                } else {
                    sessionId = newSession.id;
                }
            } else {
                // Update last_message_at
                await supabaseAdmin
                    .from('guru_chat_sessions')
                    .update({ last_message_at: new Date().toISOString() })
                    .eq('id', sessionId);
            }

            // 2. Save Messages
            if (sessionId) {
                const { error: msgSaveError } = await supabaseAdmin
                    .from('guru_chat_messages')
                    .insert([
                        { session_id: sessionId, user_id: identifier, role: 'user', content: message },
                        { session_id: sessionId, user_id: identifier, role: 'model', content: aiText }
                    ]);
                
                if (msgSaveError) console.error("Failed to save messages:", msgSaveError);
            }

            // 3. Increment usage count (Legacy table check)
            const { data: usageData } = await supabaseAdmin
                .from('ai_usage')
                .select('query_count')
                .eq('user_id', identifier)
                .single();

            await supabaseAdmin
                .from('ai_usage')
                .upsert({
                    user_id: identifier,
                    query_count: (usageData?.query_count || 0) + 1,
                    last_query_at: new Date().toISOString()
                }, { onConflict: 'user_id' });
        }

        return NextResponse.json({ text: aiText, sessionId });
    } catch (err: any) {
        console.error("Chat proxy error: ", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
