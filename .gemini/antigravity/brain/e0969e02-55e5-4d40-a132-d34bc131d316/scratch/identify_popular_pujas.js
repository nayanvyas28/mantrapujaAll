
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { data } = await supabase.from('poojas').select('name, slug, images, is_featured, is_hero').eq('is_active', true);
  if (data) {
    const featured = data.filter(p => p.is_featured);
    const others = data.filter(p => !p.is_featured && !p.is_hero);
    const display = [...featured, ...others].slice(0, 6);
    display.forEach(p => {
       console.log(JSON.stringify(p));
    });
  }
}
check();
