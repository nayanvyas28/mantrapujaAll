import Constants from 'expo-constants';
import { Platform } from 'react-native';

// The Admin Panel URL where the proxy API is hosted
// Dynamically resolve local IP for development to fix "Network request failed" in Expo Go
const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';

const DEFAULT_LOCAL_URL = Platform.OS === 'android' && !debuggerHost 
    ? 'http://10.0.2.2:3000' 
    : `http://${localIp}:3000`;

// Prioritize dynamic local IP in dev if the env URL points to a local network IP
// Using environment variable for production readiness
const ADMIN_API_URL = process.env.EXPO_PUBLIC_ADMIN_URL || 'http://localhost:3001';

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

class AiService {
    private apiUrl: string;

    constructor(url: string) {
        this.apiUrl = url;
    }

    // userId is passed to the Admin API for query limit tracking & chat history logging
    async chat(message: string, history: ChatMessage[] = [], userId?: string) {
        const fullUrl = `${this.apiUrl}/api/chat`;
        if (__DEV__) console.log(`[AiService] Sending message to: ${fullUrl}`);
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
                }),
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to get AI response');
                }
                return data.text;
            } else {
                const text = await response.text();
                if (__DEV__) console.error('CRITICAL_DEBUG_MARKER - Non-JSON Response:', text.substring(0, 300));
                throw new Error(`[DEBUG_3001] AI Server returned HTML (Status: ${response.status}) - Target URL: ${fullUrl}`);
            }
        } catch (error: any) {
            if (__DEV__) console.error('CRITICAL_DEBUG_MARKER - AiService Error:', error);
            throw error;
        }
    }
}

// Export a singleton instance
export const aiService = new AiService(ADMIN_API_URL);
