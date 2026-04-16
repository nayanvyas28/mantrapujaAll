import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Admin (Bypass RLS to get settings)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, chatHistory, userId, sessionId: incomingSessionId, skipHistory, language } = body;

        const langInst = language === 'hi'
            ? "CRITICAL: The user has selected HINDI as the sacred language for this session. Regardless of the language the user speaks (English, Hinglish, etc.), you MUST respond EXCLUSIVELY in Hindi (Devanagari script) with a polite and divine tone. If the user asks in English, you must translate your guidance into pure Hindi."
            : "CRITICAL: The user has selected ENGLISH as the sacred language for this session. Regardless of the language the user speaks (Hindi, Hinglish, etc.), you MUST respond EXCLUSIVELY in English with a polite and serene spiritual tone. If the user asks in Hindi, you must translate your guidance into pure English.";

        const identifier = userId || incomingSessionId || 'anonymous';
        let sessionId = incomingSessionId;

        // 0. Fetch User Vedic Profile (Memory / Fallback)
        let profileContext = "";
        if (identifier !== 'anonymous') {
            // First get the guaranteed basic profile
            const { data: basicProfile } = await supabaseAdmin
                .from('profiles')
                .select('full_name')
                .eq('id', identifier)
                .single();
                
            const uName = basicProfile?.full_name || 'Anonymous';

            const { data: profile } = await supabaseAdmin
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
                // Fallback to latest Kundali if profile is missing
                const { data: latestKundali } = await supabaseAdmin
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
                    
                    // Optional Sync: Proactively update profile for next time
                    await supabaseAdmin.from('user_vedic_profiles').upsert({
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
ALTERNATIVE SUGGESTIONS: Instead, suggest they ask about:
1. Recommendation for any specific Puja (like Shiv Puja, Shani Puja).
2. Guidance for mental peace or family harmony.
3. Meaning of sacred mantras.
--------------------------
            `;
        }

        // 0.1 Fetch Puja Catalog (Knowledge)
        const { data: allPujas } = await supabaseAdmin
            .from('poojas')
            .select('name, slug')
            .eq('is_active', true);

        const pujaCatalog = allPujas?.map(p => `- ${p.name} (Link: /pooja-services/${p.slug})`).join('\n') || "Catalog updating...";

        // 1. Fetch encrypted Gemini Key, Selected Model & Prompts
        const { data: settings, error } = await supabaseAdmin
            .from('settings')
            .select('key, value')
            .in('key', ['gemini_api_key', 'gemini_selected_model', 'core_prompt', 'rulebook', 'free_query_limit', 'guest_query_limit', 'chat_reset_hours', 'premium_upsell_message', 'chat_start_instruction', 'chat_end_instruction']);

        if (error) {
            console.error("Website Chat API: Failed to fetch settings:", error);
            return NextResponse.json({ error: 'Database access error' }, { status: 500 });
        }

        const apiKeyEncrypted = settings?.find(s => s.key === 'gemini_api_key')?.value;
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

${langInst}

${profileContext}

--- SACRED RITUAL CATALOG (OFFERINGS) ---
You must recommend these authentic rituals when users seek specific solutions:
${pujaCatalog}

--- STRICT RULEBOOK & RESTRICTIONS ---
${rulebook}

CRITICAL INSTRUCTIONS:
1. You are Guru AI, the supreme spiritual guide for Mantra Puja.
2. RESPONSE START (DYNAMIC): ${startInstruction}
3. RESPONSE END (DYNAMIC): ${endInstruction}
4. PERSONALIZATION & MEMORY: 
   - ALWAYS address the user by their full name if it exists in the 'USER VEDIC PROFILE' section above. 
   - BASE all your future predictions, analysis, and spiritual advice strictly on the birth details (DOB, Time, Place) provided in the Vedic profile.
   - Refer to their specific birth data to explain your guidance.
5. FORMATTING (STRICT REQUIREMENT): 
   - You MUST ALWAYS rely on a well-structured format for your answers.
   - Start with a clear Heading (using ### H3).
   - Use Subheadings (#### H4) where appropriate.
   - Use Bullet Points (- ) for listing remedies, insights, or planetary effects.
   - Example Structure:
     ### [Main Topic/Greeting]
     [Introductory text]
     #### [Subtopic like 'Planetary Impact']
     - Point 1
     - Point 2
6. LANGUAGE: Use simple, everyday Hindi (Normal Hindi/Hinglish) as spoken by common people. Do NOT use overly advanced or heavy Sanskrit words unless necessary for a mantra.
7. MISSION: Answer the query directly. 
   - FOR LOGGED-IN USERS: If they ask for Kundali, Horoscope, or Analysis and data is missing, you MUST provide a very brief polite blessing and append the tag [[START_KUNDLI_FLOW]]. CRITICAL: Do NOT list the required details (Name, DOB, etc.) in your text response, as the questionnaire will handle this.
   - FOR GUESTS: Refuse Kundali analysis politely ("Login karoge tabhi...") and suggest other topics.
8. Expertise: Vedic Astrology, Numerology, Vastu, and spiritual healing.
9. CONTEXTUAL RECOMMENDATIONS (CRITICAL): 
   - You MUST recommend a relevant puja ONLY when a pivotal moment occurs in the conversation (e.g., discovering a Dosha, a severe planet affliction, or a major life worry like job loss or illness).
   - In such moments, explain why this ritual is necessary and append the special button tag.
   - Mention that they can "Secure their spot for just ₹1" as a symbolic token.
   - Format: [[PUJA_LINK: Puja Name | slug]]
   (Example: [[PUJA_LINK: Shiv Puja | shiv-puja]])
10. NO OTHER LINKS: Do not provide any other standard URLs or links.
11. DISALLOWED TOPICS: Technology, AI, Backend Systems, Mathematics, Science, Current Events, or any non-spiritual logic.
12. AUTOMATED MEMORY & KUNDALI GENERATION: Once all details are synced, the system updates the profile. You will be notified.
13. NEVER break character.

ADDITIONAL INSTRUCTIONS FOR TITLING:
If this is the start of a conversation, please generate a very short title (max 4-5 words) that summarizes the user's intent.
------------------------
        `.trim();

        if (!apiKeyEncrypted) return NextResponse.json({ error: 'AI Not Configured' }, { status: 500 });

        // 2. Decrypt API Key
        const encryptionKey = process.env.ENCRYPTION_STRING_KEY || '';
        if (encryptionKey.length !== 16) {
            throw new Error('Server misconfiguration: Encryption key must be 16 characters');
        }

        const [ivHex, encryptedText] = apiKeyEncrypted.split(':');
        if (!ivHex || !encryptedText) {
            throw new Error('Invalid encrypted key format');
        }

        const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(encryptionKey), Buffer.from(ivHex, 'hex'));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        // 3. Call Gemini API (with Retry Logic for 503/429)
        let response: Response;
        let data: any;
        const maxRetries = 2;
        let attempt = 0;

        while (attempt <= maxRetries) {
            response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${decrypted}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: combinedSystemPrompt }] },
                    contents: [...chatHistory || [], { parts: [{ text: message }] }]
                }),
            });

            data = await response.json();

            if (response.ok) break;

            // If it's a transient error (503/429), wait and retry
            if ((response.status === 503 || response.status === 429) && attempt < maxRetries) {
                console.log(`Gemini API Busy (${response.status}). Retrying attempt ${attempt + 1}...`);
                await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1))); // Exponential backoff
                attempt++;
                continue;
            }

            // Otherwise, break and throw error
            console.error("Gemini API Error:", data);
            throw new Error(data.error?.message || 'Failed to generate content from AI');
        }

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            throw new Error(data.error?.message || 'Failed to generate content from AI');
        }

        let aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Guruji is meditating. Try again.";
        
        // --- Automated Profile Update Capture ---
        const updateRegex = /\[\[VEDIC_UPDATE:\s*({.*?})\]\]/s;
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
