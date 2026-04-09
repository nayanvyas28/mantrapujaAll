import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Typography } from './ui/Typography';
import { Card } from './ui/Card';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CALENDAR_PADDING = 24;
const GRID_WIDTH = (SCREEN_WIDTH - (CALENDAR_PADDING * 2)) - 2; // Subtracting 2px for Card borders
const DAY_SIZE = Math.floor(GRID_WIDTH / 7);
const REMAINDER = (GRID_WIDTH % 7) / 2; // Split remainder for centering

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];



interface CalendarGridProps {
    onSelectDate?: (date: Date, festival?: any) => void;
    festivalsMap?: Record<string, any>;
}

export function CalendarGrid({ onSelectDate, festivalsMap = {} }: CalendarGridProps) {
    const { colors, theme } = useTheme();
    // Use current date dynamic to now
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        const days = [];
        // Prev Month
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            days.push({ day: prevMonthDays - i, month: 'prev', date: new Date(year, month - 1, prevMonthDays - i) });
        }
        // Current Month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, month: 'current', date: new Date(year, month, i) });
        }
        // Next Month Padding (ensure 6 rows)
        const nextPadding = 42 - days.length;
        for (let i = 1; i <= nextPadding; i++) {
            days.push({ day: i, month: 'next', date: new Date(year, month + 1, i) });
        }
        return days;
    }, [currentDate]);

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const formatDateKey = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    return (
        <Card variant="solid" style={[styles.container, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fffefc' }]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <CalIcon size={24} color={colors.saffron} />
                    <Typography variant="h2" color={colors.foreground} style={styles.monthTitle}>
                        {MONTHS[currentDate.getMonth()]} <Typography variant="h2" color={colors.muted}>{currentDate.getFullYear()}</Typography>
                    </Typography>
                </View>
                <View style={styles.controls}>
                    <TouchableOpacity onPress={handlePrevMonth} style={[styles.controlBtn, { backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc' }]}>
                        <ChevronLeft size={18} color={colors.foreground} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextMonth} style={[styles.controlBtn, { backgroundColor: theme === 'dark' ? '#334155' : '#f8fafc', marginLeft: 8 }]}>
                        <ChevronRight size={18} color={colors.foreground} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Hint */}
            <View style={styles.hintContainer}>
                <Typography variant="label" color={colors.muted} style={styles.hintText}>
                    ← Swipe to explore calendar →
                </Typography>
            </View>

            {/* Weekdays */}
            <View style={[styles.weekdaysRow, { borderBottomColor: 'rgba(255,255,255,0.15)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' }]}>
                {WEEKDAYS.map((day, idx) => (
                    <View key={day} style={[styles.dayCell, { height: 40, borderColor: 'rgba(255,255,255,0.15)' }, idx === 6 && { borderRightWidth: 0 }]}>
                        <Typography variant="label" color={colors.saffron} style={{ fontWeight: 'bold', fontSize: 10 }}>{day}</Typography>
                    </View>
                ))}
            </View>

            {/* Grid */}
            <View style={styles.grid}>
                {calendarData.map((item, index) => {
                    const dateKey = formatDateKey(item.date);
                    const isSelected = selectedDate === dateKey;
                    const festival = festivalsMap[dateKey];
                    const isCurrMonth = item.month === 'current';
                    const isLastInRow = (index + 1) % 7 === 0;

                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.9}
                            style={[
                                styles.dayCell,
                                { borderColor: colors.borderMuted },
                                isLastInRow && { borderRightWidth: 0 },
                                isSelected && {
                                    borderColor: colors.saffron,
                                    borderWidth: 2,
                                    zIndex: 10,
                                    backgroundColor: theme === 'dark' ? 'rgba(249, 115, 22, 0.05)' : 'rgba(249, 115, 22, 0.02)'
                                }
                            ]}
                            onPress={() => {
                                setSelectedDate(dateKey);
                                onSelectDate?.(item.date, festival);
                            }}
                        >
                            <View style={styles.dayInner}>
                                <View style={[
                                    styles.dayNumWrapper,
                                    isSelected && { backgroundColor: colors.saffron }
                                ]}>
                                    <Typography
                                        variant="body"
                                        color={isSelected ? '#fff' : (isCurrMonth ? colors.foreground : colors.muted)}
                                        style={[styles.dayText, isSelected && { fontWeight: 'bold' }]}
                                    >
                                        {item.day}
                                    </Typography>
                                </View>

                                {festival && (
                                    <View style={[styles.festTag, { backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : (theme === 'dark' ? 'rgba(249, 115, 22, 0.15)' : '#fff7ed') }]}>
                                        <Typography variant="label" color={isSelected ? '#fff' : colors.saffron} numberOfLines={1} style={styles.festTagText}>
                                            {festival.name.length > 10 ? festival.name.substring(0, 8) + '...' : festival.name}
                                        </Typography>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        borderRadius: 24,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    monthTitle: {
        marginLeft: 12,
        fontSize: 24,
    },
    controls: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    controlBtn: {
        padding: 8,
        borderRadius: 16,
    },
    hintContainer: {
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.02)',
    },
    hintText: {
        fontSize: 10,
        letterSpacing: 0.5,
    },
    weekdaysRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 12,
        paddingLeft: REMAINDER,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: REMAINDER, // Distribute remainder to keep grid centered
    },
    dayCell: {
        width: DAY_SIZE,
        height: DAY_SIZE * 1.2,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayInner: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayNumWrapper: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 14,
    },
    festTag: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 4,
    },
    festTagText: {
        fontSize: 8,
        fontWeight: '600',
    },
});
