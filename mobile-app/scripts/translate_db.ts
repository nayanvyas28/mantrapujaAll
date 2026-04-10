import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_URL = process.env.EXPO_PUBLIC_ADMIN_URL || "http://localhost:3001";

/**
 * STANDALONE MIGRATION SCRIPT: Automated DB Translation
 * This script runs in Node.js and uses the backend AI endpoint to translate columns.
 * 
 * Instructions:
 * 1. Ensure .env.local has EXPO_PUBLIC_SUPABASE_URL, ANON_KEY, and ADMIN_URL.
 * 2. Run: npx tsx scripts/translate_db.ts
 */

async function translateText(text: string, targetLang: string = "hi"): Promise<string> {
  const fullUrl = `${ADMIN_URL}/api/chat`;
  const prompt = `Translate the following text to ${targetLang}. Return ONLY the translation: "${text}"`;

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: prompt,
        userId: "system-translator",
        skipHistory: true
      }),
    });
    const data: any = await response.json();
    return data.text || text;
  } catch (error) {
    console.error(`[AI] Translation failed for: ${text.substring(0, 20)}...`);
    return text;
  }
}

async function translateTable(tableName: string, fields: string[]) {
  console.log(`\n[Migration] Scanning table: ${tableName}`);
  
  const { data: rows, error } = await supabase.from(tableName).select("*");
  if (error || !rows) {
    console.error(`Error fetching ${tableName}:`, error);
    return;
  }

  for (const row of rows) {
    const updates: any = {};
    let needsUpdate = false;

    for (const field of fields) {
      const hindiField = `${field}_hi`;
      
      if (!row[hindiField] || row[hindiField].trim() === "") {
        console.log(`[${tableName}] ID ${row.id}: Translating ${field}...`);
        const translated = await translateText(row[field]);
        
        if (translated && translated !== row[field]) {
          updates[hindiField] = translated;
          needsUpdate = true;
        }
      }
    }

    if (needsUpdate) {
      const { error: updateError } = await supabase
        .from(tableName)
        .update(updates)
        .eq("id", row.id);
      
      if (updateError) console.error(`Failed to update ID ${row.id}:`, updateError);
      else console.log(`[${tableName}] ID ${row.id} updated successfully.`);
    }
  }
}

async function main() {
  console.log("--- DIVINE BULK TRANSLATOR (Standalone) ---");
  
  await translateTable("poojas", ["name", "tagline", "about_description"]);
  await translateTable("destinations", ["name", "tagline", "description"]);
  await translateTable("categories", ["name"]);
  await translateTable("music_gods", ["name"]);
  await translateTable("music_songs", ["title", "artist"]);
  await translateTable("festivals", ["name", "description", "month"]);

  console.log("\n[Migration] All tables processed!");
}

main().catch(console.error);
