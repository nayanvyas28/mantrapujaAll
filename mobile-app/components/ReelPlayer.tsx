import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Video, ResizeMode, Audio } from 'expo-av';
import { Heart, Share2, Music, Volume2, VolumeX, Flame } from 'lucide-react-native';
import { Typography } from './ui/Typography';
import { useTheme } from '../context/ThemeContext';
import { BlurView } from 'expo-blur';

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

export function ReelPlayer({
    video_url,
    title,
    title_hi,
    category,
    isActive,
    shouldLoad,
    thumbnail_url
}: ReelPlayerProps) {
    const { colors, theme } = useTheme();
    const videoRef = useRef<Video>(null);
    const [status, setStatus] = useState<any>({});
    const [isMuted, setIsMuted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!isActive && videoRef.current) {
            videoRef.current.pauseAsync();
        } else if (isActive && videoRef.current) {
            videoRef.current.playAsync();
        }
    }, [isActive]);

    // Explicitly unload video when shouldLoad is false or component unmounts
    useEffect(() => {
        if (!shouldLoad && videoRef.current) {
            videoRef.current.unloadAsync();
        }
        return () => {
            if (videoRef.current) {
                videoRef.current.unloadAsync();
            }
        };
    }, [shouldLoad]);

    const togglePlayback = () => {
        if (status.isPlaying) {
            videoRef.current?.pauseAsync();
        } else {
            videoRef.current?.playAsync();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                activeOpacity={1} 
                onPress={togglePlayback}
                style={styles.videoContainer}
            >
                {shouldLoad ? (
                    <Video
                        ref={videoRef}
                        style={styles.video}
                        source={{ uri: video_url }}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        isMuted={isMuted}
                        shouldPlay={isActive}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                        progressUpdateIntervalMillis={500}
                    />
                ) : (
                    <View style={styles.video} />
                )}
                
                {(!status.isLoaded || status.isBuffering) && (
                    <View style={styles.loadingOverlay}>
                        {thumbnail_url ? (
                           <Image source={{ uri: thumbnail_url }} style={StyleSheet.absoluteFill} blurRadius={10} />
                        ) : (
                           <View style={[StyleSheet.absoluteFill, { backgroundColor: '#000' }]} />
                        )}
                        <ActivityIndicator size="large" color={colors.saffron} />
                    </View>
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
        height: height - 70, // Adjust for bottom tab bar roughly
        backgroundColor: '#000',
    },
    videoContainer: {
        flex: 1,
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        padding: 20,
        justifyContent: 'flex-end',
    },
    rightButtons: {
        position: 'absolute',
        right: 15,
        bottom: 120,
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
        paddingBottom: 40,
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
