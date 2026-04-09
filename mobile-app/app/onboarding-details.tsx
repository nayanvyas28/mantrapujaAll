import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Calendar, ChevronRight, Clock, MapPin, User as UserIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../components/ui/Typography';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../utils/supabase';

export default function OnboardingDetailsScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [formData, setFormData] = useState({
        dob: new Date(),
        time: new Date(),
        place: '',
        referralCode: '',
    });

    const [dobSet, setDobSet] = useState(false);
    const [timeSet, setTimeSet] = useState(false);

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setFormData(prev => ({ ...prev, dob: selectedDate }));
            setDobSet(true);
        }
    };

    const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setFormData(prev => ({ ...prev, time: selectedTime }));
            setTimeSet(true);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const handleContinue = async () => {
        if (!dobSet || !formData.place.trim()) {
            alert('Please provide your Date and Place of Birth.');
            return;
        }

        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const onboardingData = {
                    dob: formData.dob.toISOString().split('T')[0],
                    time: formatTime(formData.time),
                    place: formData.place.trim(),
                };

                const { error } = await supabase
                    .from('profiles')
                    .update({
                        onboarding_data: onboardingData,
                    })
                    .eq('id', user.id);

                if (error) throw error;

                // 2. Apply Referral Code if provided
                if (formData.referralCode.trim()) {
                    const { data: refResult, error: refError } = await supabase.rpc('apply_referral_code', {
                        p_referral_code: formData.referralCode.trim().toUpperCase()
                    });
                    if (refError) console.error('Referral Apply Error:', refError);
                    else if (refResult && !refResult.success) {
                        console.warn('Referral Not Applied:', refResult.message);
                    }
                }

                // 3. Process the reward (Mark as active)
                const { error: rewardError } = await supabase.rpc('process_referral_reward', {
                    p_referred_id: user.id
                });
                if (rewardError) console.error('Reward Processing Error:', rewardError);
            }

            // Navigate to Zodiac with DOB for auto-calculation
            router.push({
                pathname: '/zodiac',
                params: { dob: formData.dob.toISOString().split('T')[0] }
            });
        } catch (error: any) {
            console.error('Error saving onboarding data:', error.message);
            alert('Failed to save details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Typography variant="h1" color={colors.foreground} style={styles.title}>
                        Birth Details
                    </Typography>
                    <Typography variant="body" color={colors.mutedForeground} style={styles.subtitle}>
                        Details are required for accurate Rashi and Horoscope calculations.
                    </Typography>
                </View>

                <View style={styles.form}>
                    {/* Date of Birth */}
                    <Typography variant="label" color={colors.foreground} style={styles.label}>
                        Date of Birth
                    </Typography>
                    <TouchableOpacity
                        style={[styles.inputWrapper, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Calendar size={20} color={colors.saffron} style={styles.inputIcon} />
                        <Typography variant="body" color={dobSet ? colors.foreground : colors.mutedForeground}>
                            {dobSet ? formatDate(formData.dob) : 'Select Date of Birth'}
                        </Typography>
                    </TouchableOpacity>

                    {/* Time of Birth */}
                    <Typography variant="label" color={colors.foreground} style={styles.label}>
                        Time of Birth (Optional)
                    </Typography>
                    <TouchableOpacity
                        style={[styles.inputWrapper, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Clock size={20} color={colors.saffron} style={styles.inputIcon} />
                        <Typography variant="body" color={timeSet ? colors.foreground : colors.mutedForeground}>
                            {timeSet ? formatTime(formData.time) : 'Select Time of Birth'}
                        </Typography>
                    </TouchableOpacity>

                    {/* Place of Birth */}
                    <Typography variant="label" color={colors.foreground} style={styles.label}>
                        Place of Birth
                    </Typography>
                    <View style={[styles.inputWrapper, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                        <MapPin size={20} color={colors.saffron} style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, { color: colors.foreground }]}
                            placeholder="Enter City, State"
                            placeholderTextColor={colors.mutedForeground}
                            value={formData.place}
                            onChangeText={(text) => setFormData(prev => ({ ...prev, place: text }))}
                        />
                    </View>

                    {/* Referral Code (Optional) */}
                    <Typography variant="label" color={colors.foreground} style={styles.label}>
                        Referral Code (Optional)
                    </Typography>
                    <View style={[styles.inputWrapper, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderColor: colors.borderMuted }]}>
                        <UserIcon size={20} color={colors.saffron} style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, { color: colors.foreground, textTransform: 'uppercase' }]}
                            placeholder="Enter Referral Code"
                            placeholderTextColor={colors.mutedForeground}
                            value={formData.referralCode}
                            autoCapitalize="characters"
                            onChangeText={(text) => setFormData(prev => ({ ...prev, referralCode: text }))}
                        />
                    </View>
                </View>

                {showDatePicker && (
                    <DateTimePicker
                        value={formData.dob}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                        maximumDate={new Date()}
                    />
                )}

                {showTimePicker && (
                    <DateTimePicker
                        value={formData.time}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onTimeChange}
                    />
                )}
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                <TouchableOpacity
                    style={[styles.primaryButton, { backgroundColor: colors.saffron }]}
                    onPress={() => {
                        if (!dobSet || !formData.place.trim()) {
                            Alert.alert('Missing Details', 'Please provide your Date and Place of Birth.');
                        } else {
                            handleContinue();
                        }
                    }}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <>
                            <Typography variant="body" style={styles.btnText}>Calculate Rashi</Typography>
                            <ChevronRight size={20} color="#ffffff" />
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        lineHeight: 22,
    },
    form: {
        gap: 16,
    },
    label: {
        marginBottom: -8,
        fontWeight: '600',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    footer: {
        paddingHorizontal: 24,
    },
    primaryButton: {
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 18,
        marginRight: 8,
    },
});
