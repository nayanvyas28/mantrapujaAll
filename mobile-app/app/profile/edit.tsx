import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert, Platform, Modal, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../utils/supabase';
import { ArrowLeft, MapPin, Mail, Phone, Calendar as CalendarIcon, Save, Clock, Moon } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import { decode } from 'base64-arraybuffer';

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

export default function EditProfileScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const { user, profile: authProfile, refreshProfile } = useAuth(); // assuming useAuth provides context profile

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showRashiPicker, setShowRashiPicker] = useState(false);

    // We map DB fields to local form state
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        pob: '',
        time_of_birth: '',
        rashi: '',
        avatar: ''
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) return;
            try {
                const { data: profileData, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;

                if (profileData) {
                    setForm({
                        name: profileData.full_name || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        dob: profileData.dob || profileData.onboarding_data?.dob || '',
                        pob: profileData.onboarding_data?.pob || '',
                        time_of_birth: profileData.time_of_birth || profileData.onboarding_data?.tob || profileData.onboarding_data?.time_of_birth || '',
                        rashi: profileData.rashi || profileData.onboarding_data?.rashi?.name || profileData.onboarding_data?.rashi || '',
                        avatar: profileData.onboarding_data?.avatar_url || ''
                    });
                }
            } catch (err: any) {
                console.error("Error fetching profile:", err.message);
                Alert.alert("Error", "Could not load profile details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const newEmail = form.email.trim().toLowerCase();
            const emailChanged = newEmail !== user.email?.toLowerCase();

            // 1. Fetch existing onboarding data to preserve it
            const { data: currentProfile } = await supabase
                .from('profiles')
                .select('onboarding_data')
                .eq('id', user.id)
                .single();

            const currentOnboarding = currentProfile?.onboarding_data || {};
            const rashiObj = RASHIS.find(r => r.name === form.rashi) || form.rashi;

            // 2. Update Profiles Table
            // Note: We update the profiles table email, but Auth verification is separate
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: form.name.trim(),
                    email: newEmail,
                    phone: form.phone.trim(),
                    dob: form.dob.trim() || null,
                    rashi: form.rashi.trim() || null,
                    onboarding_data: {
                        ...currentOnboarding,
                        pob: form.pob.trim(),
                        tob: form.time_of_birth.trim(),
                        time_of_birth: form.time_of_birth.trim(),
                        rashi: rashiObj,
                        avatar_url: form.avatar || null
                    }
                })
                .eq('id', user.id);

            if (profileError) throw profileError;

            // 3. Update Auth User (triggers verification if email changed)
            const { error: authError } = await supabase.auth.updateUser({
                email: emailChanged ? newEmail : undefined,
                data: {
                    full_name: form.name.trim(),
                }
            });

            if (authError) throw authError;

            // 4. Finalizing
            await refreshProfile();

            if (emailChanged) {
                Alert.alert(
                    "Verification Required", 
                    "Profile updated! We've sent a verification link to your NEW email address. Please click it to confirm the change.",
                    [{ text: "OK", onPress: () => router.back() }]
                );
            } else {
                Alert.alert("Success", "Profile updated successfully!", [{ text: "OK", onPress: () => router.back() }]);
            }

        } catch (e: any) {
            console.error("Error saving profile:", e);
            Alert.alert("Update Failed", e.message || "Failed to update profile details.");
        } finally {
            setSaving(false);
        }
    };

    const handlePickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "Allow access to your photos to change your profile picture.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
            base64: true
        });

        if (!pickerResult.canceled && pickerResult.assets?.length > 0 && user) {
            const base64Img = pickerResult.assets[0].base64;
            if (!base64Img) return;

            setSaving(true);
            try {
                // Generate a unique filename based on user ID and timestamp
                const fileName = `${user.id}_avatar_${new Date().getTime()}.jpg`;

                // Upload to 'avatars' bucket in Supabase
                const { error: uploadError } = await supabase.storage
                    .from('avatars')
                    .upload(fileName, decode(base64Img), {
                        contentType: 'image/jpeg',
                        upsert: true
                    });

                if (uploadError) throw uploadError;

                // Get public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('avatars')
                    .getPublicUrl(fileName);

                setForm({ ...form, avatar: publicUrl });
            } catch (error: any) {
                console.error("Upload error:", error);
                Alert.alert("Upload Failed", error.message || "Failed to upload image. Make sure the 'avatars' storage bucket exists.");
            } finally {
                setSaving(false);
            }
        }
    };

    const InputField = ({ label, value, keyName, icon: Icon, placeholder, keyboardType = 'default' }: any) => (
        <View style={styles.inputContainer}>
            <Typography variant="label" color={colors.mutedForeground} style={styles.label}>{label}</Typography>
            <View style={[styles.inputWrapper, { borderColor: colors.borderMuted, backgroundColor: colors.card }]}>
                <Icon size={18} color={colors.saffron} style={styles.inputIcon} />
                <TextInput
                    style={[styles.input, { color: colors.foreground }]}
                    value={value}
                    onChangeText={(text) => setForm({ ...form, [keyName]: text })}
                    placeholder={placeholder}
                    placeholderTextColor={colors.muted}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );

    const DatePickerField = ({ label, value, keyName, icon: Icon, placeholder }: any) => {
        // value is expected to be a string like "1990-01-25"
        const dateValue = value && value.trim() ? new Date(value) : new Date(1990, 0, 1);

        return (
            <View style={styles.inputContainer}>
                <Typography variant="label" color={colors.mutedForeground} style={styles.label}>{label}</Typography>
                <TouchableOpacity
                    style={[styles.inputWrapper, { borderColor: colors.borderMuted, backgroundColor: colors.card }]}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Icon size={18} color={colors.saffron} style={styles.inputIcon} />
                    <Typography variant="body" color={value ? colors.foreground : colors.muted}>
                        {value ? value : placeholder}
                    </Typography>
                </TouchableOpacity>

                {showDatePicker && (
                    <DateTimePicker
                        value={dateValue}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                const formatted = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
                                setForm({ ...form, [keyName]: formatted });
                            }
                        }}
                    />
                )}
            </View>
        );
    };

    const TimePickerField = ({ label, value, keyName, icon: Icon, placeholder }: any) => {
        // Create a dummy date with existing time if valid
        const timeValue = new Date();
        if (value && value.includes(':')) {
            try {
                const [time, modifier] = value.split(' ');
                let [hours, minutes] = time.split(':');
                if (hours === '12') hours = '00';
                if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                timeValue.setHours(parseInt(hours, 10));
                timeValue.setMinutes(parseInt(minutes, 10));
            } catch (e) { }
        }

        return (
            <View style={styles.inputContainer}>
                <Typography variant="label" color={colors.mutedForeground} style={styles.label}>{label}</Typography>
                <TouchableOpacity
                    style={[styles.inputWrapper, { borderColor: colors.borderMuted, backgroundColor: colors.card }]}
                    onPress={() => setShowTimePicker(true)}
                >
                    <Icon size={18} color={colors.saffron} style={styles.inputIcon} />
                    <Typography variant="body" color={value ? colors.foreground : colors.muted}>
                        {value ? value : placeholder}
                    </Typography>
                </TouchableOpacity>

                {showTimePicker && (
                    <DateTimePicker
                        value={timeValue}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event, selectedDate) => {
                            setShowTimePicker(false);
                            if (selectedDate) {
                                const formatted = selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).trim();
                                setForm({ ...form, [keyName]: formatted });
                            }
                        }}
                    />
                )}
            </View>
        );
    };

    const RashiPickerField = ({ label, value, keyName, icon: Icon, placeholder }: any) => {
        return (
            <View style={styles.inputContainer}>
                <Typography variant="label" color={colors.mutedForeground} style={styles.label}>{label}</Typography>
                <TouchableOpacity
                    style={[styles.inputWrapper, { borderColor: colors.borderMuted, backgroundColor: colors.card }]}
                    onPress={() => setShowRashiPicker(true)}
                >
                    <Icon size={18} color={colors.saffron} style={styles.inputIcon} />
                    <Typography variant="body" color={value ? colors.foreground : colors.muted}>
                        {value ? value : placeholder}
                    </Typography>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerAlign, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.saffron} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">Edit Profile</Typography>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
                    {saving ? <ActivityIndicator size="small" color={colors.saffron} /> : <Save size={20} color={colors.saffron} />}
                </TouchableOpacity>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.avatarSection}>
                    {form.avatar ? (
                        <Image source={{ uri: form.avatar }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: colors.saffron }]}>
                            <Typography variant="h1" color="#ffffff">{form.name.charAt(0) || 'U'}</Typography>
                        </View>
                    )}
                    <TouchableOpacity style={styles.changePhotoButton} onPress={handlePickImage}>
                        <Typography variant="bodySmall" color={colors.saffron}>Change Photo</Typography>
                    </TouchableOpacity>
                </View>

                <InputField
                    label="Full Name"
                    value={form.name}
                    keyName="name"
                    icon={Mail}
                    placeholder="Enter your name"
                />

                <InputField
                    label="Email Address"
                    value={form.email}
                    keyName="email"
                    icon={Mail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <InputField
                    label="Phone Number"
                    value={form.phone}
                    keyName="phone"
                    icon={Phone}
                    placeholder="Enter your phone"
                    keyboardType="phone-pad"
                />

                <DatePickerField
                    label="Date of Birth"
                    value={form.dob}
                    keyName="dob"
                    icon={CalendarIcon}
                    placeholder="Select your Date of Birth"
                />

                <InputField
                    label="Place of Birth"
                    value={form.pob}
                    keyName="pob"
                    icon={MapPin}
                    placeholder="City, Country"
                />

                <TimePickerField
                    label="Time of Birth"
                    value={form.time_of_birth}
                    keyName="time_of_birth"
                    icon={Clock}
                    placeholder="Select Time of Birth (Optional)"
                />

                <RashiPickerField
                    label="Your Rashi (Zodiac Moon Sign)"
                    value={form.rashi}
                    keyName="rashi"
                    icon={Moon}
                    placeholder="Select your Rashi"
                />

                <TouchableOpacity
                    style={[styles.submitButton, { backgroundColor: colors.saffron, opacity: saving ? 0.7 : 1 }]}
                    onPress={handleSave}
                    disabled={saving}
                >
                    <Typography variant="body" color="#ffffff" style={{ fontWeight: '700' }}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Typography>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={showRashiPicker}
                transparent
                animationType="slide"
                onRequestClose={() => setShowRashiPicker(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowRashiPicker(false)}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                        <View style={styles.modalHeader}>
                            <Typography variant="h3" color={colors.foreground}>Select Rashi</Typography>
                        </View>
                        <ScrollView contentContainerStyle={{ padding: 16 }}>
                            {RASHIS.map((r) => (
                                <TouchableOpacity
                                    key={r.name}
                                    style={[
                                        styles.rashiOption,
                                        { borderBottomColor: colors.borderMuted },
                                        form.rashi === r.name && { backgroundColor: theme === 'dark' ? '#334155' : '#fff7ed' }
                                    ]}
                                    onPress={() => {
                                        setForm({ ...form, rashi: r.name });
                                        setShowRashiPicker(false);
                                    }}
                                >
                                    <Text style={styles.rashiOptionIcon}>{r.icon}</Text>
                                    <Typography variant="body" color={colors.foreground}>{r.name}</Typography>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        padding: 24,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    changePhotoButton: {
        padding: 4,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 52,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    submitButton: {
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '60%',
        borderTopWidth: 1,
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
    },
    rashiOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderRadius: 8,
    },
    rashiOptionIcon: {
        fontSize: 24,
        marginRight: 16,
    }
});
