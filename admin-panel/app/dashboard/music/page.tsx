'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plus, Music, User, Search, Filter, Trash2, Edit2, Upload, X, Check, Loader2, Music2 } from 'lucide-react';

interface Deity {
    id: string;
    name: string;
    image_url: string;
}

interface Song {
    id: string;
    title: string;
    artist: string;
    category: string;
    god_id: string;
    audio_url: string;
    image_url: string;
    lyrics: string;
    video_url?: string;
}

export default function MusicManagementPage() {
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState<'deities' | 'songs'>('deities');
    const [deities, setDeities] = useState<Deity[]>([]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Modals
    const [isDeityModalOpen, setIsDeityModalOpen] = useState(false);
    const [isSongModalOpen, setIsSongModalOpen] = useState(false);

    // Form states
    const [deityForm, setDeityForm] = useState({ name: '', imageFile: null as File | null });
    const [songForm, setSongForm] = useState({
        title: '',
        artist: '',
        category: 'Bhajan',
        god_id: '',
        audioFile: null as File | null,
        imageFile: null as File | null,
        lyrics: '',
        video_url: ''
    });

    const [filterGod, setFilterGod] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // New Drill-down states
    const [drillDownGodId, setDrillDownGodId] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Aarti');

    const selectedGod = deities.find(d => d.id === drillDownGodId);


    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        try {
            const { data: godData } = await supabase.from('music_gods').select('*').order('name');
            const { data: songData } = await supabase.from('music_songs').select('*').order('created_at', { ascending: false });

            if (godData) setDeities(godData);
            if (songData) setSongs(songData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFileUpload = async (file: File, bucketName: string, path: string) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        console.log(`Uploading to bucket: ${bucketName}, path: ${filePath}`);

        const { error: uploadError, data: uploadData } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Storage Upload Error Detail:', uploadError);
            throw uploadError;
        }

        const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        console.log('Public URL generated:', data.publicUrl);
        return data.publicUrl;
    };

    const handleAddDeity = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deityForm.name || !deityForm.imageFile) return;

        setIsSaving(true);
        try {
            const imageUrl = await handleFileUpload(deityForm.imageFile, 'music_assets', 'god_images');

            const { error } = await supabase.from('music_gods').insert({
                name: deityForm.name,
                image_url: imageUrl
            });

            if (error) throw error;

            setDeityForm({ name: '', imageFile: null });
            setIsDeityModalOpen(false);
            fetchData();
        } catch (error: any) {
            console.error('Error adding deity:', error);
            const msg = error?.message || 'Unknown error';
            alert(`Failed to add deity: ${msg}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddSong = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!songForm.title || !songForm.god_id || !songForm.audioFile) return;

        setIsSaving(true);
        try {
            let audioUrl = await handleFileUpload(songForm.audioFile, 'music_assets', 'audio_files');
            let imageUrl = '';

            if (songForm.imageFile) {
                imageUrl = await handleFileUpload(songForm.imageFile, 'music_assets', 'song_covers');
            }

            const { error } = await supabase.from('music_songs').insert({
                title: songForm.title,
                artist: songForm.artist,
                category: songForm.category,
                god_id: songForm.god_id,
                audio_url: audioUrl,
                image_url: imageUrl,
                lyrics: songForm.lyrics,
                video_url: songForm.video_url
            });

            if (error) throw error;

            setSongForm({
                title: '',
                artist: '',
                category: 'Bhajan',
                god_id: '',
                audioFile: null,
                imageFile: null,
                lyrics: '',
                video_url: ''
            });
            setIsSongModalOpen(false);
            fetchData();
        } catch (error: any) {
            console.error('Full Error Object:', error);
            const errorMessage = error?.message || error?.error_description || 'Unknown error occurred';
            const details = error?.details || error?.hint || '';
            console.error('Error adding song:', errorMessage, details);
            alert(`Failed to add song: ${errorMessage}. ${details}`);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteDeity = async (id: string) => {
        if (!confirm('Are you sure you want to delete this deity? This will also delete all associated songs.')) return;

        const { error } = await supabase.from('music_gods').delete().eq('id', id);
        if (error) {
            console.error('Error deleting deity:', error);
            alert('Failed to delete deity');
        } else {
            setDeities(deities.filter(d => d.id !== id));
            setSongs(songs.filter(s => s.god_id !== id));
        }
    };

    const handleDeleteSong = async (id: string) => {
        if (!confirm('Are you sure you want to delete this song?')) return;

        const { error } = await supabase.from('music_songs').delete().eq('id', id);
        if (error) {
            console.error('Error deleting song:', error);
            alert('Failed to delete song');
        } else {
            setSongs(songs.filter(s => s.id !== id));
        }
    };

    const filteredSongs = songs.filter(song => {
        // If in drill-down mode, filter by specific god and active category
        if (drillDownGodId) {
            return song.god_id === drillDownGodId && song.category === activeCategory;
        }

        // Standard tab view filtering
        const matchesGod = filterGod === 'all' || song.god_id === filterGod;
        const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesGod && matchesSearch;
    });

    const openSongModal = (prefillGodId?: string, prefillCategory?: string) => {
        setSongForm(prev => ({
            ...prev,
            god_id: prefillGodId || drillDownGodId || '',
            category: prefillCategory || activeCategory || 'Bhajan',
            video_url: ''
        }));
        setIsSongModalOpen(true);
    };


    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Music Management
                        </h1>
                        <p className="text-gray-400 mt-1">Manage your spiritual audio library assets.</p>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 self-start">
                        <button
                            onClick={() => setActiveTab('deities')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${activeTab === 'deities' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            Deities
                        </button>
                        <button
                            onClick={() => setActiveTab('songs')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${activeTab === 'songs' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-white/5 text-gray-400'
                                }`}
                        >
                            <Music className="w-4 h-4" />
                            Songs
                        </button>
                    </div>
                </header>

                {activeTab === 'deities' ? (
                    <section>
                        {drillDownGodId ? (
                            // DEITY DETAIL VIEW (DRILL-DOWN)
                            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                                <button
                                    onClick={() => setDrillDownGodId(null)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                                >
                                    <X className="w-4 h-4" /> Back to All Deities
                                </button>

                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-10 border-b border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 overflow-hidden shrink-0">
                                            <img src={selectedGod?.image_url} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-bold">{selectedGod?.name}</h2>
                                            <p className="text-gray-400 mt-1">Manage assets for this deity</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => openSongModal(drillDownGodId, activeCategory)}
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all font-bold shadow-lg shadow-blue-500/20"
                                    >
                                        <Plus className="w-5 h-5" /> Add {activeCategory}
                                    </button>
                                </div>

                                {/* Category Selector */}
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {['Aarti', 'Chalisa', 'Bhajan', 'Mantra', 'Other'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveCategory(cat)}
                                            className={`px-6 py-2 rounded-xl border transition-all ${activeCategory === cat
                                                ? 'bg-blue-500/10 border-blue-500 text-blue-400 font-bold'
                                                : 'border-white/10 text-gray-400 hover:bg-white/5'
                                                }`}
                                        >
                                            {cat}s ({songs.filter(s => s.god_id === drillDownGodId && s.category === cat).length})
                                        </button>
                                    ))}
                                </div>

                                {/* Songs Table for selected deity/category */}
                                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/5 text-gray-400 text-sm">
                                                <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider">Song Information</th>
                                                <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider">Artist</th>
                                                <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredSongs.map(song => (
                                                <tr key={song.id} className="hover:bg-white/5 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center text-blue-400 border border-white/10">
                                                                {song.image_url ? <img src={song.image_url} alt="" className="w-full h-full object-cover" /> : <Music2 className="w-6 h-6" />}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-white">{song.title}</p>
                                                                <div className="flex items-center gap-3 mt-0.5">
                                                                    <a href={song.audio_url} target="_blank" className="text-[10px] uppercase font-bold text-blue-400 hover:text-blue-300">Play Audio</a>
                                                                    {song.video_url && <a href={song.video_url} target="_blank" className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300">Watch Video</a>}
                                                                    {song.lyrics && <span className="text-[10px] uppercase font-bold text-gray-500">Includes Lyrics</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-400 font-medium">{song.artist || 'Traditional'}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleDeleteSong(song.id); }}
                                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredSongs.length === 0 && (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-20 text-center">
                                                        <div className="flex flex-col items-center gap-3 opacity-50">
                                                            <Music2 className="w-12 h-12" />
                                                            <p>No {activeCategory}s added for {selectedGod?.name} yet.</p>
                                                            <button
                                                                onClick={() => openSongModal(drillDownGodId, activeCategory)}
                                                                className="text-blue-400 hover:underline text-sm font-bold"
                                                            >
                                                                Upload first asset
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            // DEITY GRID VIEW
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-semibold">Deity Library ({deities.length})</h2>
                                    <div className="flex items-center gap-4">
                                        <p className="text-xs text-blue-400/60 font-medium">Double-click deity to manage assets</p>
                                        <button
                                            onClick={() => setIsDeityModalOpen(true)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors font-medium"
                                        >
                                            <Plus className="w-4 h-4" /> Add New God
                                        </button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="flex items-center justify-center p-20">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                        {deities.map(god => (
                                            <div
                                                key={god.id}
                                                onDoubleClick={() => setDrillDownGodId(god.id)}
                                                className="group relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500 transition-all cursor-pointer hover:scale-[1.02]"
                                            >
                                                <img src={god.image_url} alt={god.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-5">
                                                    <p className="font-bold text-center text-lg">{god.name}</p>
                                                    <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                                                            {songs.filter(s => s.god_id === god.id).length} Tracks
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteDeity(god.id); }}
                                                    className="absolute top-3 right-3 p-2 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {deities.length === 0 && (
                                            <div className="col-span-full text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-dashed border-white/20">
                                                No deities added yet.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                ) : (

                    <section>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h2 className="text-xl font-semibold">Song Library ({songs.length})</h2>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search songs..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 w-full sm:w-64"
                                    />
                                </div>
                                <select
                                    value={filterGod}
                                    onChange={(e) => setFilterGod(e.target.value)}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                >
                                    <option value="all">All Deities</option>
                                    {deities.map(god => (
                                        <option key={god.id} value={god.id}>{god.name}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => openSongModal()}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors font-medium ml-auto"
                                >
                                    <Plus className="w-4 h-4" /> Add New Song
                                </button>
                            </div>
                        </div>

                        {filterGod !== 'all' && (
                            <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-wrap gap-6 items-center">
                                <p className="text-sm font-medium text-blue-400">
                                    Summary for {deities.find(d => d.id === filterGod)?.name}:
                                </p>
                                <div className="flex gap-4">
                                    {['Aarti', 'Chalisa', 'Bhajan', 'Mantra'].map(cat => {
                                        const count = songs.filter(s => s.god_id === filterGod && s.category === cat).length;
                                        return (
                                            <div key={cat} className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                                                <span className="text-xs text-gray-400">{cat}:</span>
                                                <span className="text-xs font-bold text-white">{count}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {isLoading ? (
                            <div className="flex items-center justify-center p-20">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                            </div>
                        ) : (
                            <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 text-gray-400 text-sm">
                                            <th className="px-6 py-4 font-medium">Song Info</th>
                                            <th className="px-6 py-4 font-medium">Category</th>
                                            <th className="px-6 py-4 font-medium">Deity</th>
                                            <th className="px-6 py-4 font-medium">Artist</th>
                                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredSongs.map(song => (
                                            <tr key={song.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center text-blue-400">
                                                            {song.image_url ? <img src={song.image_url} alt="" className="w-full h-full object-cover" /> : <Music2 className="w-5 h-5" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-white">{song.title}</p>
                                                            <div className="flex gap-2">
                                                                <a href={song.audio_url} target="_blank" className="text-xs text-blue-400 hover:underline">Listen to Audio</a>
                                                                {song.video_url && <a href={song.video_url} target="_blank" className="text-xs text-red-500 hover:underline">Watch Video</a>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/10">
                                                        {song.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-300">
                                                    {deities.find(d => d.id === song.god_id)?.name || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 text-gray-400">
                                                    {song.artist || '--'}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleDeleteSong(song.id)}
                                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {filteredSongs.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                                    {searchQuery || filterGod !== 'all' ? 'No songs match your filters.' : 'No songs added yet.'}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}
            </div>

            {/* Deity Modal */}
            {isDeityModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#121212] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h3 className="text-xl font-bold">Add New Deity</h3>
                            <button onClick={() => setIsDeityModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleAddDeity} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">God Name</label>
                                <input
                                    type="text"
                                    required
                                    value={deityForm.name}
                                    onChange={(e) => setDeityForm({ ...deityForm, name: e.target.value })}
                                    placeholder="e.g. Lord Hanuman"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Profile Image</label>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/50 transition-colors relative">
                                    <input
                                        type="file"
                                        required
                                        accept="image/*"
                                        onChange={(e) => setDeityForm({ ...deityForm, imageFile: e.target.files?.[0] || null })}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    {deityForm.imageFile ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                <Check className="w-6 h-6" />
                                            </div>
                                            <p className="text-sm font-medium">{deityForm.imageFile.name}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="w-8 h-8 text-gray-500 mb-1" />
                                            <p className="text-sm font-medium">Click to upload image</p>
                                            <p className="text-xs text-gray-500">Circular profile, PNG or JPG preferred</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                disabled={isSaving}
                                className="w-full py-3 bg-blue-500 hover:bg-blue-600 font-bold rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Create Deity</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Song Modal */}
            {isSongModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-[#121212] border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h3 className="text-xl font-bold">Add New Music Content</h3>
                            <button onClick={() => setIsSongModalOpen(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleAddSong} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Metadata</h4>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Song/Mantra Title</label>
                                    <input
                                        type="text" required
                                        value={songForm.title}
                                        onChange={(e) => setSongForm({ ...songForm, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Deity</label>
                                        <select
                                            required
                                            value={songForm.god_id}
                                            onChange={(e) => setSongForm({ ...songForm, god_id: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="">Select God</option>
                                            {deities.map(god => <option key={god.id} value={god.id}>{god.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Category</label>
                                        <select
                                            value={songForm.category}
                                            onChange={(e) => setSongForm({ ...songForm, category: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="Aarti">Aarti</option>
                                            <option value="Chalisa">Chalisa</option>
                                            <option value="Bhajan">Bhajan</option>
                                            <option value="Mantra">Mantra</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Artist/Singer</label>
                                    <input
                                        type="text"
                                        value={songForm.artist}
                                        onChange={(e) => setSongForm({ ...songForm, artist: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Lyrics (Text)</label>
                                    <textarea
                                        rows={4}
                                        value={songForm.lyrics}
                                        onChange={(e) => setSongForm({ ...songForm, lyrics: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 resize-none h-[120px]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Video URL (YouTube)</label>
                                    <input
                                        type="url"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        value={songForm.video_url}
                                        onChange={(e) => setSongForm({ ...songForm, video_url: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Media Assets</h4>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Audio File (.mp3/.m4a)</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors relative">
                                        <input type="file" required accept="audio/*" onChange={(e) => setSongForm({ ...songForm, audioFile: e.target.files?.[0] || null })} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        {songForm.audioFile ? (
                                            <div className="flex items-center justify-center gap-2 text-blue-400">
                                                <Check className="w-5 h-5" />
                                                <span className="text-sm truncate max-w-[200px]">{songForm.audioFile.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1">
                                                <Music2 className="w-6 h-6 text-gray-500" />
                                                <p className="text-xs font-medium">Click to upload Audio</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase">Song Cover (Square)</label>
                                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-blue-500/50 transition-colors relative">
                                        <input type="file" accept="image/*" onChange={(e) => setSongForm({ ...songForm, imageFile: e.target.files?.[0] || null })} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        {songForm.imageFile ? (
                                            <div className="flex items-center justify-center gap-2 text-blue-400">
                                                <Check className="w-5 h-5" />
                                                <span className="text-sm truncate max-w-[200px]">{songForm.imageFile.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1">
                                                <Upload className="w-6 h-6 text-gray-500" />
                                                <p className="text-xs font-medium">Click to upload Cover</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 pt-4">
                                    <button
                                        disabled={isSaving}
                                        className="w-full py-4 bg-blue-500 hover:bg-blue-600 font-bold rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Upload & Save Song</>}
                                    </button>
                                    <p className="text-[10px] text-center text-gray-500 mt-4">
                                        Uploading assets can take a few seconds depending on file size.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
