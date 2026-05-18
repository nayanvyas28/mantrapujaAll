import { Metadata } from "next";
import KundliPage from "./KundliClient";

export const metadata: Metadata = {
    title: "Free Janam Kundli Online - Detailed Birth Chart Analysis",
    description: "Generate your free Janam Kundli online. Get detailed predictions on career, health, relationships and more using Vedic Astrology.",
    alternates: {
        canonical: "https://mantrapuja.com/kundli",
    },
    robots: {
        index: true,
        follow: true,
    }
};

export default function Page() {
    return <KundliPage />;
}
