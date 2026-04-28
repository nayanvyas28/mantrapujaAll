'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Bell, 
  Home, 
  Globe, 
  MousePointer2, 
  Music, 
  Flame, 
  Settings, 
  MessageCircle, 
  Users, 
  Moon, 
  Film,
  Scroll,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Database,
  MapPin,
  Mail,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const websiteGroups = [
  {
    category: 'Platform Control',
    items: [
      { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
      { name: 'Ritual Bookings', icon: Scroll, href: '/dashboard/bookings' },
      { name: 'Contact Inquiries', icon: MessageCircle, href: '/dashboard/inquiries' },
      { name: 'Newsletter Subs', icon: Mail, href: '/dashboard/newsletter' },
      { name: 'Festival Booking', icon: Calendar, href: '/dashboard/festival-bookings' },
    ]
  },
  {
    category: 'Sacred Content',
    items: [
      { name: 'Puja Catalog', icon: Flame, href: '/dashboard/pujas' },
      { name: 'Divine Festivals', icon: Calendar, href: '/dashboard/festivals' },
      { name: 'Sacred Locations', icon: MapPin, href: '/dashboard/locations' },
      { name: 'Blog Categories', icon: Database, href: '/dashboard/categories' },
      { name: 'Blog Writers', icon: Users, href: '/dashboard/writers' },
    ]
  },
  {
    category: 'Website & UI',
    items: [
      { name: 'Homepage Layout', icon: Globe, href: '/dashboard/website-home' },
    ]
  },
  {
    category: 'Devotee Engagement',
    items: [
      { name: 'WhatsApp Connect', icon: MessageCircle, href: '/dashboard/settings/whatsapp' },
      { name: 'Kundali Hub', icon: Moon, href: '/dashboard/kundli' },
      { name: 'Guru Ji AI', icon: Settings, href: '/dashboard/settings' },
    ]
  }
];

const mobileAppItems = [
  { name: 'App Home', icon: Home, href: '/dashboard/home-settings' },
  { name: 'Divine Reels', icon: Film, href: '/dashboard/reels' },
  { name: 'Divine Alerts', icon: Bell, href: '/dashboard/notifications' },
  { name: 'Spiritual Music', icon: Music, href: '/dashboard/music' },
  { name: 'Marketing Popups', icon: MousePointer2, href: '/dashboard/popups' },
  { name: 'Referral Program', icon: Users, href: '/dashboard/referral' },
  { name: 'Storage Optimization', icon: Database, href: '/dashboard/settings/storage' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-500/20"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed top-0 left-0 h-full bg-[#0d0d0d] border-r border-white/5 z-40 w-64 transition-all duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full p-5">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-6 px-2 text-decoration-none">
            <Link href="/dashboard" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-orange-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-lg font-bold text-white">M</span>
                </div>
                <div>
                <h1 className="text-base font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Mantra Puja
                </h1>
                <p className="text-[9px] font-bold text-purple-500 uppercase tracking-widest leading-none">Admin Control</p>
                </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2 pt-2 pb-10">
            
            {/* Website Section - PRIMARY */}
            <div className="space-y-6">
              <h3 className="px-3 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                Website Core
              </h3>
              
              <div className="space-y-6">
                {websiteGroups.map((group) => (
                  <div key={group.category} className="space-y-1.5">
                    <span className="px-3 text-[8px] font-bold text-gray-600 uppercase tracking-[0.15em] block mb-2">{group.category}</span>
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link 
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all group ${
                              isActive 
                                ? 'bg-gradient-to-r from-orange-600/10 to-transparent border border-orange-500/20 text-orange-400 shadow-[inset_0_0_12px_rgba(249,115,22,0.05)]' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon size={15} className={isActive ? 'text-orange-400' : 'text-gray-500 group-hover:text-white transition-colors'} />
                              <span className="text-[11px] font-semibold tracking-wide">{item.name}</span>
                            </div>
                            {isActive && (
                              <motion.div 
                                layoutId="activeDot" 
                                className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" 
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile App Section - SECONDARY */}
            <div className="space-y-2 pt-4 border-t border-white/5">
              <h3 className="px-3 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                Mobile App legacy
              </h3>
              <div className="space-y-1 opacity-70 hover:opacity-100 transition-opacity duration-300">
                {mobileAppItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all group ${
                        isActive 
                          ? 'bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/20 text-purple-400' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={18} className={isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-white transition-colors'} />
                        <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                      </div>
                      {isActive && <motion.div layoutId="activeDot" className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />}
                    </Link>
                  );
                })}
              </div>
            </div>

          </nav>

          {/* User Section / Sign Out */}
          <div className="mt-6 pt-6 border-t border-white/5">
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all group"
                >
                  <LogOut size={16} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                  <span className="text-xs font-semibold tracking-wide">Sign Out</span>
                </button>
          </div>
        </div>
      </aside>
    </>
  );
}
