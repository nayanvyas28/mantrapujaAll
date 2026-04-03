import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../utils/supabase';
import { ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ResultDisclaimer } from '../components/ui/ResultDisclaimer';
import { sanitizeText } from '../utils/sanitizer';

// Rashi details
const RASHIS = [
    { name: 'Mesh', icon: '♈️' },
    { name: 'Vrishabh', icon: '♉️' },
    { name: 'Mithun', icon: '♊️' },
    { name: 'Karka', icon: '♋️' },
    { name: 'Simha', icon: '♌️' },
    { name: 'Kanya', icon: '♍️' },
    { name: 'Tula', icon: '♎️' },
    { name: 'Vrishchik', icon: '♏️' },
    { name: 'Dhanu', icon: '♐️' },
    { name: 'Makar', icon: '♑️' },
    { name: 'Kumbh', icon: '♒️' },
    { name: 'Meen', icon: '♓️' },
];

const calculateRashi = (dob: string | undefined | string[]) => {
    if (!dob || typeof dob !== 'string') return null;

    // Expected format: YYYY-MM-DD
    const parts = dob.trim().split('-');
    if (parts.length !== 3) return null;
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return RASHIS[0];
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return RASHIS[1];
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return RASHIS[2];
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return RASHIS[3];
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return RASHIS[4];
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return RASHIS[5];
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return RASHIS[6];
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return RASHIS[7];
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return RASHIS[8];
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return RASHIS[9];
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return RASHIS[10];
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return RASHIS[11];
    return null;
};

export default function RashiSelectionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme, colors } = useTheme();
    const dobParam = params.dob;

    const [selectedRashi, setSelectedRashi] = useState<{ name: string, icon: string } | null>(null);
    const [hasValiddob, setHasValidDob] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dobParam) {
            const detected = calculateRashi(dobParam);
            if (detected) {
                setSelectedRashi(detected);
                setHasValidDob(true);
            }
        }
    }, [dobParam]);

    const handleContinue = async () => {
        if (!selectedRashi) {
            setErrorMessage('Please select your Rashi to continue');
            return;
        }

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Fetch current metadata to avoid overwriting
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('onboarding_data')
                    .eq('id', user.id)
                    .single();

                const currentData = profile?.onboarding_data || {};

                // Use update instead of upsert to avoid risk of creating partial rows
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        rashi: selectedRashi.name,
                        onboarding_data: {
                            ...currentData,
                            rashi: selectedRashi
                        },
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', user.id);

                if (error) console.error('Rashi Sync Error:', error.message);
            }

            await AsyncStorage.setItem('hasSeenZodiac', 'true');
            await AsyncStorage.setItem('selectedRashi', JSON.stringify(selectedRashi));
            router.replace('/permissions');
        } catch (e) {
            console.error('Failed to save Rashi state:', e);
            router.replace('/permissions');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = async () => {
        try {
            await AsyncStorage.setItem('hasSeenZodiac', 'true');
            router.replace('/permissions');
        } catch (e) {
            router.replace('/permissions');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.foreground }]}>Your Rashi</Text>
                        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
                            {sanitizeText(hasValiddob
                                ? "We've selected this based on your details. You can change it anytime."
                                : "Select your Rashi to continue")}
                        </Text>
                    </View>

                    <View style={styles.zodiacGrid}>
                        {RASHIS.map((rashi) => {
                            const isSelected = selectedRashi?.name === rashi.name;
                            return (
                                <TouchableOpacity
                                    key={rashi.name}
                                    style={[
                                        styles.zodiacOption,
                                        { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.border },
                                        isSelected && styles.zodiacOptionSelected
                                    ]}
                                    onPress={() => {
                                        setSelectedRashi(rashi);
                                        setErrorMessage(''); // Clear error if any
                                    }}
                                >
                                    <View style={styles.iconContainer}>
                                        <Text style={styles.zodiacOptionIcon}>{rashi.icon}</Text>
                                    </View>
                                    <Text style={[
                                        styles.zodiacOptionName,
                                        { color: colors.foreground },
                                        isSelected && styles.zodiacOptionNameSelected
                                    ]}>{rashi.name}</Text>

                                    {hasValiddob && isSelected && (
                                        <Text style={styles.autoDetectLabel}>Selected based on your birth date</Text>
                                    )}
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {errorMessage ? (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    ) : null}

                    <ResultDisclaimer style={{ marginTop: 24, marginBottom: 20 }} />
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.primaryButton,
                            !selectedRashi && hasValiddob === false && styles.primaryButtonDisabled
                        ]}
                        onPress={handleContinue}
                    >
                        <Text style={styles.primaryButtonText}>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent', // Warm Cream
    },
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#475569',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    zodiacGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    zodiacOption: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    zodiacOptionSelected: {
        backgroundColor: '#fff7ed',
        borderColor: '#f97316', // Saffron Primary
    },
    iconContainer: {
        marginBottom: 8,
    },
    zodiacOptionIcon: {
        fontSize: 36,
    },
    zodiacOptionName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#475569',
        textAlign: 'center',
    },
    zodiacOptionNameSelected: {
        color: '#ea580c',
    },
    autoDetectLabel: {
        fontSize: 10,
        color: '#f97316',
        textAlign: 'center',
        marginTop: 6,
        fontWeight: '500',
    },
    errorText: {
        color: '#ef4444',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: '600',
        fontSize: 14,
    },
    buttonContainer: {
        padding: 24,
        paddingTop: 10,
        paddingBottom: Platform.OS === 'ios' ? 10 : 24,
        backgroundColor: 'transparent',
    },
    primaryButton: {
        backgroundColor: '#f97316', // Cosmic Navy / Saffron
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonDisabled: {
        backgroundColor: '#cbd5e1',
        shadowOpacity: 0,
        elevation: 0,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    skipText: {
        color: '#64748b',
        fontSize: 16,
        fontWeight: '600',
    },
});
