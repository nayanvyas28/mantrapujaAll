import DateTimePicker from '@react-native-community/datetimepicker';
import { Clock, Play, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

// Type-safe alias for React 19/Expo 54 compatibility
const RNView = View as any;
import { useTheme } from '../context/ThemeContext';
import { Typography } from './ui/Typography';

interface AlarmPickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (date: Date) => void;
    song: any;
}

export function AlarmPickerModal({ isVisible, onClose, onSave, song }: AlarmPickerModalProps) {
    const { colors, theme } = useTheme();
    const [date, setDate] = useState(new Date());

    const handleChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handleSave = () => {
        // Ensure the date is in the future
        let alarmDate = date;
        if (alarmDate.getTime() < new Date().getTime()) {
            // If time is in the past (e.g., 8:00 AM selected but it's 9:00 AM), set for tomorrow
            alarmDate = new Date(alarmDate.getTime() + 24 * 60 * 60 * 1000);
        }
        onSave(alarmDate);
    };

    if (!song) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={[styles.modalView, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.header}>
                        <Typography variant="h3" color={colors.foreground}>Set Alarm</Typography>
                        <TouchableOpacity onPress={onClose}>
                            <X color={colors.foreground} size={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.songPreview}>
                        <Clock color={colors.saffron} size={32} />
                        <View style={styles.songInfo}>
                            <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>{song.title}</Typography>
                            <Typography variant="label" color={colors.muted}>{song.artist}</Typography>
                        </View>
                    </View>

                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={handleChange}
                            textColor={colors.foreground}
                            style={styles.picker}
                        />
                    </View>

                    <Typography variant="label" color={colors.muted} style={styles.helpText}>
                        Select the time you want this devotional song to play.
                    </Typography>

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: colors.saffron }]}
                        onPress={handleSave}
                    >
                        <Play color="#fff" size={20} style={{ marginRight: 8 }} />
                        <Typography variant="body" style={{ color: '#fff', fontWeight: 'bold' }}>Schedule Alarm</Typography>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    songPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        marginBottom: 20,
    },
    songInfo: {
        marginLeft: 12,
        flex: 1,
    },
    pickerContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    picker: {
        width: '100%',
        height: 120,
    },
    helpText: {
        textAlign: 'center',
        marginBottom: 24,
    },
    saveButton: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
