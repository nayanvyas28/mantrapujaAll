'use server';

import { createClient } from '@/utils/supabase/server';

interface SectionUpdatePayload {
    sectionId: string;
    tableName: string;
    items: {
        id: string; // or number depending on DB, assume string/number
        isSelected: boolean;
        home_order: number;
    }[];
}

export async function saveHomeLayout(location: string, updates: SectionUpdatePayload[]) {
    const supabase = await createClient();

    for (const update of updates) {
        const { tableName, items, sectionId } = update;

        for (const item of items) {
            const updatePayload: any = {
                show_on_home: item.isSelected,
                home_order: item.home_order,
            };

            // Sync is_offer_999 with selection if it's the special section
            if (sectionId === 'poojas_999') {
                updatePayload.is_offer_999 = item.isSelected;
            }

            const { error } = await supabase
                .from(tableName)
                .update(updatePayload)
                .eq('id', item.id);

            if (error) {
                console.error(`Error updating table ${tableName} for id ${item.id}:`, error.message);
            }
        }
    }

    return { success: true };
}

export async function getMoreItems(tableName: string, category: string, offset: number, limit: number = 9, is999: boolean = false) {
    const supabase = await createClient();

    let query = supabase
        .from(tableName)
        .select('*')
        .eq('is_active', true)
        .or('show_on_home.is.null,show_on_home.eq.false');

    // Removing restrictive is_offer_999 check to allow picking ANY puja for the offer
    // This makes the Home Manager the source of truth for the offer status.

    const { data, error } = await query.range(offset, offset + limit - 1);

    if (error || !data) {
        return [];
    }

    return data.map((item: any) => ({
        id: item.id.toString(),
        title: item.name || item.title || 'Untitled',
        category,
        isSelected: false,
        order: 0,
    }));
}
