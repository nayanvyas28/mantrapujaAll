import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CheckCircle } from "lucide-react-native";
import React from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../components/ui/Button";
import { Typography } from "../../components/ui/Typography";
import { useTheme } from "../../context/ThemeContext";

export default function SuccessScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme, colors } = useTheme();
    const params = useLocalSearchParams();

    const message = params.message || "Your booking was successful!";

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
            <StatusBar style={theme === "dark" ? "light" : "dark"} />

            <View style={styles.content}>
                <CheckCircle size={100} color="#10b981" />
                <Typography variant="h1" color={colors.foreground} style={styles.title}>Payment Successful!</Typography>
                <Typography variant="body" color={colors.mutedForeground} style={styles.message}>
                    {message}
                </Typography>
                <Typography variant="bodySmall" color={colors.mutedForeground} style={styles.subtext}>
                    A confirmation email and WhatsApp message has been sent to your registered number.
                </Typography>
            </View>

            <View style={[styles.footer, { paddingBottom: insets.bottom + 30 }]}>
                <Button
                    title="Return Home"
                    onPress={() => router.replace("/(tabs)")}
                    style={styles.homeButton}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    title: {
        marginTop: 30,
        marginBottom: 16,
        textAlign: "center",
    },
    message: {
        textAlign: "center",
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    subtext: {
        textAlign: "center",
        paddingHorizontal: 40,
        opacity: 0.8,
    },
    footer: {
        width: "100%",
    },
    homeButton: {
        width: "100%",
    }
});
