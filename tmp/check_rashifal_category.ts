import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from website directory
dotenv.config({ path: path.resolve(__dirname, '../website/.env') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCategory() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', 'rashifal')
    .maybeSingle();

  if (error) {
    console.error("Error checking category:", error);
  } else if (!data) {
    console.log("Category 'rashifal' NOT found. Initializing...");
    
    // Check if we can find any category to get a sense of the schema
    const { data: anyCat } = await supabase.from('categories').select('*').limit(1);
    console.log("Sample category schema:", anyCat);

    // Try to create it
    const { data: newCat, error: createError } = await supabase
      .from('categories')
      .insert([
        { 
          name: 'Rashifal', 
          slug: 'rashifal', 
          description: 'Daily, Monthly, and Yearly Horoscopes',
          is_active: true 
        }
      ])
      .select()
      .maybeSingle();

    if (createError) {
      console.error("Error creating category:", createError);
    } else {
      console.log("Category 'rashifal' created successfully:", newCat);
    }
  } else {
    console.log("Category 'rashifal' found:", data);
  }
}

checkCategory();
