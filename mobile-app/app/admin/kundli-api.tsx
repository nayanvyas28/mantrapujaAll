import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert, ActivityIndicator, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, Trash2, Save, Cpu, Zap, Network, Shield, ChevronDown, CheckCircle2, AlertCircle, Bell } from 'lucide-react-native';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { supabase } from '../../utils/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AstrologyAPIConfig {
    id: string;
    provider: 'astrologyapi' | 'prokerala' | 'prokerala_v2';
    user_id?: string;
    api_key: string;
    is_enabled: boolean;
    name: string;
    priority: number;
}

export default function KundliApiManagerScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colors, theme } = useTheme();
    
    const [activeTab, setActiveTab] = useState<'api' | 'notif'>('api');

    const [config, setConfig] = useState<{
        apis: AstrologyAPIConfig[];
        load_balance_strategy: 'round-robin' | 'priority' | 'random';
        failover_enabled: boolean;
    }>({
        apis: [],
        load_balance_strategy: 'round-robin',
        failover_enabled: true
    });

    const [notifConfig, setNotifConfig] = useState<{
        enabled: boolean;
        schedule_time: string;
        title: string;
        body: string;
    }>({
        enabled: false,
        schedule_time: '07:00',
        title: 'Good Morning from Mantra Puja',
        body: 'Today is {tithi}. Festivals: {festivals}.'
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editNode, setEditNode] = useState<AstrologyAPIConfig | null>(null);

    const ADMIN_SECRET = 'mantrapuja-admin-keys';
    const API_BASE = 'https://s1.mantrapuja.com/api/admin/astrology/settings'; // Adjust based on your environment

    useEffect(() => {
        fetchConfigs();
    }, []);

    const fetchConfigs = async () => {
        setLoading(true);
        try {
            // 1. Fetch API Config
            const apiRes = await fetch(`${API_BASE}?secret=${ADMIN_SECRET}&key=api_config`);
            const apiData = await apiRes.json();
            if (apiData.data) {
                setConfig(apiData.data);
            }

            // 2. Fetch Notification Config
            const notifRes = await fetch(`${API_BASE}?secret=${ADMIN_SECRET}&key=notification_config`);
            const notifData = await notifRes.json();
            if (notifData.data) {
                setNotifConfig(notifData.data);
            }

        } catch (error: any) {
            console.error("Config fetch error:", error);
            // Fallback to direct supabase if backend fails or for initial local dev
            const { data } = await supabase.from('kundli_settings').select('*');
            data?.forEach(row => {
                if (row.setting_key === 'api_config') setConfig(row.setting_value);
                if (row.setting_key === 'notification_config') setNotifConfig(row.setting_value);
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const key = activeTab === 'api' ? 'api_config' : 'notification_config';
            const value = activeTab === 'api' ? config : notifConfig;

            const res = await fetch(API_BASE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret: ADMIN_SECRET, key, value })
            });

            if (!res.ok) throw new Error('Backend failed to sync.');

            Alert.alert("Success", `${activeTab === 'api' ? 'API' : 'Notification'} settings synchronized.`);
        } catch (error: any) {
            Alert.alert("Save Failed", error.message);
        } finally {
            setSaving(false);
        }
    };

    const addNode = () => {
        if (config.apis.length >= 10) return;
        const newNode: AstrologyAPIConfig = {
            id: `node_${Date.now()}`,
            name: `Astro Engine ${config.apis.length + 1}`,
            provider: 'astrologyapi',
            api_key: '',
            user_id: '',
            is_enabled: true,
            priority: 1
        };
        setConfig({ ...config, apis: [...config.apis, newNode] });
        setEditNode(newNode);
    };

    const deleteNode = (id: string) => {
        Alert.alert("Remove Node", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Remove", 
                style: "destructive", 
                onPress: () => {
                    const updated = { ...config, apis: config.apis.filter(n => n.id !== id) };
                    setConfig(updated);
                } 
            }
        ]);
    };

    const updateNode = (id: string, updates: Partial<AstrologyAPIConfig>) => {
        const updatedApis = config.apis.map(n => n.id === id ? { ...n, ...updates } : n);
        setConfig({ ...config, apis: updatedApis });
        if (editNode?.id === id) setEditNode({ ...editNode, ...updates });
    };

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.saffron} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { paddingTop: insets.top + 10, borderBottomColor: colors.borderMuted }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h2">Veda Manager</Typography>
                <View style={{ width: 40 }} />
            </View>

            {/* Tab Selector */}
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    onPress={() => setActiveTab('api')}
                    style={[styles.tabBtn, activeTab === 'api' && { borderBottomColor: colors.saffron, borderBottomWidth: 2 }]}
                >
                    <Typography variant="label" color={activeTab === 'api' ? colors.saffron : colors.mutedForeground}>CLUSTER</Typography>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab('notif')}
                    style={[styles.tabBtn, activeTab === 'notif' && { borderBottomColor: colors.saffron, borderBottomWidth: 2 }]}
                >
                    <Typography variant="label" color={activeTab === 'notif' ? colors.saffron : colors.mutedForeground}>NOTIFICATIONS</Typography>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }}>
                {activeTab === 'api' ? (
                    <>
                        <View style={[styles.statsCard, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '30' }]}>
                            <Cpu size={20} color={colors.saffron} />
                            <Typography variant="body" style={{ marginLeft: 12, fontWeight: 'bold' }}>
                                Nodes: {config.apis.filter(a => a.is_enabled).length}/{config.apis.length} Online
                            </Typography>
                        </View>

                        <Typography variant="label" style={styles.sectionLabel}>TRAFFIC STRATEGY</Typography>
                        <View style={styles.strategyRow}>
                            {(['round-robin', 'priority', 'random'] as const).map(s => (
                                <TouchableOpacity 
                                    key={s}
                                    onPress={() => setConfig({ ...config, load_balance_strategy: s })}
                                    style={[
                                        styles.strategyBtn, 
                                        { borderColor: colors.borderMuted },
                                        config.load_balance_strategy === s && { backgroundColor: colors.saffron, borderColor: colors.saffron }
                                    ]}
                                >
                                    <Typography variant="label" style={{ color: config.load_balance_strategy === s ? '#fff' : colors.mutedForeground, fontSize: 10 }}>
                                        {s.substring(0, 5).toUpperCase()}
                                    </Typography>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.switchRow}>
                            <View>
                                <Typography variant="body" style={{ fontWeight: 'bold' }}>Failover</Typography>
                            </View>
                            <Switch 
                                value={config.failover_enabled} 
                                onValueChange={v => setConfig({ ...config, failover_enabled: v })}
                                trackColor={{ false: colors.borderMuted, true: colors.saffron }}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 10 }}>
                            <Typography variant="label" style={{ opacity: 0.6 }}>CLUSTER NODES</Typography>
                            <TouchableOpacity onPress={addNode}>
                                <Plus size={20} color={colors.saffron} />
                            </TouchableOpacity>
                        </View>

                        {config.apis.map((node, idx) => (
                            <TouchableOpacity 
                                key={node.id} 
                                style={[styles.nodeCard, { backgroundColor: theme === 'dark' ? '#1e293b' : '#fff', borderColor: colors.borderMuted }]}
                                onPress={() => setEditNode(node)}
                            >
                                <View style={styles.nodeHeader}>
                                    <View style={styles.nodeTitleRow}>
                                        <View style={[styles.statusDot, { backgroundColor: node.is_enabled ? '#10b981' : colors.muted }]} />
                                        <Typography variant="body" style={{ fontWeight: 'bold' }}>{node.name}</Typography>
                                    </View>
                                    <Typography variant="label" color={colors.mutedForeground} style={{ textTransform: 'uppercase', fontSize: 10 }}>{node.provider}</Typography>
                                </View>
                                <View style={styles.nodeFooter}>
                                    <Typography variant="bodySmall" color={colors.mutedForeground}>P: {node.priority}</Typography>
                                    <View style={{ flexDirection: 'row', gap: 15 }}>
                                        <TouchableOpacity onPress={() => updateNode(node.id, { is_enabled: !node.is_enabled })}>
                                            <Zap size={18} color={node.is_enabled ? colors.saffron : colors.muted} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteNode(node.id)}>
                                            <Trash2 size={18} color="#ef4444" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                ) : (
                    <View style={styles.notifContainer}>
                        <View style={[styles.switchRow, { marginBottom: 25 }]}>
                            <View>
                                <Typography variant="body" style={{ fontWeight: 'bold' }}>Daily Message</Typography>
                                <Typography variant="bodySmall" color={colors.mutedForeground}>Automatic summary at 7:00 AM</Typography>
                            </View>
                            <Switch 
                                value={notifConfig.enabled} 
                                onValueChange={v => setNotifConfig({ ...notifConfig, enabled: v })}
                                trackColor={{ false: colors.borderMuted, true: colors.saffron }}
                            />
                        </View>

                        <Typography variant="label" style={styles.inputLabel}>TARGET TIME (24H)</Typography>
                        <TextInput 
                            style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}
                            value={notifConfig.schedule_time}
                            onChangeText={t => setNotifConfig({ ...notifConfig, schedule_time: t })}
                            placeholder="07:00"
                        />

                        <Typography variant="label" style={styles.inputLabel}>NOTIFICATION TITLE</Typography>
                        <TextInput 
                            style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}
                            value={notifConfig.title}
                            onChangeText={t => setNotifConfig({ ...notifConfig, title: t })}
                            placeholder="Good Morning! Today is {tithi}"
                        />

                        <Typography variant="label" style={styles.inputLabel}>NOTIFICATION BODY</Typography>
                        <TextInput 
                            style={[styles.input, { height: 100, textAlignVertical: 'top', paddingTop: 12, color: colors.foreground, borderColor: colors.borderMuted, backgroundColor: theme === 'dark' ? '#1e293b' : '#fff' }]}
                            value={notifConfig.body}
                            onChangeText={t => setNotifConfig({ ...notifConfig, body: t })}
                            multiline
                            placeholder="Use {tithi} and {festivals} as placeholders"
                        />
                        <Typography variant="bodySmall" color={colors.mutedForeground} style={{ marginTop: 8, fontStyle: 'italic' }}>
                            Placeholders: {"{tithi}"}, {"{festivals}"}
                        </Typography>
                    </View>
                )}

                <TouchableOpacity 
                    style={[styles.saveBtn, { backgroundColor: colors.saffron }]}
                    onPress={() => handleSave()}
                    disabled={saving}
                >
                    {saving ? <ActivityIndicator color="#fff" /> : <><Save size={20} color="#fff" /><Typography variant="body" style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>SAVE & SYNC</Typography></>}
                </TouchableOpacity>
            </ScrollView>

            <Modal visible={!!editNode} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme === 'dark' ? '#0f172a' : '#fff' }]}>
                        <View style={styles.modalHeader}>
                            <Typography variant="h3">Edit Node</Typography>
                            <TouchableOpacity onPress={() => setEditNode(null)}>
                                <Typography variant="body" color={colors.saffron}>Done</Typography>
                            </TouchableOpacity>
                        </View>
                        {editNode && (
                            <ScrollView style={{ marginTop: 20 }}>
                                <Typography variant="label" style={styles.inputLabel}>NODE NAME</Typography>
                                <TextInput style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]} value={editNode.name} onChangeText={t => updateNode(editNode.id, { name: t })} />
                                <Typography variant="label" style={styles.inputLabel}>USER ID</Typography>
                                <TextInput style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]} value={editNode.user_id} onChangeText={t => updateNode(editNode.id, { user_id: t })} autoCapitalize="none" />
                                <Typography variant="label" style={styles.inputLabel}>API KEY</Typography>
                                <TextInput style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]} value={editNode.api_key} onChangeText={t => updateNode(editNode.id, { api_key: t })} secureTextEntry autoCapitalize="none" />
                                <Typography variant="label" style={styles.inputLabel}>PRIORITY</Typography>
                                <TextInput style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]} value={editNode.priority.toString()} onChangeText={t => updateNode(editNode.id, { priority: parseInt(t) || 1 })} keyboardType="numeric" />
                                <View style={{ height: 40 }} />
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1 },
    iconBtn: { padding: 8 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    tabContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
    tabBtn: { flex: 1, paddingVertical: 15, alignItems: 'center' },
    statsCard: { padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24, borderWidth: 1 },
    sectionLabel: { marginTop: 10, marginBottom: 12, opacity: 0.6 },
    strategyRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    strategyBtn: { flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.05)' },
    nodeCard: { padding: 16, borderRadius: 20, borderWidth: 1, marginBottom: 12 },
    nodeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    nodeTitleRow: { flexDirection: 'row', alignItems: 'center' },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
    nodeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 12 },
    saveBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32 },
    notifContainer: { marginTop: 10 },
    inputLabel: { marginTop: 15, marginBottom: 8, opacity: 0.6 },
    input: { height: 50, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, height: '70% '},
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 },
});
