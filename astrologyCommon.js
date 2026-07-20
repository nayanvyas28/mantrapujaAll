const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local if present
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    dotenv.config();
}

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const encryptionKey = process.env.EXPO_PUBLIC_ENCRYPTION_KEY || process.env.VITE_ENCRYPTION_KEY;
const IS_PROD = process.env.NODE_ENV === 'production';

// Initialize Supabase Client
let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
    } catch (err) {
        console.error('[astrologyCommon] Supabase client initialization failed:', err.message);
    }
}

/**
 * Validates startup configurations for production environments.
 * Throws fatal error if necessary variables are missing.
 */
function validateStartup() {
    if (IS_PROD) {
        if (!supabaseUrl || !supabaseAnonKey) {
            throw new Error('FATAL: Supabase environment variables (EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY) are missing in production.');
        }
        if (!encryptionKey || encryptionKey.length < 16) {
            throw new Error('FATAL: Encryption key (EXPO_PUBLIC_ENCRYPTION_KEY) is missing or length < 16 in production.');
        }
    } else {
        console.log('[astrologyCommon] Running in development mode. Config validation warnings only.');
        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('[astrologyCommon] Warning: Supabase credentials missing.');
        }
        if (!encryptionKey || encryptionKey.length < 16) {
            console.warn('[astrologyCommon] Warning: Encryption key missing or invalid length.');
        }
    }
}

/**
 * Unified language resolution extracting and normalizing client language code to 'hi' or 'en'.
 */
function resolveLanguage(req) {
    const raw = String(
        req.headers['x-accept-language'] ||
        req.query?.lang ||
        req.body?.lang ||
        req.body?.language ||
        req.query?.language ||
        req.body?.locale ||
        req.query?.locale ||
        req.headers['accept-language'] ||
        'en'
    ).toLowerCase();
    
    return ['hi', 'hi-in', 'hi_in', 'hindi'].includes(raw) ? 'hi' : 'en';
}

/**
 * Dynamic config manager: resolves all active configurations in priority order.
 */
async function resolveAndOrderConfigs(providerName) {
    const list = [];
    const defaultUserId = process.env.ASTROLOGY_USER_ID || '652693';
    const defaultApiKey = process.env.ASTROLOGY_API_KEY || 'ak-78d22f4e9a7680c4ac68ce28053f9d09fd3d56bf';
    const defaultBaseUrl = "https://json.astrologyapi.com/v1";

    if (supabase) {
        try {
            if (!encryptionKey || encryptionKey.length < 16) {
                throw new Error('Encryption key is missing or too short.');
            }

            // Fetch active configs from Supabase RPC to bypass RLS
            const { data: configs, error: configsErr } = await supabase.rpc('get_api_configs');
            if (configsErr) throw configsErr;

            if (configs && configs.length > 0) {
                // Find all active configurations relating to astrology
                const activeConfigs = configs.filter(c => c.is_active && 
                    (c.provider === 'astrology_api' || 
                     c.provider.startsWith('kundli_api') || 
                     c.provider.startsWith('panchang_api') || 
                     c.provider.startsWith('rashifal_api'))
                );

                // Sort configurations based on priority rules:
                // 1. Exact match to providerName (e.g. panchang_api)
                // 2. Backups of providerName (e.g. panchang_api_backup_1)
                // 3. Backups of other providers (e.g. kundli_api_backup_1)
                // 4. General astrology_api config
                activeConfigs.sort((a, b) => {
                    if (a.provider === providerName) return -1;
                    if (b.provider === providerName) return 1;

                    const isBackupA = a.provider.includes('_backup_');
                    const isBackupB = b.provider.includes('_backup_');
                    const isSpecificBackupA = a.provider.startsWith(providerName + '_backup_');
                    const isSpecificBackupB = b.provider.startsWith(providerName + '_backup_');

                    if (isSpecificBackupA && !isSpecificBackupB) return -1;
                    if (isSpecificBackupB && !isSpecificBackupA) return 1;

                    if (isBackupA && !isBackupB) return -1;
                    if (isBackupB && !isBackupA) return 1;

                    if (a.provider === 'astrology_api') return 1;
                    if (b.provider === 'astrology_api') return -1;

                    return a.provider.localeCompare(b.provider);
                });

                for (const config of activeConfigs) {
                    let userId = config.api_username || defaultUserId;
                    let apiKey = defaultApiKey;
                    let baseUrl = config.base_url ? config.base_url.replace(/\/+$/, '') : defaultBaseUrl;

                    // Decrypt API key using RPC
                    const { data: decryptedKey, error: decryptErr } = await supabase.rpc('get_decrypted_api_key', {
                        p_provider: config.provider,
                        p_encryption_key: encryptionKey
                    });

                    if (decryptedKey && !decryptErr) {
                        apiKey = decryptedKey;
                    } else {
                        console.warn(`[astrologyCommon] Failed to decrypt key for ${config.provider}:`, decryptErr?.message);
                    }

                    list.push({
                        provider: config.provider,
                        userId,
                        apiKey,
                        baseUrl,
                        friendlyName: config.name || config.provider
                    });
                }
            }
        } catch (err) {
            console.error('[astrologyCommon] Error loading dynamic database configs:', err.message);
        }
    }

    // Always append env variables fallback at the very end
    list.push({
        provider: 'environment_variables',
        userId: defaultUserId,
        apiKey: defaultApiKey,
        baseUrl: defaultBaseUrl,
        friendlyName: 'Default Environment Credentials'
    });

    return list;
}

