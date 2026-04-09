# Payment Gateway Setup Guide (Razorpay)

This guide outlines the steps required to configure and run the Razorpay payment gateway in the Mantra Puja Expo React Native application.

## 1. Important: Expo Go Limitations
Because Razorpay requires underlying native iOS and Android SDKs to process payments securely, it uses a package called `react-native-razorpay`. 

**🚨 `react-native-razorpay` is a native module and DOES NOT work inside the "Expo Go" app.**
If you try to run the payment flow inside Expo Go, the app will crash with a "Native module not found" error. 

To test and deploy the payment gateway, you must build a **Custom Development Client** or a Production Build using Expo Application Services (EAS).

### How to build a Dev Client:
```bash
# Install the dev client library
npx expo install expo-dev-client

# To run on an Android physical device or emulator:
npx expo run:android

# To run on an iOS simulator or physical device (requires a Mac):
npx expo run:ios
```

---

## 2. Environment Variables Setup
The application code pulls the Razorpay Key ID securely from your environment variables. 
You must set this up for both local development and production.

### Local Development
1. Create a file named `.env` in the root of your project (`MP_app_test/Test1/.env`).
2. Add your Razorpay Test Key (available from the Razorpay Dashboard):
```env
EXPO_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_here
```

### Production (EAS Build)
When building for production, you will use your LIVE Razorpay key.
If you are using EAS to build, add the secret to your `eas.json` or via the Expo Dashboard:
```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_RAZORPAY_KEY_ID": "rzp_live_your_key_here"
      }
    }
  }
}
```

---

## 3. Package Installation
Ensure the required package is installed in your project:
```bash
npm install react-native-razorpay
```

*(Note: Expo SDK 50+ automatically natively links this package during `npx expo prebuild` or `npx expo run:android`, so no manual Podfile or App.gradle edits are necessary!)*

---

## 4. How it operates in code
The integration is primarily located in `app/pujas/book/[id].tsx`.
When the user taps "Proceed to Pay":
1. We construct dynamic `options` including the `amount` (converted to paise), the `name` of the app, and the dynamic `EXPO_PUBLIC_RAZORPAY_KEY_ID`.
2. We prefill the user's details (`contact`, `name`) by fetching it correctly from the `AuthContext` profile we established earlier.
3. We call `RazorpayCheckout.open(options)`.
4. If payment is successful (handled via the `.then` block), we transition to step 2 (Booking Confirmation). If cancelled or failed (`.catch`), we show an error.

---

## Troubleshooting
- **Build Fails**: Run `npx expo prebuild --clean` to regenerate your native `android` and `ios` folders and try running again.
- **Undefined Key**: Ensure the key in your `.env` starts with exactly `EXPO_PUBLIC_`. Expo will not expose variables to the React Native frontend unless they start with this prefix.
