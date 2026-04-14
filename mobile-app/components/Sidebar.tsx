import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { 
  X, 
  User, 
  Wallet, 
  History, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Moon, 
  Sun,
  Shield,
  CircleHelp,
  Sparkles,
  Clock
} from 'lucide-react-native';
import { Typography } from './ui/Typography';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.85;

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const { theme, colors, toggleTheme } = useTheme();
  const { user, profile, signOut } = useAuth();
  const { balance } = useWallet();
  const router = useRouter();
  
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -SIDEBAR_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
    router.replace('/');
  };

  if (!isVisible && slideAnim._value === -SIDEBAR_WIDTH) return null;

  const NavItem = ({ icon: Icon, label, route, onPress, showArrow = true }: any) => (
    <TouchableOpacity 
      style={styles.navItem} 
      onPress={onPress || (() => handleNavigate(route))}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: colors.saffron + '10' }]}>
        <Icon size={20} color={colors.saffron} />
      </View>
      <Typography variant="body" style={styles.navLabel} color={colors.foreground}>{label}</Typography>
      {showArrow && <ChevronRight size={18} color={colors.muted} />}
    </TouchableOpacity>
  );

  return (
    <View 
      style={[StyleSheet.absoluteFill, { zIndex: 99999, elevation: 1000 }]} 
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      {/* Backdrop */}
      <Animated.View 
        style={[styles.backdrop, { opacity: opacityAnim }]} 
        pointerEvents={isVisible ? 'auto' : 'none'}
      >
        <TouchableOpacity 
          style={{ flex: 1 }} 
          activeOpacity={1} 
          onPress={onClose} 
        />
      </Animated.View>

      {/* Drawer */}
      <Animated.View 
        style={[
          styles.drawer, 
          { 
            backgroundColor: colors.background,
            transform: [{ translateX: slideAnim }],
            shadowColor: '#000',
            shadowOpacity: theme === 'dark' ? 0.5 : 0.1,
          }
        ]}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={[styles.avatar, { backgroundColor: colors.saffron + '20' }]}>
                {profile?.avatar_url ? (
                  <View style={styles.avatarPlaceholder}>
                     <User size={32} color={colors.saffron} />
                  </View>
                ) : (
                  <User size={32} color={colors.saffron} />
                )}
              </View>
              <View style={styles.userInfo}>
                <Typography variant="h3" color={colors.foreground} numberOfLines={1}>
                  {profile?.full_name || user?.email?.split('@')[0] || 'Guest User'}
                </Typography>
                <Typography variant="label" color={colors.mutedForeground} numberOfLines={1}>
                  {user?.email || 'Sign in to sync data'}
                </Typography>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <X size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          {/* Wallet Balance Card */}
          <TouchableOpacity 
            style={[styles.walletCard, { backgroundColor: colors.saffron }]}
            onPress={() => handleNavigate('/wallet')}
          >
            <View>
              <Typography variant="label" color="#fff" style={{ opacity: 0.8 }}>Available Balance</Typography>
              <Typography variant="h2" color="#fff" style={{ marginTop: 2 }}>{balance} Coins</Typography>
            </View>
            <View style={styles.walletIconBox}>
                <Wallet size={24} color={colors.saffron} />
            </View>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.section}>
              <Typography variant="label" color={colors.mutedForeground} style={styles.sectionTitle}>PERSONAL</Typography>
              <NavItem icon={User} label="My Profile" route="/profile" />
              <NavItem icon={Clock} label="My Bookings" route="/profile/bookings" />
              <NavItem icon={Shield} label="Account Security" route="/profile/legal" />
            </View>

            <View style={styles.section}>
              <Typography variant="label" color={colors.mutedForeground} style={styles.sectionTitle}>SETTINGS & SUPPORT</Typography>
              <TouchableOpacity 
                style={styles.navItem} 
                onPress={toggleTheme}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBox, { backgroundColor: colors.saffron + '10' }]}>
                  {theme === 'dark' ? <Sun size={20} color={colors.saffron} /> : <Moon size={20} color={colors.saffron} />}
                </View>
                <Typography variant="body" style={styles.navLabel} color={colors.foreground}>
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Typography>
                <View style={[styles.toggleTrack, { backgroundColor: theme === 'dark' ? colors.saffron : colors.border }]}>
                   <View style={[styles.toggleThumb, { left: theme === 'dark' ? 22 : 2 }]} />
                </View>
              </TouchableOpacity>
              <NavItem icon={CircleHelp} label="Help & Support" route="/profile/support" />
              <NavItem icon={Sparkles} label="Rate Application" showArrow={false} />
            </View>

            {user && (
              <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
                <LogOut size={20} color="#ef4444" />
                <Typography variant="body" style={{ marginLeft: 12, fontWeight: 'bold' }} color="#ef4444">Log Out</Typography>
              </TouchableOpacity>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <Typography variant="label" color={colors.muted}>MantraPuja v1.2.4</Typography>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 200,
    zIndex: 100000,
    // Add solid background to prevent transparency issues
    shadowColor: "#000",
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  closeBtn: {
    padding: 8,
  },
  walletCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontWeight: '900',
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 16,
    marginLeft: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 4,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    flex: 1,
    marginLeft: 14,
    fontWeight: '600',
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  }
});
