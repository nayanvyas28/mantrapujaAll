import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LanguageScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    const { t, i18n } = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

    const handleLanguageChange = async (code: string) => {
        setSelectedLanguage(code);
        await AsyncStorage.setItem('appLanguage', code);
        i18n.changeLanguage(code);
    };

    const languages = [
        { code: 'en', name: 'English', native: 'English' },
        { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    ];

    const LanguageItem = ({ lang, isLast }: any) => {
        const isSelected = selectedLanguage === lang.code;
        return (
            <TouchableOpacity
                style={[
                    styles.langRow,
                    !isLast && { borderBottomColor: colors.borderMuted, borderBottomWidth: 1 }
                ]}
                onPress={() => handleLanguageChange(lang.code)}
            >
                <View>
                    <Typography variant="body" style={{ fontWeight: isSelected ? '700' : '400' }}>
                        {lang.name}
                    </Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground}>
                        {lang.native}
                    </Typography>
                </View>
                {isSelected && (
                    <View style={[styles.checkCircle, { backgroundColor: colors.saffron }]}>
                        <Check size={14} color="#ffffff" />
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">{t('profile.title', 'Language')}</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Typography variant="label" color={colors.mutedForeground} style={styles.sectionHeader}>{t('profile.choose_language', 'CHOOSE LANGUAGE')}</Typography>
                <Card variant="solid" style={styles.card}>
                    {languages.map((lang, index) => (
                        <LanguageItem
                            key={lang.code}
                            lang={lang}
                            isLast={index === languages.length - 1}
                        />
                    ))}
                </Card>

                <Typography variant="bodySmall" color={colors.muted} style={styles.infoText}>
                    {t('profile.info_text', 'Changing the language will update the app interface. Content like Mantras and Slokas may remain in Sanskrit with translations.')}
                </Typography>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    scrollContent: {
        padding: 24,
    },
    sectionHeader: {
        marginBottom: 12,
        letterSpacing: 1,
    },
    card: {
        padding: 0,
        overflow: 'hidden',
    },
    langRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: {
        marginTop: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    }
});
