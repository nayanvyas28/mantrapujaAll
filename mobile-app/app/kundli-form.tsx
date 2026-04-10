import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Calendar, ChevronLeft, Clock, MapPin, Sparkles, User, MessageCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { useTheme } from '../context/ThemeContext';

export default function KundliFormScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        time: '',
        place: ''
    });

    const handleSubmit = () => {
        if (!formData.name || !formData.dob || !formData.place) return;

        // Return data back to Guru AI chat
        router.replace({
            pathname: '/guru-ai',
            params: {
                kundliSubmitted: 'true',
                ...formData
            }
        });
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>Birth Details</Typography>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.infoBox}>
                    <Sparkles size={20} color={colors.saffron} />
                    <Typography variant="bodySmall" color={colors.mutedForeground} style={styles.infoText}>
                        Please provide accurate details for a precise celestial analysis by GuruJi AI.
                    </Typography>
                </View>

                <Card variant="solid" style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <User size={18} color={colors.saffron} />
                            <Typography variant="body" style={styles.label}>Full Name</Typography>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                            placeholder="Enter your full name"
                            placeholderTextColor={colors.mutedForeground}
                            value={formData.name}
                            onChangeText={t => setFormData(d => ({ ...d, name: t }))}
                        />
                    </View>

                    {/* Gender */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <User size={18} color={colors.saffron} />
                            <Typography variant="body" style={styles.label}>Gender</Typography>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                            placeholder="Male / Female / Other"
                            placeholderTextColor={colors.mutedForeground}
                            value={formData.gender}
                            onChangeText={t => setFormData(d => ({ ...d, gender: t }))}
                        />
                    </View>

                    {/* DOB & Time Row */}
                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1.2 }]}>
                            <View style={styles.labelRow}>
                                <Calendar size={18} color={colors.saffron} />
                                <Typography variant="body" style={styles.label}>Date of Birth</Typography>
                            </View>
                            <TextInput
                                style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                                placeholder="DD/MM/YYYY"
                                placeholderTextColor={colors.mutedForeground}
                                value={formData.dob}
                                onChangeText={t => setFormData(d => ({ ...d, dob: t }))}
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 16 }]}>
                            <View style={styles.labelRow}>
                                <Clock size={18} color={colors.saffron} />
                                <Typography variant="body" style={styles.label}>Time</Typography>
                            </View>
                            <TextInput
                                style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                                placeholder="HH:MM"
                                placeholderTextColor={colors.mutedForeground}
                                value={formData.time}
                                onChangeText={t => setFormData(d => ({ ...d, time: t }))}
                            />
                        </View>
                    </View>

                    {/* Place of Birth */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <MapPin size={18} color={colors.saffron} />
                            <Typography variant="body" style={styles.label}>Place of Birth</Typography>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                            placeholder="City, State"
                            placeholderTextColor={colors.mutedForeground}
                            value={formData.place}
                            onChangeText={t => setFormData(d => ({ ...d, place: t }))}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.submitBtn, { backgroundColor: colors.saffron }]}
                        onPress={handleSubmit}
                    >
                        <Typography variant="h3" color="#fff">Generate Kundli Details</Typography>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.secondaryBtn, { borderColor: colors.saffron, borderWidth: 1 }]}
                        onPress={() => router.push('/guru-ai')}
                    >
                        <Typography variant="body" style={[styles.submitBtnText, { color: colors.saffron, marginRight: 8 }]}>Talk to Pandit</Typography>
                        <MessageCircle size={20} color={colors.saffron} />
                    </TouchableOpacity>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: { width: 44, height: 44, justifyContent: 'center' },
    scrollContent: { padding: 20 },
    infoBox: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#fef3c7',
        alignItems: 'center',
        marginBottom: 24,
        gap: 12,
    },
    infoText: { flex: 1, fontStyle: 'italic' },
    formCard: {
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    inputGroup: { marginBottom: 20 },
    labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    label: { fontWeight: '600' },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    row: { flexDirection: 'row' },
    submitBtn: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
    },
    secondaryBtn: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        flexDirection: 'row',
    },
    submitBtnText: {
        fontWeight: '700',
        fontSize: 16,
    }

});
