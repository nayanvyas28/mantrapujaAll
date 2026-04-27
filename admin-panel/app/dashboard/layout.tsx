import Sidebar from '@/components/Sidebar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { IndianRupee, Users, ShoppingBag, Star, RefreshCw } from 'lucide-react';
import RefreshButton from '@/components/RefreshButton';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white flex font-sans overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed top-0 right-0 w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 left-[20%] w-[50%] h-[50%] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 relative z-10 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 bg-[#060606]/40 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest hidden md:block">
              Mantra Puja <span className="text-white/20 mx-2">/</span> <span className="text-white">Management Console</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <RefreshButton />
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-white">{user.email}</span>
                <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Administrator</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${user.email}&background=6b21a8&color=fff`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 pb-12 flex-1 relative">
            {children}
        </div>
      </main>
    </div>
  );
}
