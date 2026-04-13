import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { Typography } from './ui/Typography';
import { useTheme } from '../context/ThemeContext';
import { X, Instagram, Youtube, Facebook, MessageCircle, ExternalLink } from 'lucide-react-native';

interface SocialMediaModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export const SocialMediaModal: React.FC<SocialMediaModalProps> = ({ isVisible, onClose }) => {
    const { colors, theme } = useTheme();

    const SOCIAL_PLATFORMS = [
        {
            id: 'instagram',
            name: 'Instagram',
            handle: '@mantrapuja',
            icon: Instagram,
            color: '#E4405F',
            url: 'https://instagram.com/mantrapuja'
        },
        {
            id: 'youtube',
            name: 'YouTube',
            handle: 'Mantra Puja Official',
            icon: Youtube,
            color: '#FF0000',
            url: 'https://youtube.com/@mantrapuja'
        },
        {
            id: 'facebook',
            name: 'Facebook',
            handle: 'Mantra Puja Community',
            icon: Facebook,
            color: '#1877F2',
            url: 'https://facebook.com/mantrapuja'
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            handle: 'Join Community',
            icon: MessageCircle,
            color: '#25D366',
            url: 'https://wa.me/91XXXXXXXXXX'
        }
    ];

    const handlePress = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity 
                style={styles.overlay} 
                activeOpacity={1} 
                onPress={onClose}
            >
                <TouchableOpacity 
                    activeOpacity={1} 
                    style={[
                        styles.modalContent, 
                        { backgroundColor: colors.background, borderColor: colors.borderMuted }
                    ]}
                >
                    <View style={styles.header}>
                        <View>
                            <Typography variant="h3" color={colors.foreground}>Social Connect</Typography>
                            <Typography variant="label" color={colors.saffron}>Join our divine community</Typography>
                        </View>
                        <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: colors.card }]}>
                            <X size={20} color={colors.foreground} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.grid}>
                        {SOCIAL_PLATFORMS.map((platform) => (
                            <TouchableOpacity
                                key={platform.id}
                                style={[styles.platformCard, { backgroundColor: colors.card, borderColor: platform.color + '20' }]}
                                onPress={() => handlePress(platform.url)}
                            >
                                <View style={[styles.iconWrapper, { backgroundColor: platform.color + '15' }]}>
                                    <platform.icon size={28} color={platform.color} />
                                </View>
                                <Typography variant="h4" style={{ marginTop: 12, fontSize: 14 }} color={colors.foreground}>
                                    {platform.name}
                                </Typography>
                                <Typography variant="label" color={colors.mutedForeground} style={{ fontSize: 10, marginTop: 2 }}>
                                    {platform.handle}
                                </Typography>
                                <View style={[styles.arrowBox, { backgroundColor: platform.color }]}>
                                    <ExternalLink size={10} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity 
                        style={[styles.footerBtn, { backgroundColor: colors.saffron + '10' }]}
                        onPress={onClose}
                    >
                        <Typography variant="bodySmall" color={colors.saffron} style={{ fontWeight: 'bold' }}>
                            CLOSE
                        </Typography>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: width - 48,
        borderRadius: 32,
        padding: 24,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    platformCard: {
        width: '47%',
        padding: 20,
        borderRadius: 24,
        alignItems: 'center',
        borderWidth: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    iconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowBox: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerBtn: {
        marginTop: 24,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: 'center',
    }
});
