"use client";

import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
}

export default function TableOfContents({ sections }: { sections: any[] }) {
    const [activeId, setActiveId] = useState<string>('');

    const items: TOCItem[] = sections.map((s, i) => ({
        id: `section-${i + 1}`,
        text: s.heading
    }));

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-10% 0% -80% 0%' }
        );

        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [items]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    if (items.length === 0) return null;

    return (
        <nav className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 sticky top-40 h-fit hidden xl:block shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-saffron">
                <div className="w-8 h-8 rounded-lg bg-saffron/20 flex items-center justify-center">
                    <List className="w-4 h-4" />
                </div>
                Guide Path
            </h3>
            <ul className="space-y-6">
                {items.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => scrollTo(item.id)}
                            className={`text-[13px] leading-relaxed text-left transition-all duration-300 hover:text-saffron group flex items-start gap-3 ${
                                activeId === item.id 
                                ? 'text-saffron font-bold' 
                                : 'text-white/40'
                            }`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 transition-all ${
                                activeId === item.id ? 'bg-saffron scale-125 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-white/10'
                            }`} />
                            <span className="flex-1">{item.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
