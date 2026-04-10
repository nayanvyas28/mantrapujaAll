import Constants from 'expo-constants';
import { Platform } from 'react-native';

// The Admin Panel URL where the proxy API is hosted
// Dynamically resolve local IP for development to fix "Network request failed" in Expo Go
const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';

const DEFAULT_LOCAL_URL = Platform.OS === 'android' && !debuggerHost 
    ? 'http://10.0.2.2:3000' 
    : `http://${localIp}:3000`;

const getAdminUrl = () => {
    // 1. Check if an explicit environment variable exists (e.g. from .env)
    if (process.env.EXPO_PUBLIC_ADMIN_URL) return process.env.EXPO_PUBLIC_ADMIN_URL;

    // 2. Fallback to auto-detected debugger host (Metro IP)
    if (debuggerHost) {
        const ip = debuggerHost.split(':')[0];
        return `http://${ip}:3001`;
    }

    // 3. Last resort fallbacks
    return Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001';
};

const BASE_URL = getAdminUrl();

if (__DEV__) {
    console.log(`[AiService] Initialized with Base URL: ${BASE_URL}`);
}

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

class AiService {
    private getApiUrl() {
        // Re-evaluate URL dynamically in case of network shifts
        return getAdminUrl();
    }

    // userId is passed to the Admin API for query limit tracking & chat history logging
    async chat(message: string, history: ChatMessage[] = [], userId?: string) {
        const adminUrl = this.getApiUrl();
        const fullUrl = `${adminUrl}/api/chat`;
        
        if (__DEV__) {
            console.log(`[AiService] Sending message to: ${fullUrl}`);
        }

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

            // Defensive Check: Next.js might return HTML on 404/500 if not handled
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || `Server responded with ${response.status}`);
                }
                return data.text;
            } else {
                const text = await response.text();
                console.error('CRITICAL_DEBUG_MARKER - Non-JSON Response:', text.substring(0, 300));
                throw new Error(`AI Server returned unexpected content (Status: ${response.status}). Check if the Proxy API is running at ${fullUrl}`);
            }
        } catch (error: any) {
            if (__DEV__) {
                console.error('CRITICAL_DEBUG_MARKER - AiService Error:', error.message || error);
            }
            throw error;
        }
    }
}

// Export a singleton instance
export const aiService = new AiService();
