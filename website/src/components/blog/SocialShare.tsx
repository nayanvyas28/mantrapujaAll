"use client";

import { Share2, Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
    url: string;
    title: string;
    orientation?: 'vertical' | 'horizontal';
}

export default function SocialShare({ url, title, orientation = 'vertical' }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const shareData = {
        title: title,
        url: url
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share failed', err);
            }
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialLinks = [
        { 
            name: 'Facebook', 
            icon: <Facebook className="w-4 h-4" />, 
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'hover:text-blue-600'
        },
        { 
            name: 'Twitter', 
            icon: <Twitter className="w-4 h-4" />, 
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            color: 'hover:text-sky-500'
        }
    ];

    return (
        <div className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-4 sticky top-40 h-fit p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl`}>
            <button 
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-saffron hover:text-saffron transition-all shadow-xl group text-white"
                title="Share Article"
            >
                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            {socialLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all shadow-xl text-white ${social.color}`}
                    title={`Share on ${social.name}`}
                >
                    <div className="group-hover:scale-110 transition-transform">
                        {social.icon}
                    </div>
                </a>
            ))}

            <button 
                onClick={handleCopy}
                className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:border-saffron transition-all shadow-xl group text-white"
                title="Copy Link"
            >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
            </button>
        </div>
    );
}
