import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    ArrowDownLeft,
    ArrowUpRight,
    ChevronLeft,
    Search,
    Filter
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '../../components/ui/Typography';
import { useTheme } from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';

export default function WalletHistory() {
    const router = useRouter();
    const { colors, theme } = useTheme();
    const insets = useSafeAreaInsets();
    const { transactions, loading } = useWallet();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransactions = transactions.filter(tx =>
        (tx.description || tx.category).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <View style={[styles.txRow, { borderBottomColor: colors.borderMuted }]}>
            <View style={[styles.txTypeIcon, { backgroundColor: item.type === 'credit' ? '#22c55e15' : '#ef444415' }]}>
                {item.type === 'credit' ? (
                    <ArrowDownLeft size={20} color="#22c55e" />
                ) : (
                    <ArrowUpRight size={20} color="#ef4444" />
                )}
            </View>
            <View style={styles.txInfo}>
                <Typography variant="body" color={colors.foreground} style={{ fontWeight: '600' }}>
                    {item.description || item.category}
                </Typography>
                <Typography variant="label" color={colors.mutedForeground} style={{ marginTop: 2 }}>
                    {new Date(item.created_at).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Typography>
                {item.reference_id && (
                    <Typography variant="label" color={colors.saffron} style={{ marginTop: 2, fontSize: 10 }}>
                        Ref: {item.reference_id}
                    </Typography>
                )}
            </View>
            <View style={styles.txAmount}>
                <Typography variant="h3" color={item.type === 'credit' ? '#22c55e' : colors.foreground}>
                    {item.type === 'credit' ? '+' : '-'} ₹{item.amount}
                </Typography>
                <Typography variant="label" color={item.status === 'success' ? colors.success : colors.gold} style={{ textAlign: 'right', textTransform: 'capitalize' }}>
                    {item.status}
                </Typography>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={colors.foreground} />
                </TouchableOpacity>
                <Typography variant="h3" color={colors.foreground}>Transaction History</Typography>
                <TouchableOpacity style={styles.filterBtn}>
                    <Filter size={20} color={colors.foreground} />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.borderMuted }]}>
                    <Search size={18} color={colors.mutedForeground} />
                    <TextInput
                        placeholder="Search transactions..."
                        placeholderTextColor={colors.mutedForeground}
                        style={[styles.searchInput, { color: colors.foreground }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={filteredTransactions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    !loading ? (
                        <View style={styles.emptyState}>
                            <Typography variant="body" color={colors.mutedForeground}>No transactions found.</Typography>
                        </View>
                    ) : null
                }
                refreshing={loading}
                onRefresh={() => { }} // Controlled by WalletContext
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
    backBtn: { padding: 4 },
    filterBtn: { padding: 8 },
    searchContainer: { paddingHorizontal: 16, paddingVertical: 8 },
    searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 48, borderRadius: 12, borderWidth: 1 },
    searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
    listContent: { padding: 16, paddingBottom: 100 },
    txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1 },
    txTypeIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
    txInfo: { flex: 1 },
    txAmount: { alignItems: 'flex-end', marginLeft: 12 },
    emptyState: { marginTop: 100, alignItems: 'center' }
});
