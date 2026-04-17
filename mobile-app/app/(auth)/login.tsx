import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, Lock, Loader2, MessageSquare, ArrowRight, User as UserIcon } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { StatusBar } from 'expo-status-bar';

type AuthStep = 'PHONE' | 'DETAILS' | 'OTP' | 'PASSWORD';

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithPassword } = useAuth();
  
  const [step, setStep] = useState<AuthStep>('PHONE');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isExisting, setIsExisting] = useState(false);

  // Normalize phone for backend calls - ensure we handle both 10-digit and international
  const normalizedPhone = phone.replace(/[^\d]/g, '').slice(-10);
  const fullPhone = `+91${normalizedPhone}`;

  const handlePhoneSubmit = async () => {
    if (normalizedPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      console.log(`[Login] Checking user: ${fullPhone}`);
      const response = await api.checkUser(fullPhone);
      setIsExisting(response.exists);
      
      if (response.exists) {
        setStep('PASSWORD');
      } else {
        setStep('DETAILS');
      }
    } catch (error: any) {
      console.error('[Login] checkUser error:', error);
      const errorMsg = error.message || (typeof error === 'string' ? error : 'Network timeout or blocked connection');
      Alert.alert('Connection Issue', `Could not reach sanctuary: ${errorMsg}. Please check if you are using HTTPS.`);
    } finally {
      setLoading(false);
    }
  };

  const handleInitialRegister = async () => {
    if (!fullName.trim() || !password.trim()) {
      Alert.alert('Information Missing', 'Please enter your name and choose a password.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        phone: fullPhone,
        full_name: fullName,
        password: password
      };
      console.log(`[Auth] Initiating registration for: ${fullPhone}`, payload);
      const response = await api.initiateRegister(payload);
      console.log(`[Auth] Registration Response:`, JSON.stringify(response, null, 2));
      setStep('OTP');
    } catch (error: any) {
      console.error('[Auth] Registration error:', error);
      Alert.alert('Error', error.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (manualOtp?: string) => {
    const currentOtp = (manualOtp || otp).trim();
    if (currentOtp.length < 6 || loading) return;

    setLoading(true);
    try {
      // If password is blank, we are in Forgot Password / OTP login flow
      if (!password && isExisting) {
        console.log(`[Auth] Verifying direct login OTP for: ${fullPhone}`, { phone: fullPhone, otp: currentOtp });
        const response = await api.verifyLoginOtp(fullPhone, currentOtp);
        if (response.verified) {
           Alert.alert('Success', 'Phone verified! You are now logged in.');
        }
      } else {
        const payload = {
          phone: fullPhone,
          otp: currentOtp,
          purpose: isExisting ? 'LOGIN_VERIFICATION' : 'REGISTER',
          password: password 
        };
        console.log(`[Auth] Verifying OTP for: ${fullPhone}`, payload);
        const response = await api.verifyOtp(payload);

        if (response.verified) {
          const { error } = await signInWithPassword(fullPhone, password);
          if (error) Alert.alert('Login Failed', 'The password provided seems incorrect after verification.');
        }
      }
    } catch (error: any) {
      Alert.alert('Verification Failed', error.error || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async () => {
    setLoading(true);
    console.log(`[Auth] Attempting password login for: ${fullPhone}`);
    const { data, error } = await signInWithPassword(normalizedPhone, password);
    
    if (error) {
      console.error('[Auth] Login error details:', JSON.stringify(error, null, 2));
      Alert.alert(
        'Login Failed', 
        error.message || 'Incorrect password or unverified account.'
      );
    } else {
      console.log('[Auth] Login successful:', data.user?.id);
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      console.log(`[Auth] Initiating forgot password for: ${fullPhone}`);
      const response = await api.initiateForgotPassword(fullPhone);
      console.log(`[Auth] Forgot Password Response:`, JSON.stringify(response, null, 2));
      setStep('OTP');
      setIsExisting(true);
      Alert.alert('Recovery Code Sent', 'A verification code has been sent to your WhatsApp.');
    } catch (error: any) {
      console.error('[Auth] Forgot password error:', error);
      Alert.alert('Error', error.error || 'Failed to initiate password recovery.');
    } finally {
      setLoading(false);
    }
  };

  const requestWhatsAppOtp = async () => {
    setLoading(true);
    try {
      console.log(`[Auth] Requesting WhatsApp OTP resend for: ${fullPhone}`);
      const response = await api.initiateRegister({ phone: fullPhone, full_name: fullName || 'User' });
      console.log(`[Auth] WhatsApp OTP Response:`, JSON.stringify(response, null, 2));
      setStep('OTP');
    } catch (error: any) {
      console.error('[Auth] WhatsApp OTP Error:', error);
      Alert.alert('Error', 'Could not send WhatsApp OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#FFFDFB]"
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-8">
        
        {/* Header Illustration */}
        <View className="items-center mt-20 mb-12">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4">
             <Image source={require('../../assets/images/logo.png')} className="w-20 h-20" resizeMode="contain" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 tracking-tight">Mantra Puja</Text>
          <Text className="text-gray-500 mt-2 text-center px-4">Om Namah Shivaya. Welcome to your spiritual haven.</Text>
        </View>

        {/* STEP 1: PHONE ENTRY */}
        {step === 'PHONE' && (
          <View className="space-y-6 animate-in fade-in duration-500">
            <View>
              <Text className="text-sm font-bold text-gray-700 mb-3 ml-1 uppercase tracking-widest text-[10px]">Mobile Number</Text>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-[24px] px-5 h-16 shadow-sm">
                <Text className="text-gray-400 font-bold mr-2 text-lg">+91</Text>
                <TextInput
                  className="flex-1 text-gray-900 text-lg font-medium"
                  onChangeText={setPhone}
                  value={phone}
                  placeholder="98765 43210"
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                <Phone size={20} color="#FF4D00" opacity={0.5} />
              </View>
            </View>

            <TouchableOpacity 
              onPress={handlePhoneSubmit}
              disabled={loading}
              className="bg-primary h-16 rounded-[24px] items-center justify-center shadow-xl shadow-primary/30"
            >
              {loading ? <Loader2 size={24} color="#FFF" className="animate-spin" /> : (
                <View className="flex-row items-center">
                  <Text className="text-white text-lg font-bold mr-2">Continue</Text>
                  <ArrowRight size={20} color="white" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2A: NEW USER DETAILS */}
        {step === 'DETAILS' && (
          <View className="space-y-4 animate-in slide-in-from-right duration-300">
            <Text className="text-2xl font-bold text-gray-800 mb-2">Create Account</Text>
            
            <View>
              <Text className="text-[10px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-widest">Full Name</Text>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-[24px] px-5 h-14">
                <UserIcon size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-900" placeholder="Aarti Sharma" onChangeText={setFullName} value={fullName} />
              </View>
            </View>

            <View>
              <Text className="text-[10px] font-bold text-gray-700 mb-2 ml-1 uppercase tracking-widest">Set Password</Text>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-[24px] px-5 h-14">
                <Lock size={18} color="#9CA3AF" />
                <TextInput className="flex-1 ml-3 text-gray-900" placeholder="••••••••" secureTextEntry onChangeText={setPassword} value={password} />
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleInitialRegister}
              className="bg-primary h-16 rounded-[24px] items-center justify-center mt-4 shadow-lg shadow-primary/20"
            >
              <Text className="text-white text-lg font-bold text-center">Get WhatsApp OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('PHONE')} className="items-center p-2">
              <Text className="text-gray-400">Change number</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2B: PASSWORD LOGIN */}
        {step === 'PASSWORD' && (
          <View className="space-y-4 animate-in slide-in-from-right duration-300">
            <View className="flex-row justify-between items-end mb-2">
               <Text className="text-2xl font-bold text-gray-800">Welcome Back</Text>
               <Text className="text-primary font-bold text-xs">+91 {normalizedPhone}</Text>
            </View>

            <View>
              <View className="flex-row items-center bg-white border border-gray-200 rounded-[24px] px-5 h-16 shadow-sm">
                <Lock size={20} color="#FF4D00" opacity={0.5} />
                <TextInput 
                   className="flex-1 ml-3 text-gray-900 text-lg" 
                   placeholder="Enter Password" 
                   secureTextEntry 
                   onChangeText={setPassword} 
                   value={password} 
                />
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleForgotPassword}
              className="items-end py-2"
            >
              <Text className="text-primary font-bold text-xs uppercase tracking-widest">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handlePasswordLogin} 
              disabled={loading}
              className="bg-primary h-16 rounded-[24px] items-center justify-center shadow-xl shadow-primary/30 mt-2"
            >
              {loading ? <Loader2 size={24} color="#FFF" className="animate-spin" /> : (
                <Text className="text-white text-lg font-bold">Login</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-400 text-xs uppercase font-bold">OR</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <TouchableOpacity 
              onPress={requestWhatsAppOtp}
              className="flex-row items-center justify-center h-16 border-2 border-green-500/30 bg-green-50 rounded-[24px]"
            >
              <MessageSquare size={20} color="#22C55E" />
              <Text className="text-green-600 ml-2 font-bold text-lg">Verification via WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('PHONE')} className="items-center mt-4">
              <Text className="text-gray-400">Not your account? Logout</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 3: OTP VERIFICATION */}
        {step === 'OTP' && (
          <View className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <View className="items-center">
              <Text className="text-2xl font-bold text-gray-800">Verify Code</Text>
              <Text className="text-gray-500 mt-2 text-center">We have sent a 6-digit code to your WhatsApp at +91 {normalizedPhone}</Text>
            </View>

            <TextInput
              className="bg-gray-50 border border-gray-200 rounded-[24px] h-20 text-center text-3xl font-bold tracking-[20px] text-primary"
              onChangeText={(val) => {
                setOtp(val);
                if (val.length === 6) handleVerifyOtp(val);
              }}
              value={otp}
              keyboardType="number-pad"
              maxLength={6}
              placeholder="000000"
              autoFocus
            />

            <TouchableOpacity 
              onPress={handleVerifyOtp}
              disabled={loading || otp.length < 6}
              className={`h-16 rounded-[24px] items-center justify-center shadow-lg ${otp.length === 6 ? 'bg-primary' : 'bg-gray-300'}`}
            >
              {loading ? <Loader2 size={24} color="#FFF" className="animate-spin" /> : (
                <Text className="text-white text-lg font-bold">Verify & Continue</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={requestWhatsAppOtp}
              disabled={loading}
              className="items-center"
            >
              <Text className="text-primary font-bold">Resend Code on WhatsApp</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="h-20" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
