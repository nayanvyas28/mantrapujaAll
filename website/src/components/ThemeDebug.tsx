"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeDebug() {
    const { theme, resolvedTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-lg text-xs z-[9999] max-w-xs">
            <div><strong>Theme Debug:</strong></div>
            <div>theme: {theme}</div>
            <div>resolvedTheme: {resolvedTheme}</div>
            <div>systemTheme: {systemTheme}</div>
            <div>HTML class: {document.documentElement.className}</div>
        </div>
    );
}
