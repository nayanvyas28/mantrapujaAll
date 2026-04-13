import i18next from 'i18next';
import { getAdminUrl } from '../utils/apiUrl';

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
