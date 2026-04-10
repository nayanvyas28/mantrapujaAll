"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Upload, Trash2, Copy, ImageIcon, Loader2 } from "lucide-react";

interface Asset {
    name: string;
    url: string;
    id: string;
}

export default function AssetManager({ onSelect }: { onSelect?: (url: string) => void }) {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        setLoading(true);
        const { data, error } = await supabase.storage.from('media').list();

        if (error) {
            console.error("Error loading assets:", error);
        } else {
            const loadedAssets = data?.map(file => {
                const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(file.name);
                return {
                    name: file.name,
                    id: file.id || file.name,
                    url: publicUrlData.publicUrl
                };
            }) || [];
            setAssets(loadedAssets);
        }
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

        const { error } = await supabase.storage.from('media').upload(fileName, file);

        if (error) {
            alert("Upload failed: " + error.message);
        } else {
            // Refresh list
            loadAssets();
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = async (asset: Asset, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete this asset?")) return;

        const { error } = await supabase.storage.from('media').remove([asset.name]);
        if (error) {
            alert("Delete failed: " + error.message);
        } else {
            loadAssets();
        }
    };

    const handleCopyUrl = (url: string, e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(url);
        alert("URL copied to clipboard!");
    };

    // Drag Start Handler to pass data to drop zones
    const handleDragStart = (e: React.DragEvent, url: string) => {
        e.dataTransfer.setData("text/plain", url);
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div className="h-full flex flex-col bg-[#2c2c2c] text-white">
            <div className="p-4 border-b border-[#444] flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Media Library</h3>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors disabled:opacity-50"
                    title="Upload Image"
                >
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleUpload}
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {loading ? (
                    <div className="text-center py-10 text-gray-500">
                        <Loader2 size={24} className="mx-auto mb-2 animate-spin" />
                        <p className="text-xs">Loading assets...</p>
                    </div>
                ) : assets.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 border-2 border-dashed border-[#444] rounded-lg">
                        <ImageIcon size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-xs">No assets found</p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs text-blue-400 mt-2 hover:underline"
                        >
                            Upload your first image
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {assets.map(asset => (
                            <div
                                key={asset.id}
                                className="group relative aspect-square bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#444] hover:border-blue-500 cursor-pointer transition-all"
                                onClick={() => onSelect && onSelect(asset.url)}
                                draggable
                                onDragStart={(e) => handleDragStart(e, asset.url)}
                            >
                                <img
                                    src={asset.url}
                                    alt={asset.name}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={(e) => handleCopyUrl(asset.url, e)}
                                        className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white"
                                        title="Copy URL"
                                    >
                                        <Copy size={12} />
                                    </button>
                                    <button
                                        onClick={(e) => handleDelete(asset, e)}
                                        className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded text-white"
                                        title="Delete"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 text-[9px] text-gray-300 truncate px-2">
                                    {asset.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
