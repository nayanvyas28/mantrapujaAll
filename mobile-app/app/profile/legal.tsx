import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';

export default function LegalScreen() {
    const router = useRouter();
    const { colors } = useTheme();
    // In a real app, we might pass a param to toggle between Privacy and Terms
    // For now, we'll show a unified Legal page or just Privacy Policy

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">Legal Information</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Typography variant="h3" style={styles.title}>Privacy Policy</Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground} style={styles.date}>Last Updated: April 2, 2026</Typography>

                    <Typography variant="body" style={styles.paragraph}>
                        At Mantra Puja, we are committed to protecting your personal information and your right to privacy. This policy describes how we collect, use, and share information when you use our mobile application and related services.
                    </Typography>

                    <Typography variant="body" style={styles.subHeading}>1. Information We Collect</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        We collect information you provide directly to us:
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Personal Identification Information</Text>: Name, email address, phone number, and profile picture.
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Astrological Data</Text>: Date of birth, time of birth, and place of birth. This data is essential for generating accurate Kundli and astrological charts.
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Transaction Data</Text>: Details about bookings and purchases made through the app (processed securely via authorized payment gateways).
                    </Typography>

                    <Typography variant="body" style={styles.subHeading}>2. How We Use Information</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • To provide personalized astrological insights and puja services.
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • To process your transactions and manage your bookings.
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • To send specific notifications regarding your scheduled pujas or spiritual events.
                    </Typography>

                    <Typography variant="body" style={styles.subHeading}>3. Data Protection & Sharing</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        We do not sell your personal data to third parties. We only share information with service providers (like payment processors) as necessary to fulfill your requests. Your astrological data is used solely for display and generation of reports within the app.
                    </Typography>

                    <Typography variant="body" style={styles.subHeading}>4. Permissions & Justification</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Location</Text>: Used to find nearby temples and provide city-specific Panchang details.
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Notifications</Text>: Used for puja reminders, daily horoscopes, and spiritual alerts.
                    </Typography>

                    <Typography variant="body" style={styles.subHeading}>5. Your Rights & Data Deletion</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        Under Google Play's Data Safety Policy, you have full control over your data:
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Access & Update</Text>: You can manage your profile details directly in the "Edit Profile" section.
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        • <Text style={{ fontWeight: '700' }}>Deletion</Text>: You may request the deletion of your account and all associated data through the app settings or by emailing support.
                    </Typography>

                    <Typography variant="body" style={styles.subHeading}>6. Contact Us</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        If you have any questions about this Privacy Policy or our data practices, please reach out to us at:
                    </Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        <Text style={{ fontWeight: '700' }}>Email</Text>: help.mantras@gmail.com
                    </Typography>

                    <Typography variant="h3" style={[styles.title, { marginTop: 32 }]}>Terms of Service</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        By using Mantra Puja, you agree to the following terms:
                    </Typography>
                    <Typography variant="body" style={styles.subHeading}>1. Spiritual Guidance Disclaimer</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        The content provided by Mantra Puja is for spiritual and educational purposes only. Astrology is a matter of belief, and results may vary based on individual spiritual practices.
                    </Typography>
                    <Typography variant="body" style={styles.subHeading}>2. Payment & Refunds</Typography>
                    <Typography variant="body" style={styles.paragraph}>
                        Payments for digital services are subject to platform-specific billing policies. Refunds are handled on a case-by-case basis as per our refund policy.
                    </Typography>

                </View>

                <View style={{ height: 40 }} />
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
    content: {
        flex: 1,
    },
    title: {
        marginBottom: 8,
    },
    date: {
        marginBottom: 20,
    },
    subHeading: {
        fontWeight: '700',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        lineHeight: 22,
        marginBottom: 12,
    }
});
