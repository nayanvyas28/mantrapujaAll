import type { Metadata } from 'next';
import BlogContent from '@/components/blog/BlogContent';

export const metadata: Metadata = {
    title: 'Spiritual Knowledge & Divine Insights | MantraPuja Blog',
    description: 'Explore our collection of articles on Vedic rituals, astrology, and spiritual growth. Discover ancient wisdom for modern life.',
    keywords: ['Vedic Blog', 'Astrology', 'Mantra Science', 'Spiritual Guidance', 'Hindu Rituals', 'Puja Guide'],
};

export default function BlogsPage() {
    return <BlogContent />;
}
