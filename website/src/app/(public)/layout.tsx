import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LoadingProvider } from "@/context/LoadingContext";
import GuruAIChat from "@/components/GuruAIChat";
import PromoPopup from "@/components/PromoPopup";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
       {/* 
          🎯 ELITE SSR ARCHITECTURE:
          The providers wrap the layout shell, but we ensure the children 
          remain pure server-rendered HTML where possible.
       */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1" id="public-content-root">
          {children}
        </main>
        <Footer />
        
        {/* Global but Non-Blocking Client Islands */}
        <GuruAIChat />
        <PromoPopup />
      </div>
    </AuthProvider>
  );
}
