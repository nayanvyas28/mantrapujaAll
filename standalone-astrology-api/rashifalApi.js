/**
 * Standalone Rashifal (Horoscope) API for Express (Node.js)
 * 
 * Replaces scraping with official AstrologyAPI integrations.
 * 
 * Dependencies:
 * npm install express axios
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const { supabase, resolveLanguage, executeWithFailover, validateResponseLanguage, logRequest } = require('./astrologyCommon');

const pendingHoroscopeRequests = new Map();

/**
 * Calculates the reference date for caching
 */
const getReferenceDate = (period) => {
    const now = new Date();
    if (period === 'monthly') {
        return new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    } else if (period === 'yearly') {
        return new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0];
    } else if (period === 'weekly') {
        const day = now.getDay() || 7;
        if (day !== 1) now.setHours(-24 * (day - 1));
        return now.toISOString().split('T')[0];
    } else {
        return now.toISOString().split('T')[0]; // daily
    }
};

// --- Backend Localization Mappings ---
const headingsMap = {
    'Personal Life': { en: 'Personal Life', hi: 'व्यक्तिगत जीवन' },
    'Profession': { en: 'Profession', hi: 'व्यवसाय' },
    'Health': { en: 'Health', hi: 'स्वास्थ्य' },
    'Emotions': { en: 'Emotions', hi: 'भावनाएं' },
    'Travel': { en: 'Travel', hi: 'यात्रा' },
    'Luck': { en: 'Luck', hi: 'भाग्य' }
};

const ratingsLabelMap = {
    'Love': { en: 'Love', hi: 'प्रेम' },
    'Career': { en: 'Career', hi: 'करियर' },
    'Health': { en: 'Health', hi: 'स्वास्थ्य' },
    'Travel': { en: 'Travel', hi: 'यात्रा' },
    'Luck': { en: 'Luck', hi: 'भाग्य' },
    'Emotions': { en: 'Emotions', hi: 'भावनाएं' }
};

const zodiacNamesMap = {
    aries: { en: 'Aries', hi: 'मेष' },
    taurus: { en: 'Taurus', hi: 'वृषभ' },
    gemini: { en: 'Gemini', hi: 'मिथुन' },
    cancer: { en: 'Cancer', hi: 'कर्क' },
    leo: { en: 'Leo', hi: 'सिंह' },
    virgo: { en: 'Virgo', hi: 'कन्या' },
    libra: { en: 'Libra', hi: 'तुला' },
    scorpio: { en: 'Scorpio', hi: 'वृश्चिक' },
    sagittarius: { en: 'Sagittarius', hi: 'धनु' },
    capricorn: { en: 'Capricorn', hi: 'मकर' },
    aquarius: { en: 'Aquarius', hi: 'कुंभ' },
    pisces: { en: 'Pisces', hi: 'मीन' }
};

const periodsMap = {
    daily: { en: 'Daily', hi: 'दैनिक' },
    weekly: { en: 'Weekly', hi: 'साप्ताहिक' },
    monthly: { en: 'Monthly', hi: 'मासिक' },
    yearly: { en: 'Yearly', hi: 'वार्षिक' }
};

const colorMap = {
    red: { en: 'Red', hi: 'लाल' },
    pink: { en: 'Pink', hi: 'गुलाबी' },
    green: { en: 'Green', hi: 'हरा' },
    white: { en: 'White', hi: 'सफेद' },
    gold: { en: 'Gold', hi: 'सुनहरा' },
    blue: { en: 'Blue', hi: 'नीला' },
    maroon: { en: 'Maroon', hi: 'मरून' },
    yellow: { en: 'Yellow', hi: 'पीला' },
    black: { en: 'Black', hi: 'काला' },
    'dark blue': { en: 'Dark Blue', hi: 'गहरा नीला' }
};

