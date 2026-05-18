import { Metadata } from "next";
import CalculatorTypePage from "./CalculatorClient";

type Props = {
    params: { type: string };
};

const calculatorNames: Record<string, string> = {
    'love': "Love Calculator",
    'friendship': "Friendship Calculator",
    'flames': "Flames Calculator",
    'sun-sign': "Sun Sign Calculator",
    'moon-sign': "Moon Sign (Rasi) Calculator",
    'moon-phase': "Moon Phase Calculator",
    'birth-chart': "Birth Chart (Natal) Calculator",
    'ascendant': "Ascendant (Lagna) Calculator",
    'nakshatra': "Nakshatra Calculator",
    'dasha': "Dasha Calculator",
    'transit': "Transit Chart Calculator",
    'mangal-dosha': "Mangal Dosha Calculator",
    'sade-sati': "Shani Sade Sati Calculator",
    'kaal-sarp': "Kaal Sarp Dosh Calculator",
    'numerology': "Name Numerology Calculator",
    'lo-shu': "Lo Shu Grid Calculator",
    'lucky-vehicle': "Lucky Vehicle Number Calculator",
    'ishta-devata': "Ishta Devata Calculator",
    'karaka': "Atma/Darakaraka Calculator"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { type } = await params;
    const name = calculatorNames[type] || "Vedic Calculator";
    
    return {
        title: `${name} - Free Online Spiritual Tools | MantraPuja`,
        description: `Use our free ${name} to get accurate Vedic insights and spiritual guidance. Discover your destiny with ancient wisdom.`,
        alternates: {
            canonical: `https://mantrapuja.com/calculators/${type}`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default function Page() {
    return <CalculatorTypePage />;
}
