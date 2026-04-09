import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { FallbackImage } from '../../components/ui/FallbackImage';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { getImageSource } from '../../utils/imageResolver';
import { sanitizeData } from '../../utils/sanitizer';
import { supabase } from '../../utils/supabase';

// import { PRODUCTS_LIST } from '../../utils/mockData'; // Removed in favor of Supabase

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme, colors } = useTheme();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<any>(null);

    const fetchProduct = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products_99')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) setProduct(sanitizeData(data));
        } catch (err) {
            console.error('Error fetching product details:', err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.saffron} />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <Typography variant="body" color={colors.foreground}>Product not found.</Typography>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Typography variant="label" color={colors.saffron}>Go Back</Typography>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.imageHeaderWrapper}>
                    <FallbackImage
                        source={getImageSource(product.image_url)}
                        style={styles.heroImage}
                        contentFit="cover"
                        transition={300}
                    />
                    <TouchableOpacity style={styles.backButtonAbsolute} onPress={() => router.back()}>
                        <View style={styles.backIconBg}>
                            <ArrowLeft size={24} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.headerInfo}>
                        <Typography variant="label" color={colors.saffron} style={{ marginBottom: 4, fontWeight: 'bold' }}>
                            {product.category}
                        </Typography>
                        <Typography variant="h2" color={colors.foreground} style={{ marginBottom: 8 }}>
                            {product.name}
                        </Typography>
                        <View style={styles.priceRow}>
                            <Typography variant="h1" color="#ef4444">
                                ₹{product.price}
                            </Typography>
                            <Typography variant="body" color={colors.mutedForeground} style={{ textDecorationLine: 'line-through', marginLeft: 12 }}>
                                ₹499
                            </Typography>
                            <View style={styles.discountBadge}>
                                <Typography variant="label" color="#ffffff" style={{ fontWeight: 'bold', fontSize: 12 }}>
                                    80% OFF
                                </Typography>
                            </View>
                        </View>
                    </View>

                    <Card variant="solid" style={[styles.featuresCard, { borderColor: colors.borderMuted, borderWidth: 1 }]}>
                        <View style={styles.featureItem}>
                            <Truck size={20} color={colors.saffron} />
                            <Typography variant="bodySmall" color={colors.foreground} style={styles.featureText}>Free Delivery on PREPAID</Typography>
                        </View>
                        <View style={styles.featureItem}>
                            <ShieldCheck size={20} color={colors.saffron} />
                            <Typography variant="bodySmall" color={colors.foreground} style={styles.featureText}>Authentic Spiritual Quality</Typography>
                        </View>
                        <View style={styles.featureItem}>
                            <CheckCircle2 size={20} color={colors.saffron} />
                            <Typography variant="bodySmall" color={colors.foreground} style={styles.featureText}>Easy 7-day Returns</Typography>
                        </View>
                    </Card>

                    <View style={styles.descriptionSection}>
                        <Typography variant="h3" color={colors.foreground} style={{ marginBottom: 12 }}>
                            {t('products.description', 'Product Description')}
                        </Typography>
                        <Typography variant="body" color={colors.mutedForeground} style={{ lineHeight: 24 }}>
                            {product.description}
                            {"\n\n"}
                            This is part of our special ₹99 spiritual collection to make basic authentic samagri accessible to every devotee. High-purity standards and fast shipping.
                        </Typography>
                    </View>
                </View>
                {/* Extra padding for fixed bottom bar */}
                <View style={{ height: 100 }} />
            </ScrollView>

            <View style={[styles.fixedBottomBar, { backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff', borderTopColor: colors.borderMuted }]}>
                <TouchableOpacity
                    style={[styles.buyButton, { backgroundColor: '#f97316' }]}
                    onPress={() => router.push(`/products/payment?id=${product.id}` as any)}
                >
                    <Typography variant="h3" color="#ffffff" style={{ textAlign: 'center' }}>
                        Buy Now
                    </Typography>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        flexGrow: 1,
    },
    imageHeaderWrapper: {
        width: '100%',
        height: 350,
        position: 'relative',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    backButtonAbsolute: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
    },
    backIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        backgroundColor: 'transparent',
    },
    headerInfo: {
        marginBottom: 24,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    discountBadge: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginLeft: 12,
    },
    featuresCard: {
        marginBottom: 32,
        padding: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureText: {
        marginLeft: 12,
        fontWeight: '500',
    },
    descriptionSection: {
        marginBottom: 32,
    },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buyButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    }
});