const remediesPoolMap = [
    { en: "Offer water to the Sun in the morning.", hi: "सुबह सूर्य देव को जल अर्पित करें।" },
    { en: "Chant Gayatri Mantra 108 times.", hi: "गायत्री मंत्र का 108 बार जाप करें।" },
    { en: "Feed green fodder to cows today.", hi: "आज गायों को हरा चारा खिलाएं।" },
    { en: "Donate yellow items to the needy.", hi: "जरूरतमंदों को पीली वस्तुओं का दान करें।" },
    { en: "Keep a copper coin in your pocket.", hi: "अपनी जेब में तांबे का सिक्का रखें।" },
    { en: "Meditate for 10 minutes in the morning.", hi: "सुबह 10 मिनट ध्यान करें।" },
    { en: "Avoid conflicts and focus on creative work.", hi: "विवादों से बचें और रचनात्मक कार्यों पर ध्यान केंद्रित करें।" }
];

const parseAstrologyDate = (dateStr) => {
    if (!dateStr) return new Date();
    if (typeof dateStr !== 'string') return new Date(dateStr);
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day, 12, 0, 0);
    }
    return new Date(dateStr);
};

const getLocalizedDateLabel = (signLower, period, dateStr, locale) => {
    const d = parseAstrologyDate(dateStr);
    const signLabel = zodiacNamesMap[signLower]?.[locale] || signLower;
    const periodLabel = periodsMap[period]?.[locale] || period;
    
    if (locale === 'hi') {
        const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
        const monthName = monthsHi[d.getMonth()];
        return `${signLabel} ${periodLabel} राशिफल - ${d.getDate()} ${monthName}, ${d.getFullYear()}`;
    } else {
        const monthName = d.toLocaleDateString('en-US', { month: 'long' });
        return `${signLabel} ${periodLabel} Horoscope - ${monthName} ${d.getDate()}, ${d.getFullYear()}`;
    }
};

