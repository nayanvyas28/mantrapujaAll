"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Festival } from '@/lib/festivalData';

interface FestivalCalendarProps {
    festivals: Festival[];
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
}

export const FestivalCalendar = ({ festivals, selectedDate, onDateSelect }: FestivalCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

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
        <div className="w-full max-w-6xl mx-auto bg-card dark:bg-card/50 backdrop-blur-md rounded-3xl shadow-xl border border-border/50 overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 md:p-8 bg-saffron/5 dark:bg-white/5 border-b border-border/50">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground flex items-center gap-3">
                        <CalendarIcon className="w-6 h-6 md:w-8 md:h-8 text-saffron" />
                        {monthNames[currentDate.getMonth()]} <span className="text-muted-foreground">{currentDate.getFullYear()}</span>
                    </h2>
                </div>
                <div className="flex bg-background/50 rounded-full border border-border/50 p-1">
                    <button
                        onClick={prevMonth}
                        className="p-2 rounded-full hover:bg-saffron/10 hover:text-saffron transition-colors"
                        aria-label="Previous Month"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 rounded-full hover:bg-saffron/10 hover:text-saffron transition-colors"
                        aria-label="Next Month"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="md:hidden text-center py-2 bg-muted/20 text-[10px] text-muted-foreground animate-pulse border-b border-border/50">
                ← Swipe to explore calendar →
            </div>

            <div className="overflow-x-auto">
                <div className="min-w-[700px]">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 border-b border-border/50 bg-muted/20">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="py-3 text-center text-xs md:text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 auto-rows-fr bg-background/50">
                        {calendarDays.map((date, index) => {
                            if (!date) {
                                return <div key={`empty-${index}`} className="min-h-[80px] md:min-h-[100px] border-b border-r border-border/30 bg-muted/5"></div>;
                            }

                            const dayFestivals = getFestivalsForDate(date);
                            const today = isToday(date);
                            const selected = isSelected(date);

                            return (
                                <div
                                    key={date.toISOString()}
                                    onClick={() => onDateSelect(date)}
                                    className={`min-h-[80px] md:min-h-[100px] border-b border-r border-border/30 p-2 relative group cursor-pointer transition-all ${today ? 'bg-saffron/10' : ''} ${selected ? 'ring-2 ring-inset ring-saffron bg-saffron/5' : 'hover:bg-saffron/5'}`}
                                >
                                    <span className={`text-sm font-medium inline-flex w-7 h-7 items-center justify-center rounded-full ${today ? 'bg-saffron text-white shadow-lg shadow-saffron/30' : selected ? 'bg-saffron/20 text-saffron font-bold' : 'text-muted-foreground group-hover:text-saffron transition-colors'}`}>
                                        {date.getDate()}
                                    </span>

                                    <div className="mt-2 space-y-1">
                                        {dayFestivals.map(festival => (
                                            <div
                                                key={festival.id}
                                                className="block p-1.5 rounded-lg text-[10px] md:text-xs font-semibold bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-orange-800/20 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-700/50 truncate hover:scale-105 transition-transform shadow-sm"
                                                title={festival.name}
                                            >
                                                {festival.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
