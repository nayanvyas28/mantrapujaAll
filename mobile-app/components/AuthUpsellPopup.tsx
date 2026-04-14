import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Dimensions, Platform } from 'react-native';
import { motion } from 'framer-motion'; // Actually using Animated for React Native
import { Animated, Easing } from 'react-native';
import { Typography } from './ui/Typography';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { X, LogIn, Sparkles, Wallet, Heart, ShieldCheck } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const POPUP_STORAGE_KEY = 'mantrapuja_auth_popup_seen';

export const AuthUpsellPopup = () => {
  const { colors, theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(SCREEN_HEIGHT))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (user) {
      setIsVisible(false);
      return;
    }

    const checkPopupStatus = async () => {
      try {
        const lastSeen = await AsyncStorage.getItem(POPUP_STORAGE_KEY);
        const now = Date.now();
        
        // Show after 10 seconds if not seen in the last 12 hours
        if (!lastSeen || now - parseInt(lastSeen) > 12 * 60 * 60 * 1000) {
          setTimeout(() => {
            setIsVisible(true);
            showPopup();
          }, 10000); // 10s delay
        }
      } catch (e) {
        console.error('Error checking auth popup status', e);
      }
    };

    checkPopupStatus();
  }, [user]);

  const showPopup = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closePopup = async () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(async () => {
      setIsVisible(false);
      await AsyncStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
    });
  };

  const handleLogin = () => {
    closePopup();
    router.push('/login');
  };

  if (!isVisible || user) return null;

  const Benefit = ({ icon: Icon, title, desc }: any) => (
    <View style={styles.benefitRow}>
      <View style={[styles.iconBox, { backgroundColor: colors.saffron + '15' }]}>
        <Icon size={18} color={colors.saffron} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Typography variant="body" color={colors.foreground} style={{ fontWeight: 'bold', fontSize: 13 }}>{title}</Typography>
        <Typography variant="label" color={colors.mutedForeground} style={{ fontSize: 11 }}>{desc}</Typography>
      </View>
    </View>
  );

  return (
    <Modal transparent visible={isVisible} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closePopup} />
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.sheet, 
            { 
              backgroundColor: theme === 'dark' ? '#111' : '#fff',
              transform: [{ translateY: slideAnim }],
              borderTopColor: colors.saffron + '30',
              borderTopWidth: 1
            }
          ]}
        >
          <View style={styles.handle} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Sparkles size={20} color={colors.saffron} />
                <Typography variant="h2" color={colors.foreground} style={{ marginLeft: 8 }}>Sacred Journey Awaits</Typography>
              </View>
              <TouchableOpacity onPress={closePopup} style={styles.closeBtn}>
                <X size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <Typography variant="body" color={colors.mutedForeground} style={styles.subtitle}>
              Sign in to unlock the full spiritual experience and keep your rituals synchronized.
            </Typography>

            <View style={styles.benefitsContainer}>
              <Benefit 
                icon={Wallet} 
                title="Puja Coins & Wallet" 
                desc="Secure your digital offerings and top up seamlessly." 
              />
              <Benefit 
                icon={Heart} 
                title="Personalized Rituals" 
                desc="Save your favorite Pujas and customized AI guidance." 
              />
              <Benefit 
                icon={ShieldCheck} 
                title="Session Persistence" 
                desc="Access your profile and history across all devices." 
              />
            </View>

            <TouchableOpacity 
              style={[styles.loginBtn, { backgroundColor: colors.saffron }]}
              onPress={handleLogin}
            >
              <LogIn size={20} color="#fff" />
              <Typography variant="body" color="#fff" style={styles.loginBtnText}>SIGN IN / CREATE ACCOUNT</Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.maybeLater} onPress={closePopup}>
              <Typography variant="label" color={colors.muted}>MAYBE LATER</Typography>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sheet: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 20,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    opacity: 0.3,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  benefitsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 18,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  loginBtnText: {
    fontWeight: '900',
    marginLeft: 12,
    letterSpacing: 1.5,
    fontSize: 13,
  },
  maybeLater: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  }
});
