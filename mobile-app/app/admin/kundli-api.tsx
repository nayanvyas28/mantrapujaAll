import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert, ActivityIndicator, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Plus, Trash2, Save, Cpu, Zap, Network, Shield, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react-native';
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
    const [config, setConfig] = useState<{
        apis: AstrologyAPIConfig[];
        load_balance_strategy: 'round-robin' | 'priority' | 'random';
        failover_enabled: boolean;
    }>({
        apis: [],
        load_balance_strategy: 'round-robin',
        failover_enabled: true
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editNode, setEditNode] = useState<AstrologyAPIConfig | null>(null);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('kundli_settings')
                .select('setting_value')
                .eq('setting_key', 'api_config')
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data?.setting_value) setConfig(data.setting_value);
        } catch (error: any) {
            Alert.alert("Error", "Failed to fetch settings: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (newConfig = config) => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('kundli_settings')
                .upsert({ 
                    setting_key: 'api_config',
                    setting_value: newConfig,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'setting_key' });

            if (error) throw error;
            Alert.alert("Success", "API configurations synchronized across all platforms.");
            setConfig(newConfig);
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
        const updated = { ...config, apis: [...config.apis, newNode] };
        setConfig(updated);
        setEditNode(newNode);
    };

    const deleteNode = (id: string) => {
        Alert.alert("Remove Node", "Are you sure? This will shift traffic to remaining nodes.", [
            { text: "Cancel", style: "cancel" },
            { 
                text: "Remove", 
                style: "destructive", 
                onPress: () => {
                    const updated = { ...config, apis: config.apis.filter(n => n.id !== id) };
                    setConfig(updated);
                    handleSave(updated);
                } 
            }
        ]);
    };

    const updateNode = (id: string, updates: Partial<AstrologyAPIConfig>) => {
        const updatedApis = config.apis.map(n => n.id === id ? { ...n, ...updates } : n);
        const updatedConfig = { ...config, apis: updatedApis };
        setConfig(updatedConfig);
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
                <Typography variant="h2">API Manager</Typography>
                <TouchableOpacity onPress={addNode} style={styles.iconBtn}>
                    <Plus size={24} color={colors.saffron} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: insets.bottom + 40 }}>
                {/* Stats */}
                <View style={[styles.statsCard, { backgroundColor: colors.saffron + '10', borderColor: colors.saffron + '30' }]}>
                    <Cpu size={20} color={colors.saffron} />
                    <Typography variant="body" style={{ marginLeft: 12, fontWeight: 'bold' }}>
                        Cluster Health: {config.apis.filter(a => a.is_enabled).length}/{config.apis.length} Nodes Online
                    </Typography>
                </View>

                {/* Strategy Selector */}
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
                            <Typography variant="label" style={{ color: config.load_balance_strategy === s ? '#fff' : colors.mutedForeground }}>
                                {s.replace('-', ' ').toUpperCase()}
                            </Typography>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.switchRow}>
                    <View>
                        <Typography variant="body" style={{ fontWeight: 'bold' }}>Auto-Failover</Typography>
                        <Typography variant="bodySmall" color={colors.mutedForeground}>Retry next node on error</Typography>
                    </View>
                    <Switch 
                        value={config.failover_enabled} 
                        onValueChange={v => setConfig({ ...config, failover_enabled: v })}
                        trackColor={{ false: colors.borderMuted, true: colors.saffron }}
                    />
                </View>

                {/* Nodes List */}
                <Typography variant="label" style={styles.sectionLabel}>CLUSTER NODES</Typography>
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
                            <Typography variant="label" color={colors.mutedForeground} style={{ textTransform: 'uppercase' }}>{node.provider}</Typography>
                        </View>
                        
                        <View style={styles.nodeFooter}>
                            <Typography variant="bodySmall" color={colors.mutedForeground}>Priority: {node.priority}</Typography>
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

                <TouchableOpacity 
                    style={[styles.saveBtn, { backgroundColor: colors.saffron }]}
                    onPress={() => handleSave()}
                    disabled={saving}
                >
                    {saving ? <ActivityIndicator color="#fff" /> : <><Save size={20} color="#fff" /><Typography variant="body" style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}>SYNCHRONIZE ALL</Typography></>}
                </TouchableOpacity>
            </ScrollView>

            {/* Edit Modal */}
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
                                <TextInput 
                                    style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]}
                                    value={editNode.name}
                                    onChangeText={t => updateNode(editNode.id, { name: t })}
                                />

                                <Typography variant="label" style={styles.inputLabel}>PROVIDER</Typography>
                                <View style={styles.providerRow}>
                                    {['astrologyapi', 'prokerala'].map(p => (
                                        <TouchableOpacity 
                                            key={p} 
                                            style={[styles.pBtn, { borderColor: colors.borderMuted }, editNode.provider === p && { backgroundColor: colors.saffron + '20', borderColor: colors.saffron }]}
                                            onPress={() => updateNode(editNode.id, { provider: p as any })}
                                        >
                                            <Typography variant="bodySmall" style={{ color: editNode.provider === p ? colors.saffron : colors.mutedForeground }}>{p.toUpperCase()}</Typography>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                <Typography variant="label" style={styles.inputLabel}>USER / CLIENT ID</Typography>
                                <TextInput 
                                    style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]}
                                    value={editNode.user_id}
                                    onChangeText={t => updateNode(editNode.id, { user_id: t })}
                                    autoCapitalize="none"
                                />

                                <Typography variant="label" style={styles.inputLabel}>API KEY / SECRET</Typography>
                                <TextInput 
                                    style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]}
                                    value={editNode.api_key}
                                    onChangeText={t => updateNode(editNode.id, { api_key: t })}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />

                                <Typography variant="label" style={styles.inputLabel}>PRIORITY (1 = HIGHEST)</Typography>
                                <TextInput 
                                    style={[styles.input, { color: colors.foreground, borderColor: colors.borderMuted }]}
                                    value={editNode.priority.toString()}
                                    onChangeText={t => updateNode(editNode.id, { priority: parseInt(t) || 1 })}
                                    keyboardType="numeric"
                                />
                                
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
    statsCard: { padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 24, borderWidth: 1 },
    sectionLabel: { marginTop: 24, marginBottom: 12, opacity: 0.6 },
    strategyRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    strategyBtn: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 16, backgroundColor: 'rgba(0,0,0,0.03)' },
    nodeCard: { padding: 16, borderRadius: 20, borderWidth: 1, marginBottom: 12 },
    nodeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    nodeTitleRow: { flexDirection: 'row', alignItems: 'center' },
    statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
    nodeFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 12 },
    saveBtn: { height: 56, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, height: '80%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 },
    inputLabel: { marginTop: 20, marginBottom: 8 },
    input: { height: 50, borderWidth: 1, borderRadius: 12, paddingHorizontal: 16 },
    providerRow: { flexDirection: 'row', gap: 10 },
    pBtn: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center' }
});
