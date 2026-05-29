import React from 'react';
import { IndianRupee, Flower, Heart, Sun, MapPin, Scroll, Flame, ShieldCheck, Star } from "lucide-react";

export const getPujaIcon = (icon: string | React.ReactNode) => {
    if (typeof icon !== 'string') return icon;
    const lower = icon.toLowerCase();

    if (lower.includes('rupee') || icon === '💰') return <IndianRupee className="w-10 h-10" />;
    if (lower.includes('peace') || icon === '☮️' || icon === '🧘' || icon === '🕊️') return <Flower className="w-10 h-10" />;
    if (lower.includes('heart') || icon === '❤️') return <Heart className="w-10 h-10" />;
    if (icon === '🌟' || icon === '✨' || icon === '🚀' || icon === '💡' || icon === '🔓') return <Sun className="w-10 h-10" />;
    if (icon === '🏠' || icon === '🏡' || icon === '🚧' || icon === '📍') return <MapPin className="w-10 h-10" />;
    if (icon === '🎓' || icon === '🧠' || icon === '📜') return <Scroll className="w-10 h-10" />;
    if (icon === '⚕️' || icon === '💪' || icon === '🔥' || icon === '🌱') return <Flame className="w-10 h-10" />;
    if (icon === '🛡️') return <ShieldCheck className="w-10 h-10" />;
    if (icon === '🕉️') return <Sun className="w-10 h-10" />;

    return <Star className="w-10 h-10" />;
};
