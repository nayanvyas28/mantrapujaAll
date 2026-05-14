require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fullAudit() {
  console.log("🔍 --- STARTING FULL HOMEPAGE IMAGE AUDIT --- 🔍\n");

  // 1. Hero Banners
  const { data: banners } = await supabase.from('home_banners').select('image_url').eq('is_active', true).limit(1);
  console.log("🚩 HERO BANNERS:");
  console.log("Source:", banners?.[0]?.image_url ? "SUPABASE" : "MISSING");
  console.log("Sample URL:", banners?.[0]?.image_url, "\n");

  // 2. Puja Cards
  const { data: pujas } = await supabase.from('poojas').select('images').eq('is_active', true).limit(1);
  console.log("🚩 PUJA CARDS:");
  console.log("Source:", (pujas?.[0]?.images?.[0]?.startsWith('http')) ? "SUPABASE (Remote)" : "LOCAL/FALLBACK");
  console.log("Sample URL:", pujas?.[0]?.images?.[0], "\n");

  // 3. Locations
  const { data: locs } = await supabase.from('destinations').select('home_image_url, images').eq('show_on_home', true).limit(1);
  const locImg = locs?.[0]?.home_image_url || locs?.[0]?.images?.[0];
  console.log("🚩 SACRED LOCATIONS:");
  console.log("Source:", (locImg?.startsWith('http')) ? "SUPABASE (Remote)" : "LOCAL/FALLBACK");
  console.log("Sample URL:", locImg, "\n");

  // 4. Features (How it works section)
  const { data: features } = await supabase.from('home_features').select('image_url').limit(1);
  console.log("🚩 HOW IT WORKS / FEATURES:");
  console.log("Source:", (features?.[0]?.image_url?.startsWith('http')) ? "SUPABASE (Remote)" : "LOCAL/FALLBACK");
  console.log("Sample URL:", features?.[0]?.image_url, "\n");

  // 5. Blogs
  const { data: blogs } = await supabase.from('Final_blog').select('image_url').limit(1);
  console.log("🚩 BLOGS:");
  console.log("Source:", (blogs?.[0]?.image_url?.startsWith('http')) ? "SUPABASE (Remote)" : "LOCAL/FALLBACK");
  console.log("Sample URL:", blogs?.[0]?.image_url, "\n");

  console.log("🚩 STATIC ASSETS (HARDCODED IN CODE):");
  console.log("- Logo: LOCAL (/logo.png)");
  console.log("- Vedic Icons (Scatter): LOCAL (/zodiac/*.png, /bhagwan/*.png)");
  console.log("- Social Icons: LOCAL (/whatsapp-icon.png)");
  console.log("- Loaders: LOCAL (/premium-loader.png)");

  console.log("\n🔍 --- AUDIT COMPLETE --- 🔍");
}

fullAudit();
