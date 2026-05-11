"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/login');
    }, [router]);
    
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-8 h-8 border-4 border-saffron border-t-transparent rounded-full animate-spin" />
        </div>
    );
}
