import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Typography } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { useTheme } from '../../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, MessageCircle, Mail, Globe, Phone, ChevronRight } from 'lucide-react-native';

export default function SupportScreen() {
    const router = useRouter();
    const { colors } = useTheme();

    const SupportChannel = ({ icon: Icon, label, value, onPress, isLast }: any) => (
        <TouchableOpacity
            style={[styles.channelRow, !isLast && { borderBottomColor: colors.borderMuted, borderBottomWidth: 1 }]}
            onPress={onPress}
        >
            <View style={styles.channelLeft}>
                <View style={[styles.iconBox, { backgroundColor: colors.saffron + '15' }]}>
                    <Icon size={20} color={colors.saffron} />
                </View>
                <View>
                    <Typography variant="body" style={{ fontWeight: '600' }}>{label}</Typography>
                    <Typography variant="bodySmall" color={colors.mutedForeground}>{value}</Typography>
                </View>
            </View>
            <ChevronRight size={18} color={colors.muted} />
        </TouchableOpacity>
    );

    const FAQItem = ({ question, isLast }: any) => (
        <TouchableOpacity
            style={[styles.faqRow, !isLast && { borderBottomColor: colors.borderMuted, borderBottomWidth: 1 }]}
        >
            <Typography variant="body" style={{ flex: 1, marginRight: 8 }}>{question}</Typography>
            <ChevronRight size={16} color={colors.muted} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="auto" />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3">Help & Support</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Typography variant="label" color={colors.mutedForeground} style={styles.sectionHeader}>CONTACT US</Typography>
                <Card variant="solid" style={styles.card}>
                    <SupportChannel
                        icon={MessageCircle}
                        label="WhatsApp Support"
                        value="+91 94247 50059"
                        onPress={() => Linking.openURL('whatsapp://send?phone=919424750059')}
                    />
                    <SupportChannel
                        icon={Mail}
                        label="Email Us"
                        value="help.mantras@gmail.com"
                        onPress={() => Linking.openURL('mailto:help.mantras@gmail.com')}
                    />
                    <SupportChannel
                        icon={Phone}
                        label="Call Us"
                        value="+91 94247 50059"
                        onPress={() => Linking.openURL('tel:+919424750059')}
                        isLast
                    />
                </Card>

                <Typography variant="label" color={colors.mutedForeground} style={[styles.sectionHeader, { marginTop: 24 }]}>FAQS</Typography>
                <Card variant="solid" style={styles.card}>
                    <FAQItem question="How to book a personal Puja?" />
                    <FAQItem question="Can I cancel my booking?" />
                    <FAQItem question="How to change my Rashi?" />
                    <FAQItem question="Is this app free to use?" isLast />
                </Card>

                <TouchableOpacity style={[styles.webButton, { borderColor: colors.saffron }]}>
                    <Globe size={18} color={colors.saffron} style={{ marginRight: 10 }} />
                    <Typography variant="body" color={colors.saffron} style={{ fontWeight: '600' }}>Visit Our Website</Typography>
                </TouchableOpacity>
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
    channelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    channelLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    faqRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    webButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 24,
    }
});
