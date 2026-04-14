import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, generateSessionHash } from '../utils/supabase';
import { Session, User } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    session: Session | null;
    user: User | null;
    profile: any | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Initial Session Load
        const loadSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;

                handleSessionChange(session, 'INITIAL_SESSION');
            } catch (error: any) {
                console.error("Auth Session Load Error:", error.message);
                if (error.message.includes("Refresh Token")) {
                    // Clear corrupted cache gracefully
                    await supabase.auth.signOut();
                }
                setLoading(false);
            }
        };

        loadSession();

        // 2. Listen for Auth Changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            handleSessionChange(session, event);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSessionChange = async (newSession: Session | null, event?: string) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
            // Concurrent execution: Update Hash (if needed) AND fetch Profile
            const tasks: Promise<any>[] = [fetchProfile(newSession.user.id)];

            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                tasks.push((async () => {
                    const newHash = await generateSessionHash(newSession.access_token);
                    if (newHash) {
                        await supabase.from('profiles').update({ session_hash: newHash }).eq('id', newSession.user.id);
                    }
                })());
            } else if (event === 'INITIAL_SESSION') {
                tasks.push(verifyHashLock(newSession));
            }

            try {
                await Promise.all(tasks);
            } catch (e) {
                console.error("Auth Initialization Tasks Failed:", e);
                setLoading(false); // Ensure we don't hang if a sub-task fails
            }
        } else {
            setProfile(null);
            setLoading(false);
        }
    };

    const verifyHashLock = async (currentSession: Session) => {
        try {
            // Generate current hash
            const currentHash = await generateSessionHash(currentSession.access_token);

            // Fetch stored hash from profiles
            const { data, error } = await supabase
                .from('profiles')
                .select('session_hash')
                .eq('id', currentSession.user.id)
                .single();

            // ONLY logout if there is an EXISTING hash and it doesn't match
            // This prevents new users or users with null hashes from being kicked out
            if (data?.session_hash && data.session_hash !== currentHash) {
                console.warn('Hash Lock Mismatch (Another device?). Logging out for security.');
                await signOut();
            } else if (!data?.session_hash && currentHash) {
                // If no hash in DB, update it silently to lock THIS device
                await supabase.from('profiles').update({ session_hash: currentHash }).eq('id', currentSession.user.id);
            }
        } catch (e) {
            console.error('Hash Lock Verification Error:', e);
        }
    };

    const fetchProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (data) {
                // Update Login Streak
                const today = new Date().toISOString().split('T')[0];
                const onboarding = data.onboarding_data || {};
                const lastLogin = onboarding.last_login_at;
                let currentStreak = onboarding.login_streak || 0;

                if (lastLogin !== today) {
                    if (lastLogin) {
                        const lastDate = new Date(lastLogin);
                        const todayDate = new Date(today);
                        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        if (diffDays === 1) {
                            currentStreak += 1;
                        } else {
                            currentStreak = 1;
                        }
                    } else {
                        currentStreak = 1;
                    }

                    const updatedOnboarding = { 
                        ...onboarding, 
                        login_streak: currentStreak, 
                        last_login_at: today 
                    };
                    
                    await supabase
                        .from('profiles')
                        .update({ onboarding_data: updatedOnboarding })
                        .eq('id', userId);
                    
                    data.onboarding_data = updatedOnboarding;
                }
                
                setProfile(data);
            }
        } catch (e) {
            console.error('Fetch Profile Error:', e);
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        await AsyncStorage.multiRemove([
            'selectedRashi'
        ]);
        setSession(null);
        setUser(null);
        setProfile(null);
    };

    const refreshProfile = async () => {
        if (user?.id) {
            await fetchProfile(user.id);
        }
    };

    return (
        <AuthContext.Provider value={{ session, user, profile, loading, signOut, refreshProfile }}>
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
