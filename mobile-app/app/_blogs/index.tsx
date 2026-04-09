import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AlertCircle, ArrowLeft, ChevronDown, Clock, Heart, Search, SlidersHorizontal } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/ui/Card';
import { Footer } from '../../components/ui/Footer';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../utils/supabase';

const PAGE_SIZE = 8;

export default function BlogsListScreen() {
    const router = useRouter();
    const { theme, colors } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [categories, setCategories] = useState(['All']);
    const [sortBy, setSortBy] = useState<'Newest' | 'Popular'>('Newest');

    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchCategories();
        fetchBlogs(0, true);

        // --- REALTIME SUBSCRIPTION ---
        const blogSubscription = supabase
            .channel('blog-list-changes')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'blogs' },
                () => fetchBlogs(0, true)
            )
            .subscribe();

        return () => {
            supabase.removeChannel(blogSubscription);
        };
    }, [selectedCategory, sortBy]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchBlogs(0, true);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('blogs')
                .select('category')
                .eq('published', true)
                .not('category', 'is', null);

            if (error) throw error;

            if (data) {
                const uniqueCats = Array.from(new Set(data.map(item => item.category)));
                setCategories(['All', ...uniqueCats.sort()]);
            }
        } catch (err: any) {
            console.error('Error fetching categories:', err.message);
        }
    };

    const fetchBlogs = async (pageIndex: number, reset: boolean = false) => {
        try {
            if (reset) {
                setLoading(true);
                setPage(0);
            } else {
                setLoadingMore(true);
            }

            setError(null);

            let query = supabase
                .from('blogs')
                .select('*')
                .eq('published', true);

            // Server-side filtering
            if (selectedCategory !== 'All') {
                query = query.eq('category', selectedCategory);
            }

            if (searchQuery.trim()) {
                query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
            }

            // Server-side ordering
            if (sortBy === 'Newest') {
                query = query.order('sort_order', { ascending: true }).order('created_at', { ascending: false });
            } else {
                query = query.order('is_featured', { ascending: false }).order('sort_order', { ascending: true }).order('created_at', { ascending: false });
            }

            // Pagination
            const from = pageIndex * PAGE_SIZE;
            const to = from + PAGE_SIZE - 1;

            const { data, error } = await query.range(from, to);

            if (error) throw error;

            const newBlogs = data || [];
            if (reset) {
                setBlogs(newBlogs);
            } else {
                setBlogs(prev => [...prev, ...newBlogs]);
            }

            setHasMore(newBlogs.length === PAGE_SIZE);
            if (!reset) setPage(pageIndex);

        } catch (err: any) {
            console.error('Error fetching blogs:', err.message);
            setError('Failed to load articles. Please try again.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            fetchBlogs(page + 1);
        }
    };

    const renderImage = (imageUrl: string) => {
        if (!imageUrl || imageUrl === '/logo.png') {
            return require('../../assets/images/vedic_blog.jpg');
        }
        return imageUrl;
    };

    return (
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>Spiritual Insights</Typography>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Search Bar Section */}
                <View style={[styles.searchSection, { backgroundColor: colors.background }]}>
                    <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                        <Search size={20} color={colors.muted} />
                        <TextInput
                            placeholder="Search articles..."
                            placeholderTextColor={colors.muted}
                            style={[styles.searchInput, { color: colors.foreground }]}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Filters & Sorting */}
                <View style={[styles.filterBar, { backgroundColor: colors.background, borderBottomColor: colors.borderMuted }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {categories.map((cat: string) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryChip,
                                    { backgroundColor: colors.card, borderColor: colors.borderMuted },
                                    selectedCategory === cat && { backgroundColor: colors.saffron, borderColor: colors.saffron }
                                ]}
                                onPress={() => setSelectedCategory(cat)}
                            >
                                <Typography
                                    variant="label"
                                    color={selectedCategory === cat ? '#fff' : colors.mutedForeground}
                                    style={{ fontWeight: selectedCategory === cat ? 'bold' : 'normal' }}
                                >
                                    {cat.toUpperCase()}
                                </Typography>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity
                        style={[styles.sortBtn, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}
                        onPress={() => setSortBy(sortBy === 'Newest' ? 'Popular' : 'Newest')}
                    >
                        <SlidersHorizontal size={14} color={colors.saffron} />
                        <Typography variant="label" color={colors.foreground} style={{ marginLeft: 8, fontWeight: '600' }}>
                            {sortBy.toUpperCase()}
                        </Typography>
                        <ChevronDown size={14} color={colors.muted} style={{ marginLeft: 6 }} />
                    </TouchableOpacity>
                </View>

                {/* Blog Cards */}
                <View style={styles.blogsList}>
                    {loading ? (
                        <View style={styles.centerBox}>
                            <ActivityIndicator size="large" color={colors.saffron} />
                            <Typography variant="body" color={colors.muted} style={{ marginTop: 12 }}>Reading scripts...</Typography>
                        </View>
                    ) : error ? (
                        <View style={styles.centerBox}>
                            <AlertCircle size={40} color={colors.muted} />
                            <Typography variant="body" color={colors.muted} style={{ marginTop: 12 }}>{error}</Typography>
                            <TouchableOpacity onPress={() => fetchBlogs(0, true)} style={{ marginTop: 16 }}>
                                <Typography variant="label" color={colors.saffron}>RETRY</Typography>
                            </TouchableOpacity>
                        </View>
                    ) : blogs.length > 0 ? (
                        <>
                            {blogs.map((blog) => (
                                <TouchableOpacity
                                    key={blog.id}
                                    activeOpacity={0.9}
                                    onPress={() => router.push(`/blogs/${blog.id}`)}
                                >
                                    <Card variant="solid" style={styles.blogCard}>
                                        <Image source={renderImage(blog.image_url)} style={styles.blogImage} contentFit="cover" />
                                        <View style={styles.blogInfo}>
                                            <View style={styles.blogHeader}>
                                                <Typography variant="label" color={colors.saffron}>{(blog.category || 'VEDIC').toUpperCase()}</Typography>
                                                <View style={styles.blogMeta}>
                                                    <Clock size={12} color={colors.muted} />
                                                    <Typography variant="label" color={colors.muted} style={{ marginLeft: 4 }}>
                                                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </Typography>
                                                </View>
                                            </View>
                                            <Typography variant="h3" color={colors.foreground} numberOfLines={2} style={styles.blogTitle}>
                                                {blog.title}
                                            </Typography>
                                            <Typography variant="bodySmall" color={colors.mutedForeground} numberOfLines={2}>
                                                {blog.excerpt}
                                            </Typography>
                                            <View style={styles.blogFooter}>
                                                <Typography variant="label" color={colors.foreground}>By {blog.author_name || 'Admin'}</Typography>
                                                <View style={styles.blogMeta}>
                                                    <Heart size={14} color="#f87171" style={{ marginRight: 4 }} />
                                                    <Typography variant="label" color={colors.muted}>{blog.is_featured ? 'Pinned' : 'Read'}</Typography>
                                                </View>
                                            </View>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            ))}

                            {hasMore && (
                                <TouchableOpacity
                                    style={[styles.loadMoreBtn, { borderColor: colors.saffron }]}
                                    onPress={handleLoadMore}
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? (
                                        <ActivityIndicator size="small" color={colors.saffron} />
                                    ) : (
                                        <Typography variant="label" color={colors.saffron} style={{ fontWeight: '700' }}>
                                            VIEW MORE ARTICLES
                                        </Typography>
                                    )}
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <View style={styles.emptyState}>
                            <Typography variant="body" color={colors.muted}>No articles found.</Typography>
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View style={{ marginTop: 32 }}>
                    <Footer />
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
        zIndex: 10,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    searchSection: {
        padding: 24,
        paddingBottom: 8,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
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
    filterBar: {
        paddingVertical: 24,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        zIndex: 5,
        gap: 28,
    },
    categoryScroll: {
        paddingRight: 24,
        paddingBottom: 8,
        gap: 12,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    blogsList: {
        padding: 24,
        gap: 20,
    },
    blogCard: {
        padding: 0,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 2,
    },
    blogImage: {
        height: 180,
        width: '100%',
    },
    blogInfo: {
        padding: 16,
    },
    blogHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    blogMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blogTitle: {
        marginBottom: 8,
        lineHeight: 24,
    },
    blogFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    loadMoreBtn: {
        marginTop: 12,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerBox: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 60,
    }
});
