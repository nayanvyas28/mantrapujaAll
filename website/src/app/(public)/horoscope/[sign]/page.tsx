import { Metadata } from "next";
import SignHoroscopePage from "./HoroscopeSignClient";

type Props = {
    params: { sign: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { sign } = await params;
    const capitalizedSign = sign.charAt(0).toUpperCase() + sign.slice(1);
    
    return {
        title: `${capitalizedSign} Horoscope Today - Daily Predictions | MantraPuja`,
        description: `Get your free daily ${capitalizedSign} horoscope. Detailed insights into love, career, family, and health for ${capitalizedSign} zodiac sign.`,
        alternates: {
            canonical: `https://mantrapuja.com/horoscope/${sign.toLowerCase()}`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

export default function Page() {
    return <SignHoroscopePage />;
}
