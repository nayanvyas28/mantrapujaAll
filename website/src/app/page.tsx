import { Metadata } from "next";
import { getSeoMetadata } from "@/lib/seo";
import HomeClient from "@/components/home/HomeClient";

export async function generateMetadata() {
    const defaultMetadata: Metadata = {
        title: "Mantra Puja - Book Authentic Vedic Poojas",
        description: "Find and book the right Pooja for every purpose. Authentic Vedic rituals at your home.",
        keywords: ["pooja", "vedic", "rituals", "hinduism", "pandit"],
        openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://mantrapooja.com/",
            siteName: "Mantra Pooja",
        },
        twitter: {
            card: "summary_large_image",
        },
    };

    return getSeoMetadata("/", defaultMetadata);
}

export default function Home() {
    return <HomeClient />;
}
