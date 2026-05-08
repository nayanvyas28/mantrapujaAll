export const dynamic = "force-dynamic";

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseServer';
import { HoroscopeService } from '@/lib/horoscopeService';
import { PanchangService } from '@/lib/panchangService';

function getAdmin() {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error("Supabase client not initialized");
    return supabase;
}

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
            const { data: basicProfile } = await getAdmin()
                .from('profiles')
                .select('full_name')
                .eq('id', identifier)
                .single();
                
            const uName = basicProfile?.full_name || 'Anonymous';

            // Get the MOST RECENT and COMPLETE Kundali data for deep analysis
            const { data: latestKundali } = await getAdmin()
                .from('user_kundalis')
                .select('*')
                .eq('user_id', identifier)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (latestKundali) {
                // Ensure we update the Vedic Profile for consistency
                await getAdmin().from('user_vedic_profiles').upsert({
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
--- GUEST MODE (RESTRICTED ANALYSIS) ---
The user is a GUEST — they have NOT logged in yet. 

STRICT RULES FOR GUEST RESPONSES:
1. NO SPECIFIC ANALYSIS: Even if the user provides their birth details, you are FORBIDDEN from giving them their Rashi, Lagna, Planet positions, or any specific predictions. 
2. GENERIC WISDOM ONLY: You may answer spiritual or general astrological questions with generic wisdom, but for anything personal, you must say that Guru Ji needs to "establish a sacred connection" (verify their number) first.
3. CAPTIVATE & HOOK: Use a mysterious and inviting tone. Hint that their charts show something very significant, but you can only reveal it once they are "connected".
4. CTAs: Use spiritual language to encourage login: "apne bhagya ka dwar kholen", "sacred profile banayein", "Guru Ji se judiye".
5. TAG REQUIRED: If you have extracted their info but they aren't logged in, do NOT analyze it. Just acknowledge you have the info and ask them to connect.
-----------------------------------------
            `;
        }

        // 0.1 Fetch Puja Catalog (Knowledge)
        const { data: allPujas } = await getAdmin()
            .from('poojas')
            .select('name, slug')
            .eq('is_active', true);

        const pujaCatalog = allPujas?.map((p: any) => `- ${p.name} (Link: /pooja-services/${p.slug})`).join('\n') || "Catalog updating...";

        // 0.1.1 Fetch Blog Catalog (NEW KNOWLEDGE)
        const { data: recentBlogs } = await getAdmin()
            .from('blogs')
            .select('title, slug')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(10);

        const blogCatalog = recentBlogs?.map((b: any) => `- ${b.title} (Link: /blog/${b.slug})`).join('\n') || "Blog articles coming soon.";

        // 0.1.2 Fetch Serving Cities (NEW KNOWLEDGE)
        const { data: activeCities } = await getAdmin()
            .from('serving_cities')
            .select('name')
            .eq('is_active', true);

        const cityList = activeCities?.map((c: any) => c.name).join(', ') || "Multiple cities across India.";

        // 0.2 Check for Horoscope Intent & Fetch Data
        let horoscopeContext = "";
        const lowerMsg = message.toLowerCase();

        const horoscopeKeywords = [
            'rashifal', 'rashi fal', 'rashi phal', 'horoscope', 'bhavishya', 'bhavishyafal',
            'aaj ka rashifal', 'kal ka rashifal', 'is hafte ka', 'is mahine ka',
            'weekly forecast', 'monthly forecast', 'yearly forecast', 'daily horoscope',
            'lucky number', 'lucky color', 'lucky colour', 'aaj kaisa rahega',
            'aaj ka din', 'aaj shubh', 'shubh muhurat', 'aaj ki rashi',
            'mera bhavishya', 'meri rashi', 'rashi batao', 'sun sign', 'moon sign',
            'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio',
            'sagittarius', 'capricorn', 'aquarius', 'pisces',
            'mesh', 'vrishabh', 'mithun', 'kark', 'singh', 'kanya',
            'tula', 'vrischika', 'vrischick', 'dhanu', 'makar', 'kumbh', 'meen'
        ];
        const panchangKeywords = [
            'panchang', 'panchangam', 'tithi', 'nakshatra', 'nakshtra', 'yog', 'yoga',
            'karan', 'rahu kaal', 'rahu kal', 'rahukaal', 'shubh muhurat', 'muhurat',
            'aaj ka panchang', 'aaj tithi', 'aaj nakshatra', 'aaj ka yog',
            'sunrise', 'sunset', 'suryoday', 'suryast', 'chandroday',
            'auspicious time', 'inauspicious', 'abhijit', 'brahma muhurta'
        ];

        const matchesHoroscope = horoscopeKeywords.some((key: string) => lowerMsg.includes(key));
        const matchesPanchang = panchangKeywords.some((key: string) => lowerMsg.includes(key));

        if (matchesHoroscope) {
            const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            const hindiSigns: Record<string, string> = {
                'mesh': 'aries', 'vrishabh': 'taurus', 'mithun': 'gemini', 'kark': 'cancer', 'singh': 'leo', 'kanya': 'virgo',
                'tula': 'libra', 'vrischika': 'scorpio', 'vrischick': 'scorpio', 'dhanu': 'sagittarius', 'makar': 'capricorn', 'kumbh': 'aquarius', 'meen': 'pisces'
            };

            let targetSign = signs.find((s: string) => lowerMsg.includes(s));
            if (!targetSign) {
                const hindiMatch = Object.keys(hindiSigns).find((h: string) => lowerMsg.includes(h));
                if (hindiMatch) targetSign = hindiSigns[hindiMatch];
            }

            // Fallback to profile moon sign (rashi) if logged in
            if (!targetSign && identifier !== 'anonymous') {
                const { data: kundali } = await getAdmin()
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
            if (lowerMsg.includes('week') || lowerMsg.includes('hafte') || lowerMsg.includes('hafta')) period = 'weekly';
            else if (lowerMsg.includes('month') || lowerMsg.includes('mahine') || lowerMsg.includes('mahina')) period = 'monthly';
            else if (lowerMsg.includes('year') || lowerMsg.includes('sal') || lowerMsg.includes('varsh') || lowerMsg.includes('saal')) period = 'yearly';

            if (targetSign) {
                try {
                    const hData = await HoroscopeService.getHoroscope(targetSign, period);
                    horoscopeContext = `
=== LIVE RASHIFAL / HOROSCOPE DATA ===
Rashi (Sign): ${targetSign.toUpperCase()}
Period: ${period} | Date: ${hData.date_label || 'Current'}
Main Prediction: ${hData.content}
${hData.lucky_number ? `Lucky Number: ${hData.lucky_number}` : ''}
${hData.lucky_color ? `Lucky Color: ${hData.lucky_color}` : ''}
${hData.remedy ? `Today's Remedy: ${hData.remedy}` : ''}
${hData.sections?.map((s: any) => `[${s.heading}]: ${s.body}`).join('\n') || ''}
${hData.ratings?.map((r: any) => `${r.label} Rating: ${r.score}/5`).join(' | ') || ''}
INSTRUCTION: Use this REAL data to answer the user's rashifal/horoscope question. Do NOT make up predictions.
======================================
                    `;
                } catch (hErr) {
                    console.error("Chat API: Horoscope fetch failed:", hErr);
                }
            } else if (!targetSign) {
                horoscopeContext = `HOROSCOPE INTENT DETECTED but no rashi/sign identified from message. Ask the user which rashi (e.g., Mesh, Taurus, etc.) they want the rashifal for, unless their kundali profile already has it.`;
            }
        }

        // 0.3 Fetch Panchang Data
        let panchangContext = "";
        try {
            const pData = await PanchangService.getTodayPanchang();
            const p = pData.panchang_for_today;
            const auspicious = pData.auspicious_timings;
            const inauspicious = pData.inauspicious_timings;
            const sunmoon = pData.sun_moon_calculations;
            panchangContext = `
=== LIVE VEDIC PANCHANG (TODAY) ===
Date: ${pData.reference_date}
Tithi: ${p?.tithi || '—'}
Nakshatra: ${p?.nakshatra || '—'}
Yog: ${p?.yog || '—'}
Karan: ${p?.karan || '—'}
Vaar (Day): ${p?.vaar || '—'}
Sunrise: ${sunmoon?.sunrise || '—'} | Sunset: ${sunmoon?.sunset || '—'}
Moonrise: ${sunmoon?.moonrise || '—'} | Moonset: ${sunmoon?.moonset || '—'}
Auspicious (Shubh) Muhurats: ${JSON.stringify(auspicious || '—')}
Rahu Kaal (Inauspicious): ${JSON.stringify(inauspicious?.rahu_kaal || '—')}
Yamghant / Gulika: ${JSON.stringify(inauspicious?.yamghant || inauspicious?.gulika_kaal || '—')}
INSTRUCTION: ${matchesPanchang ? 'USER IS ASKING ABOUT PANCHANG — use the above data to give a detailed, accurate answer.' : 'This panchang data is available as context. Use it if relevant.'}
=====================================
            `;
        } catch (pErr) {
            console.error("Chat API: Panchang fetch failed:", pErr);
        }

        // 1. Fetch Key Settings
        const loginContext = identifier !== 'anonymous'
            ? `USER STATUS: Logged In (Identity: ${identifier}). You can see their Vedic Profile above. DO NOT ask them to login again as they are already authenticated.`
            : `USER STATUS: Guest (Not Logged In). You MUST encourage them to login for personalized insights.`;

        const { data: settings, error } = await getAdmin()
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

        const apiKeyEncrypted = settings?.find((s: any) => s.key === 'gemini_api_key')?.value;
        const apiKeysEncrypted = settings?.find((s: any) => s.key === 'gemini_api_keys')?.value;
        const selectedModel = settings?.find((s: any) => s.key === 'gemini_selected_model')?.value || 'gemini-1.5-flash';

        const defaultCorePrompt = "You are a spiritual guide.";
        const defaultRulebook = "1. Only answer questions related to spirituality, religion, and internal peace.\\n2. You must refuse to answer any questions about technology, logic, math, backend systems, AI models, or other irrelevant topics.";

        const corePrompt = settings?.find((s: any) => s.key === 'core_prompt')?.value || defaultCorePrompt;
        const rulebook = settings?.find((s: any) => s.key === 'rulebook')?.value || defaultRulebook;
        const freeQueryLimitStr = settings?.find((s: any) => s.key === 'free_query_limit')?.value;
        const freeQueryLimit = freeQueryLimitStr ? parseInt(freeQueryLimitStr, 10) : 10; 
        const guestQueryLimitStr = settings?.find((s: any) => s.key === 'guest_query_limit')?.value;
        const guestQueryLimit = guestQueryLimitStr ? parseInt(guestQueryLimitStr, 10) : 3;
        const chatResetHoursStr = settings?.find((s: any) => s.key === 'chat_reset_hours')?.value;
        const chatResetHours = chatResetHoursStr ? parseInt(chatResetHoursStr, 10) : 3;

        const premiumUpsellMessage = settings?.find((s: any) => s.key === 'premium_upsell_message')?.value || "Guruji says you have reached your free query limit. Please upgrade to Pro to unlock unlimited spiritual guidance.";
        const startInstruction = settings?.find((s: any) => s.key === 'chat_start_instruction')?.value || "Begin EVERY response by analyzing the current planetary positions (Grahas) and Houses in the user's birth chart.";
        const endInstruction = settings?.find((s: any) => s.key === 'chat_end_instruction')?.value || "Always end your message with a short, topic-related mystery or curiosity question.";
        const guruAiInstruction = settings?.find((s: any) => s.key === 'guru_ai_instruction')?.value || "";

        // --- Usage Check ---
        if (userId) {
            const { data: usageData, error: usageError } = await getAdmin()
                .from('ai_usage')
                .select('query_count, last_query_at, custom_limit')
                .eq('user_id', identifier)
                .single();

            const effectiveLimit = (usageData?.custom_limit != null) ? usageData.custom_limit : freeQueryLimit;
            let currentCount = usageData?.query_count || 0;
            const lastQueryAt = usageData?.last_query_at ? new Date(usageData.last_query_at) : null;
            const now = new Date();

            if (lastQueryAt) {
                const hoursSinceLastQuery = (now.getTime() - lastQueryAt.getTime()) / (1000 * 60 * 60);
                if (hoursSinceLastQuery >= chatResetHours) {
                    currentCount = 0;
                    await getAdmin().from('ai_usage').update({ query_count: 0 }).eq('user_id', identifier);
                }
            }

            if (currentCount >= effectiveLimit) {
                if (lastQueryAt) {
                    const waitMs = (chatResetHours * 60 * 60 * 1000) - (new Date().getTime() - lastQueryAt.getTime());
                    const waitHours = Math.floor(waitMs / (1000 * 60 * 60));
                    const waitMinutes = Math.floor((waitMs % (1000 * 60 * 60)) / (1000 * 60));

                    const timeMsg = language === 'hi'
                        ? (waitHours > 0 ? `${waitHours} घंटे और ${waitMinutes} मिनट` : `${waitMinutes} मिनट`)
                        : (waitHours > 0 ? `${waitHours} hours and ${waitMinutes} minutes` : `${waitMinutes} minutes`);

                    const waitingText = language === 'hi'
                        ? `प्रणाम! गुरु जी अभी गहन ध्यान में हैं। कृपया ${timeMsg} बाद पुनः पधारें। ✨`
                        : `Pranaam! Guru Ji is currently in deep meditation. Please return after ${timeMsg}. ✨`;

                    return NextResponse.json({ text: waitingText });
                }
                return NextResponse.json({ text: "Guru Ji is meditating. Please return later." });
            }
        }

        const combinedSystemPrompt = `
${corePrompt}
${guruAiInstruction}
${loginContext}
${templateInstruction ? `--- SPECIFIC TEMPLATE INSTRUCTION ---\n${templateInstruction}\n` : ''}
${langInst}
${profileContext}
${horoscopeContext}
${panchangContext}
--- SACRED RITUAL CATALOG ---
${pujaCatalog}
--- DIVINE WISDOM ARTICLES ---
${blogCatalog}
--- SERVING LOCATIONS ---
${cityList}
--- REQUIRED TECHNICAL FORMATS ---
- OPENING: ${startInstruction}
- CLOSING: ${endInstruction}
- LINE-BY-LINE FORMATTING: Double newline between thoughts.
- KUNDALI REQUESTS: Append [[START_KUNDLI_FLOW]] if details missing.
- RITUAL RECOMMENDATIONS: [[PUJA_LINK: Name | slug]]
- INFORMATION EXTRACTION: [[VEDIC_UPDATE: {...}]]
- SIGN OUT: [[SIGN_OUT_BTN]]
${rulebook}
`.trim();

        const encryptionKey = process.env.ENCRYPTION_STRING_KEY || '';
        const decrypt = (encrypted: string) => {
            try {
                const [ivHex, encryptedText] = encrypted.split(':');
                if (!ivHex || !encryptedText) return null;
                const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(encryptionKey), Buffer.from(ivHex, 'hex'));
                let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            } catch (e) {
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
            } catch (e) {}
        }
        if (keys.length === 0 && apiKeyEncrypted) {
            const singleKey = decrypt(apiKeyEncrypted);
            if (singleKey) keys.push(singleKey);
        }

        if (keys.length === 0) return NextResponse.json({ error: 'AI Not Configured' }, { status: 500 });

        let response: any = null;
        let data: any;
        let lastError: any = null;
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
                if (response.ok) break;
                lastError = data.error?.message || `Error ${response.status}`;
            } catch (fetchErr: any) {
                lastError = fetchErr.message;
            }
        }

        if (!response || !response.ok) throw new Error(lastError || 'Failed to generate content');

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Guruji is meditating.";
        
        // --- Update Profile ---
        const updateRegex = /\[\[VEDIC_UPDATE:\s*({[\s\S]*?})\]\]/;
        const match = aiText.match(updateRegex);
        if (match && identifier !== 'anonymous') {
            try {
                const updateData = JSON.parse(match[1]);
                await getAdmin().from('user_vedic_profiles').upsert({ user_id: identifier, ...updateData, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
                const { data: existingKundalis } = await getAdmin().from('user_kundalis').select('id, full_name').eq('user_id', identifier);
                const existingK = existingKundalis?.find((k: any) => k.full_name?.toLowerCase() === updateData.full_name?.toLowerCase());
                if (existingK) {
                    await getAdmin().from('user_kundalis').update({ ...updateData }).eq('id', existingK.id);
                } else if ((existingKundalis?.length || 0) < 3) {
                    await getAdmin().from('user_kundalis').insert({ user_id: identifier, ...updateData });
                }
            } catch (pErr) {}
        }

        if (!skipHistory) {
            if (!sessionId) {
                const { data: newSession } = await getAdmin().from('guru_chat_sessions').insert({ user_id: identifier, title: message.substring(0, 40) }).select().single();
                if (newSession) sessionId = newSession.id;
            } else {
                await getAdmin().from('guru_chat_sessions').update({ last_message_at: new Date().toISOString() }).eq('id', sessionId);
            }
            if (sessionId) {
                await getAdmin().from('guru_chat_messages').insert([
                    { session_id: sessionId, user_id: identifier, role: 'user', content: message },
                    { session_id: sessionId, user_id: identifier, role: 'model', content: aiText }
                ]);
            }
            const { data: usageData } = await getAdmin().from('ai_usage').select('query_count').eq('user_id', identifier).single();
            await getAdmin().from('ai_usage').upsert({ user_id: identifier, query_count: (usageData?.query_count || 0) + 1, last_query_at: new Date().toISOString() }, { onConflict: 'user_id' });
        }

        return NextResponse.json({ text: aiText, sessionId });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
