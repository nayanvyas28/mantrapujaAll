import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';

type Transaction = {
    id: string;
    amount: number;
    type: 'credit' | 'debit';
    category: string;
    status: string;
    description: string;
    reference_id?: string;
    created_at: string;
};

type WalletContextType = {
    balance: number;
    transactions: Transaction[];
    loading: boolean;
    refreshWallet: () => Promise<void>;
    processPayment: (amount: number, category: string, description: string, referenceId?: string) => Promise<boolean>;
    addFunds: (amount: number, referenceId: string) => Promise<boolean>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWalletData = useCallback(async () => {
        if (!user) return;

        try {
            setLoading(true);
            // 1. Fetch Balance
            const { data: walletData, error: walletError } = await supabase
                .from('wallets')
                .select('balance')
                .eq('user_id', user.id)
                .single();

            if (walletError) {
                if (walletError.code === 'PGRST116') {
                    // Wallet doesn't exist yet, try to create it
                    const { error: createError } = await supabase.from('wallets').insert({ user_id: user.id });
                    if (!createError) setBalance(0);
                } else {
                    throw walletError;
                }
            } else {
                setBalance(walletData.balance || 0);
            }

            // 2. Fetch Transactions
            const { data: transData, error: transError } = await supabase
                .from('wallet_transactions')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(20);

            if (transError) throw transError;
            setTransactions(transData || []);

        } catch (error) {
            console.error("Wallet Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchWalletData();

            // 3. Real-time Subscription for Balance
            const balanceSub = supabase
                .channel(`wallet-balance-${user.id}`)
                .on('postgres_changes', 
                    { event: 'UPDATE', schema: 'public', table: 'wallets', filter: `user_id=eq.${user.id}` }, 
                    (payload) => {
                        setBalance(payload.new.balance);
                    }
                )
                .subscribe();

            // 4. Real-time Subscription for Transactions
            const transSub = supabase
                .channel(`wallet-trans-${user.id}`)
                .on('postgres_changes', 
                    { event: 'INSERT', schema: 'public', table: 'wallet_transactions', filter: `user_id=eq.${user.id}` }, 
                    () => {
                        fetchWalletData(); // Refresh history
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(balanceSub);
                supabase.removeChannel(transSub);
            };
        } else {
            setBalance(0);
            setTransactions([]);
            setLoading(false);
        }
    }, [user, fetchWalletData]);

    const processPayment = async (amount: number, category: string, description: string, referenceId?: string) => {
        if (!user) return false;

        try {
            const { data, error } = await supabase.rpc('process_wallet_transaction', {
                p_user_id: user.id,
                p_amount: amount,
                p_type: 'debit',
                p_category: category,
                p_description: description,
                p_reference_id: referenceId,
                p_metadata: { source: 'app_v1' }
            });

            if (error) throw error;

            if (data.success) {
                // Balance will update via realtime sub
                return true;
            } else {
                Alert.alert("Transaction Failed", data.message || "Something went wrong");
                return false;
            }
        } catch (error: any) {
            console.error("Payment Error:", error.message);
            Alert.alert("Error", "Could not complete wallet transaction.");
            return false;
        }
    };

    const addFunds = async (amount: number, referenceId: string) => {
        if (!user) return false;

        try {
            const { data, error } = await supabase.rpc('process_wallet_transaction', {
                p_user_id: user.id,
                p_amount: amount,
                p_type: 'credit',
                p_category: 'topup',
                p_description: 'Wallet Top-up via Razorpay',
                p_reference_id: referenceId,
                p_metadata: { platform: 'android', gateway: 'razorpay' }
            });

            if (error) throw error;
            return data.success;
        } catch (error) {
            console.error("Top-up Error:", error);
            return false;
        }
    };

    const refreshWallet = async () => {
        await fetchWalletData();
    };

    return (
        <WalletContext.Provider value={{ balance, transactions, loading, refreshWallet, processPayment, addFunds }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
