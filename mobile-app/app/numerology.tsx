import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Calendar, ChevronLeft, Hash, MessageSquare, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/ui/Card';
import { ResultDisclaimer } from '../components/ui/ResultDisclaimer';
import { Typography } from '../components/ui/Typography';
import { useTheme } from '../context/ThemeContext';

export default function NumerologyScreen() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();

    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [results, setResults] = useState<{ lifePath: number; destiny: number } | null>(null);

    const calculateLifePath = (dateObj: Date) => {
        const day = dateObj.getDate().toString();
        const month = (dateObj.getMonth() + 1).toString();
        const year = dateObj.getFullYear().toString();
        
        const digits = (day + month + year).split('').map(Number);
        let sum = digits.reduce((a, b) => a + b, 0);
        
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }
        return sum;
    };

    const calculateDestiny = (nameStr: string) => {
        const charMap: { [key: string]: number } = {
            a: 1, j: 1, s: 1,
            b: 2, k: 2, t: 2,
            c: 3, l: 3, u: 3,
            d: 4, m: 4, v: 4,
            e: 5, n: 5, w: 5,
            f: 6, o: 6, x: 6,
            g: 7, p: 7, y: 7,
            h: 8, q: 8, z: 8,
            i: 9, r: 9
        };

        const total = nameStr.toLowerCase().replace(/[^a-z]/g, '').split('')
            .reduce((sum, char) => sum + (charMap[char] || 0), 0);

        let reduced = total;
        while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33) {
            reduced = reduced.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }
        return reduced;
    };

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleCalculate = () => {
        if (!name) return;
        setResults({
            lifePath: calculateLifePath(date),
            destiny: calculateDestiny(name)
        });
    };

    const formatDate = (dateObj: Date) => {
        return dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2" color={colors.foreground}>Numerology</Typography>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView 
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Typography variant="body" color={colors.mutedForeground} style={{ marginBottom: 24, textAlign: 'center' }}>
                    Discover the mystical significance of your numbers and how they influence your life path.
                </Typography>

                <Card variant="solid" style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <User size={18} color={colors.saffron} />
                            <Typography variant="body" style={{ fontWeight: '600', marginLeft: 8 }}>Full Name</Typography>
                        </View>
                        <TextInput
                            style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                            placeholder="Enter your full name"
                            placeholderTextColor={colors.mutedForeground}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Calendar size={18} color={colors.saffron} />
                            <Typography variant="body" style={{ fontWeight: '600', marginLeft: 8 }}>Date of Birth</Typography>
                        </View>
                        <TouchableOpacity 
                            style={[styles.input, { justifyContent: 'center', borderColor: colors.borderMuted, backgroundColor: colors.background }]}
                            onPress={() => setShowPicker(true)}
                        >
                            <Typography color={colors.foreground}>{formatDate(date)}</Typography>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                is24Hour={true}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onChange}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    <TouchableOpacity 
                        style={[styles.calculateButton, { backgroundColor: colors.saffron }]}
                        onPress={handleCalculate}
                    >
                        <Typography variant="h3" color="#fff">Calculate My Numbers</Typography>
                    </TouchableOpacity>
                </Card>

                {results && (
                    <View style={{ marginTop: 24 }}>
                        <View style={styles.resultsRow}>
                            <Card variant="solid" style={[styles.resultCard, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron }]}>
                                <Typography variant="label" color={colors.saffron}>Life Path</Typography>
                                <Typography variant="h1" color={colors.saffron} style={styles.resultValue}>{results.lifePath}</Typography>
                            </Card>
                            <Card variant="solid" style={[styles.resultCard, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron, marginLeft: 16 }]}>
                                <Typography variant="label" color={colors.saffron}>Destiny</Typography>
                                <Typography variant="h1" color={colors.saffron} style={styles.resultValue}>{results.destiny}</Typography>
                            </Card>
                        </View>

                        <TouchableOpacity 
                            style={[styles.aiButton, { backgroundColor: colors.card, borderColor: colors.saffron }]}
                            onPress={() => router.push({
                                pathname: "/guru-ai",
                                params: { message: `My Life Path number is ${results.lifePath} and Destiny number is ${results.destiny}. Please analyze this for me.` }
                            })}
                        >
                            <MessageSquare size={20} color={colors.saffron} />
                            <Typography variant="h3" color={colors.saffron} style={{ marginLeft: 12 }}>Analyze with GuruJi AI</Typography>
                        </TouchableOpacity>

                        <ResultDisclaimer style={{ marginTop: 24, marginBottom: 12 }} />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    backButton: { width: 44, height: 44, justifyContent: 'center' },
    scrollContent: { padding: 20 },
    formCard: {
        padding: 20,
        borderRadius: 24,
    },
    inputGroup: { marginBottom: 20 },
    labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    input: {
        height: 52,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    calculateButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    resultsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resultCard: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
    },
    resultValue: {
        fontSize: 42,
        fontWeight: '800',
        marginTop: 4,
    },
    aiButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        marginTop: 24,
    }
});
