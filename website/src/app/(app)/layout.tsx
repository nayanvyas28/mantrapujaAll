import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import ClientLayout from "@/components/ClientLayout";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ClientLayout>
          {children}
        </ClientLayout>
      </AuthProvider>
    </LanguageProvider>
  );
}
