import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Search, CircleX } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { getImageSource } from '../../utils/imageResolver';
import { sanitizeData } from '../../utils/sanitizer';
import { supabase } from '../../utils/supabase';

// import { PRODUCTS_LIST } from '../../utils/mockData'; // Removed in favor of Supabase

export default function ProductsScreen() {
    const router = useRouter();
    const { theme, colors } = useTheme();
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();

        // --- REALTIME SUBSCRIPTION ---
        const productSubscription = supabase
            .channel('product-list-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'products_99' },
                () => fetchProducts()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(productSubscription);
        };
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products_99')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            if (data) setProducts(sanitizeData(data));
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter(p => {
        const query = searchQuery.trim().toLowerCase();
        return (
            p.name.toLowerCase().includes(query) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
    });

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            <View style={[styles.header, { borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Typography variant="h2" color={colors.foreground}>
                        {t('products.title', 'Sacred Store')}
                    </Typography>
                    <Typography variant="bodySmall" color={colors.saffron} style={{ fontWeight: '600' }}>
                        {t('products.subtitle', 'All Products @ ₹99')}
                    </Typography>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Search Bar */}
                <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    <Search size={20} color={colors.muted} />
                    <TextInput
                        placeholder={t('products.search_placeholder', 'Search sacred items...')}
                        placeholderTextColor={colors.muted}
                        style={[styles.searchInput, { color: colors.foreground }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")}>
                            <CircleX size={18} color={colors.muted} />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Grid of Products */}
                {loading ? (
                    <View style={{ marginTop: 50, alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={colors.saffron} />
                        <Typography variant="body" color={colors.muted} style={{ marginTop: 12 }}>
                            Loading sacred items...
                        </Typography>
                    </View>
                ) : (
                    <View style={styles.gridContainer}>
                        {filteredProducts.map((product) => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.productCardWrapper}
                                activeOpacity={0.9}
                                onPress={() => router.push(`/products/${product.id}` as any)}
                            >
                                <Card variant="solid" style={styles.productCard}>
                                    <View style={styles.imageContainer}>
                                        <Image
                                            source={getImageSource(product.image_url)}
                                            style={styles.productImage}
                                            contentFit="cover"
                                        />
                                        <View style={styles.priceTag}>
                                            <Typography variant="label" style={{ fontWeight: 'bold' }} color="#ffffff">
                                                ₹{product.price}
                                            </Typography>
                                        </View>
                                    </View>
                                    <View style={styles.productInfo}>
                                        <Typography variant="label" color={colors.saffron} style={{ marginBottom: 4 }}>
                                            {product.category}
                                        </Typography>
                                        <Typography variant="body" style={{ fontWeight: 'bold' }} color={colors.foreground} numberOfLines={2}>
                                            {product.name}
                                        </Typography>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {filteredProducts.length === 0 && (
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Typography variant="body" color={colors.mutedForeground}>No products found matching your search.</Typography>
                    </View>
                )}
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
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -8,
        borderRadius: 20,
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        paddingBottom: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 24,
        shadowColor: '#f97316',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCardWrapper: {
        width: '48%',
        marginBottom: 16,
    },
    productCard: {
        padding: 0,
        borderRadius: 16,
        overflow: 'hidden',
        height: 220,
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 3,
    },
    imageContainer: {
        width: '100%',
        height: 120,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    priceTag: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#ef4444', // Red for discount feel
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    productInfo: {
        padding: 12,
        flex: 1,
    }
});
