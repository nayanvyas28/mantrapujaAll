import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Bell, ChevronRight, Image as ImageIcon, MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../components/ui/Typography';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../utils/supabase';

const isExpoGo = Constants.appOwnership === 'expo';
let Notifications: any = null;
if (!isExpoGo) {
    try {
        Notifications = require('expo-notifications');
    } catch (error) {
        console.log("Warning: expo-notifications not loaded in this environment.");
    }
}

export default function PermissionsScreen() {
    const router = useRouter();
    const { theme, colors } = useTheme();
    const [loading, setLoading] = useState(false);

    const handleGrantPermissions = async () => {
        setLoading(true);

        try {
            // 1. Request Notifications Permission (from Expo)
            if (Notifications) {
                const { status: notifStatus } = await Notifications.getPermissionsAsync();
                if (notifStatus !== 'granted') {
                    await Notifications.requestPermissionsAsync();
                }
            } else {
                console.log('Skipping Notifications permission in Expo Go');
            }

            // 2. Request Location Permission (for precise sunrise/sunset and regional numerology/rashi)
            const { status: locStatus } = await Location.getForegroundPermissionsAsync();
            if (locStatus !== 'granted') {
                const requested = await Location.requestForegroundPermissionsAsync();
                if (requested.status === 'granted') {
                    await fetchAndSaveLocation();
                }
            } else {
                await fetchAndSaveLocation();
            }

            // 3. Request Media Library (to upload profile picture in the next step or in the profile tab)
            const { status: mediaStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
            if (mediaStatus !== 'granted') {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            }
        } catch (error) {
            console.log('Error requesting permissions:', error);
        }

        // We do not strictly block them if they deny. Both iOS and Android guidelines 
        // require apps to work gracefully even if users decline permissions.
        setLoading(false);
        finishOnboarding();
    };

    const fetchAndSaveLocation = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return;

            // Fetch the physical device location point
            const locationConfig = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });

            // Update user profile in Supabase to sync regional calculations
            const { error } = await supabase
                .from('profiles')
                .update({
                    location: {
                        latitude: locationConfig.coords.latitude,
                        longitude: locationConfig.coords.longitude
                    }
                })
                .eq('id', session.user.id);

            if (error) console.error("Error saving location:", error);
        } catch (error) {
            console.error("Failed to get physical device location:", error);
        }
    };

    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasFinishedOnboarding', 'true');
            router.replace('/(tabs)');
        } catch (e) {
            router.replace('/(tabs)');
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerSpacer} />
                <Typography variant="h1" color={colors.foreground} style={styles.title}>
                    Almost There
                </Typography>
                <Typography variant="body" color={colors.mutedForeground} style={styles.subtitle}>
                    Mantra Puja requires a few permissions to provide accurate timings, ritual reminders, and a personalized spiritual experience.
                </Typography>

                <View style={styles.cardsContainer}>
                    {/* Alarms & Rituals Card */}
                    <View style={[styles.card, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                        <View style={[styles.iconBox, { backgroundColor: colors.saffron + '15' }]}>
                            <Bell size={24} color={colors.saffron} />
                        </View>
                        <View style={styles.cardText}>
                            <Typography variant="h3" color={colors.foreground} style={{ fontSize: 18 }}>Alarms & Rituals</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 4 }}>
                                Set devotional alarms and get notified for your daily rituals and prayers.
                            </Typography>
                        </View>
                    </View>

                    {/* Location Card */}
                    <View style={[styles.card, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                        <View style={[styles.iconBox, { backgroundColor: colors.saffron + '15' }]}>
                            <MapPin size={24} color={colors.saffron} />
                        </View>
                        <View style={styles.cardText}>
                            <Typography variant="h3" color={colors.foreground} style={{ fontSize: 18 }}>Location</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 4 }}>
                                Required for accurate Sunrise, Sunset, and Rahu Kaal timings based on your city.
                            </Typography>
                        </View>
                    </View>

                    {/* Media Card */}
                    <View style={[styles.card, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                        <View style={[styles.iconBox, { backgroundColor: colors.saffron + '15' }]}>
                            <ImageIcon size={24} color={colors.saffron} />
                        </View>
                        <View style={styles.cardText}>
                            <Typography variant="h3" color={colors.foreground} style={{ fontSize: 18 }}>Photos & Media</Typography>
                            <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 4 }}>
                                Upload your profile picture or save devotional wallpapers to your device.
                            </Typography>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: colors.saffron }]}
                    onPress={handleGrantPermissions}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <>
                            <Typography variant="body" style={styles.btnText}>Allow Permissions</Typography>
                            <ChevronRight size={20} color="#ffffff" />
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipButton} onPress={finishOnboarding} disabled={loading}>
                    <Typography variant="label" color={colors.muted}>Skip for now</Typography>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    headerSpacer: {
        height: 60,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
    },
    title: {
        marginBottom: 12,
        textAlign: 'left',
    },
    subtitle: {
        marginBottom: 40,
        textAlign: 'left',
        lineHeight: 24,
    },
    cardsContainer: {
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1,
        alignItems: 'center',
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    cardText: {
        flex: 1,
    },
    footerContainer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 10 : 24,
    },
    primaryButton: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 6,
    },
    skipButton: {
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    }
});
