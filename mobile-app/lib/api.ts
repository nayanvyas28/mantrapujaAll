import { supabase } from './supabase';
const ADMIN_URL = process.env.EXPO_PUBLIC_ADMIN_URL;
console.log(`[API] Initialized with ADMIN_URL: ${ADMIN_URL}`);

const fetchWithTimeout = async (url: string, options: any = {}, timeout = 60000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    console.log(`[API] Requesting: ${url}`);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    
    // Log response status and body for debugging if it failed
    if (!response.ok) {
      const errorClone = response.clone();
      try {
        const errorText = await errorClone.text();
        console.warn(`[API] Error Response (${response.status}):`, errorText);
      } catch (e) {
        console.warn(`[API] Error Response (${response.status}) - body unreadable`);
      }
    }
    
    clearTimeout(id);
    return response;
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Connection timed out. Please check your internet or server URL.');
    }
    throw error;
  }
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw data || new Error('API Request failed');
  }
  return data;
};

export const api = {
  checkUser: async (phone: string) => {
    try {
      const response = await fetchWithTimeout(`${ADMIN_URL}/api/auth/check-user?phone=${phone}`);
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] checkUser error:', error);
      throw error;
    }
  },

  initiateRegister: async (data: { phone: string; full_name: string; email?: string; password?: string }) => {
    try {
      const response = await fetchWithTimeout(`${ADMIN_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] initiateRegister error:', error);
      throw error;
    }
  },

  verifyOtp: async (data: { phone: string; otp: string; purpose: string; password?: string }) => {
    try {
      const response = await fetchWithTimeout(`${ADMIN_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // is_handshake: true tells backend to always return bridgePassword for Supabase sign-in
        body: JSON.stringify({ ...data, is_handshake: true }),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] verifyOtp error:', error);
      throw error;
    }
  },

  updateProfile: async (data: { userId: string; full_name?: string; email?: string; dob?: string; location?: string; address?: string }) => {
    try {
      const response = await fetchWithTimeout(`${ADMIN_URL}/api/auth/update-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] updateProfile error:', error);
      throw error;
    }
  },

  initiateForgotPassword: async (phone: string) => {
    try {
      const response = await fetch(`${ADMIN_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] forgotPassword error:', error);
      throw error;
    }
  },

  verifyLoginOtp: async (phone: string, otp: string) => {
    try {
      const response = await fetch(`${ADMIN_URL}/api/auth/verify-login-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] verifyLoginOtp error:', error);
      throw error;
    }
  },

  // --- Astrology API ---
  astrology: {
    getKundliData: async (birthData: any, language: string = 'en') => {
      try {
        const response = await fetchWithTimeout(`${ADMIN_URL}/api/astrology/kundli`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ birthData, language }),
        });
        return await response.json();
      } catch (error) {
        console.error('getKundliData error:', error);
        throw error;
      }
    },

    fetchSavedKundalis: async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('user_kundalis')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('fetchSavedKundalis error:', error);
        throw error;
      }
    },

    saveKundali: async (kundaliData: any) => {
      try {
        const { data, error } = await supabase
          .from('user_kundalis')
          .upsert(kundaliData)
          .select()
          .single();
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('saveKundali error:', error);
        throw error;
      }
    },

    deleteKundali: async (id: string) => {
      try {
        const { error } = await supabase
          .from('user_kundalis')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      } catch (error) {
        console.error('deleteKundali error:', error);
        throw error;
      }
    }
  },

  // --- Music API ---
  music: {
    fetchGods: async () => {
      try {
        const response = await fetchWithTimeout(`${ADMIN_URL}/api/music/gods`);
        return await handleResponse(response);
      } catch (error) {
        console.error('fetchGods error:', error);
        throw error;
      }
    },

    fetchSongs: async (params?: { god_id?: string; category?: string }) => {
      try {
        const query = new URLSearchParams(params as any).toString();
        const response = await fetchWithTimeout(`${ADMIN_URL}/api/music/songs?${query}`);
        return await handleResponse(response);
      } catch (error) {
        console.error('fetchSongs error:', error);
        throw error;
      }
    }
  },

  guruChat: async (data: { 
    message: string; 
    chatHistory: any[]; 
    userId?: string; 
    sessionId?: string;
    language?: string;
  }) => {
    try {
      const url = `${ADMIN_URL}/api/chat`;
      console.log('[API] guruChat requesting:', url, 'with message:', data.message);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] guruChat error:', error);
      throw error;
    }
  },

  pujas: {
    getAll: async (params?: { category_id?: string; show_on_home?: boolean }) => {
      const query = new URLSearchParams();
      if (params?.category_id) query.append('category_id', params.category_id);
      if (params?.show_on_home) query.append('show_on_home', params.show_on_home.toString());
      
      const response = await fetch(`${ADMIN_URL}/api/pujas?${query.toString()}`);
      return await handleResponse(response);
    },
    getCategories: async () => {
      const response = await fetch(`${ADMIN_URL}/api/pujas/categories`);
      return await handleResponse(response);
    }
  }
};
