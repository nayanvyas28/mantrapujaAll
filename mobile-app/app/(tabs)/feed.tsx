import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    FlatList, 
    StatusBar, 
    ActivityIndicator,
    Alert,
    RefreshControl
} from 'react-native';
import { supabase } from '../../utils/supabase';
import { ReelPlayer } from '../../components/ReelPlayer';
import { useTheme } from '../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { ArrowLeft, Video } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

interface Reel {
    id: string;
    title: string;
    title_hi?: string;
    video_url: string;
    thumbnail_url?: string;
    category?: string;
    is_active: boolean;
    order_index: number;
}

export default function FeedScreen() {
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { i18n, t } = useTranslation();

    const [reels, setReels] = useState<Reel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchReels = async (isRefresh = false) => {
        if (isRefresh) setIsRefreshing(true);
        else setIsLoading(true);

        try {
            const { data, error } = await supabase
                .from('reels')
                .select('*')
                .eq('is_active', true)
                .order('order_index', { ascending: false });

            if (error) throw error;
            setReels(data || []);
        } catch (error: any) {
            console.error('Error fetching reels:', error);
            Alert.alert('Error', 'Failed to load feed. Please try again.');
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchReels();
    }, []);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const renderItem = useCallback(({ item, index }: { item: Reel, index: number }) => {
        // "Sliding window" logic: only load current, previous, and next 2 items
        const shouldLoad = Math.abs(index - activeIndex) <= 2;
        const isActive = index === activeIndex;

        return (
            <ReelPlayer
                id={item.id}
                video_url={item.video_url}
                title={item.title}
                title_hi={item.title_hi}
                category={item.category || t('feed.divine', 'Divine')}
                isActive={isActive}
                shouldLoad={shouldLoad}
                thumbnail_url={item.thumbnail_url}
            />
        );
    }, [activeIndex, t]);

    if (isLoading && !isRefreshing) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: '#000' }]}>
                <StatusBar barStyle="light-content" />
                <ActivityIndicator size="large" color={colors.saffron} />
                <Typography variant="body2" color="#fff" style={{ marginTop: 10 }}>
                    {t('feed.loading', 'Loading Divine Feed...')}
                </Typography>
            </View>
        );
    }

    if (reels.length === 0 && !isLoading) {
        return (
            <View style={[styles.emptyContainer, { backgroundColor: '#000' }]}>
                <Video size={48} color={colors.muted} />
                <Typography variant="h3" color="#fff" style={{ marginTop: 16 }}>
                    {t('feed.no_reels', 'No reels available yet.')}
                </Typography>
                <Typography variant="body2" color={colors.muted} style={{ marginTop: 8 }}>
                    {t('feed.check_back', 'Please check back later for divine content.')}
                </Typography>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            
            <FlatList
                data={reels}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                snapToInterval={height}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                windowSize={5}
                maxToRenderPerBatch={3}
                initialNumToRender={2}
                removeClippedSubviews={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={() => fetchReels(true)}
                        tintColor="#fff"
                        colors={[colors.saffron]}
                    />
                }
                style={{ height: height }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        textAlign: 'center',
    },
});
