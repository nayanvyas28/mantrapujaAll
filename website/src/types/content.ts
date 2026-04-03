export type Category = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    content_structure?: any; // JSONB for automation schema
    order: number;
    created_at: string;
};

export type Page = {
    id: string;
    category_id: string | null;
    title: string;
    slug: string;
    content: any; // JSONB
    order: number;
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
};
