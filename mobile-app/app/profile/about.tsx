import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Heart } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';

export default function AboutScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">About Us</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.brandSection}>
                    <View style={[styles.logoPlaceholder, { backgroundColor: colors.saffron }]}>
                        <Typography variant="h1" color="#ffffff">MP</Typography>
                    </View>
                    <Typography variant="h2" style={styles.appName}>Mantra Puja</Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground}>Spiritual Guidance for Modern Life</Typography>
                </View>

                <View style={styles.content}>
                    <Typography variant="body" style={styles.paragraph}>
                        {"Mantra Puja is dedicated to bringing the ancient wisdom of Sanatan Dharma to your fingertips. Our mission is to make spiritual practices accessible, authentic, and easy to follow in today's fast-paced world."}
                    </Typography>

                    <Typography variant="body" style={styles.paragraph}>
                        We provide a platform to connect with experienced Pandits for authentic pujas and rituals.
                    </Typography>

                    <Typography variant="h3" style={styles.subTitle}>Our Vision</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        To become the leading digital companion for anyone seeking a deeper connection with Hindu spirituality and traditions.
                    </Typography>
                </View>

                <View style={styles.footerSection}>
                    <Typography variant="bodySmall" color={colors.mutedForeground}>Made with</Typography>
                    <Heart size={16} color="#ef4444" fill="#ef4444" style={{ marginHorizontal: 4 }} />
                    <Typography variant="bodySmall" color={colors.mutedForeground}>in India</Typography>
                </View>

                <Typography variant="label" color={colors.muted} style={styles.copy}>
                    © 2024 Mantra Puja Technologies Pvt. Ltd.
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
    brandSection: {
        alignItems: 'center',
        marginVertical: 32,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    appName: {
        marginBottom: 4,
    },
    content: {
        marginBottom: 40,
    },
    subTitle: {
        marginTop: 24,
        marginBottom: 12,
    },
    paragraph: {
        lineHeight: 24,
        marginBottom: 16,
    },
    footerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    copy: {
        textAlign: 'center',
        marginBottom: 40,
    }
});
