import { Metadata } from "next";
import CalculatorsPage from "./CalculatorsClient";

export const metadata: Metadata = {
    title: "Vedic Astrology Calculators - Kundli, Love, Numerology | MantraPuja",
    description: "Explore 19+ divine calculators including Love Calculator, Birth Chart, Mangal Dosha, and Numerology tools. Get accurate spiritual insights and remedies.",
    alternates: {
        canonical: "https://mantrapuja.com/calculators",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function Page() {
    return <CalculatorsPage />;
}