/**
 * Executes an external API call with automatic retry failover loop.
 * Retries on 401, 403, and subscription expiration/auth failures.
 */
async function executeWithFailover(providerName, requestFn) {
    const configs = await resolveAndOrderConfigs(providerName);
    let lastError = null;

    for (const config of configs) {
        try {
            const data = await requestFn(config);
            return { data, config };
        } catch (err) {
            const status = err.response?.status;
            const msg = String(err.response?.data?.msg || err.message || '').toLowerCase();
            
            const isAuthError = status === 403 || 
                                status === 401 || 
                                msg.includes('expired') || 
                                msg.includes('renew') || 
                                msg.includes('unauthorized') || 
                                msg.includes('forbidden') || 
                                msg.includes('auth');

            if (isAuthError) {
                console.warn(`[astrologyCommon] Provider "${config.friendlyName}" (${config.provider}) failed with authorization/expired error: "${msg}". Triaging next fallback config...`);
                lastError = err;
                continue;
            }
            // Non-auth error, throw immediately (e.g. validation, connection, timeout)
            throw err;
        }
    }
    throw new Error(`All configurations failed. Last error: ${lastError?.message || 'Unknown configuration failure'}`);
}

/**
 * Unicode-based check to verify if a string contains Devanagari (Hindi) script characters.
 */
function containsHindi(str) {
    if (!str) return false;
    return /[\u0900-\u097F]/.test(str);
}

/**
 * Validates that the returned third-party data matches the requested language.
 */
function validateResponseLanguage(data, expectedLang) {
    if (!data) return false;

    // Helper to extract nested string values to verify unicode characters
    const stringPool = [];
    const extractStrings = (obj) => {
        if (!obj) return;
        if (typeof obj === 'string') {
            stringPool.push(obj);
        } else if (Array.isArray(obj)) {
            obj.forEach(item => extractStrings(item));
        } else if (typeof obj === 'object') {
            Object.values(obj).forEach(val => extractStrings(val));
        }
    };

    extractStrings(data);
    const compiledText = stringPool.join(' ');

    if (expectedLang === 'hi') {
        // If Hindi requested, the response MUST contain at least some Hindi Devanagari characters
        return containsHindi(compiledText);
    } else {
        // If English requested, the response should NOT contain Hindi characters
        return !containsHindi(compiledText);
    }
}

/**
 * Structured request logger for monitoring, debugging, and tracing.
 */
function logRequest(logData) {
    const elapsed = Date.now() - logData.startTime;
    const verbose = !IS_PROD;

    if (verbose) {
        console.log(`\n================== [Astrology Request Logger] ==================`);
        console.log(`Request ID:       ${logData.requestId || 'N/A'}`);
        console.log(`Endpoint:         ${logData.endpoint}`);
        console.log(`Language:         Requested: ${logData.requestedLanguage} | Found in Response: ${logData.responseLanguage || 'N/A'}`);
        console.log(`Cache Status:     ${logData.cacheHit ? '🟢 HIT' : '🔴 MISS'}`);
        if (logData.cacheKey) {
            console.log(`Cache Key:        ${logData.cacheKey}`);
        }
        console.log(`API Status:       ${logData.apiStatus || 'N/A'}`);
        if (logData.credentialUsed) {
            console.log(`Provider:         ${logData.providerUsed} (${logData.credentialUsed})`);
        }
        console.log(`Cache Write:      ${logData.cacheWriteStatus || 'N/A'}`);
        console.log(`Execution Time:   ${elapsed}ms`);
        console.log(`================================================================\n`);
    } else {
        // Concise production format
        console.log(`[Astrology] ID:${logData.requestId || 'N/A'} Ep:${logData.endpoint} Lang:${logData.requestedLanguage} Cache:${logData.cacheHit ? 'HIT' : 'MISS'} Provider:${logData.providerUsed || 'N/A'} Status:${logData.apiStatus} DB:${logData.cacheWriteStatus || 'N/A'} Time:${elapsed}ms`);
    }
}

module.exports = {
    supabase,
    validateStartup,
    resolveLanguage,
    executeWithFailover,
    validateResponseLanguage,
    logRequest
};
