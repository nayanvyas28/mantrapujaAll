const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env manually
const envPath = path.resolve(__dirname, '../website/.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length === 2) {
    env[parts[0].trim()] = parts[1].trim();
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
  console.log("Checking category 'rashifal'...");
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', 'rashifal')
    .maybeSingle();

  if (!category) {
    console.log("Creating 'rashifal' category...");
    const { data: newCat, error } = await supabase
      .from('categories')
      .insert([{
        name: 'Rashifal',
        slug: 'rashifal',
        description: 'Daily, Monthly, Yearly Horoscopes',
        is_active: true
      }])
      .select()
      .maybeSingle();
    
    if (error) {
      console.error("Error creating category:", error);
    } else {
      console.log("Category created:", newCat.id);
    }
  } else {
    console.log("Category already exists:", category.id);
  }
}

sync();
