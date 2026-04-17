import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithPassword: (phone: string, password: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  refreshSession: () => Promise<{ session: Session | null; error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Correct Supabase v2 + React Native pattern:
    // ONLY use onAuthStateChange — it fires INITIAL_SESSION on startup
    // with the stored session (or null). Eliminates race condition with getSession().
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log(`[Auth] Event: ${event}, User: ${newSession?.user?.id ?? 'NONE'}`);

      if (event === 'INITIAL_SESSION') {
        // Fires exactly once on startup — single source of truth
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setSession(newSession);
        setUser(newSession?.user ?? null);
      } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setSession(null);
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithPassword = async (phone: string, password: string) => {
    let normalizedPhone = phone.trim().replace(/[^\d+]/g, '');

    if (!normalizedPhone.startsWith('+')) {
      normalizedPhone = normalizedPhone.startsWith('91')
        ? `+${normalizedPhone}`
        : `+91${normalizedPhone}`;
    }

    console.log('[AuthContext] Calling Supabase signInWithPassword for:', normalizedPhone);
    const result = await supabase.auth.signInWithPassword({
      phone: normalizedPhone,
      password,
    });
    
    if (result.error) {
      console.error('[AuthContext] Supabase signInWithPassword ERROR:', result.error.message);
    } else {
      console.log('[AuthContext] Supabase signInWithPassword SUCCESS for user:', result.data.session?.user?.id);
      // Manually set state immediately to avoid race condition with onAuthStateChange
      setSession(result.data.session);
      setUser(result.data.session?.user ?? null);
    }
    
    return result;
  };

  const updatePassword = async (newPassword: string) => {
    console.log('[AuthContext] Updating user password...');
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      console.error('[AuthContext] Update password ERROR:', error.message);
    } else {
      console.log('[AuthContext] Update password SUCCESS for user:', data.user?.id);
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    // State cleared automatically by SIGNED_OUT event above
  };

  const refresh = async () => {
    const { data: { session: currentSession }, error } = await supabase.auth.getSession();
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    return { session: currentSession, error };
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, signInWithPassword, updatePassword, refreshSession: refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
