"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { GalleryImage } from '@/lib/festivalData';

interface FestivalGalleryProps {
    images: GalleryImage[];
}

export const FestivalGallery = ({ images }: FestivalGalleryProps) => {
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'ritual' | 'temple' | 'crowd' | 'decoration'>('all');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const categories = [
        { id: 'all', label: 'All Photos' },
        { id: 'ritual', label: 'Rituals' },
        { id: 'temple', label: 'Temples' },
        { id: 'crowd', label: 'Celebrations' },
        { id: 'decoration', label: 'Decorations' }
    ];

    const filteredImages = selectedCategory === 'all'
        ? images
        : images.filter(img => img.category === selectedCategory);

    return (
        <div className="py-12">
            <h3 className="text-3xl font-bold font-serif mb-8 text-center">Festival Gallery</h3>

            {/* Filter Tabs */}
            <div className="flex flex-wrapjustify-center gap-4 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.id
                            ? 'bg-saffron text-white shadow-lg shadow-saffron/20'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence>
                    {filteredImages.map((img) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer"
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <ZoomIn className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No images found in this category.</p>
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            src={selectedImage.url}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-6 left-0 right-0 text-center text-white/80 font-medium">
                            {selectedImage.alt}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
