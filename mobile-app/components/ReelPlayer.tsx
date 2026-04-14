import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Heart, Share2, Music, Volume2, VolumeX, Flame } from 'lucide-react-native';
import { Typography } from './ui/Typography';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

interface ReelPlayerProps {
    id: string;
    video_url: string;
    title: string;
    title_hi?: string;
    category?: string;
    isActive: boolean;
    shouldLoad: boolean;
    thumbnail_url?: string;
}

// Utility to extract YouTube Video ID
const getYouTubeID = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?)|(shorts\/))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[8].length === 11) ? match[8] : null;
};

// Convert common sharing links (Drive, Dropbox) to direct video links
const getDirectVideoUrl = (url: string) => {
    if (!url) return url;
    
    // Google Drive
    if (url.includes('drive.google.com')) {
        const id = url.match(/\/d\/(.+?)\/|id=(.+?)(&|$)/);
        const driveId = id ? (id[1] || id[2]) : null;
        if (driveId) return `https://drive.google.com/uc?export=download&id=${driveId}`;
    }
    
    // Dropbox
    if (url.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    }
    
    return url;
};

export function ReelPlayer({
    video_url,
    title,
    title_hi,
    category,
    isActive,
    shouldLoad,
    thumbnail_url
}: ReelPlayerProps) {
    const { colors } = useTheme();
    const videoRef = useRef<Video>(null);
    const [status, setStatus] = useState<any>({});
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [ytReady, setYtReady] = useState(false);

    const youtubeId = getYouTubeID(video_url);
    const isYoutube = !!youtubeId;

    useEffect(() => {
        if (!isYoutube) {
            if (!isActive && videoRef.current) {
                videoRef.current.pauseAsync();
            } else if (isActive && videoRef.current) {
                videoRef.current.playAsync();
            }
        }
    }, [isActive, isYoutube]);

    // Explicitly unload video when shouldLoad is false or component unmounts
    useEffect(() => {
        if (!isYoutube) {
            if (!shouldLoad && videoRef.current) {
                videoRef.current.unloadAsync();
            }
        }
        return () => {
            if (!isYoutube && videoRef.current) {
                videoRef.current.unloadAsync();
            }
        };
    }, [shouldLoad, isYoutube]);

    const togglePlayback = () => {
        if (isYoutube) return; // YouTube player handles its own touch usually, but we could overlay if needed
        if (status.isPlaying) {
            videoRef.current?.pauseAsync();
        } else {
            videoRef.current?.playAsync();
        }
    };

    const handleYtStateChange = useCallback((state: string) => {
        if (state === 'ready') setYtReady(true);
        if (state === 'playing') setYtReady(true);
    }, []);

    const finalThumbnail = thumbnail_url || (isYoutube ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                activeOpacity={1} 
                onPress={togglePlayback}
                style={styles.videoContainer}
            >
                {shouldLoad ? (
                    isYoutube ? (
                        <View style={styles.video}>
                           <YoutubePlayer
                                height={height}
                                width={width}
                                play={isActive}
                                videoId={youtubeId!}
                                onChange={handleYtStateChange}
                                mute={isMuted}
                                webViewProps={{
                                    allowsInlineMediaPlayback: true,
                                    mediaPlaybackRequiresUserAction: false,
                                }}
                                initialPlayerParams={{
                                    loop: true,
                                    controls: false,
                                    modestbranding: true,
                                    rel: false
                                }}
                            />
                        </View>
                    ) : (
                        <Video
                            ref={videoRef}
                            style={styles.video}
                            source={{ uri: getDirectVideoUrl(video_url) }}
                            resizeMode={ResizeMode.COVER}
                            isLooping
                            isMuted={isMuted}
                            shouldPlay={isActive}
                            onPlaybackStatusUpdate={status => setStatus(() => status)}
                            progressUpdateIntervalMillis={500}
                        />
                    )
                ) : (
                    <View style={styles.video} />
                )}
                
                {/* Loading / Placeholder Overlay */}
                {shouldLoad && (isYoutube ? !ytReady : (!status.isLoaded || status.isBuffering)) && (
                    <View style={styles.loadingOverlay}>
                        {finalThumbnail ? (
                           <Image source={{ uri: finalThumbnail }} style={StyleSheet.absoluteFill} blurRadius={shouldLoad ? 5 : 10} />
                        ) : (
                           <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]} />
                        )}
                        <ActivityIndicator size="large" color={colors.saffron} />
                    </View>
                )}

                {/* Always show thumbnail if not loading to save resources */}
                {!shouldLoad && finalThumbnail && (
                    <Image source={{ uri: finalThumbnail }} style={StyleSheet.absoluteFill} />
                )}
            </TouchableOpacity>

            {/* Content Overlays */}
            <View style={styles.overlayContainer} pointerEvents="box-none">
                {/* Right Side Buttons */}
                <View style={styles.rightButtons}>
                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => setIsLiked(!isLiked)}
                    >
                        <Heart 
                             size={28} 
                             color={isLiked ? "#ef4444" : "#ffffff"} 
                             fill={isLiked ? "#ef4444" : "transparent"} 
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Share2 size={26} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.iconButton} 
                        onPress={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? <VolumeX size={26} color="#ffffff" /> : <Volume2 size={26} color="#ffffff" />}
                    </TouchableOpacity>
                </View>

                {/* Bottom Content Info */}
                <View style={styles.bottomInfo}>
                    <View style={styles.categoryBadge}>
                        <Flame size={12} color={colors.saffron} fill={colors.saffron} />
                        <Typography variant="caption" style={styles.categoryText}>{category}</Typography>
                    </View>
                    
                    <Typography 
                        variant="h3" 
                        color="#ffffff" 
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {title}
                    </Typography>
                    
                    {title_hi && (
                        <Typography 
                            variant="body2" 
                            color="#e2e8f0" 
                            style={styles.titleHi}
                            numberOfLines={1}
                        >
                            {title_hi}
                        </Typography>
                    )}

                    <View style={styles.musicContainer}>
                        <Music size={14} color="#ffffff" style={{ marginRight: 8 }} />
                        <Typography variant="caption" color="#ffffff">Mantra Puja Divine Spirit • Original Audio</Typography>
                    </View>
                </View>
            </View>
            
            <View style={styles.bottomGradient} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#000',
    },
    videoContainer: {
        flex: 1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        padding: 20,
        justifyContent: 'flex-end',
    },
    rightButtons: {
        position: 'absolute',
        right: 15,
        bottom: 150,
        gap: 20,
        alignItems: 'center',
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomInfo: {
        paddingBottom: 80,
        maxWidth: '80%',
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 8,
        gap: 4,
    },
    categoryText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    titleHi: {
        fontSize: 14,
        marginTop: 4,
        opacity: 0.9,
    },
    musicContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    bottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        backgroundColor: 'transparent',
    }
});
