import Constants from 'expo-constants';
import i18next from 'i18next';
import { Platform } from 'react-native';

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';

const getAdminUrl = () => {
    const envUrl = process.env.EXPO_PUBLIC_ADMIN_URL;
    
    // 1. If we have a local dev setup (debuggerHost), use it. 
    // It's the most reliable way to find the computer's IP from the mobile device.
    if (debuggerHost) {
        const ip = debuggerHost.split(':')[0];
        const resolved = `http://${ip}:3001`;
        console.log(`[AiService] Dynamic resolution (from Metro): ${resolved}`);
        return resolved;
    }

    // 2. If no debugger (production/preview), use the manually configured URL
    if (envUrl) {
        console.log(`[AiService] Using .env configured URL: ${envUrl}`);
        return envUrl;
    }

    // 3. Last resort defaults
    const fallback = Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001';
    console.log(`[AiService] Using fallback: ${fallback}`);
    return fallback;
};

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

class AiService {
    private getApiUrl() {
        return getAdminUrl();
    }

    async chat(message: string, history: ChatMessage[] = [], userId?: string, sessionId?: string, language?: string) {
        const adminUrl = this.getApiUrl();
        const fullUrl = `${adminUrl}/api/chat`;
        const currentLang = language || i18next.language || 'en';
        
        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    chatHistory: history,
                    userId: userId || 'anonymous',
                    language: currentLang,
                    sessionId: sessionId
                }),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || `Server responded with ${response.status}`);
                }
                return { text: data.text, sessionId: data.sessionId };
            } else {
                const text = await response.text();
                throw new Error(`AI Server returned unexpected content (Status: ${response.status})`);
            }
        } catch (error: any) {
            console.error('[AiService] Error:', error.message || error);
            throw error;
        }
    }

    async translate(text: string | string[], targetLang: string = 'hi') {
        const adminUrl = this.getApiUrl();
        const fullUrl = `${adminUrl}/api/chat`;
        
        const prompt = Array.isArray(text) 
            ? `Translate the following ${text.length} items to ${targetLang}. Return ONLY a JSON array of strings: ${JSON.stringify(text)}`
            : `Translate the following text to ${targetLang}. Return ONLY the translation: "${text}"`;

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: prompt,
                    userId: 'system-translator',
                    skipHistory: true
                }),
            });
            const data = await response.json();
            return data.text;
        } catch (error) {
            console.error('[AiService] Translation failed:', error);
            return text;
        }
    }
}

export const aiService = new AiService();
