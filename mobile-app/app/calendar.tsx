import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Calendar as CalendarIcon, 
  ArrowRight, 
  Sparkles,
  Info,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../context/LanguageContext';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function FestivalCalendarScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [festivals, setFestivals] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const fetchFestivals = async () => {
    try {
      const { data, error } = await supabase
        .from('festivals')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });

      if (error) throw error;
      setFestivals(data || []);
    } catch (error) {
      console.error('Error fetching festivals:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFestivals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFestivals();
  };

  // Calendar Helper Functions
  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const totalDays = daysInMonth(month, year);
    const startDay = firstDayOfMonth(month, year);
    
    const days = [];
    // Add empty slots for previous month
    for (let i = 0; i < startDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
    }

    // Add days of current month
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasFestival = festivals.some(f => f.date === dateStr);
      const isSelected = selectedDate && 
                        selectedDate.getDate() === day && 
                        selectedDate.getMonth() === month && 
                        selectedDate.getFullYear() === year;
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === month && 
                      new Date().getFullYear() === year;

      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          onPress={() => {
            const d = new Date(year, month, day);
            setSelectedDate(isSelected ? null : d);
          }}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected,
            isToday && !isSelected && styles.calendarDayToday
          ]}
        >
          <Text style={[
            styles.calendarDayText,
            isSelected && styles.calendarDayTextSelected,
            isToday && !isSelected && styles.calendarDayTextToday
          ]}>
            {day}
          </Text>
          {hasFestival && (
            <View style={[styles.festivalDot, isSelected && styles.festivalDotSelected]} />
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
  };

  const getDisplayFestivals = () => {
    if (selectedDate) {
      const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
      return festivals.filter(f => f.date === dateStr);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return festivals.filter(f => new Date(f.date) >= today).slice(0, 5);
  };

  const displayFestivals = getDisplayFestivals();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={['#FF4D00', '#FF8C00']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerSubtitle}>{language === 'hi' ? 'दिव्य' : 'Divine'}</Text>
            <Text style={styles.headerTitle}>{language === 'hi' ? 'उत्सव कैलेंडर' : 'Festival Calendar'}</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF4D00" />
        }
      >
        {/* Interactive Calendar Grid */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <ChevronLeft size={24} color="#FF4D00" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {currentMonth.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { month: 'long', year: 'numeric' })}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <ChevronRight size={24} color="#FF4D00" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDays}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <Text key={i} style={styles.weekDayText}>{d}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {renderCalendar()}
          </View>
        </View>

        {/* Selected Date Info or Upcoming Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionSubtitle}>
              {selectedDate 
                ? (language === 'hi' ? 'चयनित तिथि' : 'Selected Date')
                : (language === 'hi' ? 'आगाmi' : 'Upcoming')}
            </Text>
            <Text style={styles.sectionTitle}>
              {selectedDate 
                ? selectedDate.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', { day: 'numeric', month: 'short' })
                : (language === 'hi' ? 'प्रमुख उत्सव' : 'Major Festivals')}
            </Text>
          </View>
          {selectedDate && (
            <TouchableOpacity onPress={() => setSelectedDate(null)} style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>{language === 'hi' ? 'साफ़ करें' : 'Clear'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF4D00" />
          </View>
        ) : displayFestivals.length > 0 ? (
          <View style={styles.festivalsList}>
            {displayFestivals.map((festival) => {
              const fDate = new Date(festival.date);
              return (
                <TouchableOpacity 
                  key={festival.id}
                  onPress={() => router.push(`/festivals/${festival.slug}` as any)}
                  style={styles.festivalCard}
                  activeOpacity={0.9}
                >
                  <View style={styles.festivalDateContainer}>
                    <Text style={styles.festivalDay}>{fDate.getDate()}</Text>
                    <Text style={styles.festivalMonth}>{fDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</Text>
                  </View>
                  
                  <View style={styles.festivalInfo}>
                    <Text style={styles.festivalName}>{language === 'hi' ? (festival.name_hi || festival.name) : festival.name}</Text>
                    <Text style={styles.festivalDesc} numberOfLines={2}>
                      {language === 'hi' ? (festival.description_hi || festival.description) : festival.description}
                    </Text>
                    
                    <View style={styles.festivalFooter}>
                      <View style={styles.tag}>
                        <Clock size={10} color="#64748B" />
                        <Text style={styles.tagText}>{language === 'hi' ? 'शुभ मुहूर्त' : 'Shubh Muhurat'}</Text>
                      </View>
                      <ArrowRight size={16} color="#FF4D00" />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Info size={40} color="#CBD5E1" />
            <Text style={styles.emptyText}>
              {selectedDate 
                ? (language === 'hi' ? 'इस दिन कोई उत्सव नहीं है' : 'No festivals on this day')
                : (language === 'hi' ? 'कोई आगामी उत्सव नहीं' : 'No upcoming festivals')}
            </Text>
          </View>
        )}

        <View style={styles.footerSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    textTransform: 'capitalize',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  calendarDay: {
    width: (width - 80) / 7,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginVertical: 2,
  },
  calendarDayEmpty: {
    width: (width - 80) / 7,
    height: 45,
  },
  calendarDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  calendarDaySelected: {
    backgroundColor: '#FF4D00',
  },
  calendarDayTextSelected: {
    color: 'white',
    fontWeight: '800',
  },
  calendarDayToday: {
    backgroundColor: '#FFF1E6',
    borderWidth: 1,
    borderColor: '#FF4D00',
  },
  calendarDayTextToday: {
    color: '#FF4D00',
    fontWeight: '800',
  },
  festivalDot: {
    width: 4,
    height: 4,
    backgroundColor: '#FF4D00',
    borderRadius: 2,
    position: 'absolute',
    bottom: 8,
  },
  festivalDotSelected: {
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionSubtitle: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  viewAllButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  viewAllText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  festivalsList: {
    gap: 16,
  },
  festivalCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  festivalDateContainer: {
    width: 60,
    height: 70,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  festivalDay: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF4D00',
  },
  festivalMonth: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94A3B8',
  },
  festivalInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  festivalName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  festivalDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  festivalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderStyle: 'dashed',
  },
  emptyText: {
    marginTop: 12,
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  footerSpacing: {
    height: 60,
  }
});

