// --- Core Content Types ---

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    content_structure?: any; // JSONB for automation schema
    order: number;
    created_at: string;
}

export interface Page {
    id: string;
    category_id: string | null;
    title: string;
    slug: string;
    content: any; // JSONB
    order: number;
    seo_title: string | null;
    seo_description: string | null;
    created_at: string;
}

// --- User & Profile Types ---

export interface UserProfile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    is_admin: boolean;
    expo_push_token: string | null;
    created_at: string;
}

// --- Notification Types ---

export type NotificationType = 'GENERAL' | 'TITHI' | 'FESTIVAL' | 'KUNDLI' | 'SYSTEM';

export interface NotificationRecord {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    image_url: string | null;
    target_user_id: string | null;
    created_at: string;
}

export interface NotificationConfig {
    enabled: boolean;
    schedule_time: string; // HH:mm
    title: string;
    body: string;
}
