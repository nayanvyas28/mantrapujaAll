
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local because tsx/dotenv might be failing on Windows paths
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value;
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPujas() {
  const { data, error } = await supabase
    .from('poojas')
    .select('name, slug, images')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching pujas:', error);
    return;
  }

  console.log('--- Pujas Image Audit ---');
  data.forEach((p) => {
    const hasImage = p.images && p.images.length > 0 && p.images[0] !== '/logo.png';
    console.log(`${p.name} (${p.slug}): ${hasImage ? '✅ Has Image' : '❌ No/Logo Image'} -> ${p.images?.[0] || 'none'}`);
  });
}

checkPujas();
