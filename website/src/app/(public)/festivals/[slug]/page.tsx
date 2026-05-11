import { notFound } from 'next/navigation';
import { getFestivalBySlug } from '@/lib/festivalData';
import { StickyBookingButton } from '@/components/festivals/StickyBookingButton';
import FestivalDetailClient from './FestivalDetailClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function FestivalDetailPage({ params }: PageProps) {
    const { slug } = await params;
    
    const festival = await getFestivalBySlug(slug);

    if (!festival) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <StickyBookingButton festivalName={festival.name} />
            <FestivalDetailClient festival={festival} />
        </div>
    );
}

