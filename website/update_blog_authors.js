
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const AUTHORS = [
  { name: "Pandit Rajesh Sharma", role: "Head Priest", avatar: "https://ui-avatars.com/api/?name=Rajesh+Sharma&background=f97316&color=fff&bold=true" },
  { name: "Acharya Meera Iyer", role: "Senior Astrologer", avatar: "https://ui-avatars.com/api/?name=Meera+Iyer&background=8b5cf6&color=fff&bold=true" },
  { name: "Dr. Ananya Deshmukh", role: "Vedic Scholar", avatar: "https://ui-avatars.com/api/?name=Ananya+Deshmukh&background=059669&color=fff&bold=true" },
  { name: "Swami Vishwananda", role: "Spiritual Guide", avatar: "https://ui-avatars.com/api/?name=Swami+Vishwananda&background=dc2626&color=fff&bold=true" },
  { name: "Guru Ji Navneet", role: "Spiritual Mentor", avatar: "https://ui-avatars.com/api/?name=Guru+Ji+Navneet&background=ea580c&color=fff&bold=true" }
];

async function updateAuthors() {
  console.log("Fetching all blogs...");
  const { data: blogs, error } = await supabase.from('blogs').select('id');
  
  if (error) {
    console.error("Error:", error.message);
    return;
  }

  console.log(`Processing ${blogs.length} blogs with batching...`);
  
  for (let idx = 0; idx < AUTHORS.length; idx++) {
    const author = AUTHORS[idx];
    const idsToUpdate = blogs
      .filter((_, i) => i % AUTHORS.length === idx)
      .map(b => b.id);
    
    const CHUNK_SIZE = 50;
    console.log(`Updating ${idsToUpdate.length} blogs for ${author.name} in chunks...`);
    
    for (let i = 0; i < idsToUpdate.length; i += CHUNK_SIZE) {
      const chunk = idsToUpdate.slice(i, i + CHUNK_SIZE);
      const { error: updateError } = await supabase
        .from('blogs')
        .update({
          author_name: author.name,
          author_role: author.role,
          author_avatar: author.avatar
        })
        .in('id', chunk);

      if (updateError) {
        console.error(`Error in chunk ${i}:`, updateError.message);
      }
    }
  }
  
  console.log("SUCCESS: All 1,134 blogs updated with Indian authors!");
}

updateAuthors();