const hindiFallbackPredictions = {
    aries: {
        rashiName: "मेष",
        daily: "आज मेष राशि के जातकों के लिए ऊर्जा और उत्साह से भरा दिन रहेगा। कार्यक्षेत्र में नए अवसर प्राप्त होंगे और उच्च अधिकारियों से प्रशंसा मिलेगी। परिजनों के साथ संबंध मधुर रहेंगे।",
        weekly: "इस सप्ताह मेष राशि के जातकों को अपनी ऊर्जा का सही दिशा में प्रयोग करना होगा। आर्थिक लाभ के योग बन रहे हैं। स्वास्थ्य का थोड़ा ध्यान रखें।",
        monthly: "इस महीने मेष राशि के जातकों को करियर और व्यापार में विशेष सफलता मिलेगी। शनि और गुरु के शुभ प्रभाव से वित्तीय स्थिति सुदृढ़ होगी।",
        yearly: "यह वर्ष मेष राशि के लिए नए अवसरों और उन्नति का वर्ष रहेगा। उच्च शिक्षा और आध्यात्मिक कार्यों में सफलता प्राप्त होगी।",
        remedy: "श्री हनुमान जी को लाल सिंदूर अर्पित करें और हनुमान चालीसा का पाठ करें।",
        luckyColor: "लाल",
        luckyNumber: "9"
    },
    taurus: {
        rashiName: "वृषभ",
        daily: "वृषभ राशि के जातकों के लिए आज का दिन शांति और स्थिरता लेकर आएगा। व्यापारिक फैसलों में सोच-समझकर कदम उठाएं। धन निवेश के लिए समय अनुकूल है।",
        weekly: "इस सप्ताह परिवार में मांगलिक कार्यों की योजना बन सकती है। भौतिक सुख-सुविधाओं में वृद्धि होगी। कार्यक्षेत्र में धैर्य बनाए रखें।",
        monthly: "इस महीने आर्थिक मामलों में सुधार होगा। पुरानी समस्याओं से मुक्ति मिलेगी। परिवार के साथ सुखद समय व्यतीत होगा।",
        yearly: "यह वर्ष वृषभ राशि के जातकों के लिए समृद्धि और सुख-शांति लेकर आएगा। नए संबंधों में मजबूती आएगी।",
        remedy: "सफेद चंदन का तिलक लगाएं और महालक्ष्मी जी की आराधना करें।",
        luckyColor: "गुलाबी",
        luckyNumber: "6"
    },
    gemini: {
        rashiName: "मिथुन",
        daily: "मिथुन राशि के जातकों को आज अपने संवाद कौशल का लाभ मिलेगा। नए प्रोजेक्ट की शुरुआत हो सकती है। मित्रों के साथ आनंददायक समय बीतेगा।",
        weekly: "इस सप्ताह यात्राओं के योग बन रहे हैं जो फलदायी सिद्ध होंगी। कार्यस्थल पर सहकर्मियों का पूरा सहयोग प्राप्त होगा।",
        monthly: "इस महीने बौद्धिक क्षमता में वृद्धि होगी। रचनात्मक कार्यों में सफलता मिलेगी। व्यापार में नए साझेदार मिल सकते हैं।",
        yearly: "यह वर्ष करियर में नई ऊंचाइयों को छूने का है। मेहनत का पूरा फल मिलेगा और मान-सम्मान बढ़ेगा।",
        remedy: "गाय को हरा चारा खिलाएं और भगवान गणेश जी की पूजा करें।",
        luckyColor: "हरा",
        luckyNumber: "5"
    },
    cancer: {
        rashiName: "कर्क",
        daily: "कर्क राशि के जातकों के लिए आज का दिन भावनात्मक रूप से संतुलित रहने का है। पारिवारिक मामलों में सुख मिलेगा। मन को शांत रखें।",
        weekly: "इस सप्ताह गृहस्थ जीवन में खुशहाली रहेगी। माता-पिता का आशीर्वाद मिलेगा। वित्तीय मामलों में समझदारी से निर्णय लें।",
        monthly: "इस महीने संपत्ति या वाहन क्रय करने के योग बन रहे हैं। मानसिक तनाव से राहत मिलेगी।",
        yearly: "यह वर्ष आध्यात्मिक उन्नति और परिवार में मांगलिक कार्यों का रहेगा। सुख-सुविधाओं में विस्तार होगा।",
        remedy: "सोमवार को शिवलिंग पर दूध और जल चढ़ाएं।",
        luckyColor: "सफेद",
        luckyNumber: "2"
    },
    leo: {
        rashiName: "सिंह",
        daily: "सिंह राशि के जातकों के लिए आज का दिन नेतृत्व और पराक्रम का है। समाज में आपका प्रभाव और मान-सम्मान बढ़ेगा। आर्थिक स्थिति सुदृढ़ होगी।",
        weekly: "इस सप्ताह करियर में प्रगति के नए अवसर प्राप्त होंगे। उच्च अधिकारियों का समर्थन मिलेगा। आत्मविश्वास में वृद्धि होगी।",
        monthly: "इस महीने व्यापार में बड़ा लाभ मिल सकता है। पुरानी योजनाओं से धन लाभ संभव है।",
        yearly: "यह वर्ष सिंह राशि के जातकों के लिए अत्यंत प्रभावशाली रहेगा। लक्ष्य प्राप्ति में सफलता मिलेगी।",
        remedy: "प्रातः सूर्य देव को तांबे के लोटे से जल दें और आदित्य हृदय स्तोत्र पढ़ें।",
        luckyColor: "सुनहरा",
        luckyNumber: "1"
    },
    virgo: {
        rashiName: "कन्या",
        daily: "कन्या राशि के जातकों को आज योजनाबद्ध तरीके से काम करना होगा। कार्यस्थल पर बारीकियों पर ध्यान दें। स्वास्थ्य उत्तम रहेगा।",
        weekly: "इस सप्ताह प्रतियोगी परीक्षाओं में लगे छात्रों को सफलता मिलेगी। व्यापारिक यात्राएं लाभदायक रहेंगी।",
        monthly: "इस महीने आय के नए स्रोत बनेंगे। पुराने ऋणों से मुक्ति मिलेगी। पारिवारिक वातावरण सुखद रहेगा।",
        yearly: "यह वर्ष नए कौशल सीखने और पेशेवर जीवन में वृद्धि का रहेगा। निर्णय क्षमता मजबूत होगी।",
        remedy: "जरूरतमंदों को हरी वस्तुओं का दान करें और श्री विष्णु जी का ध्यान करें।",
        luckyColor: "हरा",
        luckyNumber: "5"
    },
    libra: {
        rashiName: "तुला",
        daily: "तुला राशि के जातकों के लिए आज का दिन संतुलन और सद्भाव का रहेगा। प्रेम संबंधों में मिठास आएगी। कलात्मक कार्यों में रुचि बढ़ेगी।",
        weekly: "इस सप्ताह जीवनसाथी का सहयोग प्राप्त होगा। व्यापारिक मामलों में लाभप्रद सौदे हो सकते हैं।",
        monthly: "इस महीने भौतिक सुख-सुविधाएं बढ़ेंगी। आर्थिक स्थिति में सकारात्मक सुधार आएगा।",
        yearly: "यह वर्ष नए रिश्तों और साझेदारी के लिए शुभ रहेगा। जीवन में सुख-समृद्धि बनी रहेगी।",
        remedy: "संध्या समय मंदिर में घी का दीपक जलाएं।",
        luckyColor: "सफेद",
        luckyNumber: "6"
    },
    scorpio: {
        rashiName: "वृश्चिक",
        daily: "वृश्चिक राशि के जातकों के लिए आज का दिन दृढ़ संकल्प और लगन का है। रुका हुआ कार्य पूरा होगा। शत्रुओं पर विजय प्राप्त होगी।",
        weekly: "इस सप्ताह गोपनीय योजनाओं में सफलता मिलेगी। अचानक धन लाभ के योग हैं। स्वास्थ्य का ध्यान रखें।",
        monthly: "इस महीने शोध और गूढ़ विषयों में रुचि बढ़ेगी। करियर में बड़ा बदलाव देखने को मिल सकता है।",
        yearly: "यह वर्ष आत्म-विकास और महत्वपूर्ण सफलताओं का वर्ष सिद्ध होगा।",
        remedy: "हनुमान जी को गुड़ का भोग लगाएं और हनुमान चालीसा पढ़ें।",
        luckyColor: "लाल",
        luckyNumber: "9"
    },
    sagittarius: {
        rashiName: "धनु",
        daily: "धनु राशि के जातकों के लिए आज का दिन ज्ञान और धर्म-कर्म में रुचि का रहेगा। गुरुजनों का आशीर्वाद मिलेगा। मन प्रसन्न रहेगा।",
        weekly: "इस सप्ताह उच्च शिक्षा और लंबी यात्रा के योग हैं। आध्यात्मिक चिंतन से शांति प्राप्त होगी।",
        monthly: "इस महीने भाग्य का पूरा साथ मिलेगा। आर्थिक लाभ और सामाजिक प्रतिष्ठा बढ़ेगी।",
        yearly: "यह वर्ष ज्ञान वृद्धि, यात्राओं और भारी सफलता का रहेगा।",
        remedy: "केसर का तिलक लगाएं और विष्णु सहस्रनाम का पाठ करें।",
        luckyColor: "पीला",
        luckyNumber: "3"
    },
    capricorn: {
        rashiName: "मकर",
        daily: "मकर राशि के जातकों के लिए आज का दिन अनुशासन और कड़ी मेहनत का है। कार्यक्षेत्र में जिम्मेदारी बढ़ेगी। धैर्य बनाए रखें।",
        weekly: "इस सप्ताह आजीविका के साधनों में वृद्धि होगी। वरिष्ठ अधिकारियों का सहयोग मिलेगा।",
        monthly: "इस महीने लंबे समय से अटके काम पूरे होंगे। आर्थिक स्थिति मजबूत होगी।",
        yearly: "यह वर्ष स्थिरता, संपत्ति लाभ और करियर में पदोन्नति का रहेगा।",
        remedy: "पीपल के वृक्ष के पास सरसों के तेल का दीपक जलाएं।",
        luckyColor: "स्लेटी",
        luckyNumber: "8"
    },
    aquarius: {
        rashiName: "कुंभ",
        daily: "कुंभ राशि के जातकों के लिए आज का दिन नवीन विचारों और सामाजिक गतिविधियों का है। नए मित्र बनेंगे। धन लाभ की संभावना है।",
        weekly: "इस सप्ताह जनसेवा और समूह कार्यों में सफलता मिलेगी। आय के साधनों में वृद्धि होगी।",
        monthly: "इस महीने व्यापार और करियर में नए अवसर मिलेंगे। मानसिक संतुष्टि रहेगी।",
        yearly: "यह वर्ष तकनीकी क्षेत्रों और नए प्रयोगों में बड़ी सफलता दिलाएगा।",
        remedy: "शनि मंत्र का जाप करें और गरीबों की सहायता करें।",
        luckyColor: "नीला",
        luckyNumber: "8"
    },
    pisces: {
        rashiName: "मीन",
        daily: "मीन राशि के जातकों के लिए आज का दिन कल्पनाशीलता और भक्ति भाव का रहेगा। मानसिक शांति मिलेगी। धर्म-कर्म में मन लगेगा।",
        weekly: "इस सप्ताह दूर की यात्रा या विदेश संबंधी कार्यों में प्रगति होगी। आत्मिक सुख की प्राप्ति होगी।",
        monthly: "इस महीने धन का आगमन होगा और पुराने प्रयासों का मीठा फल मिलेगा।",
        yearly: "यह वर्ष आध्यात्मिक शांति और पारिवारिक समृद्धि का रहेगा।",
        remedy: "भगवान विष्णु को बेसन के लड्डू चढ़ाएं और गुरु बीज मंत्र का जाप करें।",
        luckyColor: "पीला",
        luckyNumber: "3"
    }
};

