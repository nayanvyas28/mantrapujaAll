"use client";

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkle } from 'lucide-react';
import { Festival } from '@/lib/festivalData';

interface FestivalCalendarProps {
    festivals: Festival[];
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
    onMonthChange?: (date: Date) => void;
}

export const FestivalCalendar = ({ festivals, selectedDate, onDateSelect, onMonthChange }: FestivalCalendarProps) => {
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
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(newDate);
        if (onMonthChange) onMonthChange(newDate);
    };

    const nextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(newDate);
        if (onMonthChange) onMonthChange(newDate);
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
        <div className="w-full max-w-6xl mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white dark:border-white/5 overflow-hidden">
            {/* Calendar Header - Premium Look */}
            <div className="relative flex items-center justify-between p-8 overflow-hidden bg-gradient-to-r from-saffron/5 via-transparent to-orange-500/5">
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-saffron to-orange-600 flex items-center justify-center shadow-lg shadow-saffron/20 transform -rotate-3">
                        <CalendarIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black font-serif text-zinc-900 dark:text-zinc-100 flex items-baseline gap-3">
                            {monthNames[currentDate.getMonth()]}
                            <span className="text-xl font-medium text-zinc-400 dark:text-zinc-600">{currentDate.getFullYear()}</span>
                        </h2>
                    </div>
                </div>

                <div className="flex gap-3 relative z-10">
                    <button
                        onClick={prevMonth}
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all border border-zinc-100 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-saffron"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-800 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all border border-zinc-100 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-saffron"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
            </div>

            <div className="overflow-x-auto border-t border-zinc-100 dark:border-zinc-800">
                <div className="min-w-[700px]">
                    {/* Weekday Headers - Modernized */}
                    <div className="grid grid-cols-7 bg-zinc-50/50 dark:bg-white/5">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                            <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-800">
                                {day.substring(0, 3)}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 auto-rows-fr">
                        {calendarDays.map((date, index) => {
                            if (!date) {
                                return (
                                    <div key={`empty-${index}`} className="min-h-[100px] border-b border-r border-zinc-50 dark:border-zinc-800 bg-zinc-50/20 dark:bg-transparent"></div>
                                );
                            }

                            const dayFestivals = getFestivalsForDate(date);
                            const today = isToday(date);
                            const selected = isSelected(date);

                            return (
                                <div
                                    key={date.toISOString()}
                                    onClick={() => onDateSelect(date)}
                                    className={`group relative min-h-[110px] p-3 border-b border-r border-zinc-100 dark:border-zinc-800 cursor-pointer transition-all duration-300 ${
                                        selected ? 'bg-saffron/5' : 'hover:bg-zinc-50/80 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className={`text-base font-black w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${
                                            today 
                                            ? 'bg-gradient-to-br from-saffron to-orange-600 text-white shadow-lg shadow-saffron/30 scale-110' 
                                            : selected 
                                            ? 'bg-saffron/20 text-saffron' 
                                            : 'text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
                                        }`}>
                                            {date.getDate()}
                                        </span>
                                        
                                        {dayFestivals.length > 0 && !today && !selected && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-saffron/40"></div>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        {dayFestivals.map(festival => (
                                            <div
                                                key={festival.id}
                                                className={`px-2 py-1.5 rounded-lg text-[10px] font-bold leading-tight transition-all duration-300 shadow-sm ${
                                                    selected 
                                                    ? 'bg-saffron text-white' 
                                                    : 'bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 group-hover:border-saffron/50 group-hover:text-saffron'
                                                }`}
                                            >
                                                <div className="truncate">{festival.name}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Hover Indicator */}
                                    <div className={`absolute bottom-0 left-0 h-0.5 bg-saffron transition-all duration-500 ${selected ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
