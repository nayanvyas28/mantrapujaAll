import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { createObjectCsvWriter } from 'csv-writer';

// Load env vars from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const BATCH_SIZE = 10;

function unescapeSqlString(str: string) {
  let cleaned = str.replace(/^'|'$/g, '');
  cleaned = cleaned.replace(/\\'/g, "'");
  cleaned = cleaned.replace(/\\"/g, '"');
  cleaned = cleaned.replace(/\\\\/g, '\\');
  cleaned = cleaned.replace(/\\n/g, '\n');
  return cleaned;
}

async function migratePoojas() {
  const sqlFilePath = path.join(process.cwd(), 'docs', 'mant_main (1).sql');
  if (!fs.existsSync(sqlFilePath)) {
    console.error("SQL file not found at:", sqlFilePath);
    process.exit(1);
  }

  const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');

  const allInsertBlocks: string[] = [];
  let currentIndex = 0;

  while (true) {
    const startIndex = sqlContent.indexOf('INSERT INTO `tbl_product`', currentIndex);
    if (startIndex === -1) break;

    let endIndex = startIndex;
    let inQuotes = false;
    let found = false;
    while (endIndex < sqlContent.length) {
      let char = sqlContent[endIndex];
      if (char === "'") {
        if (endIndex === 0 || sqlContent[endIndex - 1] !== '\\') {
          inQuotes = !inQuotes;
        }
      } else if (char === ';' && !inQuotes) {
        found = true;
        break;
      }
      endIndex++;
    }

    if (!found) break;

    allInsertBlocks.push(sqlContent.substring(startIndex, endIndex));
    currentIndex = endIndex + 1;
  }

  let allPoojas: any[] = [];

  for (const insertBlock of allInsertBlocks) {
    const valuesIndex = insertBlock.indexOf('VALUES');
    const valuesBlock = insertBlock.substring(valuesIndex + 6).trim();

    const rows = valuesBlock.split(/\),\s*\(/);

    for (let i = 0; i < rows.length; i++) {
      let rowStr = rows[i] || '';
      if (i === 0) rowStr = rowStr.replace(/^\s*\(/, '');
      if (i === rows.length - 1) rowStr = rowStr.replace(/\)\s*$/, '');

      const columnsArray: string[] = [];
      let currentVal = '';
      let insideQuotes = false;

      for (let j = 0; j < rowStr.length; j++) {
        const char = rowStr[j];
        if (char === "'") {
          if (j > 0 && rowStr[j - 1] === '\\') {
            currentVal += char;
          } else if (j + 1 < rowStr.length && rowStr[j + 1] === "'") {
            currentVal += char;
            j++;
            currentVal += "'";
          } else {
            insideQuotes = !insideQuotes;
            currentVal += char;
          }
        } else if (char === ',' && !insideQuotes) {
          columnsArray.push(currentVal.trim());
          currentVal = '';
        } else {
          currentVal += char;
        }
      }
      columnsArray.push(currentVal.trim());

      for (let k = 0; k < columnsArray.length; k++) {
        let val = columnsArray[k] || '';
        if (val.startsWith("'") && val.endsWith("'")) {
          val = val.substring(1, val.length - 1);
        }
        if (val === 'NULL') val = '';
        columnsArray[k] = val;
      }

      if (columnsArray.length < 35) continue;

      const pStatus = columnsArray[35];
      if (pStatus !== '1') continue;

      const rawTitle = columnsArray[2] || '';
      const rawSlug = columnsArray[3] || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      let rawDesc = unescapeSqlString(columnsArray[7] || '');
      rawDesc = rawDesc.replace(/<br\s*\/?>/gi, ' ').replace(/\n+/g, ' ').trim();

      const rawPrice = parseFloat(columnsArray[15]) || 0;
      const rawImg = unescapeSqlString(columnsArray[19]);
      const images = rawImg && rawImg !== 'NULL' ? [rawImg] : ['/logo.png'];

      let metaTitle = unescapeSqlString(rawTitle);
      let metaDesc = rawDesc.substring(0, 150);

      allPoojas.push({
        name: unescapeSqlString(rawTitle),
        slug: rawSlug,
        description: rawDesc,
        about_description: rawDesc, // Use cleaned description for the main text block
        tagline: `Experience the divine blessings of ${unescapeSqlString(rawTitle)}`,
        price: rawPrice,
        images: images,
        seo_title: metaTitle.substring(0, 200),
        seo_description: metaDesc.substring(0, 200),
        is_featured: false,
        is_hero: false,
        about_significance_text: "This sacred ritual holds immense spiritual significance, bringing peace, prosperity, and divine grace into your life.",
        about_target_audience_text: "Ideal for anyone seeking spiritual growth, overcoming obstacles, or inviting positive energy and success.",
        why_perform_section_title: "Why Perform this Puja?",
        why_perform_cards: [
          { title: "Divine Blessings", description: "Receive profound spiritual upliftment and divine grace.", icon: "🌟" },
          { title: "Obstacle Removal", description: "Clear negativity and hurdles from your path to success.", icon: "🛡️" }
        ],
        ritual_process_section_title: "Authentic Ritual Process",
        ritual_steps: [
          { step: "01", title: "Sankalp & Purification", description: "Taking the sacred vow and purifying the surroundings." },
          { step: "02", title: "Main Puja & Mantra Japa", description: "Chanting of powerful mantras and offering prayers." },
          { step: "03", title: "Aarti & Blessings", description: "Concluding with the divine Aarti and receiving blessings." }
        ],
        ritual_badges: ["Vedic Mantras", "Authentic Samagri", "Dedicated Priests"],
        blessings_section_title: "Divine Benefits",
        blessings_cards: [
          { title: "Peace & Harmony", description: "Invites tranquility and joy into your home.", icon: "peace" },
          { title: "Success & Growth", description: "Opens new pathways for personal and professional growth.", icon: "🌟" }
        ],
        timing_section_title: "Best Time",
        timing_occasions_list: ["Auspicious Days", "Festivals", "Birthdays"],
        timing_muhurat_text: "As per Panchang and Astrological Guidance.",
        timing_subtitle: "Shubh Muhurat",
        hero_badge_text: "Vedic Puja Ritual",
        hero_glass_badge_label: "Performed By",
        hero_glass_badge_value: "Certified Vedic Acharyas",
        about_heading: "Ancient Wisdom",
        about_subheading: "For Modern Life",
        main_about_title: "Spiritual Significance",
        about_significance_label: "Spiritual Significance",
        about_target_audience_label: "Who Should Perform?",
        footer_title: "Ready to Invite Divine Blessings?",
        footer_description: "Experience the sacred peace of ancient rituals. Our Vedic experts are here to help you invite prosperity into your home.",
        tags: ["Peace", "Prosperity", "Blessings"],
        benefits: ["Removes Obstacles", "Brings Wealth", "Spiritual Growth"],
        theme_color: "saffron"
      });
    }
  }

  console.log(`Found ${allPoojas.length} poojas in SQL dump to migrate. Generating batch files...`);

  if (allPoojas.length === 0) return;

  const outputPath = path.join(process.cwd(), 'docs', 'poojas_migration.csv');
  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: Object.keys(allPoojas[0]).map(key => ({ id: key, title: key }))
  });

  const records = allPoojas.map(p => {
    const formatted = { ...p };

    // Arrays of strings -> Postgres array string format {val1,val2}
    ['images', 'ritual_badges', 'timing_occasions_list', 'tags', 'benefits'].forEach(key => {
      if (Array.isArray(formatted[key])) {
        formatted[key] = `{${formatted[key].map((v: string) => `"${v.replace(/"/g, '""')}"`).join(',')}}`;
      }
    });

    // JSONB
    ['pricing', 'why_perform_cards', 'ritual_steps', 'how_it_works', 'blessings_cards', 'testimonials_list', 'faq_list'].forEach(key => {
      if (formatted[key]) {
        formatted[key] = JSON.stringify(formatted[key]);
      }
    });

    // Booleans
    formatted.is_featured = formatted.is_featured ? 'TRUE' : 'FALSE';
    formatted.is_hero = formatted.is_hero ? 'TRUE' : 'FALSE';

    return formatted;
  });

  await csvWriter.writeRecords(records);
  console.log(`Generated CSV with ${records.length} entries at: ${outputPath}`);
}

migratePoojas().catch(console.error);
