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
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const menuItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Puja Manager', icon: Flame, href: '/dashboard/pujas' },
  { name: 'Puja Bookings', icon: Scroll, href: '/dashboard/bookings' },
  { name: 'Media Assets', icon: Music, href: '/dashboard/music' },
  { name: 'Divine Reels', icon: Film, href: '/dashboard/reels' },
  { name: 'Kundli Hub', icon: Moon, href: '/dashboard/kundli' },
  { name: 'App Home', icon: Home, href: '/dashboard/home-settings' },
  { name: 'Website Config', icon: Globe, href: '/dashboard/website-home' },
  { name: 'Notifications', icon: Bell, href: '/dashboard/notifications' },
  { name: 'Marketing Popups', icon: MousePointer2, href: '/dashboard/popups' },
  { name: 'Referral Program', icon: Users, href: '/dashboard/referral' },
  { name: 'Guru Ji AI', icon: Settings, href: '/dashboard/settings' },
  { name: 'Communications', icon: MessageCircle, href: '/dashboard/settings/whatsapp' },
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

      <aside className={`
        fixed top-0 left-0 h-full bg-[#0d0d0d] border-r border-white/5 z-40
        w-72 transition-all duration-300 transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-10 px-2 text-decoration-none">
            <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-orange-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <span className="text-xl font-bold text-white">M</span>
                </div>
                <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Mantra Puja
                </h1>
                <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Admin Control</p>
                </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl transition-all group
                    ${isActive 
                      ? 'bg-gradient-to-r from-purple-600/10 to-transparent border border-purple-500/20 text-purple-400' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isActive ? 'text-purple-400' : 'text-gray-500 group-hover:text-white transition-colors'} />
                    <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                  </div>
                  {isActive && <motion.div layoutId="activeDot" className="w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />}
                </Link>
              );
            })}
          </nav>

          {/* User Section / Sign Out */}
          <div className="mt-6 pt-6 border-t border-white/5">
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all group"
                >
                  <LogOut size={18} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                  <span className="text-sm font-semibold tracking-wide">Sign Out</span>
                </button>
          </div>
        </div>
      </aside>
    </>
  );
}
