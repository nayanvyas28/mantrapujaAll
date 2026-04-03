import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AlarmClock, Bell, Calendar, ChevronDown, FileText, Heart, MessageCircle, Moon, MoreVertical, Pause, Play, Repeat, Share2, Shuffle, SkipBack, SkipForward, Sun, X } from 'lucide-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Alert, FlatList, Image, Modal, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import YoutubePlayer from "react-native-youtube-iframe";
import { AlarmPickerModal } from '../../components/AlarmPickerModal';
import { Typography } from "../../components/ui/Typography";
import { useTheme } from '../../context/ThemeContext';
import { alarmService } from '../../services/AlarmService';
import { supabase } from '../../utils/supabase';

const CATEGORIES = ['All', 'Aarti', 'Chalisa', 'Bhajan', 'Mantra', 'Other'];

export default function MusicScreen() {
    const { theme, colors, toggleTheme } = useTheme();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const spiritualSubheading = t("home.subtitle", "Awaken Your Spirit");

    const [activeCategory, setActiveCategory] = useState('All');
    const [activeGod, setActiveGod] = useState<string | null>(null);

    const [dbGods, setDbGods] = useState<any[]>([]);
    const [dbSongs, setDbSongs] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState<any>(null);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false);

    const [lyricsSong, setLyricsSong] = useState<any>(null);
    const [isLyricsModalVisible, setIsLyricsModalVisible] = useState(false);

    const [selectedSongForOptions, setSelectedSongForOptions] = useState<any>(null);
    const [isOptionsMenuVisible, setIsOptionsMenuVisible] = useState(false);

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus | null>(null);
    const [isVideoMode, setIsVideoMode] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const params = useLocalSearchParams<{ songId?: string, audioUrl?: string, autoPlay?: string }>();
    const [isAlarmModalVisible, setIsAlarmModalVisible] = useState(false);
    const [songForAlarm, setSongForAlarm] = useState<any>(null);

    const loadFavorites = useCallback(async () => {
        try {
            const savedFavorites = await AsyncStorage.getItem('music_favorites');
            if (savedFavorites) {
                setFavorites(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
        }
    }, []);

    const toggleFavorite = useCallback(async (songId: string) => {
        try {
            let newFavorites = [...favorites];
            if (newFavorites.includes(songId)) {
                newFavorites = newFavorites.filter(id => id !== songId);
            } else {
                newFavorites.push(songId);
            }
            setFavorites(newFavorites);
            await AsyncStorage.setItem('music_favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    }, [favorites]);

    const fetchMusicData = useCallback(async () => {
        try {
            const [godsRes, songsRes] = await Promise.all([
                supabase.from('music_gods').select('*').order('created_at', { ascending: true }),
                supabase.from('music_songs').select('*, music_gods(*)').order('created_at', { ascending: true })
            ]);

            if (godsRes.error) console.error(godsRes.error);
            else setDbGods(godsRes.data || []);

            if (songsRes.error) console.error(songsRes.error);
            else setDbSongs(songsRes.data || []);
        } catch (error) {
            console.error("Error fetching music data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Configure audio mode
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });
            } catch (error) {
                console.error("Audio setup error", error);
            }
        };

        setupAudio();
        fetchMusicData();
        loadFavorites();

        // Subscribe to real-time changes
        const subscription = supabase.channel('music_changes')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'music_gods' }, fetchMusicData)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'music_songs' }, fetchMusicData)
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
            // Cleanup sound on unmount
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound, fetchMusicData, loadFavorites]);

    // Filter songs based on category and god
    const filteredSongs = useMemo(() => {
        return dbSongs.filter(song => {
            let matchesCategory = true;
            let matchesGod = true;

            if (activeGod === 'Favorites') {
                return favorites.includes(song.id);
            }

            if (activeCategory !== 'All') {
                matchesCategory = song.category === activeCategory;
            }

            if (activeGod) {
                matchesGod = song.music_gods?.name === activeGod;
            }

            return matchesCategory && matchesGod;
        });
    }, [dbSongs, activeGod, favorites, activeCategory]);

    const formatTime = useCallback((millis: number | undefined) => {
        if (!millis) return "0:00";
        const totalSeconds = millis / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, []);

    const getProgress = () => {
        if (playbackStatus && 'isLoaded' in playbackStatus && playbackStatus.isLoaded && playbackStatus.durationMillis) {
            return (playbackStatus.positionMillis / playbackStatus.durationMillis) * 100;
        }
        return 0;
    };

    const onPlaybackStatusUpdate = useCallback((status: AVPlaybackStatus) => {
        setPlaybackStatus(status);
        if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            if (status.didJustFinish) {
                // Handle song finish (maybe play next?)
                setIsPlaying(false);
            }
        }
    }, []);

    const handlePlaySong = useCallback(async (song: any) => {
        console.log("Attempting to play song:", song.title, "URL:", song.audio_url);
        try {
            // Unload previous sound
            if (sound) {
                console.log("Unloading previous sound object...");
                await sound.unloadAsync();
            }

            setCurrentSong(song);
            setIsPlayerVisible(true);
            setIsVideoMode(false); // Reset to audio mode by default when playing a new song
            setIsVideoPlaying(false); // Reset video playback state

            if (song.audio_url) {
                console.log("Creating new sound object for URL:", song.audio_url);
                const { sound: newSound } = await Audio.Sound.createAsync(
                    { uri: song.audio_url },
                    { shouldPlay: true },
                    onPlaybackStatusUpdate
                );
                setSound(newSound);
                setIsPlaying(true);
                console.log("Sound object created and playing successfully.");
            } else {
                console.warn("Song missing audio_url!");
                Alert.alert("Missing File", "This song does not have an audio file yet.");
            }
        } catch (error) {
            console.error("Error playing sound:", error);
            Alert.alert("Error", "Could not play the audio. Please check your internet connection.");
        }
    }, [sound, onPlaybackStatusUpdate]);

    // Handle auto-play from alarm notification
    useEffect(() => {
        if (params.autoPlay === 'true' && params.audioUrl && dbSongs.length > 0) {
            const song = dbSongs.find(s => s.id === params.songId);
            if (song) {
                handlePlaySong(song);
            } else {
                handlePlaySong({
                    id: params.songId,
                    title: 'Spirituality Calling',
                    audio_url: params.audioUrl,
                    artist: 'Bhakt',
                });
            }
        }
    }, [params.autoPlay, params.songId, params.audioUrl, dbSongs, handlePlaySong]);

    const currentVideoId = useMemo(() => {
        if (!currentSong?.video_url) return null;
        const url = currentSong.video_url;
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = url.match(regex);
        const id = match ? match[1] : null;
        return id;
    }, [currentSong?.video_url]);

    const togglePlayPause = async () => {
        if (isVideoMode) {
            setIsVideoPlaying(prev => !prev);
            return;
        }
        if (!sound) return;
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    };

    const handleShare = async (song: any) => {
        try {
            await Share.share({
                message: `Listen to ${song.title} by ${song.artist} on Mantra Puja App!`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToAlarm = (song: any) => {
        setSongForAlarm(song);
        setIsAlarmModalVisible(true);
        setIsOptionsMenuVisible(false);
    };

    const handleSaveAlarm = async (date: Date) => {
        try {
            await alarmService.scheduleAlarm(songForAlarm, date);
            Alert.alert(
                "Alarm Scheduled",
                `"${songForAlarm.title}" will play at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
            );
            setIsAlarmModalVisible(false);
        } catch (error: any) {
            Alert.alert("Permission Error", "Please enable notification permissions in your phone settings to use alarms.");
            console.error(error);
        }
    };

    const openLyrics = (song: any) => {
        setLyricsSong(song);
        setIsLyricsModalVisible(true);
        setIsOptionsMenuVisible(false);
    };

    const openOptionsModal = (song: any) => {
        setSelectedSongForOptions(song);
        setIsOptionsMenuVisible(true);
    };

    const renderSongItem = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity
                style={[styles.songItem, { borderBottomColor: colors.border }]}
                onPress={() => handlePlaySong(item)}
            >
                {item.image_url ? (
                    <Image source={{ uri: item.image_url }} style={styles.songImage} />
                ) : (
                    <View style={[styles.songImage, { backgroundColor: colors.card }]} />
                )}
                <View style={styles.songInfo}>
                    <Text style={[styles.songTitle, { color: colors.foreground }]} numberOfLines={1}>{item.title}</Text>
                    <Text style={[styles.songSubtitle, { color: colors.muted }]} numberOfLines={1}>{item.artist}</Text>
                </View>
                <View style={styles.actionIconsRow}>
                    <TouchableOpacity style={styles.inlineActionButton} onPress={() => handleShare(item)}>
                        <MessageCircle color={colors.saffron} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inlineActionButton} onPress={() => handleAddToAlarm(item)}>
                        <AlarmClock color={colors.saffron} size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inlineActionButton}
                        onPress={() => openOptionsModal(item)}
                    >
                        <MoreVertical color={colors.saffron} size={22} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />

            {/* Top Navigation Bar (Fixed) */}
            <View
                style={[
                    styles.header,
                    {
                        backgroundColor: colors.background,
                        borderBottomColor: colors.borderMuted,
                    },
                ]}
            >
                <View style={styles.headerLeft}>
                    <Typography variant="h2" color={colors.foreground}>
                        {t("music.title", "Divine Music")}
                    </Typography>
                    <Typography
                        variant="bodySmall"
                        color={colors.saffron}
                        style={{ marginTop: 4, fontWeight: "600" }}
                    >
                        {spiritualSubheading}
                    </Typography>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.push("/notifications")}
                    >
                        <Bell size={22} color={colors.foreground} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.push("/calendar")}
                    >
                        <Calendar size={22} color={colors.foreground} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
                        {theme === "dark" ? (
                            <Sun size={22} color={colors.gold} />
                        ) : (
                            <Moon size={22} color={colors.foreground} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Gods Horizontal List (Images + Name) */}
            <View style={{ marginTop: 15, marginBottom: 15 }}>
                {loading ? (
                    <ActivityIndicator size="small" color={colors.saffron} style={{ marginVertical: 20 }} />
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.godsScrollContainer}>
                        {/* Favorites Card */}
                        <TouchableOpacity
                            style={[
                                styles.godProfileContainer,
                                activeGod === 'Favorites' && { borderColor: colors.saffron, borderWidth: 2 }
                            ]}
                            onPress={() => setActiveGod(activeGod === 'Favorites' ? null : 'Favorites')}
                        >
                            <View style={[styles.godProfileImage, { backgroundColor: colors.saffron + '20', justifyContent: 'center', alignItems: 'center' }]}>
                                <Heart size={30} color={colors.saffron} fill={activeGod === 'Favorites' ? colors.saffron : 'transparent'} />
                            </View>
                            <Text style={[styles.godProfileName, { color: colors.foreground, fontWeight: activeGod === 'Favorites' ? '700' : '500' }]} numberOfLines={1}>
                                Favorites
                            </Text>
                        </TouchableOpacity>

                        {dbGods.map(god => {
                            const isSelected = activeGod === god.name;
                            return (
                                <TouchableOpacity
                                    key={god.id}
                                    style={[
                                        styles.godProfileContainer,
                                        isSelected && { borderColor: colors.saffron, borderWidth: 2 }
                                    ]}
                                    onPress={() => setActiveGod(isSelected ? null : god.name)} // toggle off
                                >
                                    {god.image_url ? (
                                        <Image source={{ uri: god.image_url }} style={styles.godProfileImage} />
                                    ) : (
                                        <View style={[styles.godProfileImage, { backgroundColor: colors.card }]} />
                                    )}
                                    <Text style={[styles.godProfileName, { color: colors.foreground, fontWeight: isSelected ? '700' : '500' }]} numberOfLines={1}>
                                        {god.name}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                )}
            </View>

            {/* Categories Bar */}
            <View style={{ height: 60 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
                    {CATEGORIES.map(category => (
                        <TouchableOpacity
                            key={category}
                            style={[
                                styles.categoryChip,
                                { backgroundColor: activeCategory === category ? colors.saffron : 'transparent', borderColor: colors.border }
                            ]}
                            onPress={() => setActiveCategory(category)}
                        >
                            <Text style={{
                                color: activeCategory === category ? '#FFFFFF' : colors.foreground,
                                fontWeight: activeCategory === category ? '700' : '500'
                            }}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Songs List */}
            {loading ? (
                <ActivityIndicator size="large" color={colors.saffron} style={{ marginTop: 50 }} />
            ) : (
                <FlatList
                    data={filteredSongs}
                    keyExtractor={item => item.id}
                    renderItem={renderSongItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', color: colors.muted, marginTop: 50 }}>
                            No songs available for this category.
                        </Text>
                    }
                />
            )}

            {/* Mini Player Sticky Bottom (if a song is selected but modal closed) */}
            {currentSong && !isPlayerVisible && (
                <TouchableOpacity
                    style={[styles.miniPlayer, { backgroundColor: colors.card, borderTopColor: colors.border }]}
                    onPress={() => setIsPlayerVisible(true)}
                >
                    {currentSong.image_url ? (
                        <Image source={{ uri: currentSong.image_url }} style={styles.miniPlayerImage} />
                    ) : (
                        <View style={[styles.miniPlayerImage, { backgroundColor: colors.card }]} />
                    )}
                    <View style={styles.miniPlayerInfo}>
                        <Text style={[styles.miniPlayerTitle, { color: colors.foreground }]} numberOfLines={1}>{currentSong.title}</Text>
                        <Text style={[styles.miniPlayerSubtitle, { color: colors.muted }]} numberOfLines={1}>{currentSong.artist}</Text>
                    </View>
                    <TouchableOpacity onPress={togglePlayPause} style={styles.miniPlayerPlayBtn}>
                        {isPlaying ? <Pause color={colors.foreground} size={24} /> : <Play color={colors.foreground} size={24} />}
                    </TouchableOpacity>
                </TouchableOpacity>
            )}

            {/* Fullscreen Player Modal */}
            <Modal visible={isPlayerVisible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => {
                setIsPlayerVisible(false);
                setIsVideoPlaying(false);
            }}>
                <View style={[styles.playerContainer, { backgroundColor: colors.background, paddingTop: insets.top }]}>
                    <View style={styles.playerHeader}>
                        <TouchableOpacity onPress={() => {
                            setIsPlayerVisible(false);
                            setIsVideoPlaying(false);
                        }} style={styles.playerIconButton}>
                            <ChevronDown color={colors.foreground} size={30} />
                        </TouchableOpacity>
                        <View style={styles.playerHeaderCenter}>
                            <Text style={[styles.playerHeaderText, { color: colors.foreground }]}>Now Playing</Text>
                            {currentSong?.video_url && (
                                <View style={[styles.toggleWrapper, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                                    <TouchableOpacity
                                        style={[styles.toggleTab, !isVideoMode && { backgroundColor: colors.saffron }]}
                                        onPress={() => {
                                            if (isVideoMode) {
                                                setIsVideoMode(false);
                                                setIsVideoPlaying(false);
                                            }
                                        }}
                                    >
                                        <Text style={[styles.toggleText, { color: !isVideoMode ? "#FFF" : colors.muted }]}>Audio</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.toggleTab, isVideoMode && { backgroundColor: colors.saffron }]}
                                        onPress={async () => {
                                            if (!isVideoMode) {
                                                setIsVideoMode(true);
                                                // Do NOT set isVideoPlaying yet, wait for onReady
                                                // Pause background audio
                                                if (sound && isPlaying) {
                                                    await sound.pauseAsync();
                                                }
                                            }
                                        }}
                                    >
                                        <Text style={[styles.toggleText, { color: isVideoMode ? "#FFF" : colors.muted }]}>Video</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => openLyrics(currentSong)} style={styles.playerIconButton}>
                            <FileText color={colors.foreground} size={24} />
                        </TouchableOpacity>
                    </View>

                    {currentSong && (
                        <View style={styles.playerContent}>
                            {isVideoMode && currentSong.video_url ? (
                                <View style={styles.videoWrapper}>
                                    <YoutubePlayer
                                        height={210}
                                        play={isVideoPlaying}
                                        videoId={currentVideoId || ""}
                                        webViewProps={{
                                            allowsInlineMediaPlayback: true,
                                            mediaPlaybackRequiresUserAction: false,
                                        }}
                                        onReady={() => {
                                            console.log("[Music Video] Player Ready");
                                            if (isVideoMode) setIsVideoPlaying(true);
                                        }}
                                        onChangeState={(state: any) => {
                                            console.log(`[Music Video] State Change: ${state}`);
                                            if (state === "playing") {
                                                setIsVideoPlaying(true);
                                                if (sound) sound.pauseAsync();
                                            } else if (state === "paused" || state === "ended") {
                                                setIsVideoPlaying(false);
                                            }
                                        }}
                                        initialPlayerParams={{
                                            preventFullScreen: false,
                                            cc_load_policy: 0,
                                            rel: 0,
                                            autoplay: 1,
                                        }}
                                    />
                                </View>
                            ) : (
                                <>
                                    {currentSong.image_url ? (
                                        <Image source={{ uri: currentSong.image_url }} style={styles.playerAlbumArt} />
                                    ) : (
                                        <View style={[styles.playerAlbumArt, { backgroundColor: colors.card }]} />
                                    )}
                                </>
                            )}

                            <View style={styles.songMetadataRow}>
                                <View style={styles.songMetadata}>
                                    <Text style={[styles.playerTitle, { color: colors.foreground }]}>{currentSong.title}</Text>
                                    <Text style={[styles.playerArtist, { color: colors.saffron }]}>{currentSong.artist}</Text>
                                </View>
                                <TouchableOpacity onPress={() => toggleFavorite(currentSong.id)}>
                                    <Heart
                                        color={favorites.includes(currentSong.id) ? colors.saffron : colors.foreground}
                                        fill={favorites.includes(currentSong.id) ? colors.saffron : 'transparent'}
                                        size={28}
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Progress Bar */}
                            <View style={styles.progressContainer}>
                                <View style={[styles.progressBarBg, { backgroundColor: colors.border }]}>
                                    <View style={[styles.progressBarFill, { backgroundColor: colors.saffron, width: `${getProgress()}%` }]} />
                                </View>
                                <View style={styles.progressTime}>
                                    <Text style={{ color: colors.muted, fontSize: 12 }}>
                                        {playbackStatus && 'isLoaded' in playbackStatus && playbackStatus.isLoaded ? formatTime(playbackStatus.positionMillis) : "0:00"}
                                    </Text>
                                    <Text style={{ color: colors.muted, fontSize: 12 }}>
                                        {playbackStatus && 'isLoaded' in playbackStatus && playbackStatus.isLoaded ? formatTime(playbackStatus.durationMillis) : currentSong.duration}
                                    </Text>
                                </View>
                            </View>

                            {/* Controls */}
                            <View style={styles.controlsContainer}>
                                <TouchableOpacity><Shuffle color={colors.muted} size={24} /></TouchableOpacity>
                                <TouchableOpacity><SkipBack color={colors.foreground} size={36} /></TouchableOpacity>
                                <TouchableOpacity onPress={togglePlayPause} style={[styles.playButton, { backgroundColor: colors.saffron }]}>
                                    {(isVideoMode ? isVideoPlaying : isPlaying) ? <Pause color="#FFF" size={32} /> : <Play color="#FFF" size={32} style={{ marginLeft: 4 }} />}
                                </TouchableOpacity>
                                <TouchableOpacity><SkipForward color={colors.foreground} size={36} /></TouchableOpacity>
                                <TouchableOpacity><Repeat color={colors.muted} size={24} /></TouchableOpacity>
                            </View>

                            {/* Actions */}
                            <View style={styles.actionsContainer}>
                                <TouchableOpacity style={styles.actionButton} onPress={() => handleAddToAlarm(currentSong)}>
                                    <AlarmClock color={colors.foreground} size={24} />
                                    <Text style={[styles.actionText, { color: colors.foreground }]}>Alarm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton} onPress={() => handleShare(currentSong)}>
                                    <Share2 color={colors.foreground} size={24} />
                                    <Text style={[styles.actionText, { color: colors.foreground }]}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButton} onPress={() => openLyrics(currentSong)}>
                                    <FileText color={colors.foreground} size={24} />
                                    <Text style={[styles.actionText, { color: colors.foreground }]}>Lyrics</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </Modal>

            {/* Options Modal (Bottom Sheet Style) */}
            <Modal visible={isOptionsMenuVisible} animationType="fade" transparent={true} onRequestClose={() => setIsOptionsMenuVisible(false)}>
                <TouchableOpacity style={styles.optionsModalOverlay} activeOpacity={1} onPress={() => setIsOptionsMenuVisible(false)}>
                    <TouchableOpacity activeOpacity={1} style={[styles.optionsModalContent, { backgroundColor: colors.background }]}>
                        {selectedSongForOptions && (
                            <>
                                <View style={styles.optionsHeader}>
                                    {selectedSongForOptions.image_url ? (
                                        <Image source={{ uri: selectedSongForOptions.image_url }} style={styles.optionsHeaderImage} />
                                    ) : (
                                        <View style={[styles.optionsHeaderImage, { backgroundColor: colors.card }]} />
                                    )}
                                    <View style={styles.optionsHeaderInfo}>
                                        <Text style={[styles.optionsHeaderTitle, { color: colors.foreground }]} numberOfLines={1}>{selectedSongForOptions.title}</Text>
                                        <Text style={[styles.optionsHeaderSubtitle, { color: colors.muted }]} numberOfLines={1}>{selectedSongForOptions.artist}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setIsOptionsMenuVisible(false)} style={{ padding: 5 }}>
                                        <X color={colors.foreground} size={24} />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.optionsDivider, { backgroundColor: colors.borderMuted }]} />

                                <TouchableOpacity
                                    style={styles.optionRowContainer}
                                    onPress={() => {
                                        toggleFavorite(selectedSongForOptions.id);
                                        setIsOptionsMenuVisible(false);
                                    }}
                                >
                                    <Heart
                                        color={colors.saffron}
                                        fill={favorites.includes(selectedSongForOptions.id) ? colors.saffron : 'transparent'}
                                        size={24}
                                    />
                                    <Text style={[styles.optionRowText, { color: colors.foreground }]}>
                                        {favorites.includes(selectedSongForOptions.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionRowContainer} onPress={() => openLyrics(selectedSongForOptions)}>
                                    <FileText color={colors.saffron} size={24} />
                                    <Text style={[styles.optionRowText, { color: colors.foreground }]}>View Lyrics of the Music</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            {/* Lyrics Modal */}
            <Modal visible={isLyricsModalVisible} animationType="fade" transparent={true} onRequestClose={() => setIsLyricsModalVisible(false)}>
                <View style={styles.lyricsModalOverlay}>
                    <View style={[styles.lyricsModalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.lyricsHeader}>
                            <Text style={[styles.lyricsTitle, { color: colors.foreground }]}>{lyricsSong?.title} - Lyrics</Text>
                            <TouchableOpacity onPress={() => setIsLyricsModalVisible(false)}>
                                <X color={colors.foreground} size={24} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.lyricsScroll}>
                            <Text style={[styles.lyricsText, { color: colors.foreground }]}>{lyricsSong?.lyrics || "Lyrics not available."}</Text>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <AlarmPickerModal
                isVisible={isAlarmModalVisible}
                onClose={() => setIsAlarmModalVisible(false)}
                onSave={handleSaveAlarm}
                song={songForAlarm}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 16,
        borderBottomWidth: 1,
        zIndex: 10,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    iconButton: {
        padding: 4,
        marginLeft: 8,
    },
    categoriesContainer: {
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 5,
        borderWidth: 1,
    },
    godsScrollContainer: {
        paddingHorizontal: 15,
        alignItems: 'flex-start',
        gap: 15,
    },
    godProfileContainer: {
        alignItems: 'center',
        padding: 5,
        borderRadius: 15,
    },
    godProfileImage: {
        width: 65,
        height: 65,
        borderRadius: 12,
        marginBottom: 5,
    },
    godProfileName: {
        fontSize: 12,
        maxWidth: 70,
        textAlign: 'center',
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
    },
    songImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    songInfo: {
        flex: 1,
        marginLeft: 15,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    songSubtitle: {
        fontSize: 14,
    },
    actionIconsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    inlineActionButton: {
        padding: 5,
    },
    miniPlayer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
    },
    miniPlayerImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    miniPlayerInfo: {
        flex: 1,
        marginLeft: 10,
    },
    miniPlayerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    miniPlayerSubtitle: {
        fontSize: 12,
    },
    miniPlayerPlayBtn: {
        padding: 10,
    },
    playerContainer: {
        flex: 1,
    },
    playerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    playerHeaderText: {
        fontSize: 16,
        fontWeight: '600',
    },
    playerIconButton: {
        padding: 10,
    },
    playerHeaderCenter: {
        flex: 1,
        alignItems: 'center',
    },
    toggleWrapper: {
        flexDirection: 'row',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 8,
        padding: 2,
        width: 140,
    },
    toggleTab: {
        flex: 1,
        paddingVertical: 4,
        alignItems: 'center',
        borderRadius: 18,
    },
    toggleText: {
        fontSize: 12,
        fontWeight: '700',
    },
    videoWrapper: {
        width: '100%',
        height: 210,
        marginBottom: 40,
        backgroundColor: '#000',
        borderRadius: 15,
        overflow: 'hidden',
    },
    playerContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 30,
    },
    playerAlbumArt: {
        width: 300,
        height: 300,
        borderRadius: 20,
        marginBottom: 40,
    },
    songMetadataRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    songMetadata: {
        flex: 1,
        alignItems: 'flex-start',
    },
    playerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    playerArtist: {
        fontSize: 18,
        fontWeight: '500',
    },
    progressContainer: {
        width: '100%',
        marginBottom: 40,
    },
    progressBarBg: {
        height: 6,
        borderRadius: 3,
        width: '100%',
        marginBottom: 10,
    },
    progressBarFill: {
        height: 6,
        borderRadius: 3,
        width: '30%',
    },
    progressTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    playButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 'auto',
        marginBottom: 40,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: '500',
    },
    lyricsModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    lyricsModalContent: {
        width: '85%',
        maxHeight: '70%',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
    },
    lyricsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    lyricsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lyricsScroll: {
        marginTop: 10,
    },
    lyricsText: {
        fontSize: 16,
        lineHeight: 28,
        textAlign: 'center',
    },
    optionsModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    optionsModalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    optionsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    optionsHeaderImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    optionsHeaderInfo: {
        flex: 1,
        marginLeft: 15,
    },
    optionsHeaderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    optionsHeaderSubtitle: {
        fontSize: 14,
    },
    optionsDivider: {
        height: 1,
        width: '100%',
        marginBottom: 20,
    },
    optionRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    optionRowText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 20,
    }
});
