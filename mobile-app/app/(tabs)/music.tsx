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
  RefreshControl,
  Alert,
  Platform
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
  Maximize2,
  Volume2,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Star
} from 'lucide-react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
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
    const [useYoutubePlayer, setUseYoutubePlayer] = useState(false);
    
    // Native Audio State
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playbackStatus, setPlaybackStatus] = useState<any>(null);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);

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
        
        // Setup Background Audio Mode
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    interruptionModeIOS: InterruptionModeIOS.DuckOthers,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
                    playThroughEarpieceAndroid: false,
                });
            } catch (e) {
                console.error("Error setting up audio mode:", e);
            }
        };
        setupAudio();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const isYoutube = (url: string) => {
        if (!url) return false;
        // Check if it's already a 11-char ID
        if (url.length === 11 && !url.includes('/') && !url.includes('.')) return true;
        // Check if it's a full YouTube URL
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    const getYoutubeId = (url: string) => {
        if (!url) return null;
        if (url.length === 11 && !url.includes('/') && !url.includes('.')) return url;
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    };

    const playNativeAudio = async (url: string) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }

            if (!url || url.startsWith('http') === false) {
                throw new Error('Invalid audio URL');
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: url },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
            setSound(newSound);
            setPlaying(true);
        } catch (error) {
            console.error('Error playing audio:', error);
            // Don't show alert for 400 if we can fallback
            if (!isPlayerExpanded) {
                setActiveSong(null);
            }
        }
    };

    const onPlaybackStatusUpdate = (status: any) => {
        setPlaybackStatus(status);
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
        }
        if (status.didJustFinish) {
            setPlaying(false);
        }
    };

    const handleSongPress = async (song: any) => {
        // If switching songs, stop previous native audio
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
        
        setActiveSong(song);
        setIsPlayerExpanded(true);
        setDuration(0);
        setPosition(0);
        setPlaying(true);
        
        const audioUrl = song.audio_url;

        if (isYoutube(audioUrl)) {
            // YouTube link → directly use YouTube in-app player
            setUseYoutubePlayer(true);
        } else if (audioUrl && audioUrl.startsWith('http')) {
            // Direct MP3/Audio URL → native background player
            setUseYoutubePlayer(false);
            await playNativeAudio(audioUrl);
        }
    };

    const togglePlay = async () => {
        if (isYoutube(activeSong?.audio_url)) {
            setPlaying(!playing);
        } else if (sound) {
            if (playing) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setPlaying(!playing);
        }
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
                {/* Header with Channel Link */}
                <LinearGradient colors={['#FFF5F0', '#FFFFFF']} className="px-6 pt-16 pb-8">
                    <View className="flex-row justify-between items-end">
                        <View>
                            <Text className="text-gray-400 font-bold tracking-widest text-[10px] mb-1 uppercase">Spiritual Melodies</Text>
                            <Text className="text-3xl font-black text-gray-900">Divine <Text className="text-primary">Music</Text></Text>
                        </View>
                        <TouchableOpacity 
                            onPress={() => router.push('https://www.youtube.com/@mantrapujaofficial' as any)}
                            className="bg-red-600 px-4 py-2.5 rounded-2xl flex-row items-center shadow-lg shadow-red-200"
                        >
                            <Play size={14} color="white" fill="white" />
                            <Text className="text-white font-black text-[10px] ml-2 uppercase tracking-tighter">Official Channel</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Gods Selection */}
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

                {/* Category Chips */}
                <View className="mb-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                        {categories.map((cat) => (
                            <TouchableOpacity 
                                key={cat}
                                onPress={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                className={`px-6 py-2.5 rounded-full mr-3 border ${selectedCategory === cat ? 'bg-primary border-primary' : 'bg-white border-gray-100 shadow-sm'}`}
                            >
                                <Text className={`text-[10px] font-black uppercase ${selectedCategory === cat ? 'text-white' : 'text-gray-500'}`}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Song List */}
                <View className="px-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-black text-gray-900">Recommended for You</Text>
                        <TouchableOpacity>
                            <Text className="text-primary font-bold text-xs">Shuffle All</Text>
                        </TouchableOpacity>
                    </View>

                    {filteredSongs.length > 0 ? (
                        filteredSongs.map((song) => (
                            <TouchableOpacity 
                                key={song.id}
                                onPress={() => handleSongPress(song)}
                                className={`flex-row items-center mb-4 bg-white rounded-3xl p-3 border ${activeSong?.id === song.id ? 'border-primary bg-orange-50/30' : 'border-gray-50 shadow-sm'}`}
                            >
                                <View className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 relative">
                                    <Image 
                                        source={{ uri: song.image_url || (isYoutube(song.audio_url) ? `https://img.youtube.com/vi/${song.audio_url}/0.jpg` : 'https://via.placeholder.com/200') }} 
                                        className="w-full h-full" 
                                    />
                                    {activeSong?.id === song.id && playing && (
                                        <View className="absolute inset-0 bg-black/30 items-center justify-center">
                                            <Pause color="white" size={20} fill="white" />
                                        </View>
                                    )}
                                    {!activeSong?.id === song.id || !playing && (
                                        <View className="absolute inset-0 bg-black/10 items-center justify-center">
                                            <Play color="white" size={20} fill="white" />
                                        </View>
                                    )}
                                </View>
                                <View className="flex-1 ml-4">
                                    <Text className="text-gray-900 font-bold text-sm" numberOfLines={1}>{song.title}</Text>
                                    <Text className="text-gray-400 text-[10px] mt-1 font-bold uppercase">{song.artist || 'Mantra Puja Official'} • {song.category}</Text>
                                </View>
                                <View className="flex-row items-center">
                                    {isYoutube(song.audio_url) && <Play size={14} color="#EF4444" className="mr-3" />}
                                    <TouchableOpacity className="p-2">
                                        <Heart color="#CBD5E1" size={20} />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View className="py-20 items-center justify-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
                            <View className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-sm mb-4">
                                <MusicIcon color="#FF4D00" size={32} />
                            </View>
                            <Text className="text-gray-900 font-bold text-lg">No Bhajans Found</Text>
                            <Text className="text-gray-400 text-sm text-center px-10 mt-2">
                                We are updating our divine library. Check out our official channel for more.
                            </Text>
                            <TouchableOpacity 
                                onPress={() => router.push('https://www.youtube.com/@mantrapujaofficial' as any)}
                                className="mt-6 bg-primary px-8 py-3 rounded-2xl shadow-lg shadow-primary/20"
                            >
                                <Text className="text-white font-black uppercase text-xs">Visit Channel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Hybrid Floating Player */}
            {activeSong && (
                <View className={`absolute bottom-20 inset-x-4 bg-white shadow-2xl rounded-[32px] border border-gray-100 overflow-hidden ${isPlayerExpanded ? 'h-[500px] bottom-4' : 'h-20'}`}>
                    {isPlayerExpanded ? (
                        <View className="flex-1">
                            {/* Expanded Header */}
                            <View className="flex-row justify-between items-center p-6">
                                <TouchableOpacity onPress={() => setIsPlayerExpanded(false)}>
                                    <ChevronDown color="#1E293B" size={28} />
                                </TouchableOpacity>
                                <View className="items-center">
                                    <Text className="text-gray-400 font-black text-[10px] uppercase tracking-[3px]">Now Playing</Text>
                                    <Text className="text-gray-900 font-bold text-xs mt-1">{activeSong.category}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    if (sound) sound.stopAsync();
                                    setActiveSong(null);
                                }}>
                                    <X color="#1E293B" size={24} />
                                </TouchableOpacity>
                            </View>

                            {/* Main Content (YouTube Player or Cover Art) */}
                            <View className="px-6 mb-6">
                                {useYoutubePlayer && isYoutube(activeSong.audio_url) ? (
                                    <View className="w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-xl">
                                        <YoutubePlayer
                                            height={width * 0.56}
                                            play={playing}
                                            videoId={getYoutubeId(activeSong.audio_url) || ''}
                                            onChangeState={(state) => {
                                                if (state === 'ended') setPlaying(false);
                                            }}
                                        />
                                    </View>
                                ) : (
                                    <View className="w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
                                        <Image 
                                            source={{ uri: activeSong.image_url || 'https://via.placeholder.com/400' }} 
                                            className="w-full h-full"
                                            resizeMode="cover"
                                        />
                                        {playing && (
                                            <View className="absolute inset-0 bg-black/10 items-center justify-center">
                                                <Star size={100} color="rgba(255,255,255,0.2)" />
                                            </View>
                                        )}
                                    </View>
                                )}
                            </View>

                            {/* Info & Controls */}
                            <View className="px-10">
                                <View className="items-center mb-8">
                                    <Text className="text-gray-900 font-black text-2xl text-center" numberOfLines={1}>{activeSong.title}</Text>
                                    <Text className="text-primary font-bold text-sm mt-1 uppercase tracking-widest">{activeSong.artist || 'Mantra Puja Official'}</Text>
                                </View>

                                {/* Progress Bar (For Native Audio) */}
                                {!isYoutube(activeSong.audio_url) && playbackStatus && (
                                    <View className="w-full h-1 bg-gray-100 rounded-full mb-8 relative">
                                        <View 
                                            className="h-full bg-primary rounded-full" 
                                            style={{ width: `${(playbackStatus.positionMillis / playbackStatus.durationMillis) * 100}%` }}
                                        />
                                        <View className="flex-row justify-between mt-2">
                                            <Text className="text-[10px] text-gray-400 font-bold">
                                                {Math.floor(playbackStatus.positionMillis / 60000)}:{String(Math.floor((playbackStatus.positionMillis % 60000) / 1000)).padStart(2, '0')}
                                            </Text>
                                            <Text className="text-[10px] text-gray-400 font-bold">
                                                {Math.floor(playbackStatus.durationMillis / 60000)}:{String(Math.floor((playbackStatus.durationMillis % 60000) / 1000)).padStart(2, '0')}
                                            </Text>
                                        </View>
                                    </View>
                                )}

                                <View className="flex-row justify-center items-center gap-10">
                                    <TouchableOpacity>
                                        <SkipBack size={32} color="#CBD5E1" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        onPress={togglePlay}
                                        className="w-20 h-20 bg-primary rounded-full items-center justify-center shadow-xl shadow-primary/40"
                                    >
                                        {playing ? <Pause color="white" size={40} fill="white" /> : <Play color="white" size={40} fill="white" />}
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <SkipForward size={32} color="#CBD5E1" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity 
                            onPress={() => setIsPlayerExpanded(true)}
                            activeOpacity={0.9}
                            className="flex-1 flex-row items-center px-4"
                        >
                            <Image 
                                source={{ uri: activeSong.image_url || (isYoutube(activeSong.audio_url) ? `https://img.youtube.com/vi/${activeSong.audio_url}/0.jpg` : 'https://via.placeholder.com/200') }} 
                                className="w-12 h-12 rounded-2xl" 
                            />
                            <View className="flex-1 ml-4">
                                <Text className="text-gray-900 font-black text-[13px]" numberOfLines={1}>{activeSong.title}</Text>
                                <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-tighter">
                                    {isYoutube(activeSong.audio_url) ? 'Streaming from YouTube' : 'Playing Divine Audio'}
                                </Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <TouchableOpacity onPress={togglePlay} className="p-2">
                                    {playing ? <Pause color="#FF4D00" size={28} fill="#FF4D00" /> : <Play color="#FF4D00" size={28} fill="#FF4D00" />}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    if (sound) sound.stopAsync();
                                    setActiveSong(null);
                                }} className="p-2">
                                    <X color="#94A3B8" size={24} />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}
