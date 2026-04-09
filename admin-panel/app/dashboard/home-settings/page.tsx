import { createClient } from '@/utils/supabase/server';
import HomeSettingsClient from './HomeSettingsClient';
import { redirect } from 'next/navigation';

export default async function HomePageSettings() {
    const supabase = await createClient();

    // Protect route
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    // A helper to safely fetch a section with limits
    // It guarantees that *all* currently selected items are fetched
    // AND fetches up to 9 *unselected* items, returning if it has more.
    const fetchSectionData = async (tableName: string, category: string, is999: boolean = false) => {
        let selectedQuery = supabase
            .from(tableName)
            .select('*')
            .eq('is_active', true)
            .eq('show_on_home', true);

        if (is999) {
            selectedQuery = selectedQuery.eq('is_offer_999', true);
        }

        // For candidates (unselected), we REMOVE the is999 filter
        // so that the admin can pick *any* Puja to be part of the offer.
        let unselectedQuery = supabase
            .from(tableName)
            .select('*')
            .eq('is_active', true)
            .or('show_on_home.is.null,show_on_home.eq.false');

        let countQuery = supabase
            .from(tableName)
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true)
            .or('show_on_home.is.null,show_on_home.eq.false');

        const [selectedRes, unselectedRes, countRes] = await Promise.allSettled([
            selectedQuery,
            unselectedQuery.limit(9),
            countQuery
        ]);

        // If both failed completely, return empty
        if (selectedRes.status === 'rejected' && unselectedRes.status === 'rejected') {
            return { data: [], hasMore: false };
        }

        const items: any[] = [];

        // Map selected
        if (selectedRes.status === 'fulfilled' && !selectedRes.value.error && selectedRes.value.data) {
            const mapped = selectedRes.value.data.map(item => ({
                id: item.id.toString(),
                title: item.name || item.title || 'Untitled',
                category,
                isSelected: true,
                order: item.home_order || 0
            }));
            // Sort selected by home_order out of the box
            mapped.sort((a, b) => a.order - b.order);
            items.push(...mapped);
        }

        // Map unselected (previewed initial 9)
        let totalUnselected = 0;
        if (unselectedRes.status === 'fulfilled' && !unselectedRes.value.error && unselectedRes.value.data) {
            items.push(...unselectedRes.value.data.map(item => ({
                id: item.id.toString(),
                title: item.name || item.title || 'Untitled',
                category,
                isSelected: false,
                order: 0
            })));
        }

        if (countRes.status === 'fulfilled' && !countRes.value.error) {
            totalUnselected = countRes.value.count || 0;
        }

        return {
            data: items,
            hasMore: totalUnselected > 9
        };
    };

    const sections = [
        {
            id: 'poojas',
            title: 'Featured Pujas',
            tableName: 'poojas',
            limit: 3,
            ...(await fetchSectionData('poojas', 'puja'))
        },
        {
            id: 'destinations',
            title: 'Spiritual Locations',
            tableName: 'destinations',
            limit: 4,
            ...(await fetchSectionData('destinations', 'location'))
        },
        {
            id: 'products_99',
            title: '99Products',
            tableName: 'products_99',
            limit: 5,
            ...(await fetchSectionData('products_99', 'product'))
        },

        {
            id: 'poojas_999',
            title: 'Featured ₹999 Offers',
            tableName: 'poojas',
            limit: 5,
            ...(await fetchSectionData('poojas', 'puja', true))
        },
        {
            id: 'blogs',
            title: 'Blog Articles',
            tableName: 'blogs',
            limit: 3,
            ...(await fetchSectionData('blogs', 'blog'))
        },
    ];

    return <HomeSettingsClient initialSections={sections} />;
}
