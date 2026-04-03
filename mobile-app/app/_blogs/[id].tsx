import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlertCircle, ArrowLeft, Heart, MessageCircle, Share2, User } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Share, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Footer } from '../../components/ui/Footer';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../utils/supabase';

export default function BlogDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors: themeColors } = useTheme();

    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlogDetail = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            setBlog(data);
        } catch (err: any) {
            console.error('Error fetching blog detail:', err.message);
            setError('We couldn\'t find that article.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            // Validate UUID format before fetching
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            if (typeof id === 'string' && uuidRegex.test(id)) {
                fetchBlogDetail();
            } else {
                setError('Invalid article link. Please try again from the blog list.');
                setLoading(false);
            }
        }
    }, [id, fetchBlogDetail]);

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/blogs');
        }
    };

    const onShare = async () => {
        if (!blog) return;
        try {
            await Share.share({
                message: `Check out this spiritual insight: ${blog.title}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const renderHeroImage = (imageUrl: string) => {
        if (!imageUrl || imageUrl === '/logo.png') {
            return require('../../assets/images/vedic_blog.jpg');
        }
        return imageUrl;
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerBox, { backgroundColor: themeColors.background }]}>
                <ActivityIndicator size="large" color={themeColors.saffron} />
                <Typography variant="body" color={themeColors.muted} style={{ marginTop: 12 }}>Loading wisdom...</Typography>
            </View>
        );
    }

    if (error || !blog) {
        return (
            <View style={[styles.container, styles.centerBox, { backgroundColor: themeColors.background }]}>
                <AlertCircle size={40} color={themeColors.muted} />
                <Typography variant="body" color={themeColors.muted} style={{ marginTop: 12 }}>{error || 'Article not found'}</Typography>
                <TouchableOpacity onPress={handleBack} style={{ marginTop: 16 }}>
                    <Typography variant="label" color={themeColors.saffron}>GO BACK</Typography>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <StatusBar style="light" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Hero Header Area */}
                <View style={styles.heroSection}>
                    <Image
                        source={renderHeroImage(blog.image_url)}
                        style={styles.heroImage}
                        contentFit="cover"
                    />
                    <View style={styles.heroOverlay} />

                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.heroContent}>
                        <Typography variant="label" color={themeColors.saffron} style={{ fontWeight: 'bold', letterSpacing: 1.5 }}>
                            {(blog.category || 'VEDIC WISDOM').toUpperCase()}
                        </Typography>
                        <View style={{ height: 60 }} />
                    </View>
                </View>

                {/* Main Content Card (Floating) */}
                <View style={[styles.mainCard, { backgroundColor: themeColors.card }]}>
                    <Typography variant="h1" color={themeColors.foreground} style={styles.articleTitle}>
                        {blog.title}
                    </Typography>

                    {/* Metadata Row */}
                    <View style={styles.metaInfoRow}>
                        <View style={styles.authorGroup}>
                            <View style={styles.authorAvatar}>
                                <User size={18} color={themeColors.muted} />
                            </View>
                            <View>
                                <Typography variant="bodySmall" weight="semibold" color={themeColors.foreground}>
                                    {blog.author_name || 'MantraPuja Team'}
                                </Typography>
                                <Typography variant="bodySmall" color={themeColors.mutedForeground}>
                                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </Typography>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.shareFab} onPress={onShare}>
                            <Share2 size={20} color={themeColors.saffron} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* Article Content */}
                    <View style={styles.articleBody}>
                        {(() => {
                            if (!blog.content) return null;

                            let contentObj: any = null;
                            try {
                                if (typeof blog.content === 'string') {
                                    const cleaned = blog.content.trim();
                                    if (cleaned.startsWith('{') || cleaned.startsWith('[')) {
                                        contentObj = JSON.parse(cleaned);
                                        // Handle double encoding
                                        if (typeof contentObj === 'string' && contentObj.trim().startsWith('{')) {
                                            contentObj = JSON.parse(contentObj);
                                        }
                                    }
                                } else if (typeof blog.content === 'object') {
                                    contentObj = blog.content;
                                }
                            } catch (e) {
                                console.log('Failed to parse blog content as JSON');
                            }

                            if (contentObj && (contentObj.introduction || contentObj.sections)) {
                                return (
                                    <View>
                                        {contentObj.introduction && (
                                            <Typography variant="body" color={themeColors.foreground} style={styles.introParagraph}>
                                                {contentObj.introduction}
                                            </Typography>
                                        )}
                                        {contentObj.sections && contentObj.sections.map((section: any, idx: number) => (
                                            <View key={idx} style={styles.contentSection}>
                                                {section.heading && (
                                                    <Typography variant="h2" color={themeColors.foreground} style={styles.contentHeading}>
                                                        {section.heading}
                                                    </Typography>
                                                )}
                                                {section.content && (
                                                    <Typography variant="body" color={themeColors.foreground} style={styles.bodyParagraph}>
                                                        {section.content}
                                                    </Typography>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                );
                            }

                            // Fallback
                            const textToRender = typeof blog.content === 'string' ? blog.content : JSON.stringify(blog.content);
                            return (
                                <Typography variant="body" color={themeColors.foreground} style={styles.bodyParagraph}>
                                    {textToRender}
                                </Typography>
                            );
                        })()}
                    </View>

                    {/* Social/Reaction Section */}
                    <View style={[styles.bottomInteraction, { borderTopColor: themeColors.borderMuted }]}>
                        <TouchableOpacity style={styles.reactionBtn}>
                            <Heart size={22} color={themeColors.saffron} />
                            <Typography variant="bodySmall" style={{ marginLeft: 8 }}>143</Typography>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.reactionBtn}>
                            <MessageCircle size={22} color={themeColors.muted} />
                            <Typography variant="bodySmall" style={{ marginLeft: 8 }}>24</Typography>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Footer />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerBox: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    scrollContent: {
        flexGrow: 1,
    },
    heroSection: {
        height: 340,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 24,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
    },
    heroContent: {
        position: 'absolute',
        bottom: 80,
        left: 24,
        right: 24,
    },
    mainCard: {
        marginTop: -60, // Overlap hero
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingTop: 32,
        minHeight: 500,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    articleTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 40,
        marginBottom: 24,
    },
    metaInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    authorGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,165,0,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,165,0,0.2)',
    },
    shareFab: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,165,0,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.06)',
        marginBottom: 32,
    },
    articleBody: {
    },
    introParagraph: {
        fontSize: 18,
        lineHeight: 30,
        fontStyle: 'italic',
        opacity: 0.9,
        marginBottom: 32,
    },
    contentSection: {
        marginBottom: 32,
    },
    contentHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#f97316', // Saffron touch for headings
    },
    bodyParagraph: {
        fontSize: 17,
        lineHeight: 28,
        marginBottom: 20,
        opacity: 0.85,
    },
    bottomInteraction: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24,
        marginTop: 20,
        borderTopWidth: 1,
    },
    reactionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 32,
    },
});
