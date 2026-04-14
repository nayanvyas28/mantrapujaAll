import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  Animated, 
  Linking,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { X, ExternalLink, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../utils/supabase';
import { useTheme } from '../context/ThemeContext';
import { Typography } from './ui/Typography';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const POPUP_STORAGE_KEY = '@mantrapuja_popup_seen_';

interface PopupData {
  id: string;
  name: string;
  image_mobile: string;
  redirect_type: 'internal' | 'external' | 'none';
  redirect_value: string;
  display_delay_ms: number;
  frequency: 'once' | 'session' | 'always';
}

export const MarketingPopup = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.9))[0];

  const fetchActivePopup = useCallback(async () => {
    try {
      const now = new Date().toISOString();
      console.log('[MarketingPopup] Fetching for time:', now);

      let { data, error } = await supabase
        .from('marketing_popups')
        .select('id, name, image_mobile, redirect_type, redirect_value, display_delay_ms, frequency, start_date, end_date, show_text_overlay')
        .eq('is_active', true)
        .eq('show_on_app', true)
        .lte('start_date', now)
        .or(`end_date.is.null,end_date.gte.${now}`)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      // Fallback if column doesn't exist yet
      if (error && error.code === '42703') {
        console.warn('[MarketingPopup] show_text_overlay column missing, falling back...');
        const result = await supabase
          .from('marketing_popups')
          .select('id, name, image_mobile, redirect_type, redirect_value, display_delay_ms, frequency, start_date, end_date')
          .eq('is_active', true)
          .eq('show_on_app', true)
          .lte('start_date', now)
          .or(`end_date.is.null,end_date.gte.${now}`)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        data = result.data;
        error = result.error;
        if (data) (data as any).show_text_overlay = true; // Default to true
      }

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error('[MarketingPopup] Supabase error:', error);
        } else {
          console.log('[MarketingPopup] No active campaigns for this time.');
        }
        return;
      }

      if (!data || !data.image_mobile) {
        console.log('[MarketingPopup] Campaign found but missing mobile image:', data?.name);
        return;
      }

      console.log('[MarketingPopup] Candidate found:', data.name);

      // Check frequency
      const storageKey = `${POPUP_STORAGE_KEY}${data.id}`;
      const seenData = await AsyncStorage.getItem(storageKey);

      if (data.frequency === 'once' && seenData) {
        console.log('[MarketingPopup] Skipping: Already seen once.');
        return;
      }
      
      setPopup(data as PopupData);

      // Trigger visibility after delay
      const delay = data.display_delay_ms || 2000;
      console.log(`[MarketingPopup] Scheduling display in ${delay}ms`);

      setTimeout(() => {
        setVisible(true);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 8,
            useNativeDriver: true,
          })
        ]).start();
        console.log('[MarketingPopup] Animated display triggered');
      }, delay);

    } catch (error) {
      console.error('[MarketingPopup] Critical error:', error);
    }
  }, []);

  useEffect(() => {
    fetchActivePopup();
  }, [fetchActivePopup]);

  const handleClose = async () => {
    if (popup) {
      const storageKey = `${POPUP_STORAGE_KEY}${popup.id}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify({ 
        seen_at: new Date().toISOString(),
        id: popup.id 
      }));
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => setVisible(false));
  };

  const handlePress = async () => {
    if (!popup) return;

    handleClose();

    if (popup.redirect_type === 'external' && popup.redirect_value) {
      Linking.openURL(popup.redirect_value);
    } else if (popup.redirect_type === 'internal' && popup.redirect_value) {
      if (popup.redirect_value.startsWith('puja:')) {
        const slug = popup.redirect_value.replace('puja:', '');
        router.push(`/pujas/${slug}`);
      } else {
        router.push(popup.redirect_value as any);
      }
    }
  };

  if (!visible || !popup) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container, 
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <TouchableOpacity 
            activeOpacity={0.95} 
            onPress={handlePress}
            style={styles.content}
          >
            <Image 
              source={{ uri: popup.image_mobile }} 
              style={styles.image}
              resizeMode="cover"
            />
            
            {popup.show_text_overlay !== false && popup.redirect_type !== 'none' && (
              <View style={[styles.actionBanner, { backgroundColor: colors.saffron }]}>
                <Typography variant="label" style={styles.actionText}>
                  {popup.redirect_type === 'external' ? 'Learn More' : 'Book Now'}
                </Typography>
                {popup.redirect_type === 'external' ? (
                  <ExternalLink size={16} color="#fff" />
                ) : (
                  <ChevronRight size={18} color="#fff" />
                )}
              </View>
            )}
          </TouchableOpacity>

          {/* Premium Close Button - Positioned absolutely inside the container */}
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={handleClose}
            activeOpacity={0.8}
          >
            <View style={styles.closeBtnInner}>
              <X color="#fff" size={20} />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'transparent',
    borderRadius: 30,
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 100,
  },
  closeBtnInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 24,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  }
});
