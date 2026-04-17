import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  Image,
  Dimensions,
  Animated,
  StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Phone, 
  Lock, 
  Loader2, 
  ArrowRight, 
  User as UserIcon,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type AuthStep = 'PHONE' | 'OTP' | 'DETAILS' | 'PASSWORD' | 'RESET_PASSWORD';

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithPassword, updatePassword, signOut } = useAuth();
  
  const [step, setStep] = useState<AuthStep>('PHONE');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isExisting, setIsExisting] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Animation for step transitions
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }, [step]);

  const normalizedPhone = phone.replace(/[^\d]/g, '').slice(-10);
  const fullPhone = `+91${normalizedPhone}`;

  const handlePhoneSubmit = async () => {
    console.log('[Login] handlePhoneSubmit clicked. Phone:', fullPhone);
    if (normalizedPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      console.log('[Login] Calling api.checkUser...');
      const response = await api.checkUser(fullPhone);
      console.log('[Login] checkUser response:', response);
      setIsExisting(response.exists);
      
      if (response.exists) {
        console.log('[Login] User exists, initiating forgot password (OTP login)...');
        await api.initiateForgotPassword(fullPhone);
        setStep('OTP');
      } else {
        console.log('[Login] New user, going to details step.');
        setStep('DETAILS');
      }
    } catch (error: any) {
      console.error('[Login] handlePhoneSubmit Error:', error);
      Alert.alert('Connection Issue', 'Could not reach server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async () => {
    console.log('[Login] handleDetailsSubmit clicked. Name:', fullName);
    setLoading(true);
    try {
      console.log('[Login] Calling api.initiateRegister...');
      await api.initiateRegister({ 
        phone: fullPhone, 
        full_name: fullName || 'Mantra User',
        password: Math.random().toString(36).slice(-8)
      });
      console.log('[Login] Register initiated, going to OTP step.');
      setStep('OTP');
    } catch (error: any) {
      console.error('[Login] handleDetailsSubmit Error:', error);
      Alert.alert('Error', error.error || 'Failed to send verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (manualOtp?: string) => {
    const currentOtp = (manualOtp || otp).trim();

    if (currentOtp.length < 6) return;
    if (loading) return;

    setLoading(true);
    try {
      const purpose = isExisting ? 'RESET_PASSWORD' : 'REGISTER';
      console.log(`\n==============================`);
      console.log(`[STEP 1] Calling verify-otp`);
      console.log(`  phone: ${fullPhone}`);
      console.log(`  otp: ${currentOtp}`);
      console.log(`  purpose: ${purpose}`);
      console.log(`  is_handshake: true`);
      console.log(`==============================`);

      const response = await api.verifyOtp({
        phone: fullPhone,
        otp: currentOtp,
        purpose,
      });

      console.log(`[STEP 2] verify-otp response:`, JSON.stringify(response, null, 2));

      const isVerified = response.verified === true || response.otp_verified === true;
      const bridgePassword = response.bridgePassword;
      const finalAuthPhone = response.finalAuthPhone || fullPhone;

      console.log(`[STEP 3] isVerified=${isVerified}, bridgePassword=${bridgePassword ? '***SET***' : 'MISSING!!!'}, finalAuthPhone=${finalAuthPhone}`);

      if (isVerified) {
        if (bridgePassword) {
            console.log(`[STEP 4] Calling signInWithPassword...`);
            console.log(`  phone: ${finalAuthPhone}`);
            console.log(`  password: [BRIDGE_PASSWORD]`);
            
            const { error: signInError } = await signInWithPassword(finalAuthPhone, bridgePassword);
            
            if (signInError) {
                console.error(`[STEP 5 ❌] signInWithPassword FAILED:`, signInError);
                Alert.alert('Session Error', `Verified but session failed: ${signInError.message}`);
                return;
            }
            
            console.log(`[STEP 5 ✅] signInWithPassword SUCCESS!`);
            
            if (isExisting) {
                console.log(`[STEP 6] Going to RESET_PASSWORD step.`);
                setStep('RESET_PASSWORD');
            } else {
                console.log(`[STEP 6] Navigating to tabs...`);
                router.replace('/(tabs)');
            }
        } else {
            console.warn(`[STEP 4 ⚠️] bridgePassword is MISSING in response! Cannot sign in to Supabase.`);
            console.warn(`  Full response was:`, JSON.stringify(response));
            Alert.alert('Divine Success', 'Verification complete!', [
              { text: "Enter Sanctuary", onPress: () => router.replace('/(tabs)') }
            ]);
        }
      } else {
        console.warn(`[STEP 3 ❌] OTP not verified. Response:`, JSON.stringify(response));
        Alert.alert('Invalid Code', 'The verification code seems incorrect.');
      }
    } catch (error: any) {
      console.error('[handleVerifyOtp ERROR]', error);
      Alert.alert('Error', error.error || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };


  const handlePasswordLogin = async () => {
    if (!password) return;
    setLoading(true);
    const { error } = await signInWithPassword(fullPhone, password);
    if (error) {
      Alert.alert('Login Failed', error.message);
    } else {
        router.replace('/(tabs)');
    }
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Incomplete', 'Please fill in both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      console.log('[Login] Attempting to reset password...');
      const { error } = await updatePassword(newPassword);
      
      if (error) {
        throw error;
      }

      console.log('[Login] Password reset successful! Navigating to tabs...');
      Alert.alert('Success', 'Password updated successfully!', [
        { text: "Continue to App", onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error: any) {
      console.error('[Login] handleResetPassword Error:', error);
      Alert.alert('Reset Failed', error.message || 'Could not update password.');
    } finally {
      setLoading(false);
    }
  };

  const requestResend = async () => {
    setLoading(true);
    try {
      if (isExisting) {
        await api.initiateForgotPassword(fullPhone);
      } else {
        await api.initiateRegister({ phone: fullPhone, full_name: fullName || 'User' });
      }
      Alert.alert('Code Resent', 'Please check your WhatsApp for a new code.');
    } catch (e) {
      Alert.alert('Error', 'Could not resend code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Refined Spiritual Background */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={['#FF4D00', '#FF8C00']} style={styles.headerGradient} />
        <View style={styles.circleOverlay1} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Logo & Branding Area - Reduced Sizes */}
          <View style={styles.brandArea}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
              <Image 
                source={require('../../assets/images/logo.png')} 
                style={styles.logo}
                resizeMode="contain" 
              />
            </Animated.View>
            <Text style={styles.brandSubtitle}>Om Namah Shivaya</Text>
            <Text style={styles.brandTitle}>Mantra Puja</Text>
          </View>

          {/* Main Auth Card */}
          <Animated.View style={[styles.authCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            
            {/* Step Content: PHONE */}
            {step === 'PHONE' && (
              <View>
                <Text style={styles.cardStepTitle}>Divine Login</Text>
                <Text style={styles.cardStepSubtitle}>Enter your phone number to begin</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mobile Number</Text>
                  <View style={styles.phoneInputRow}>
                    <View style={styles.countryCode}>
                      <Text style={styles.countryCodeText}>+91</Text>
                    </View>
                    <TextInput
                      style={styles.phoneInput}
                      onChangeText={setPhone}
                      value={phone}
                      placeholder="98765 43210"
                      keyboardType="phone-pad"
                      maxLength={10}
                      placeholderTextColor="#CBD5E1"
                    />
                    <Phone size={18} color="#FF4D00" strokeWidth={2.5} />
                  </View>
                  <Text style={styles.inputHelper}>Secure WhatsApp OTP will be sent</Text>
                </View>

                <TouchableOpacity 
                  onPress={handlePhoneSubmit}
                  disabled={loading}
                  activeOpacity={0.8}
                  style={styles.primaryButton}
                >
                  <LinearGradient 
                    colors={['#FF4D00', '#FF8C00']} 
                    start={{x:0, y:0}} 
                    end={{x:1, y:0}} 
                    style={StyleSheet.absoluteFill} 
                  />
                  {loading ? <Loader2 size={24} color="#FFF" /> : (
                    <View style={styles.buttonInner}>
                      <Text style={styles.primaryButtonText}>Continue</Text>
                      <ArrowRight size={18} color="white" strokeWidth={3} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Step Content: DETAILS */}
            {step === 'DETAILS' && (
              <View>
                <Text style={styles.cardStepTitle}>Joining Us</Text>
                <Text style={styles.cardStepSubtitle}>Introduce yourself for personalized blessings</Text>

                <View style={styles.inputGroup}>
                   <Text style={styles.inputLabel}>Full Name</Text>
                   <View style={styles.standardInputRow}>
                    <TextInput 
                       style={styles.standardInput}
                       placeholder="Enter your name"
                       onChangeText={setFullName}
                       value={fullName}
                       placeholderTextColor="#CBD5E1"
                    />
                    <UserIcon size={18} color="#FF4D00" strokeWidth={2.5} />
                  </View>
                </View>

                <TouchableOpacity 
                   onPress={handleDetailsSubmit}
                   disabled={loading}
                   activeOpacity={0.8}
                   style={styles.primaryButton}
                >
                  <LinearGradient colors={['#FF4D00', '#FF8C00']} start={{x:0, y:0}} end={{x:1, y:0}} style={StyleSheet.absoluteFill} />
                  {loading ? <Loader2 size={24} color="#FFF" /> : (
                    <Text style={styles.primaryButtonText}>Verify Number</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={handleDetailsSubmit} 
                  style={styles.textButton}
                >
                  <Text style={styles.textButtonText}>Skip for now</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step Content: OTP */}
            {step === 'OTP' && (
              <View>
                <Text style={styles.cardStepTitle}>Verify OTP</Text>
                <Text style={styles.cardStepSubtitle}>sent to +91 {normalizedPhone}</Text>

                <View style={styles.inputGroup}>
                  <TextInput
                    style={styles.otpInput}
                    onChangeText={setOtp}
                    value={otp}
                    keyboardType="number-pad"
                    maxLength={6}
                    placeholder="000000"
                    placeholderTextColor="#E2E8F0"
                  />
                </View>

                <TouchableOpacity 
                  onPress={() => handleVerifyOtp()}
                  disabled={loading || otp.length < 6}
                  activeOpacity={0.8}
                  style={[styles.primaryButton, otp.length < 6 && { opacity: 0.5 }]}
                >
                  <LinearGradient colors={['#FF4D00', '#FF8C00']} start={{x:0, y:0}} end={{x:1, y:0}} style={StyleSheet.absoluteFill} />
                  {loading ? <Loader2 size={24} color="#FFF" /> : (
                    <Text style={styles.primaryButtonText}>Verify & Continue</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.otpActions}>
                   <TouchableOpacity onPress={() => setStep('PHONE')}>
                    <Text style={styles.otpActionText}>Change Phone</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={requestResend}>
                    <Text style={styles.otpActionTextPrimary}>Resend OTP</Text>
                  </TouchableOpacity>
                </View>

                {isExisting && (
                  <TouchableOpacity 
                    onPress={() => setStep('PASSWORD')}
                    style={styles.passwordFallback}
                  >
                    <Text style={styles.passwordFallbackText}>Login with password instead</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Step Content: PASSWORD */}
            {step === 'PASSWORD' && (
              <View>
                <Text style={styles.cardStepTitle}>Secure Login</Text>
                <Text style={styles.cardStepSubtitle}>Enter your account password</Text>

                <View style={styles.inputGroup}>
                   <Text style={styles.inputLabel}>Password</Text>
                   <View style={styles.standardInputRow}>
                    <TextInput 
                       style={styles.standardInput}
                       placeholder="••••••••"
                       secureTextEntry
                       onChangeText={setPassword}
                       value={password}
                       placeholderTextColor="#CBD5E1"
                    />
                    <Lock size={18} color="#FF4D00" strokeWidth={2.5} />
                  </View>
                </View>

                <TouchableOpacity 
                  onPress={handlePasswordLogin} 
                  disabled={loading}
                  activeOpacity={0.8}
                  style={styles.primaryButton}
                >
                  <LinearGradient colors={['#FF4D00', '#FF8C00']} start={{x:0, y:0}} end={{x:1, y:0}} style={StyleSheet.absoluteFill} />
                  {loading ? <Loader2 size={24} color="#FFF" /> : (
                    <Text style={styles.primaryButtonText}>Login Now</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                   onPress={() => setStep('OTP')}
                   style={styles.textButton}
                >
                  <Text style={styles.textButtonText}>Verify with OTP</Text>
                </TouchableOpacity>
              </View>
            )}

          </Animated.View>

          {/* Footer Info */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Secure Spiritual Sanctuary</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerGradient: {
    height: '45%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  circleOverlay1: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    opacity: 0.1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  brandArea: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  logoContainer: {
    width: 84,
    height: 84,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  logo: {
    width: 56,
    height: 56,
  },
  brandSubtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 4,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  authCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    borderRadius: 40,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 30,
    elevation: 20,
  },
  cardStepTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardStepSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginLeft: 12,
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  countryCode: {
    paddingRight: 12,
    marginRight: 12,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  countryCodeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#64748B',
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    height: '100%',
  },
  inputHelper: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94A3B8',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 12,
  },
  primaryButton: {
    height: 60,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF4D00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 4,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginRight: 8,
  },
  standardInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  standardInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    height: '100%',
  },
  otpInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    height: 72,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '900',
    color: '#FF4D00',
    letterSpacing: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  textButtonText: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  otpActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  otpActionText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  otpActionTextPrimary: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#FF4D00',
    letterSpacing: 0.5,
  },
  passwordFallback: {
    marginTop: 28,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    alignItems: 'center',
  },
  passwordFallbackText: {
    color: '#FF4D00',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  }
});
