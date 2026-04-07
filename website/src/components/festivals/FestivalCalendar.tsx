"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Festival } from '@/lib/festivalData';

interface FestivalCalendarProps {
    festivals: Festival[];
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    onMonthChange?: (date: Date) => void;
}

export const FestivalCalendar = ({ festivals, selectedDate, onDateSelect, onMonthChange }: FestivalCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Notify parent when month changes
    useEffect(() => {
        if (onMonthChange) {
            onMonthChange(currentDate);
        }
    }, [currentDate.getMonth(), currentDate.getFullYear()]);

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const generateCalendarDays = () => {
        const totalDays = daysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // Days of current month
        for (let i = 1; i <= totalDays; i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return days;
    };

    const calendarDays = useMemo(() => generateCalendarDays(), [currentDate]);

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const isSelected = (date: Date) => {
        if (!selectedDate) return false;
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    const getFestivalsForDate = (date: Date) => {
        return festivals.filter(f =>
            f.date.getDate() === date.getDate() &&
            f.date.getMonth() === date.getMonth() &&
            f.date.getFullYear() === date.getFullYear()
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-[#fafaf5] dark:bg-[#0f172a] rounded-[40px] shadow-[0_32px_80px_-15px_rgba(0,0,0,0.18)] dark:shadow-[0_45px_100px_-15px_rgba(0,0,0,0.5)] border border-saffron/20 dark:border-white/10 overflow-hidden relative group/cal">
            
            {/* Decorative Sacred Background (Mandala/Zodiac) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.05] dark:opacity-[0.08] pointer-events-none rotate-[30deg]">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-saffron fill-current">
                    <circle cx="100" cy="100" r="95" strokeWidth="0.5" stroke="currentColor" fill="none" />
                    <circle cx="100" cy="100" r="70" strokeWidth="0.5" stroke="currentColor" fill="none" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                        <line key={deg} x1="100" y1="5" x2="100" y2="30" strokeWidth="0.5" stroke="currentColor" transform={`rotate(${deg}, 100, 100)`} />
                    ))}
                    <path d="M100,20 L105,35 L100,50 L95,35 Z" fill="currentColor" transform="translate(0,-10)" opacity="0.5" />
                </svg>
            </div>

            {/* Calendar Header: Centered & Premium (Sacred Theme) */}
            <div className="flex flex-col items-center justify-center p-10 md:p-14 bg-gradient-to-b from-saffron/[0.08] to-transparent border-b border-saffron/10 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center shadow-lg border border-saffron/20 group-hover/cal:scale-110 transition-transform duration-500">
                        <CalendarIcon className="w-7 h-7 text-saffron drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-saffron/60 mb-1">Sacred Timings</span>
                        <h2 className="text-4xl md:text-5xl font-black font-serif text-slate-900 dark:text-white tracking-tight">
                            {monthNames[currentDate.getMonth()]} <span className="text-saffron italic">{currentDate.getFullYear()}</span>
                        </h2>
                    </div>
                </div>
                
                <div className="flex bg-white dark:bg-white/5 rounded-2xl border border-saffron/10 p-1.5 shadow-xl backdrop-blur-md">
                    <button
                        onClick={prevMonth}
                        className="p-4 rounded-xl hover:bg-saffron/10 text-slate-400 hover:text-saffron transition-all active:scale-90"
                        aria-label="Previous Month"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="w-px h-8 bg-saffron/10 self-center mx-2" />
                    <button
                        onClick={nextMonth}
                        className="p-4 rounded-xl hover:bg-saffron/10 text-slate-400 hover:text-saffron transition-all active:scale-90"
                        aria-label="Next Month"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="md:hidden text-center py-2 bg-muted/20 text-[10px] text-muted-foreground animate-pulse border-b border-border/50">
                ← Swipe to explore calendar →
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                    {/* Weekday Headers - Strong & Structured */}
                    <div className="grid grid-cols-7 border-b-2 border-saffron/10 bg-saffron/[0.05] dark:bg-white/[0.03]">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-6 text-center text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-saffron/80 dark:text-saffron">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid: High-Contrast Structured Glass Cells */}
                    <div className="grid grid-cols-7 auto-rows-fr relative z-10">
                        {calendarDays.map((date, index) => {
                            if (!date) {
                                return <div key={`empty-${index}`} className="min-h-[110px] md:min-h-[140px] border-b border-r border-saffron/10 bg-white/[0.01] dark:bg-black/[0.1]"></div>;
                            }

                            const dayFestivals = getFestivalsForDate(date);
                            const today = isToday(date);
                            const selected = isSelected(date);

                            return (
                                <div
                                    key={date.toISOString()}
                                    onClick={() => onDateSelect(date)}
                                    className={`min-h-[110px] md:min-h-[140px] border-b border-r border-saffron/20 p-5 relative group/cell cursor-pointer transition-all duration-300 hover:bg-saffron/[0.06] dark:hover:bg-white/[0.03] ${today ? 'bg-saffron/[0.08]' : 'bg-white/40 dark:bg-transparent'} ${selected ? 'bg-saffron/[0.12] ring-[3px] ring-inset ring-saffron shadow-lg' : ''}`}
                                >
                                    <div className="flex flex-col h-full bg-transparent">
                                        <span className={`text-[18px] font-black inline-flex w-11 h-11 items-center justify-center rounded-[18px] transition-all duration-500 transform group-hover/cell:scale-110 shadow-sm ${today ? 'bg-saffron text-white shadow-2xl shadow-saffron/40 scale-115 rotate-3' : (selected ? 'bg-saffron text-white shadow-xl shadow-saffron/30' : 'text-slate-800 dark:text-slate-200 group-hover/cell:text-saffron group-hover/cell:bg-white dark:group-hover/cell:bg-white/10 group-hover/cell:shadow-md')}`}>
                                            {date.getDate()}
                                        </span>

                                        <div className="mt-auto space-y-2">
                                            {dayFestivals.length > 0 ? (
                                                <div className="flex flex-col gap-2">
                                                    {dayFestivals.slice(0, 2).map(festival => (
                                                        <div
                                                            key={festival.id}
                                                            className="px-3 py-2 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-tight bg-white dark:bg-white/10 text-saffron border border-saffron/20 dark:border-white/10 truncate shadow-md group-hover/cell:border-saffron/50 group-hover/cell:shadow-lg group-hover/cell:scale-105 transition-all duration-300"
                                                        >
                                                            {festival.name}
                                                        </div>
                                                    ))}
                                                    {dayFestivals.length > 2 && (
                                                        <div className="text-[11px] text-saffron pl-1 font-black italic">
                                                            + {dayFestivals.length - 2} Sacred Events
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                // Decorative Structure
                                                <div className="h-1.5 w-1.5 rounded-full bg-saffron/20 dark:bg-white/20 self-center mb-1 group-hover/cell:bg-saffron/60 transition-colors" />
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Today Glow Effect Refined */}
                                    {today && (
                                        <div className="absolute inset-0 bg-saffron/[0.03] animate-pulse pointer-events-none" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
