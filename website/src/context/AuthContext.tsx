"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: any | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    profile: null,
    loading: true,
    signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async (userId: string) => {
            const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
            setProfile(data);
        };

        const getInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    setSession(session);
                    setUser(session.user);
                    await fetchProfile(session.user.id);
                }
            } catch (error) {
                console.error("Auth Initialization Error:", error);
            } finally {
                setLoading(false);
            }
        };

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log(`[AuthContext] Auth Event: ${event}`);
            setSession(session);
            setUser(session?.user ?? null);
            
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        getInitialSession();

        // Listen for profile update events globally
        const handleProfileUpdate = () => {
            // We use a closure-safe way to get the latest user ID if needed, 
            // but for simple cases, we can check a ref or just rely on the event.
            supabase.auth.getSession().then(({data: {session}}) => {
                if (session?.user) fetchProfile(session.user.id);
            });
        };
        window.addEventListener('profile-updated', handleProfileUpdate);

        return () => {
            subscription.unsubscribe();
            window.removeEventListener('profile-updated', handleProfileUpdate);
        };
    }, []); // Run ONLY once on mount

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setProfile(null);
        setLoading(false);
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