/**
 * Generates a complete Hindi horoscope object for a given sign and period
 */
const buildHindiHoroscopeObj = (signLower, period, refDate) => {
    const fallback = hindiFallbackPredictions[signLower] || hindiFallbackPredictions.aries;
    const rName = fallback.rashiName;
    const periodLabelHi = periodsMap[period]?.hi || period;
    
    const sections = period !== 'daily' ? [
        { heading: "व्यक्तिगत जीवन एवं परिवार", body: `ग्रहों की अनुकूल स्थिति से ${rName} राशि के जातकों के पारिवारिक जीवन में सौहार्द और विश्वास बना रहेगा।` },
        { heading: "करियर एवं व्यवसाय", body: `सहकर्मियों के साथ मिलकर कार्य करने से कार्यक्षेत्र में सफलता और पद-प्रतिष्ठा की प्राप्ति होगी।` },
        { heading: "स्वास्थ्य एवं तंदुरुस्ती", body: `प्रातःकाल योग और प्राणायाम करें जिससे दिनभर मानसिक शांति और ऊर्जा बनी रहेगी।` }
    ] : null;

    const ratings = [
        { label: "स्वास्थ्य", score: 4 },
        { label: "धन-संपत्ति", score: 4 },
        { label: "परिवार", score: 5 },
        { label: "प्रेम संबंध", score: 4 },
        { label: "व्यवसाय", score: 4 },
        { label: "दांपत्य जीवन", score: 4 }
    ];

    return {
        sign: signLower,
        period_type: period,
        content: fallback[period] || fallback.daily,
        date_label: `${rName} ${periodLabelHi} राशिफल`,
        lucky_number: fallback.luckyNumber,
        lucky_color: fallback.luckyColor,
        remedy: fallback.remedy,
        ratings,
        sections,
        reference_date: refDate,
        locale: 'hi'
    };
};

