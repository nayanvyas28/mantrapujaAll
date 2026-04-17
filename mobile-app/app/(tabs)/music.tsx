import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  FlatList, 
  Dimensions, 
  Animated,
  RefreshControl 
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  Music as MusicIcon, 
  Heart, 
  X,
  ChevronDown,
  Maximize2
} from 'lucide-react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { api } from '../../lib/api';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function MusicScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [gods, setGods] = useState<any[]>([]);
    const [songs, setSongs] = useState<any[]>([]);
    const [selectedGodId, setSelectedGodId] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
    // Player State
    const [playing, setPlaying] = useState(false);
    const [activeSong, setActiveSong] = useState<any>(null);
    const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);

    const fetchData = async () => {
        try {
            const [godsRes, songsRes] = await Promise.all([
                api.music.fetchGods(),
                api.music.fetchSongs()
            ]);
            if (godsRes.success) setGods(godsRes.data);
            if (songsRes.success) setSongs(songsRes.data);
        } catch (error) {
            console.error('Music Fetch Error:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const handleSongPress = (song: any) => {
        setActiveSong(song);
        setPlaying(true);
        setIsPlayerExpanded(false);
    };

    const categories = ['Aarti', 'Chalisa', 'Bhajan', 'Mantra', 'Other'];

    const filteredSongs = songs.filter(song => {
        const matchesGod = selectedGodId ? song.god_id === selectedGodId : true;
        const matchesCategory = selectedCategory ? song.category === selectedCategory : true;
        return matchesGod && matchesCategory;
    });

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#FF4D00" />
                <Text className="mt-4 text-gray-400 font-medium italic">Tuning Celestial Vibrations...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView 
                className="flex-1" 
                contentContainerStyle={{ paddingBottom: 150 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Header */}
                <LinearGradient colors={['#FFF5F0', '#FFFFFF']} className="px-6 pt-16 pb-8">
                    <View className="flex-row justify-between items-end">
                        <View>
                            <Text className="text-gray-400 font-bold tracking-widest text-xs mb-1 uppercase">Spiritual Melodies</Text>
                            <Text className="text-3xl font-black text-gray-900">Divine <Text className="text-primary">Bhajans</Text></Text>
                        </View>
                        <TouchableOpacity 
                            onPress={() => router.push('https://music.youtube.com/search?q=mantrapujaoffical' as any)}
                            className="bg-red-50 px-4 py-2 rounded-2xl flex-row items-center border border-red-100"
                        >
                            <Play size={12} color="#EF4444" fill="#EF4444" strokeWidth={3} />
                            <Text className="text-red-500 font-bold text-[10px] ml-2 uppercase">Official Channel</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Deities Scroll */}
                <View className="mb-8">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                        <TouchableOpacity 
                            onPress={() => setSelectedGodId(null)}
                            className="mr-6 items-center"
                        >
                            <View className={`w-16 h-16 rounded-3xl items-center justify-center mb-2 border ${!selectedGodId ? 'bg-primary border-primary' : 'bg-gray-50 border-gray-100'}`}>
                                <MusicIcon color={!selectedGodId ? 'white' : '#94A3B8'} size={24} />
                            </View>
                            <Text className={`text-[10px] font-black uppercase ${!selectedGodId ? 'text-primary' : 'text-gray-400'}`}>All</Text>
                        </TouchableOpacity>

                        {gods.map((god) => (
                            <TouchableOpacity 
                                key={god.id}
                                onPress={() => setSelectedGodId(god.id)}
                                className="mr-6 items-center"
                            >
                                <View className={`w-16 h-16 rounded-3xl overflow-hidden mb-2 border-2 ${selectedGodId === god.id ? 'border-primary' : 'border-transparent'}`}>
                                    <Image source={{ uri: god.image_url || 'https://via.placeholder.com/100' }} className="w-full h-full" />
                                </View>
                                <Text className={`text-[10px] font-black uppercase ${selectedGodId === god.id ? 'text-primary' : 'text-gray-400'}`} numberOfLines={1}>{god.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Categories */}
                <View className="mb-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                        {categories.map((cat) => (
                            <TouchableOpacity 
                                key={cat}
                                onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                className={`px-6 py-2.5 rounded-full mr-3 border ${selectedCategory === cat ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
                            >
                                <Text className={`text-xs font-bold ${selectedCategory === cat ? 'text-white' : 'text-gray-500'}`}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Song List */}
                <View className="px-6">
                    <Text className="text-lg font-black text-gray-900 mb-4">Recommended for You</Text>
                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song) => (
                            <TouchableOpacity 
                                key={song.id}
                                onPress={() => handleSongPress(song)}
                                className="flex-row items-center mb-5 bg-white rounded-3xl p-3 shadow-sm border border-gray-50"
                            >
                                <View className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 relative">
                                    <Image source={{ uri: song.image_url || `https://img.youtube.com/vi/${song.audio_url}/0.jpg` }} className="w-full h-full" />
                                    <View className="absolute inset-0 bg-black/20 items-center justify-center">
                                        <Play color="white" size={20} fill="white" />
                                    </View>
                                </View>
                                <View className="flex-1 ml-4">
                                    <Text className="text-gray-900 font-bold text-sm" numberOfLines={1}>{song.title}</Text>
                                    <Text className="text-gray-400 text-xs mt-1">{song.artist || 'Divine Artist'} • {song.category}</Text>
                                </View>
                                <TouchableOpacity className="p-2">
                                    <Heart color="#CBD5E1" size={20} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View className="py-20 items-center justify-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                            <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-sm mb-4">
                                <MusicIcon color="#FF4D00" size={32} />
                            </View>
                            <Text className="text-gray-900 font-bold text-lg">No Bhajans Found</Text>
                            <Text className="text-gray-400 text-sm text-center px-10 mt-2">
                                Add YouTube Video IDs to your 'music_songs' table in Supabase to start the divine stream.
                            </Text>
                            <TouchableOpacity 
                                onPress={() => router.push('https://music.youtube.com/search?q=mantrapujaoffical' as any)}
                                className="mt-6 bg-primary/10 px-6 py-3 rounded-2xl"
                            >
                                <Text className="text-primary font-bold">Search @mantrapujaoffical</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Floating Mini Player */}
            {activeSong && (
                <View className={`absolute bottom-20 inset-x-4 bg-white shadow-2xl rounded-[32px] border border-gray-100 overflow-hidden ${isPlayerExpanded ? 'h-[450px] bottom-4' : 'h-20'}`}>
                    {isPlayerExpanded ? (
                        <View className="flex-1">
                            {/* Expanded Player Header */}
                            <View className="flex-row justify-between items-center p-6 border-b border-gray-50">
                                <TouchableOpacity onPress={() => setIsPlayerExpanded(false)}>
                                    <ChevronDown color="#1E293B" size={24} />
                                </TouchableOpacity>
                                <Text className="text-gray-900 font-black text-sm uppercase tracking-widest">Now Playing</Text>
                                <TouchableOpacity onPress={() => setActiveSong(null)}>
                                    <X color="#1E293B" size={20} />
                                </TouchableOpacity>
                            </View>

                            {/* YouTube Player Container */}
                            <View className="w-full aspect-video bg-black">
                                <YoutubePlayer
                                    height={width * 0.5625}
                                    play={playing}
                                    videoId={activeSong.audio_url.length === 11 ? activeSong.audio_url : 'dQw4w9WgXcQ'} // Simple validation
                                    onChangeState={(state) => {
                                        if (state === 'ended') setPlaying(false);
                                    }}
                                />
                            </View>

                            {/* Song Info */}
                            <View className="p-6">
                                <Text className="text-gray-900 font-black text-xl mb-1">{activeSong.title}</Text>
                                <Text className="text-gray-500 font-medium mb-6">{activeSong.artist || 'Divine Artist'}</Text>
                                
                                <View className="flex-row justify-center items-center gap-10">
                                    <TouchableOpacity onPress={() => setPlaying(!playing)} className="w-16 h-16 bg-primary rounded-full items-center justify-center shadow-lg shadow-primary/30">
                                        {playing ? <Pause color="white" size={32} fill="white" /> : <Play color="white" size={32} fill="white" />}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity 
                            onPress={() => setIsPlayerExpanded(true)}
                            className="flex-1 flex-row items-center px-4"
                        >
                            <Image 
                                source={{ uri: activeSong.image_url || `https://img.youtube.com/vi/${activeSong.audio_url}/0.jpg` }} 
                                className="w-12 h-12 rounded-xl" 
                            />
                            <View className="flex-1 ml-3">
                                <Text className="text-gray-900 font-bold text-sm" numberOfLines={1}>{activeSong.title}</Text>
                                <Text className="text-gray-400 text-xs">{activeSong.artist || 'Divine Artist'}</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <TouchableOpacity onPress={() => setPlaying(!playing)} className="p-2">
                                    {playing ? <Pause color="#FF4D00" size={24} fill="#FF4D00" /> : <Play color="#FF4D00" size={24} fill="#FF4D00" />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setActiveSong(null)} className="p-2">
                                    <X color="#94A3B8" size={20} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}
