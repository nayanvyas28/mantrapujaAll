import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../utils/supabase";
import { Config } from "../constants/Config";

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon: Icon,
  secure = false,
  keyboardType = "default",
  autoCapitalize = "none",
  colors,
  theme,
}: any) => {
  const [isVisible, setIsVisible] = useState(!secure);

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.foreground }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
            borderColor: colors.borderMuted,
          },
        ]}
      >
        {Icon && (
          <Icon size={20} color={colors.muted} style={styles.inputIcon} />
        )}
        <TextInput
          style={[styles.input, { color: colors.foreground }]}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure && !isVisible}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={styles.eyeIcon}
          >
            {isVisible ? (
              <EyeOff size={20} color={colors.muted} />
            ) : (
              <Eye size={20} color={colors.muted} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


export default function LoginScreen() {
  const router = useRouter();
  const { theme, colors } = useTheme();

  // Steps: 1 = Phone Number, 2 = Password input, 3 = OTP Input, 4 = New Password (Reset)
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Phone state tells us if they are logging in or signing up
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);

  // Form States
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Identify the flow
  const [authPurpose, setAuthPurpose] = useState<"REGISTER" | "RESET_PASSWORD" | "LOGIN_VERIFICATION" | null>(null);

  // New User Extra Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Resend OTP Countdown
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Custom Popup state
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"error" | "success">("error");

  // Dynamically resolve the local IP address if running via Expo Go
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localIp = debuggerHost ? debuggerHost.split(':')[0] : 'localhost';
  
  // Logic Fix: Ensure we don't accidentally hit the Supabase domain for backend logic
  const isSupabaseUrl = Config.backendUrl?.includes('mantrapuja.com') && !Config.backendUrl?.includes(':4000');
  
  const BACKEND_URL = (Config.backendUrl && !isSupabaseUrl)
    ? (Config.backendUrl.endsWith('/api/auth') ? Config.backendUrl : `${Config.backendUrl}/api/auth`)
    : (Platform.OS === 'android' && !debuggerHost ? "http://10.0.2.2:4000/api/auth" : `http://${localIp}:4000/api/auth`);

  console.log(`[AuthDebug] ENV_BACKEND_URL: ${Config.backendUrl}`);
  console.log(`[AuthDebug] Resolved BACKEND_URL: ${BACKEND_URL}`);

  const showPopup = (msg: string, type: "error" | "success" = "error") => {
    setPopupMessage(msg);
    setPopupType(type);
    setPopupVisible(true);
  };

  const normalizePhone = (input: string) => {
    // Remove all non-digits (handles spaces, hyphens, +, (), etc.)
    let cleaned = input.replace(/[^\d]/g, '');
    
    // If it starts with 91 and is 12 digits, strip the 91
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      cleaned = cleaned.substring(2);
    } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
      // Handle optional leading zero
      cleaned = cleaned.substring(1);
    }
    
    return cleaned;
  };

  const handleVerifyPhone = async () => {
    const rawInput = phone.trim();
    const normalizedPhone = normalizePhone(rawInput);

    // Once normalized, it must be exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(normalizedPhone)) {
      showPopup(
        "Please enter a valid 10-digit mobile number. You don't need to add +91.",
        "error",
      );
      return;
    }

    console.log(`[AuthDebug] Checking phone: ${normalizedPhone} at URL: ${BACKEND_URL}/check-user`);
    try {
      // Query the backend to check if the user exists
      const targetUrl = `${BACKEND_URL}/check-user?phone=${encodeURIComponent(normalizedPhone)}`;
      const response = await fetch(targetUrl);
      console.log(`[AuthDebug] Check-user response status: ${response.status} from URL: ${targetUrl}`);
      
      const checkData = await response.json();
      console.log(`[AuthDebug] Check-user response data:`, checkData);

      if (!response.ok) {
        console.warn(`[AuthDebug] Check-user returned non-OK status: ${response.status}`);
        // If it's a 401, we want to know why
        if (response.status === 401) {
          showPopup("Unauthorized access to backend. Please check your network or backend configuration.", "error");
          return;
        }
      }

      if (checkData.exists) {
        // User exists - Redirect to Password Screen
        setIsExistingUser(true);
        setPhone(normalizedPhone);
        setStep(2); 
      } else {
        // New user - MUST verify phone via OTP first
        setIsExistingUser(false);
        setAuthPurpose("REGISTER");

        const registerUrl = `${BACKEND_URL}/register`;
        console.log(`[AuthDebug] Attempting registration at: ${registerUrl}`);
        const regResponse = await fetch(registerUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: normalizedPhone }),
        });
        
        console.log(`[AuthDebug] Register response status: ${regResponse.status}`);
        const regData = await regResponse.json();
        console.log(`[AuthDebug] Register response data:`, regData);

        if (!regResponse.ok) {
          throw new Error(regData.error || "Failed to send registration OTP");
        }

        setPhone(normalizedPhone);
        setStep(3); // Go to OTP screen for NEW users
        showPopup(`New number detected. OTP sent to ${normalizedPhone}`, "success");
      }
    } catch (error: any) {
      console.error("Phone Check Error:", error.message);
      showPopup(error.message || "Could not verify phone number. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthOrInit = async () => {
    if (!password.trim() && !isExistingUser) {
      showPopup("Please enter your password.", "error");
      return;
    }

    if (isExistingUser === false) {
      if (password.length < 6) {
        showPopup("Password must be at least 6 characters long.", "error");
        return;
      }
      if (password !== confirmPassword) {
        showPopup("Passwords do not match.", "error");
        return;
      }
      // Fix: Email is optional. Only validate if it's not empty.
      if (!fullName.trim()) {
        showPopup("Please provide your full name to continue registration.", "error");
        return;
      }
      if (email.trim() && !email.includes("@")) {
        showPopup("Please provide a valid email address.", "error");
        return;
      }
    }

    const performLogin = async () => {
      // --- PRE-LOGIN VERIFICATION BYPASSED ---
      /* 
      const checkRes = await fetch(`${BACKEND_URL}/check-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalizePhone(phone) }),
      });

      if (checkRes.status === 403) {
        const checkData = await checkRes.json();
        if (checkData.error === "unverified") {
          setAuthPurpose("LOGIN_VERIFICATION");
          setStep(3); // Go to OTP
          showPopup("Your account is not verified. An OTP has been sent.", "success");
          return;
        }
      }
      */

      // --- REGULAR LOGIN ---
      // Add a safety timeout for Supabase sign-in
      const signInPromise = supabase.auth.signInWithPassword({
        phone: phone.trim(),
        password: password
      });

      const timeoutPromise = new Promise<{ data: any, error: any }>((_, reject) =>
        setTimeout(() => reject(new Error("Connection Timeout: Supabase is taking too long to respond.")), 25000)
      );

      const { data, error } = await Promise.race([signInPromise, timeoutPromise]) as any;

      // Fallback logic for Bridge email (from previous config)
      if (error && error.message.toLowerCase().includes("phone")) {
        console.log("Trying explicit query for bridge email");
        const { data: profileData } = await supabase.from("profiles").select("email").eq("phone", phone.trim()).single();
        if (profileData?.email) {
          const fallbackRes = await supabase.auth.signInWithPassword({
            email: profileData.email,
            password: password,
          });
          if (fallbackRes.error) throw fallbackRes.error;
        } else {
          throw error;
        }
      } else if (error) {
        throw error;
      }

      // Parallelize state updates and profile check
      const postLoginTasks = [
        AsyncStorage.setItem("hasSeenLogin", "true"),
        supabase.from('profiles').select('rashi, onboarding_data').eq('id', (data.user as any).id).single()
      ];

      const [_, profileRes] = await Promise.all(postLoginTasks);
      const profile = (profileRes as any).data;

      const hasBirthData = profile?.onboarding_data?.dob;
      const hasRashi = profile?.rashi || profile?.onboarding_data?.rashi;

      if (hasBirthData && hasRashi) {
        await AsyncStorage.setItem("hasFinishedOnboarding", "true");
        router.replace("/(tabs)");
      } else if (hasBirthData) {
        router.replace("/zodiac");
      } else {
        router.replace("/onboarding-details");
      }
    };

    setLoading(true);
    try {
      console.log("--- Auth/Init Attempt ---");

      if (isExistingUser) {
        await performLogin();
      } else {
        // --- NEW USER REGISTRATION ---
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

        try {
          // Now we use finalize-register since OTP is already verified at this point in the new flow
          const response = await fetch(`${BACKEND_URL}/finalize-register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: normalizePhone(phone),
              password: password,
              full_name: fullName.trim(),
              email: email.trim(),
            }),
            signal: controller.signal
          });

          clearTimeout(timeoutId);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to complete registration");
          }

          // Registration successful! Now log them in.
          setIsExistingUser(true);
          await performLogin();
        } catch (fetchError: any) {
          if (fetchError.name === 'AbortError') {
            throw new Error("Backend Timeout: The registration server is not responding.");
          }
          throw fetchError;
        }
      }


    } catch (error: any) {
      console.error("Auth/Init Error:", error.message);
      showPopup(error.message || "Failed to proceed.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length < 6) {
      showPopup("Please enter a valid 6-digit OTP", "error");
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

    try {
      if (authPurpose === "LOGIN_VERIFICATION") {
        // Verify LOGIN OTP via Custom Backend
        const response = await fetch(`${BACKEND_URL}/verify-login-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: normalizePhone(phone),
            otp: otp.trim(),
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to verify LOGIN OTP");

        // Success! Now allow the sign-in again
        setIsExistingUser(true);
        await handleAuthOrInit();
      } else if (authPurpose === "REGISTER" || authPurpose === "RESET_PASSWORD") {
        // Verify OTP via Custom Backend
        const response = await fetch(`${BACKEND_URL}/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: normalizePhone(phone),
            otp: otp.trim(),
            purpose: authPurpose,
            password: password // Register uses this
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to verify OTP");

        // The backend handles saving the profile automatically for REGISTER
        if (authPurpose === "REGISTER") {
          // Success! Now move to Step 2 to collect user details (Name, Pass, etc)
          setStep(2);
          showPopup("Phone verified! Please complete your profile details.", "success");
        } else {
          setStep(4); // Move to set new password
        }
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        showPopup("Connection Timeout: The OTP server is not responding.", "error");
      } else {
        showPopup(err.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setLoading(true);
    setResendTimer(30); // 30s Cooldown

    try {
      if (authPurpose === "REGISTER") {
        // Re-call the initial register endpoint which sends the OTP
        const response = await fetch(`${BACKEND_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: normalizePhone(phone) }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to resend OTP");
        showPopup("OTP resent successfully", "success");
      } else if (authPurpose === "RESET_PASSWORD") {
        const response = await fetch(`${BACKEND_URL}/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: normalizePhone(phone) }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to resend OTP");
        showPopup("OTP resent successfully", "success");
      } else if (authPurpose === "LOGIN_VERIFICATION") {
        const response = await fetch(`${BACKEND_URL}/check-verification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: normalizePhone(phone) }),
        });
        // The endpoint returns 403 when it sends an OTP, so we handle that correctly
        if (response.status === 403 || response.ok) {
          showPopup("OTP resent successfully", "success");
        } else {
          const data = await response.json();
          throw new Error(data.error || "Failed to resend OTP");
        }
      }
    } catch (error: any) {
      showPopup(error.message || "Failed to resend OTP");
      setResendTimer(0); // Reset cooldown on error
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      // Send OTP via Custom Backend
      const response = await fetch(`${BACKEND_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to send reset OTP");

      setAuthPurpose("RESET_PASSWORD");
      setStep(3); // Go to OTP entry
    } catch (err: any) {
      showPopup(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!password.trim() || password !== confirmPassword) {
      showPopup("Passwords do not match.", "error"); return;
    }

    setLoading(true);
    try {
      // Update password via Custom Backend
      // We pass the OTP again to prove authorization for the reset
      const response = await fetch(`${BACKEND_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.trim(),
          otp: otp.trim(),
          purpose: "RESET_PASSWORD",
          new_password: password
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to reset password");

      showPopup("Password reset successful! You can now log in.", "success");
      setStep(2); // Go to login
    } catch (err: any) {
      showPopup(err.message, "error");
    } finally {
      setLoading(false);
    }
  };


  const handleGuest = async () => {
    try {
      await AsyncStorage.setItem("hasSeenLogin", "true");
      router.replace("/(tabs)");
    } catch (e) {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            {step === 2 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setStep(step - 1)}
              >
                <ChevronLeft size={24} color={colors.foreground} />
              </TouchableOpacity>
            )}
            <Text style={[styles.title, { color: colors.foreground }]}>
              {step === 1
                ? "Welcome"
                : step === 3
                  ? "Verify Phone"
                  : step === 4
                    ? "Reset Password"
                    : isExistingUser
                      ? "Welcome Back"
                      : "Create Account"}
            </Text>
            <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
              {step === 1
                ? "Enter your phone number to continue."
                : step === 3
                  ? `Enter the 6-digit OTP sent to ${phone}`
                  : step === 4
                    ? "Enter your new password below."
                    : isExistingUser
                      ? "Enter your password to sign in."
                      : "Please provide details to complete registration."}
            </Text>
          </View>

          <View style={styles.form}>
            {step === 1 && (
              <InputField
                label="Phone Number"
                placeholder="+91 9876543210 or 9876543210"
                value={phone}
                onChangeText={(text: string) =>
                  setPhone(text.replace(/[^\d\s\+\-]/g, ""))
                }
                icon={Phone}
                keyboardType="phone-pad"
                colors={colors}
                theme={theme}
              />
            )}

            {step === 2 && (
              <>
                <View style={styles.phoneDisplay}>
                  <View>
                    <Text
                      style={[
                        styles.label,
                        { color: colors.mutedForeground, marginLeft: 0 },
                      ]}
                    >
                      Phone Number
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.foreground,
                        marginTop: 4,
                      }}
                    >
                      {phone}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => setStep(1)}>
                    <Text style={{ color: "#f97316", fontWeight: "bold" }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>

                {isExistingUser === false && (
                  <>
                    <InputField
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChangeText={setFullName}
                      icon={User}
                      autoCapitalize="words"
                      colors={colors}
                      theme={theme}
                    />
                    <InputField
                      label="Email Address (Optional)"
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      icon={Mail}
                      keyboardType="email-address"
                      colors={colors}
                      theme={theme}
                    />
                  </>
                )}

                <InputField
                  label="Password"
                  placeholder={
                    isExistingUser
                      ? "Enter your password"
                      : "Create a secure password"
                  }
                  value={password}
                  onChangeText={setPassword}
                  icon={Lock}
                  secure={true}
                  colors={colors}
                  theme={theme}
                />

                {isExistingUser === false && (
                  <InputField
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    icon={Lock}
                    secure={true}
                    colors={colors}
                    theme={theme}
                  />
                )}

                {isExistingUser === true && (
                  <TouchableOpacity onPress={handleForgotPassword} style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
                    <Text style={{ color: colors.saffron, fontWeight: "600" }}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            {step === 3 && (
              <InputField
                label="6-Digit OTP"
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                icon={Lock}
                keyboardType="number-pad"
                colors={colors}
                theme={theme}
              />
            )}

            {step === 4 && (
              <>
                <InputField
                  label="New Password"
                  placeholder="Enter new password"
                  value={password}
                  onChangeText={setPassword}
                  icon={Lock}
                  secure={true}
                  colors={colors}
                  theme={theme}
                />
                <InputField
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  icon={Lock}
                  secure={true}
                  colors={colors}
                  theme={theme}
                />
              </>
            )}

            {step === 3 && (
              <>
                <TouchableOpacity
                  style={[styles.primaryButton, { opacity: loading ? 0.7 : 1 }]}
                  onPress={handleVerifyOTP}
                  disabled={loading || otp.length < 6}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.primaryButtonText}>Verify OTP</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.resendContainer}>
                  <Text style={[styles.resendText, { color: colors.mutedForeground }]}>
                    Didn't receive the code?{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={handleResendOTP}
                    disabled={resendTimer > 0 || loading}
                  >
                    <Text
                      style={[
                        styles.resendLink,
                        { color: resendTimer > 0 ? colors.mutedForeground : colors.saffron }
                      ]}
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {step !== 3 && (
              <TouchableOpacity
                style={[styles.primaryButton, { opacity: loading ? 0.7 : 1 }]}
                onPress={
                  step === 1 ? handleVerifyPhone
                    : step === 4 ? handleResetPassword
                      : handleAuthOrInit
                }
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {step === 1
                      ? "Continue"
                      : step === 4
                        ? "Reset Password"
                        : isExistingUser
                          ? "Sign In"
                          : "Create Account"}
                  </Text>
                )}
              </TouchableOpacity>
            )}

            {step === 1 && (
              <>
                <View style={styles.dividerContainer}>
                  <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />
                  <Text style={[styles.dividerText, { color: colors.muted }]}>OR</Text>
                  <View style={[styles.divider, { backgroundColor: colors.borderMuted }]} />
                </View>

                <TouchableOpacity 
                  style={[styles.guestButton, { borderColor: colors.borderMuted }]} 
                  onPress={handleGuest}
                >
                  <Text style={[styles.guestButtonText, { color: colors.foreground }]}>Continue as Guest</Text>
                </TouchableOpacity>

                <View style={styles.infoTextContainer}>
                  <Text
                    style={[styles.infoText, { color: colors.mutedForeground }]}
                  >
                    By proceeding, you consent to get calls, WhatsApp or SMS
                    messages, including by automated means, from Mantra Puja.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Custom Popup Modal */}
      <Modal
        transparent
        visible={popupVisible}
        animationType="fade"
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.card, borderColor: colors.borderMuted },
            ]}
          >
            <View
              style={[
                styles.popupIconContainer,
                {
                  backgroundColor:
                    popupType === "error"
                      ? "rgba(239, 68, 68, 0.1)"
                      : "rgba(34, 197, 94, 0.1)",
                },
              ]}
            >
              {popupType === "error" ? (
                <AlertCircle size={32} color="#ef4444" />
              ) : (
                <CheckCircle2 size={32} color="#22c55e" />
              )}
            </View>
            <Text style={[styles.popupTitle, { color: colors.foreground }]}>
              {popupType === "error" ? "Oops!" : "Success!"}
            </Text>
            <Text
              style={[styles.popupMessage, { color: colors.mutedForeground }]}
            >
              {popupMessage}
            </Text>
            <TouchableOpacity
              style={[styles.primaryButton, { width: "100%", marginTop: 10 }]}
              onPress={() => setPopupVisible(false)}
            >
              <Text style={styles.primaryButtonText}>
                {popupType === "error" ? "Try Again" : "Okay"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    paddingVertical: 60,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    marginBottom: 16,
    marginLeft: -8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    marginBottom: 20,
  },
  phoneDisplay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
  },
  eyeIcon: {
    padding: 4,
  },
  primaryButton: {
    backgroundColor: "#f97316", // Divine Saffron
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#f97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoTextContainer: {
    marginTop: 24,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontWeight: "600",
  },
  guestButton: {
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    width: "100%",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  popupIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  popupTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  popupMessage: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '700',
  },
});
