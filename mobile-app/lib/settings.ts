import { supabase } from './supabase';

export interface AppSettings {
  whatsapp_number_99?: string;
  support_email?: string;
  instagram_url?: string;
  facebook_url?: string;
  referral_message?: string;
  premium_upsell_message?: string;
  [key: string]: any;
}

export async function fetchAppSettings(): Promise<AppSettings> {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('key, value');

    if (error) {
      console.error('[Settings] Error fetching settings:', error.message);
      return {};
    }

    // Convert key-value rows to a single object
    return (data || []).reduce((acc: any, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  } catch (err) {
    console.error('[Settings] Critical error:', err);
    return {};
  }
}
