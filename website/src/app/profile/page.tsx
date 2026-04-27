"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, User as UserIcon, Calendar, Settings, MapPin, Edit3, Loader2, Star, Upload, Check, ChevronLeft } from 'lucide-react';
import { TranslationDropdown } from '@/components/ui/TranslationDropdown';
import { ThemeToggle } from '@/components/ThemeToggle';
import { supabase } from '@/lib/supabaseClient';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'address' | 'preferences'>('overview');
    const [showMobileView, setShowMobileView] = useState(false); // New state for mobile drill-down
    const [profileData, setProfileData] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Reviews
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewBooking, setReviewBooking] = useState<any>(null);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    // Address
    const [addressForm, setAddressForm] = useState({ houseNo: '', street: '', city: '', state: '', pincode: '' });
    const [addressError, setAddressError] = useState('');
    const [isSearchingAddress, setIsSearchingAddress] = useState(false);
    const [isSavingAddress, setIsSavingAddress] = useState(false);
    const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isStreetFocused, setIsStreetFocused] = useState(false);

    // Profile Edits
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    
    const [isEditingName, setIsEditingName] = useState(false);
    const [editName, setEditName] = useState("");
    const [isSavingName, setIsSavingName] = useState(false);

    // Phone Module
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
    const [phoneState, setPhoneState] = useState<'ENTER_PHONE' | 'ENTER_OTP'>('ENTER_PHONE');
    const [newPhone, setNewPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isPhoneActionLoading, setIsPhoneActionLoading] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        } else if (user) {
            fetchData();
            setEditName(user.user_metadata?.full_name || "");
        }
    }, [user, authLoading, router]);

    // Handle Tab Sync from URL
    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['overview', 'bookings', 'address', 'preferences'].includes(tab)) {
            setActiveTab(tab as any);
            setShowMobileView(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [searchParams]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/user-profile?userId=${user?.id}`);
            if (res.ok) {
                const data = await res.json();
                setProfileData(data.profile);
                setBookings(data.bookings || []);
                if (data.profile?.address) {
                    setAddressForm({
                        houseNo: data.profile.address.houseNo || '',
                        street: data.profile.address.street || data.profile.address.line1 || '',
                        city: data.profile.address.city || '',
                        state: data.profile.address.state || '',
                        pincode: data.profile.address.pincode || ''
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
        setLoading(false);
    };

    // Address Suggestion Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (addressForm.street.length > 2 && activeTab === 'address' && isStreetFocused) {
                setIsSearchingAddress(true);
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${addressForm.street}&format=json&addressdetails=1&countrycodes=in&limit=5`);
                    const data = await res.json();
                    setAddressSuggestions(data || []);
                    setShowSuggestions(true);
                } catch (err) {
                    console.error("Suggestion fetch error", err);
                }
                setIsSearchingAddress(false);
            } else {
                setAddressSuggestions([]);
                setShowSuggestions(false);
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [addressForm.street, activeTab]);

    // Pincode Autocomplete
    const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length > 6) return;
        setAddressForm(prev => ({ ...prev, pincode: val }));
        
        if (val.length === 6) {
            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${val}`);
                const data = await res.json();
                if (data && data[0] && data[0].Status === "Success") {
                    const postOffice = data[0].PostOffice[0];
                    setAddressForm(prev => ({ ...prev, city: postOffice.District, state: postOffice.State }));
                }
            } catch (err) {
                // Ignore API failure silently
            }
        }
    };

    const handleSelectSuggestion = (sug: any) => {
        setAddressForm(prev => ({
            ...prev,
            street: sug.name || sug.display_name.split(',')[0],
            city: sug.address.city || sug.address.district || sug.address.state_district || prev.city,
            state: sug.address.state || prev.state
        }));
        setShowSuggestions(false);
    };

    const handleSaveAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddressError('');
        
        // Basic Address Authentication/Validation
        if (addressForm.pincode.length !== 6) return setAddressError('Please enter a valid 6-digit PIN code.');
        if (addressForm.street.trim().length < 4) return setAddressError('Street address must be more descriptive.');
        if (!addressForm.houseNo.trim()) return setAddressError('House/Flat number is required.');
        if (!addressForm.city.trim() || !addressForm.state.trim()) return setAddressError('City and State are required.');

        setIsSavingAddress(true);
        try {
            const res = await fetch('/api/user-profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, address: addressForm })
            });
            if (res.ok) alert('Address saved and authenticated successfully!');
            else setAddressError('Failed to save address to server.');
        } catch (e) {
            setAddressError('Network error while saving address.');
        }
        setIsSavingAddress(false);
    };

    const handleSubmitReview = async () => {
        if (!reviewText.trim()) return alert("Please enter review text");
        setIsSubmittingReview(true);
        try {
            const res = await fetch('/api/user-profile/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: reviewBooking.id,
                    userId: user?.id,
                    rating,
                    review_text: reviewText
                })
            });
            if (res.ok) {
                alert("Review submitted successfully!");
                setIsReviewOpen(false);
                fetchData();
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to submit review');
            }
        } catch (error) {
            alert('Network error');
        }
        setIsSubmittingReview(false);
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        setIsUploadingAvatar(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', user?.id || '');
        
        try {
            const res = await fetch('/api/user-profile/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.publicUrl) {
                await fetch('/api/user-profile', {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user?.id, avatar_url: data.publicUrl })
                });
                // Force Auth Session refresh to get new metadata
                const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
                if (refreshError) {
                    console.error("Session refresh error", refreshError);
                    window.location.reload(); // Fallback
                }
            } else {
                alert('Upload failed');
            }
        } catch { alert('Network error'); }
        setIsUploadingAvatar(false);
    };

    const handleSaveName = async () => {
        if (!editName.trim() || editName === user?.user_metadata?.full_name) {
            setIsEditingName(false);
            return;
        }
        setIsSavingName(true);
        try {
            await fetch('/api/user-profile', {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, full_name: editName })
            });
            // Force Auth Session refresh to get new metadata
            const { error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
                console.error("Session refresh error", refreshError);
                window.location.reload(); // Fallback
            }
            setIsEditingName(false);
        } catch {
            alert('Failed to save name');
        }
        setIsSavingName(false);
    };

    const handleSendPhoneOtp = async () => {
        if (newPhone.length < 10) return setPhoneError('Enter valid 10-digit number');
        setPhoneError('');
        setIsPhoneActionLoading(true);
        try {
            const res = await fetch('/api/auth/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: newPhone, purpose: 'UPDATE_PHONE' })
            });
            const data = await res.json();
            if (res.ok) {
                // Browser-side dispatch to BhashSMS (to bypass server network limits)
                if (data.otp && data.bhashConfig) {
                    const { user, pass, sender, template } = data.bhashConfig;
                    const bhashUrl = `http://bhashsms.com/api/sendmsg.php?user=${user}&pass=${pass}&sender=${sender}&phone=${data.phone}&text=${template}&priority=wa&stype=normal&Params=${data.otp},OTP`;
                    
                    // Call the API (using no-cors as these legacy APIs rarely have CORS headers)
                    fetch(bhashUrl, { mode: 'no-cors' }).catch(e => console.error("BhashSMS Browser Error:", e));
                }
                setPhoneState('ENTER_OTP');
            } else {
                setPhoneError(data.error || 'Failed to send OTP');
            }
        } catch { setPhoneError('Network error'); }
        setIsPhoneActionLoading(false);
    };

    const handleVerifyPhoneOtp = async () => {
        if (otp.length < 5) return setPhoneError('Enter valid OTP');
        setPhoneError('');
        setIsPhoneActionLoading(true);
        try {
            const res = await fetch('/api/user-profile/update-phone', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user?.id, newPhone, otp })
            });
            const data = await res.json();
            if (res.ok) {
                // Refresh session to get updated phone identity
                await supabase.auth.refreshSession();
                alert('Phone number updated successfully!');
                window.location.reload();
            } else {
                setPhoneError(data.error || 'Invalid OTP');
            }
        } catch { setPhoneError('Network error'); }
        setIsPhoneActionLoading(false);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const getInitial = () => {
        return (user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || user.phone?.slice(-10)?.charAt(0) || 'U').toUpperCase();
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20 selection:bg-orange-100 dark:selection:bg-orange-500/30">
            {/* Premium Banner Section */}
            <div className="relative h-64 md:h-80 overflow-hidden bg-[#0a0a0a]">
                {/* Dynamic Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-purple-900 opacity-90"></div>
                
                {/* Animated Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] rounded-full bg-orange-400/20 blur-[120px]"
                    />
                    <motion.div 
                        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] rounded-full bg-red-500/20 blur-[120px]"
                    />
                </div>

                {/* Mesh Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32 md:-mt-40">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {/* Glassmorphic User Card */}
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-white/20 dark:border-zinc-800/50 relative overflow-hidden group">
                        {/* Inner subtle glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                            {/* Premium Avatar Selection */}
                            <div className="relative group/avatar">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-orange-500 via-red-500 to-purple-600 shadow-2xl relative"
                                >
                                    <div className="w-full h-full rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden relative">
                                        {isUploadingAvatar && (
                                            <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-sm">
                                                <Loader2 className="w-10 h-10 text-white animate-spin" />
                                            </div>
                                        )}
                                        {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110" />
                                        ) : (
                                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600">{getInitial()}</span>
                                        )}

                                        {/* Premium Upload Overlay */}
                                        <label className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer z-10 backdrop-blur-[4px] group/upload">
                                            <motion.div 
                                                whileHover={{ scale: 1.1 }}
                                                className="p-3 bg-white/20 rounded-full mb-2 ring-1 ring-white/30 shadow-2xl transition-transform"
                                            >
                                                <Upload className="text-white w-6 h-6" />
                                            </motion.div>
                                            <span className="text-[10px] text-white font-black uppercase tracking-[0.2em] drop-shadow-md">Change Photo</span>
                                            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                                        </label>
                                    </div>
                                </motion.div>
                                
                                {/* Status Ring */}
                                <div className="absolute bottom-4 right-4 w-7 h-7 bg-green-500 border-4 border-white dark:border-zinc-900 rounded-full shadow-lg"></div>
                            </div>
                            
                            <div className="flex-1 text-center md:text-left pt-2">
                                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-4 mb-6">
                                    {isEditingName ? (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 w-full max-w-md">
                                            <input 
                                                type="text" 
                                                value={editName}
                                                onChange={e => setEditName(e.target.value)}
                                                className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white bg-zinc-100/50 dark:bg-zinc-800/50 px-6 py-2 rounded-2xl outline-none border-2 border-orange-500/50 focus:border-orange-500 w-full transition-all"
                                                autoFocus
                                            />
                                            <button onClick={handleSaveName} disabled={isSavingName} className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                                                {isSavingName ? <Loader2 className="w-6 h-6 animate-spin" /> : <Check className="w-6 h-6" />}
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <div className="group/name flex flex-col md:flex-row items-center gap-4">
                                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white capitalize tracking-tight font-serif">
                                                {user.user_metadata?.full_name || 'Vedic Seeker'}
                                            </h1>
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => setIsEditingName(true)} 
                                                    className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-zinc-500 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all active:scale-95 opacity-0 group-hover/name:opacity-100 md:opacity-100"
                                                >
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                                <span className="px-4 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] border border-orange-500/20">Verified Path</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    {user.email && (
                                        <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 px-5 py-3 rounded-2xl text-sm font-bold border border-zinc-100 dark:border-zinc-700/50 shadow-sm hover:shadow-md transition-all group/info">
                                            <div className="p-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-500 group-hover/info:scale-110 transition-transform">
                                                <Mail size={16} />
                                            </div>
                                            <span className="text-zinc-600 dark:text-zinc-300">{user.email}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 px-5 py-3 rounded-2xl text-sm font-bold border border-zinc-100 dark:border-zinc-700/50 shadow-sm hover:shadow-md transition-all group/info">
                                        <div className="p-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-500 group-hover/info:scale-110 transition-transform">
                                            <Phone size={16} />
                                        </div>
                                        <span className="text-zinc-600 dark:text-zinc-300 font-mono tracking-wider">
                                            {loading ? '...' : (profileData?.phone || user.phone || 'Unlinked')}
                                        </span>
                                        <button 
                                            onClick={() => setIsPhoneModalOpen(true)} 
                                            className="ml-2 pl-3 border-l border-zinc-200 dark:border-zinc-700 text-[10px] text-orange-500 font-black uppercase tracking-widest hover:text-orange-600 transition-colors"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="mt-8 flex flex-col md:flex-row gap-8">
                        
                        {/* Sidebar Navigation - Hidden on mobile if viewing content */}
                        <div className={`w-full md:w-64 shrink-0 space-y-3 ${showMobileView ? 'hidden md:block' : 'block'}`}>
                            <button onClick={() => { setActiveTab('overview'); setShowMobileView(true); }} className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] font-bold transition-all shadow-sm ${activeTab === 'overview' ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/25 scale-[1.02]' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <UserIcon size={20} /> <span className="flex-1 text-left">Profile Overview</span>
                            </button>
                            <button onClick={() => { setActiveTab('bookings'); setShowMobileView(true); }} className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] font-bold transition-all shadow-sm ${activeTab === 'bookings' ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/25 scale-[1.02]' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <div className="flex items-center gap-4"><Calendar size={20} /> <span className="flex-1 text-left">My Bookings</span></div>
                                {bookings.length > 0 && <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>{bookings.length}</span>}
                            </button>
                            <button onClick={() => { setActiveTab('address'); setShowMobileView(true); }} className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] font-bold transition-all shadow-sm ${activeTab === 'address' ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/25 scale-[1.02]' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <MapPin size={20} /> <span className="flex-1 text-left">Saved Address</span>
                            </button>
                            <button onClick={() => { setActiveTab('preferences'); setShowMobileView(true); }} className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.5rem] font-bold transition-all shadow-sm ${activeTab === 'preferences' ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/25 scale-[1.02]' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                                <Settings size={20} /> <span className="flex-1 text-left">Preferences</span>
                            </button>
                        </div>

                        {/* Main Panel - Hidden on mobile if in menu */}
                        <div className={`flex-1 ${!showMobileView ? 'hidden md:block' : 'block'}`}>
                            {/* Mobile Back Button */}
                            {showMobileView && (
                                <button 
                                    onClick={() => setShowMobileView(false)}
                                    className="md:hidden flex items-center gap-2 text-zinc-500 font-bold mb-4 hover:text-orange-500 transition-colors"
                                >
                                    <ChevronLeft size={20} /> Back to Menu
                                </button>
                            )}

                            <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-zinc-100 dark:border-zinc-800/50 p-6 md:p-10 min-h-[500px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* OVERVIEW TAB */}
                                            {activeTab === 'overview' && (
                                                <div>
                                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 font-serif">Quick Overview</h2>
                                                    {loading ? (
                                                        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-orange-500" /></div>
                                                    ) : (
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/50 flex flex-col items-center justify-center">
                                                                <div className="text-4xl font-black text-orange-500 mb-2">{bookings.length}</div>
                                                                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 text-center">Total Bookings</div>
                                                            </div>
                                                            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/50 flex flex-col items-center justify-center">
                                                                <div className="text-4xl font-black text-emerald-500 mb-2">{bookings.filter(b => b.status === 'completed').length}</div>
                                                                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 text-center">Completed</div>
                                                            </div>
                                                            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/50 flex flex-col items-center justify-center col-span-2 md:col-span-1">
                                                                <div className="text-4xl font-black text-blue-500 mb-2">{bookings.filter(b => !!b.rating).length}</div>
                                                                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 text-center">Reviews Done</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* BOOKINGS TAB */}
                                            {activeTab === 'bookings' && (
                                                <div>
                                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 font-serif">Pooja Bookings</h2>
                                            {loading ? (
                                                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-orange-500" /></div>
                                            ) : bookings.length === 0 ? (
                                                <div className="text-center py-10 opacity-50 grayscale">
                                                    <Calendar className="w-12 h-12 mx-auto mb-3" />
                                                    <p className="font-bold uppercase tracking-wider">No bookings found</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    {bookings.map((booking, idx) => (
                                                        <div key={idx} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-orange-500/50 transition-colors bg-zinc-50 dark:bg-zinc-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                            <div>
                                                                <div className="flex items-center gap-3 mb-1">
                                                                    <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                                                        booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                                                                        booking.scheduled_date ? 'bg-blue-100 text-blue-700' : 
                                                                        'bg-orange-100 text-orange-700'
                                                                    }`}>
                                                                        {booking.status === 'completed' ? 'completed' : booking.scheduled_date ? 'Scheduled' : booking.status}
                                                                    </div>
                                                                    <span className="text-xs text-zinc-500 font-bold">{new Date(booking.created_at).toLocaleDateString()}</span>
                                                                </div>
                                                                <h3 className="font-bold text-zinc-800 dark:text-white text-lg">{booking.puja_name}</h3>
                                                                <p className="text-sm text-zinc-500">Sankalp: {booking.sankalp_name} • {booking.package_name}</p>
                                                                
                                                                {booking.scheduled_date && booking.status !== 'completed' && (
                                                                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-xl w-fit border border-blue-100 dark:border-blue-800/50">
                                                                        <Calendar size={14} className="animate-pulse" />
                                                                        <span>Scheduled for: {new Date(booking.scheduled_date).toLocaleString([], { 
                                                                            weekday: 'short',
                                                                            day: 'numeric',
                                                                            month: 'short',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: true
                                                                        })}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="flex flex-col items-end gap-3 shrink-0">
                                                                <div className="font-black text-lg text-zinc-900 dark:text-white">₹{booking.price}</div>
                                                                {booking.status === 'completed' && !booking.rating && (
                                                                    <button 
                                                                        onClick={() => { setReviewBooking(booking); setIsReviewOpen(true); }}
                                                                        className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl text-xs font-bold hover:scale-105 transition-transform flex items-center gap-1 shadow-md shadow-orange-500/20"
                                                                    >
                                                                        <Star size={14} className="fill-white" /> Drop a Review
                                                                    </button>
                                                                )}
                                                                {booking.rating && (
                                                                    <div className="flex items-center gap-1 text-orange-500">
                                                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < booking.rating ? 'fill-current' : 'opacity-30'} />)}
                                                                        <span className="text-xs font-bold ml-1 text-zinc-500">Reviewed</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                                </div>
                                            )}

                                            {/* ADDRESS TAB */}
                                            {activeTab === 'address' && (
                                                <div>
                                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 font-serif flex items-center gap-2"><MapPin size={24} className="text-orange-500" /> Delivery Address</h2>
                                            <form onSubmit={handleSaveAddress} className="space-y-4 max-w-lg">
                                                {addressError && <div className="p-3 bg-red-50 text-red-600 dark:bg-red-900/20 text-xs font-bold rounded-xl mb-2">{addressError}</div>}
                                                <div>
                                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">PIN Code (Auto-fills City/State)</label>
                                                    <input required type="text" value={addressForm.pincode} onChange={handlePincodeChange} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-orange-500 text-lg tracking-widest font-black" placeholder="110001" maxLength={6} />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="md:col-span-1">
                                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">House/Flat No</label>
                                                        <input required type="text" value={addressForm.houseNo} onChange={e => setAddressForm({...addressForm, houseNo: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-orange-500" placeholder="A-12" />
                                                    </div>
                                                    <div className="md:col-span-2 relative">
                                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Street / Locality</label>
                                                        <div className="relative">
                                                            <input 
                                                                required 
                                                                type="text" 
                                                                value={addressForm.street} 
                                                                onChange={e => setAddressForm({...addressForm, street: e.target.value})} 
                                                                onFocus={() => setIsStreetFocused(true)}
                                                                onBlur={() => setTimeout(() => {
                                                                    setShowSuggestions(false);
                                                                    setIsStreetFocused(false);
                                                                }, 200)}
                                                                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent outline-none focus:border-orange-500 transition-all focus:ring-4 focus:ring-orange-500/10" 
                                                                placeholder="Connaught Place, Block C" 
                                                            />
                                                            {isSearchingAddress && <div className="absolute right-3 top-1/2 -translate-y-1/2"><Loader2 className="w-4 h-4 animate-spin text-orange-500" /></div>}
                                                        </div>

                                                        {/* SUGGESTIONS DROPDOWN */}
                                                        <AnimatePresence>
                                                            {showSuggestions && addressSuggestions.length > 0 && (
                                                                <motion.div 
                                                                    initial={{ opacity: 0, y: -10 }} 
                                                                    animate={{ opacity: 1, y: 0 }} 
                                                                    exit={{ opacity: 0, y: -10 }}
                                                                    className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden"
                                                                >
                                                                    {addressSuggestions.map((sug, i) => (
                                                                        <button 
                                                                            key={i} 
                                                                            type="button"
                                                                            onClick={() => handleSelectSuggestion(sug)}
                                                                            className="w-full px-4 py-3 text-left hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors flex items-start gap-3 border-b border-zinc-50 dark:border-zinc-800/50 last:border-0"
                                                                        >
                                                                            <MapPin className="w-4 h-4 text-orange-500 mt-1 shrink-0" />
                                                                            <div>
                                                                                <div className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{sug.display_name.split(',')[0]}</div>
                                                                                <div className="text-[10px] text-zinc-500 line-clamp-1">{sug.display_name}</div>
                                                                            </div>
                                                                        </button>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">City / District</label>
                                                        <input required type="text" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:border-orange-500" placeholder="New Delhi" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">State</label>
                                                        <input required type="text" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:border-orange-500" placeholder="Delhi" />
                                                    </div>
                                                </div>
                                                <button disabled={isSavingAddress} className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 mt-4">
                                                    {isSavingAddress ? 'Saving...' : 'Save Address'}
                                                </button>
                                            </form>
                                                </div>
                                            )}

                                            {/* PREFERENCES TAB */}
                                            {activeTab === 'preferences' && (
                                                <div>
                                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-8 font-serif flex items-center gap-2"><Settings size={24} className="text-orange-500" /> App Preferences</h2>
                                            <div className="space-y-6 max-w-sm">
                                                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                                                    <div>
                                                        <div className="font-bold">Dark Mode</div>
                                                        <div className="text-xs text-zinc-500">Toggle site theme</div>
                                                    </div>
                                                    <ThemeToggle />
                                                </div>
                                                <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
                                                    <div>
                                                        <div className="font-bold">Language</div>
                                                        <div className="text-xs text-zinc-500">Change content language</div>
                                                    </div>
                                                    <TranslationDropdown />
                                                </div>
                                            </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* OTP PHONE MODAL */}
            <AnimatePresence>
                {isPhoneModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-zinc-900 w-full max-w-sm p-8 rounded-3xl shadow-2xl relative text-center">
                            <h3 className="text-2xl font-black font-serif mb-2">Change Number</h3>
                            <p className="text-sm text-zinc-500 mb-6">A new OTP will be sent to confirm your identity.</p>
                            
                            {phoneError && <div className="p-3 bg-red-50 text-red-600 dark:bg-red-900/20 text-xs font-bold rounded-xl mb-4">{phoneError}</div>}

                            {phoneState === 'ENTER_PHONE' ? (
                                <div className="space-y-4">
                                    <div className="flex items-center bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden focus-within:border-orange-500 transition-colors">
                                        <div className="pl-4 pr-2 font-bold text-zinc-500 border-r border-zinc-200 dark:border-zinc-700">+91</div>
                                        <input 
                                            type="tel" 
                                            value={newPhone} 
                                            onChange={e => setNewPhone(e.target.value.replace(/\\D/g, '').slice(0, 10))} 
                                            placeholder="10 digit mobile number"
                                            className="w-full py-4 px-4 bg-transparent outline-none font-black tracking-widest"
                                        />
                                    </div>
                                    <button onClick={handleSendPhoneOtp} disabled={isPhoneActionLoading || newPhone.length < 10} className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl disabled:opacity-50 hover:bg-orange-600 transition-all flex justify-center items-center gap-2">
                                        {isPhoneActionLoading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Send OTP via WhatsApp'}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        value={otp} 
                                        onChange={e => setOtp(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                                        placeholder="000000"
                                        className="w-full py-4 px-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 outline-none focus:border-orange-500 text-center text-3xl tracking-[0.5em] font-black"
                                    />
                                    <button onClick={handleVerifyPhoneOtp} disabled={isPhoneActionLoading || otp.length < 5} className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl disabled:opacity-50 hover:bg-orange-600 transition-all flex justify-center items-center gap-2">
                                        {isPhoneActionLoading ? <Loader2 className="animate-spin w-5 h-5"/> : 'Verify & Update'}
                                    </button>
                                </div>
                            )}

                            <button onClick={() => { setIsPhoneModalOpen(false); setPhoneState('ENTER_PHONE'); setNewPhone(''); setOtp(''); setPhoneError(''); }} className="mt-4 text-xs font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-white uppercase tracking-wider">Cancel</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* REVIEW MODAL */}
            <AnimatePresence>
                {isReviewOpen && reviewBooking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-3xl shadow-2xl relative">
                            <h3 className="text-2xl font-black font-serif text-center mb-1">Share Your Experience</h3>
                            <p className="text-center text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">For {reviewBooking.puja_name}</p>
                            
                            <div className="flex justify-center gap-2 mb-6">
                                {[1,2,3,4,5].map(r => (
                                    <Star 
                                        key={r} 
                                        size={36} 
                                        onClick={() => setRating(r)} 
                                        className={`cursor-pointer transition-transform hover:scale-110 ${r <= rating ? 'fill-orange-500 text-orange-500' : 'text-zinc-300 dark:text-zinc-700'}`} 
                                    />
                                ))}
                            </div>

                            <textarea 
                                value={reviewText}
                                onChange={e => setReviewText(e.target.value)}
                                placeholder="How was the Vedic ritual experience?"
                                className="w-full h-32 px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 outline-none focus:border-orange-500 resize-none font-medium mb-6"
                            />

                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setIsReviewOpen(false)} className="px-6 py-3 rounded-xl font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                                <button onClick={handleSubmitReview} disabled={isSubmittingReview} className="px-6 py-3 rounded-xl bg-orange-500 text-white font-black hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50">
                                    {isSubmittingReview ? <Loader2 className="animate-spin w-4 h-4"/> : 'Submit Review'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
