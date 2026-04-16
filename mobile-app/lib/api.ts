const ADMIN_URL = "http://lk8ogw0kkok0sso484swc0wc.34.93.68.183.sslip.io";

const fetchWithTimeout = async (url: string, options: any = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    console.log(`[API] Requesting: ${url}`);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
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
        body: JSON.stringify(data),
      });
      return await handleResponse(response);
    } catch (error: any) {
      console.error('[API] verifyOtp error:', error);
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

  guruChat: async (data: { 
    message: string; 
    chatHistory: any[]; 
    userId?: string; 
    sessionId?: string;
    language?: 'hi' | 'en'
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
