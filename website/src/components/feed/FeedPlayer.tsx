"use client";

import React, { useState, useEffect, useRef } from "react";
import { getYouTubeID, getDirectMediaUrl } from "@/lib/videoUtils";
import { Play, Volume2, VolumeX, AlertCircle, Loader2 } from "lucide-react";

interface FeedPlayerProps {
    url: string;
    isActive: boolean;
    title?: string;
    thumbnail?: string;
}

const FeedPlayer: React.FC<FeedPlayerProps> = ({ url, isActive, title, thumbnail }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const youtubeId = getYouTubeID(url);
    const isYoutube = !!youtubeId;
    const directUrl = isYoutube ? null : getDirectMediaUrl(url);

    useEffect(() => {
        if (!isYoutube && videoRef.current) {
            if (isActive) {
                videoRef.current.play().catch(() => {
                    // Autoplay might be blocked, that's fine
                });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isActive, isYoutube]);

    const handleVideoError = () => {
        setError("Failed to load video. This might be due to a private link or direct access restriction.");
    };

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden rounded-2xl border border-white/5 shadow-2xl group">
            {/* Background Placeholder / Thumbnail */}
            {!isReady && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900">
                    {thumbnail ? (
                        <img 
                            src={thumbnail} 
                            alt={title} 
                            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-50"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 to-black" />
                    )}
                    <Loader2 className="w-8 h-8 text-saffron animate-spin relative z-20" />
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-4 relative z-20">Loading Divine Feed...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-sm font-medium text-zinc-300">{error}</p>
                    <button 
                        onClick={() => window.open(url, '_blank')}
                        className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold transition-all border border-white/10"
                    >
                        Open Original Link
                    </button>
                </div>
            )}

            {/* Player */}
            {isYoutube ? (
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${isActive ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1`}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    onLoad={() => setIsReady(true)}
                />
            ) : (
                <video
                    ref={videoRef}
                    src={directUrl || ""}
                    className="w-full h-full object-cover"
                    loop
                    muted={isMuted}
                    playsInline
                    onCanPlay={() => setIsReady(true)}
                    onError={handleVideoError}
                />
            )}

            {/* Overlay UI */}
            <div className="absolute bottom-6 right-6 z-20 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {!isYoutube && (
                    <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:bg-black/60 transition-all"
                    >
                        {isMuted ? <VolumeX className="w-5 h-5 text-zinc-400" /> : <Volume2 className="w-5 h-5 text-white" />}
                    </button>
                )}
            </div>

            {/* Play/Pause indicator for non-YT */}
            {!isYoutube && !isActive && isReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <div className="p-4 bg-saffron/20 border border-saffron/40 rounded-full backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedPlayer;
