import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, Dimensions, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { supabase } from '../../utils/supabase';
import { ReelPlayer } from '../../components/ReelPlayer';
import { useTheme } from '../../context/ThemeContext';
import { Typography } from '../../components/ui/Typography';
import { Video, RefreshCcw } from 'lucide-react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

export default function FeedScreen() {
    const { colors } = useTheme();
    const [reels, setReels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeReelIndex, setActiveReelIndex] = useState(0);

    const fetchReels = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('reels')
                .select('*')
                .eq('is_active', true)
                .order('order_index', { ascending: false });

            if (error) throw error;
            setReels(data || []);
        } catch (error) {
            console.error('Error fetching reels:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReels();
    }, []);

    const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveReelIndex(viewableItems[0].index);
        }
    }, []);

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        // Only load current, next and previous reel to save bandwidth/memory
        const shouldLoad = index >= activeReelIndex - 1 && index <= activeReelIndex + 1;
        
        return (
            <ReelPlayer
                id={item.id}
                video_url={item.video_url}
                title={item.title}
                title_hi={item.title_hi}
                category={item.category}
                thumbnail_url={item.thumbnail_url}
                isActive={index === activeReelIndex}
                shouldLoad={shouldLoad}
            />
        );
    };

    if (loading && reels.length === 0) {
        return (
            <View style={[styles.center, { backgroundColor: '#000' }]}>
                <ActivityIndicator size="large" color={colors.saffron} />
                <Typography variant="body2" color="#666" style={{ marginTop: 12 }}>Loading Divine Content...</Typography>
            </View>
        );
    }

    if (!loading && reels.length === 0) {
        return (
            <View style={[styles.center, { backgroundColor: '#000' }]}>
                <Video size={40} color="#333" />
                <Typography variant="h3" color="#fff" style={{ marginTop: 20 }}>No Reels Yet</Typography>
                <Typography variant="body2" color="#666" style={{ textAlign: 'center', marginTop: 8 }}>Divine content will appear here soon.</Typography>
                <TouchableOpacity onPress={fetchReels} style={[styles.refreshBtn, { borderBottomColor: colors.saffron }]}>
                     <RefreshCcw size={20} color={colors.saffron} />
                     <Typography variant="body1" color={colors.saffron} style={{ marginLeft: 8 }}>Refresh</Typography>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <FlatList
                data={reels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                    minimumViewTime: 200
                }}
                getItemLayout={(data, index) => ({
                    length: height,
                    offset: height * index,
                    index,
                })}
                removeClippedSubviews={true}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                windowSize={3}
                updateCellsBatchingPeriod={50}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    refreshBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        padding: 12,
    }
});
