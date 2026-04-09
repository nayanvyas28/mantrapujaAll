import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Footer } from "../../../components/ui/Footer";
import { Typography } from "../../../components/ui/Typography";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { useWallet } from "../../../context/WalletContext";
import { supabase } from "../../../utils/supabase";

export default function PujaBookingScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme, colors: themeColors } = useTheme();
  const { user, profile } = useAuth();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'wallet'>('razorpay');
  const { balance, processPayment: walletProcessPayment } = useWallet();

  // Dynamization States
  const [pooja, setPooja] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchBookingDetails = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Fetch Pooja Details (Name)
      const { data: poojaData, error: poojaError } = await supabase
        .from("poojas")
        .select("name, price, is_offer_999")
        .eq("id", id)
        .single();

      if (poojaError) throw poojaError;
      setPooja(poojaData);

      // 2. Fetch Payment Summary
      const { data: summaryData, error: summaryError } = await supabase
        .from("pooja_payment_summaries")
        .select("*")
        .eq("pooja_id", id)
        .single();

      if (!summaryError && summaryData) {
        if (poojaData.is_offer_999) {
          const customTax = summaryData.offer_999_tax || 0;
          const customDakshina = summaryData.offer_999_dakshina || 0;
          setSummary({
            ...summaryData,
            base_price: 999 - customTax - customDakshina,
            tax_amount: customTax,
            pandit_dakshina: customDakshina,
            samagri_price: 0,
            samagri_included: true,
            samagri_message: "Included in Offer",
            total_payable: 999,
          });
        } else {
          setSummary(summaryData);
        }
      } else {
        // If no summary exists, create a default fallback based on pooja base price
        const finalPrice = poojaData.is_offer_999 ? 999 : (poojaData.price || 0);
        setSummary({
          base_price: finalPrice,
          tax_amount: 0,
          tax_label: "Taxes",
          pandit_dakshina: 0,
          pandit_dakshina_label: "Pandit Dakshina",
          samagri_price: 0,
          samagri_included: true,
          samagri_message: "Included in package",
          total_payable: finalPrice,
        });
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    if (id) {
      fetchBookingDetails();
    }
  }, [id, fetchBookingDetails]);

  const handleNext = () => {
    if (step === 1) {
      if (!date || !time) {
        alert("Please select your preferred date and time.");
        return;
      }

      const payableAmount = summary?.total_payable || pooja?.price || 0;

      if (paymentMethod === 'wallet') {
        if (balance < payableAmount) {
          Alert.alert(
            "Insufficient Balance", 
            `Your wallet balance (₹${balance}) is less than the total payable (₹${payableAmount}). Please top up your wallet first.`,
            [
              { text: "Top Up Now", onPress: () => router.push('/wallet/topup') },
              { text: "Use Razorpay", onPress: () => setPaymentMethod('razorpay') },
              { text: "Cancel", style: 'cancel' }
            ]
          );
          return;
        }

        Alert.alert(
          "Confirm Payment",
          `Pay ₹${payableAmount} from your wallet balance?`,
          [
            { text: "Cancel", style: 'cancel' },
            { 
              text: "Confirm & Pay", 
              onPress: async () => {
                const success = await walletProcessPayment(
                  payableAmount, 
                  'puja_booking', 
                  `Booking for ${pooja?.name}`,
                  `WL-${Date.now()}`
                );
                if (success) {
                  // handle success locally for UI
                  try {
                    const newBooking = {
                      id: Date.now().toString(),
                      pooja_name: pooja?.name || "Puja",
                      pooja_date: date,
                      pooja_time: time,
                      amount: summary?.total_payable,
                      created_at: new Date().toISOString(),
                      payment_method: 'wallet'
                    };
                    const existing = await AsyncStorage.getItem('my_bookings');
                    const bookings = existing ? JSON.parse(existing) : [];
                    bookings.push(newBooking);
                    await AsyncStorage.setItem('my_bookings', JSON.stringify(bookings));
                  } catch (e) {}

                  setStep(2);
                }
              } 
            }
          ]
        );
        return;
      }
      
      if (payableAmount <= 0) {
        alert("This ritual cannot be booked at the moment due to a pricing update. Please contact support.");
        return;
      }

      // 1.5. Check for Digital Goods Policy Compliance (Google Play)
      // If it's a digital service (e.g. Online Pooja, Report, AI) and on Android,
      // we must use Google Play Billing.
      const digitalKeywords = ["online", "digital", "report", "consultation", "ai", "virtual"];
      const isDigital = digitalKeywords.some(k => pooja?.name?.toLowerCase().includes(k));

      if (isDigital && Platform.OS === 'android') {
        Alert.alert(
          "Payment Notice",
          "For digital services on Android, we use Google Play's secure billing system. This feature is currently being updated to comply with the latest policies. Please check back soon or contact support.",
          [{ text: "OK" }]
        );
        return;
      }
      
      const amountInPaise = payableAmount * 100;

      // 2. Fetch the Key ID from Env
      // We read EXPO_PUBLIC_RAZORPAY_KEY_ID safely
      const razorpayKeyId = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;

      if (!razorpayKeyId) {
        alert("Payment gateway is not fully configured (missing key).");
        return;
      }

      // 3. User info for pre-fill
      const userName = profile?.full_name || user?.email?.split('@')[0] || "User";
      const userPhone = user?.phone || profile?.phone || "";
      const userEmail = user?.email || "";

      const options = {
        description: `Booking for ${pooja?.name}`,
        image: "https://your-logo-url.com/logo.png", // Replace with your actual hosted logo PNG URL
        currency: "INR",
        key: razorpayKeyId,
        amount: amountInPaise,
        name: "Mantra Puja",
        prefill: {
          email: userEmail,
          contact: userPhone,
          name: userName,
        },
        theme: { color: themeColors.saffron || "#f97316" }
      };

      try {
        RazorpayCheckout.open(options)
          .then(async (data: any) => {
            // handle success
            try {
              const newBooking = {
                id: Date.now().toString(),
                pooja_name: pooja?.name || "Puja",
                pooja_date: date,
                pooja_time: time,
                amount: summary?.total_payable,
                created_at: new Date().toISOString()
              };
              const existing = await AsyncStorage.getItem('my_bookings');
              const bookings = existing ? JSON.parse(existing) : [];
              bookings.push(newBooking);
              await AsyncStorage.setItem('my_bookings', JSON.stringify(bookings));

              // In the future this should also save to a Supabase `pooja_bookings` table
            } catch (storageError) {
              console.error("Local storage error:", storageError);
            }

            setStep(2);
          })
          .catch((error: any) => {
            // handle failure
            alert(`Payment Cancelled or Failed. Reason: ${error.description || error.message || 'Unknown'}`);
          });
      } catch (err) {
        console.error("Razorpay Error:", err);
        alert("Could not open payment gateway.");
      }
    }
  };

  const handleConfirm = () => {
    // Navigate to the user's bookings after a successful booking
    router.replace("/profile/bookings");
  };

  if (step === 2) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: "transparent" },
        ]}
      >
        <StatusBar style="auto" />
        <CheckCircle2
          size={80}
          color={themeColors.success}
          style={{ marginBottom: 24 }}
        />
        <Typography
          variant="h2"
          style={{ textAlign: "center", marginBottom: 12 }}
        >
          Booking Confirmed!
        </Typography>
        <Typography
          variant="body"
          color={themeColors.mutedForeground}
          style={{
            textAlign: "center",
            paddingHorizontal: 40,
            marginBottom: 40,
          }}
        >
          Your Puja has been successfully booked. The Pandit Ji will contact you
          shortly with further details.
        </Typography>
        <Button
          title="View My Bookings"
          onPress={handleConfirm}
          style={{ paddingHorizontal: 40 }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: "transparent" }]}>
      <StatusBar style="dark" />

      <View
        style={[
          styles.header,
          {
            backgroundColor: themeColors.card,
            borderBottomColor: themeColors.borderMuted,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={themeColors.foreground} />
        </TouchableOpacity>
        <Typography variant="h3">Schedule Puja</Typography>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Typography variant="h3" style={{ marginBottom: 16 }}>
          Select Date & Time
        </Typography>

        <Card variant="solid" style={styles.formCard}>
          <Typography variant="label" color={themeColors.mutedForeground}>
            Preferred Date
          </Typography>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.border,
                backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
                color: themeColors.foreground,
              },
            ]}
            placeholder="DD/MM/YYYY"
            value={date}
            onChangeText={setDate}
          />

          <Typography
            variant="label"
            color={themeColors.mutedForeground}
            style={{ marginTop: 20 }}
          >
            Preferred Time
          </Typography>
          <TextInput
            style={[
              styles.input,
              {
                borderColor: themeColors.border,
                backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
                color: themeColors.foreground,
              },
            ]}
            placeholder="e.g. 09:00 AM"
            value={time}
            onChangeText={setTime}
          />
        </Card>

        <Typography variant="h3" style={{ marginBottom: 16, marginTop: 32 }}>
          Payment Summary
        </Typography>
        {loading ? (
          <Typography variant="body" color={themeColors.mutedForeground}>
            Loading summary...
          </Typography>
        ) : (
          <Card variant="solid" style={styles.formCard}>
            <View style={styles.summaryRow}>
              <Typography variant="body">
                {pooja?.name || "Maha Mrityunjaya Jaap"}
              </Typography>
              <Typography variant="body">
                ₹{summary?.base_price || 0}
              </Typography>
            </View>

            {(summary?.tax_amount > 0 || summary?.tax_label) && (
              <View style={styles.summaryRow}>
                <Typography variant="body" color={themeColors.mutedForeground}>
                  {summary?.tax_label}
                </Typography>
                <Typography variant="body">
                  {summary?.tax_amount > 0
                    ? `₹${summary.tax_amount}`
                    : "Included"}
                </Typography>
              </View>
            )}

            <View style={styles.summaryRow}>
              <Typography variant="body" color={themeColors.mutedForeground}>
                {summary?.pandit_dakshina_label || "Pandit Dakshina"}
              </Typography>
              <Typography variant="body">
                {summary?.pandit_dakshina > 0
                  ? `₹${summary.pandit_dakshina}`
                  : "Included"}
              </Typography>
            </View>

            <View style={styles.summaryRow}>
              <View style={{ flex: 1 }}>
                <Typography variant="body" color={themeColors.mutedForeground}>
                  Samagri (Materials)
                </Typography>
                {!summary?.samagri_included ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    <AlertCircle
                      size={14}
                      color="#ef4444"
                      style={{ marginRight: 4 }}
                    />
                    <Typography variant="bodySmall" color="#ef4444">
                      {summary?.samagri_message &&
                        summary.samagri_message !== "Included in package"
                        ? summary.samagri_message
                        : "Samagri is not included, you will get the list in your message."}
                    </Typography>
                  </View>
                ) : summary?.samagri_message ? (
                  <Typography
                    variant="bodySmall"
                    color={themeColors.saffron}
                    style={{ marginTop: 4 }}
                  >
                    {summary.samagri_message}
                  </Typography>
                ) : null}
              </View>
              <Typography variant="body">
                {summary?.samagri_price > 0
                  ? `₹${summary.samagri_price}`
                  : summary?.samagri_included
                    ? "Included"
                    : "-"}
              </Typography>
            </View>

            <View
              style={[
                styles.divider,
                { backgroundColor: themeColors.borderMuted },
              ]}
            />

            <View style={styles.summaryRow}>
              <Typography variant="body" style={{ fontWeight: "bold" }}>
                Total Payable
              </Typography>
              <Typography variant="h3" color={themeColors.saffron}>
                ₹{summary?.total_payable || pooja?.price || 0}
              </Typography>
            </View>
          </Card>
        )}

        <Typography variant="h3" style={{ marginBottom: 16, marginTop: 32 }}>
          Select Payment Method
        </Typography>
        <Card variant="solid" style={styles.formCard}>
          <TouchableOpacity 
            style={[styles.paymentOption, { borderColor: paymentMethod === 'wallet' ? themeColors.saffron : themeColors.borderMuted }]}
            onPress={() => setPaymentMethod('wallet')}
          >
            <View style={[styles.paymentRadio, { borderColor: paymentMethod === 'wallet' ? themeColors.saffron : themeColors.borderMuted }]}>
              {paymentMethod === 'wallet' && <View style={[styles.paymentRadioInner, { backgroundColor: themeColors.saffron }]} />}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Typography variant="body" style={{ fontWeight: '500' }}>Wallet Balance</Typography>
                <Typography variant="label" color={themeColors.mutedForeground}>Available: ₹{balance}</Typography>
            </View>
            {balance < (summary?.total_payable || 0) && (
                <TouchableOpacity onPress={() => router.push('/wallet/topup')}>
                    <Typography variant="label" color="#ef4444" style={{ fontWeight: 'bold' }}>TOP UP</Typography>
                </TouchableOpacity>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, { borderColor: paymentMethod === 'razorpay' ? themeColors.saffron : themeColors.borderMuted, marginTop: 12 }]}
            onPress={() => setPaymentMethod('razorpay')}
          >
            <View style={[styles.paymentRadio, { borderColor: paymentMethod === 'razorpay' ? themeColors.saffron : themeColors.borderMuted }]}>
              {paymentMethod === 'razorpay' && <View style={[styles.paymentRadioInner, { backgroundColor: themeColors.saffron }]} />}
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Typography variant="body" style={{ fontWeight: '500' }}>UPI / Cards / NetBanking</Typography>
                <Typography variant="label" color={themeColors.mutedForeground}>Fast & Secure Checkout</Typography>
            </View>
          </TouchableOpacity>
        </Card>

        <View style={{ marginTop: 32 }}>
          <Footer />
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: themeColors.card,
            borderTopColor: themeColors.borderMuted,
          },
        ]}
      >
        <Button
          title="Proceed to Pay"
          onPress={handleNext}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  formCard: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  bottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
