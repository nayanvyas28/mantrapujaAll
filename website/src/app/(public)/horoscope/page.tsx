import { Metadata } from "next";
import HoroscopePage from "./HoroscopeClient";

export const metadata: Metadata = {
    title: "Free Daily Horoscope - Zodiac Sign Predictions | MantraPuja",
    description: "Read your free daily horoscope today. Get accurate zodiac sign predictions for Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces.",
    alternates: {
        canonical: "https://mantrapuja.com/horoscope",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function Page() {
    return <HoroscopePage />;
}