/**
 * Endpoint: GET/POST /astrology/horoscope
 */
const handleHoroscopeRequest = async (req, res) => {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] || `req-${Math.random().toString(36).substring(2, 9)}`;
    const lang = resolveLanguage(req);

    const logData = {
        requestId,
        endpoint: 'POST /api/astrology/horoscope',
        requestedLanguage: lang,
        startTime,
        cacheHit: false,
        apiStatus: 'PENDING',
        cacheWriteStatus: 'SKIPPED'
    };

    const sign = req.query.sign || req.body?.sign;
    const period = req.query.period || req.body?.period || 'daily';

    if (!sign) {
        logData.apiStatus = 'BAD_INPUT';
        logRequest(logData);
        return res.status(400).json({ success: false, error: "Sign parameter is required (e.g. 'aries', 'taurus')" });
    }

    const validPeriods = ['daily', 'weekly', 'monthly', 'yearly'];
    if (!validPeriods.includes(period)) {
        logData.apiStatus = 'BAD_INPUT';
        logRequest(logData);
        return res.status(400).json({ success: false, error: "Invalid period. Must be daily, weekly, monthly, or yearly" });
    }

    const signLower = sign.toLowerCase();
    const refDate = getReferenceDate(period);

    const cacheKey = `${signLower}|${period}|${refDate}|${lang}`;
    logData.cacheKey = cacheKey;

    try {
        // 1. Try DB cache lookup first matching exact language
        if (supabase) {
            try {
                let { data: existing } = await supabase
                    .from('horoscopes')
                    .select('*')
                    .eq('sign', signLower)
                    .eq('period_type', period)
                    .eq('reference_date', refDate)
                    .eq('locale', lang)
                    .maybeSingle();

                if (existing && validateResponseLanguage(existing, lang)) {
                    logData.cacheHit = true;
                    logData.apiStatus = 'CACHE_HIT';
                    logData.responseLanguage = lang;
                    logRequest(logData);
                    return res.json({ success: true, data: existing });
                }
            } catch (dbErr) {
                console.error('[RashifalAPI] DB Cache read error:', dbErr.message);
            }
        }

        // Check if there is an in-flight dual-fetch request for this sign & period on this date
        const pendingKey = `${signLower}|${period}|${refDate}`;
        let fetchPromise = pendingHoroscopeRequests.get(pendingKey);

        if (!fetchPromise) {
            const executeDualFetch = async () => {
                const fetchAndStore = async (targetLang) => {
                    const result = await executeWithFailover('rashifal_api', async (config) => {
                        logData.providerUsed = config.provider;
                        logData.credentialUsed = config.userId;

                        const headers = {
                            'Content-Type': 'application/json',
                            'Accept-Language': targetLang,
                            'x-astrologyapi-language': targetLang
                        };
                        if (config.userId && config.apiKey) {
                            headers['Authorization'] = `Basic ${Buffer.from(`${config.userId}:${config.apiKey}`).toString('base64')}`;
                        }
                        if (config.apiKey) {
                            headers['x-astrologyapi-key'] = config.apiKey;
                        }

                        const url = `${config.baseUrl}/sun_sign_prediction/${period}/${signLower}`;
                        console.log(`[RashifalAPI] Calling AstrologyAPI (${targetLang}): ${url}`);
                        const response = await axios.post(url, { timezone: 5.5 }, { headers, timeout: 15000 });
                        return response.data;
                    });

                    const resData = result.data;
                    const prediction = resData.prediction || resData;

                    // Parse sections & ratings
                    const categories = [
                        { key: 'personal_life', label: 'Personal Life', ratingLabel: 'Love' },
                        { key: 'profession', label: 'Profession', ratingLabel: 'Career' },
                        { key: 'health', label: 'Health', ratingLabel: 'Health' },
                        { key: 'travel', label: 'Travel', ratingLabel: 'Travel' },
                        { key: 'luck', label: 'Luck', ratingLabel: 'Luck' },
                        { key: 'emotions', label: 'Emotions', ratingLabel: 'Emotions' }
                    ];

                    const sections = [];
                    const ratings = [];

                    if (typeof prediction === 'object' && prediction !== null) {
                        categories.forEach(cat => {
                            const text = prediction[cat.key];
                            if (text) {
                                const heading = headingsMap[cat.label]?.[targetLang] || cat.label;
                                sections.push({ heading, body: text });

                                const score = (text.length % 3) + 3;
                                const ratingLabel = ratingsLabelMap[cat.ratingLabel]?.[targetLang] || cat.ratingLabel;
                                ratings.push({ label: ratingLabel, score });
                            }
                        });
                    }

                    let content = '';
                    if (sections.length > 0) {
                        content = sections.map(s => `${s.heading}: ${s.body}`).join('\n\n');
                    } else if (typeof prediction === 'string') {
                        content = prediction;
                    } else if (prediction && (prediction.report || prediction.prediction)) {
                        content = prediction.report || prediction.prediction;
                    } else {
                        content = JSON.stringify(prediction);
                    }

                    const lucky_number = String(resData.lucky_number || resData.lucky_number_rashi || ((signLower.charCodeAt(0) + new Date().getDate()) % 9 + 1));
                    const signColorMap = {
                        aries: 'red', taurus: 'pink', gemini: 'green', cancer: 'white',
                        leo: 'gold', virgo: 'green', libra: 'blue', scorpio: 'maroon',
                        sagittarius: 'yellow', capricorn: 'black', aquarius: 'dark blue', pisces: 'yellow'
                    };
                    const rawColor = resData.lucky_color || signColorMap[signLower] || 'yellow';
                    const colorKey = rawColor.toLowerCase();
                    const lucky_color = colorMap[colorKey]?.[targetLang] || rawColor;

                    const remedyIndex = (new Date().getDate() + signLower.length) % remediesPoolMap.length;
                    const remedy = resData.remedy || resData.remedies || remediesPoolMap[remedyIndex][targetLang];

                    const date_label = getLocalizedDateLabel(signLower, period, resData.prediction_date || resData.date, targetLang);

                    const mappedData = {
                        sign: signLower,
                        period_type: period,
                        content,
                        date_label,
                        lucky_number,
                        lucky_color,
                        remedy,
                        ratings: ratings.length > 0 ? ratings : null,
                        sections: sections.length > 0 ? sections : null,
                        reference_date: refDate,
                        locale: targetLang
                    };

                    // Phase 9: Validate response
                    const isValid = validateResponseLanguage(mappedData, targetLang);
                    if (!isValid) {
                        if (targetLang === 'hi') {
                            console.warn('[RashifalAPI] Target language is Hindi but response is in English. Using Hindi fallback generator.');
                            return buildHindiHoroscopeObj(signLower, period, refDate);
                        }
                    }

                    // Save to DB cache
                    if (supabase) {
                        try {
                            const { error: saveErr } = await supabase
                                .from('horoscopes')
                                .upsert(mappedData, { onConflict: 'sign,period_type,reference_date,locale' });

                            if (saveErr) {
                                const legacyData = { ...mappedData };
                                delete legacyData.locale;
                                await supabase
                                    .from('horoscopes')
                                    .upsert(legacyData, { onConflict: 'sign,period_type,reference_date' });
                            }
                        } catch (saveError) {
                            console.error(`[RashifalAPI] DB Cache save error for ${targetLang}:`, saveError.message);
                        }
                    }

                    return mappedData;
                };

                // Fetch both hi and en in parallel on the first miss
                const results = await Promise.allSettled([
                    fetchAndStore('hi'),
                    fetchAndStore('en')
                ]);

                let hiRes = results[0].status === 'fulfilled' ? results[0].value : null;
                let enRes = results[1].status === 'fulfilled' ? results[1].value : null;

                if (!hiRes) {
                    hiRes = buildHindiHoroscopeObj(signLower, period, refDate);
                }

                return { hi: hiRes, en: enRes || hiRes };
            };

            fetchPromise = executeDualFetch();
            pendingHoroscopeRequests.set(pendingKey, fetchPromise);
        } else {
            console.log(`[RashifalAPI] Reusing pending dual-fetch promise for key: ${pendingKey}`);
            logData.apiStatus = 'DEDUPLICATED';
        }

        try {
            const dualData = await fetchPromise;
            const resPayload = (lang === 'hi' ? dualData.hi : dualData.en) || dualData.hi || dualData.en;
            logData.apiStatus = logData.apiStatus === 'PENDING' ? 'API_SUCCESS' : logData.apiStatus;
            logData.cacheWriteStatus = 'SUCCESS';
            logData.responseLanguage = lang;
            logRequest(logData);
            return res.json({ success: true, data: resPayload });
        } finally {
            pendingHoroscopeRequests.delete(pendingKey);
        }

    } catch (error) {
        console.error('[RashifalAPI] External fetch failed, checking DB / Hindi generator:', error.message);
        
        if (lang === 'hi') {
            const hiPayload = buildHindiHoroscopeObj(signLower, period, refDate);
            return res.json({ success: true, data: hiPayload });
        }

        logData.apiStatus = `ERROR: ${error.message}`;
        logRequest(logData);
        return res.status(500).json({ 
            success: false, 
            error: "API_ERROR", 
            msg: error.message 
        });
    }
};

router.get('/astrology/horoscope', handleHoroscopeRequest);
router.post('/astrology/horoscope', handleHoroscopeRequest);

module.exports = router;

