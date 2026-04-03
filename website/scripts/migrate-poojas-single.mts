import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
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
      let rawSlug = columnsArray[3] ? columnsArray[3].replace(/^'|'$/g, '').trim() : '';
      if (!rawSlug || /^\d+$/.test(rawSlug)) {
        const cleanTitle = rawTitle.replace(/^'|'$/g, '').trim();
        rawSlug = cleanTitle.toLowerCase()
          .replace(/[,\.!?;:'"()\[\]{}|\\/]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }

      let rawDesc = unescapeSqlString(columnsArray[7] || '');
      rawDesc = rawDesc.replace(/<br\s*\/?>/gi, ' ').replace(/<\/?p>/gi, ' ').replace(/<\/?div>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

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
          { title: "Obstacle Removal", description: "Clear negativity and hurdles from your path to success.", icon: "🛡️" },
          { title: "Inner Awakening", description: "Awaken your inner consciousness and spiritual potential.", icon: "✨" }
        ],
        ritual_process_section_title: "Authentic Ritual Process",
        ritual_steps: [
          { step: "01", title: "Sankalp & Purification", description: "Taking the sacred vow and purifying the surroundings." },
          { step: "02", title: "Main Puja & Mantra Japa", description: "Chanting of powerful mantras and offering prayers." },
          { step: "03", title: "Aarti & Blessings", description: "Concluding with the divine Aarti and receiving blessings." }
        ],
        ritual_badges: ["Vedic Mantras", "Authentic Samagri", "Dedicated Priests", "Pure Intentions"],
        blessings_section_title: "Divine Benefits",
        blessings_cards: [
          { title: "Peace & Harmony", description: "Invites tranquility and joy into your home.", icon: "🕊️" },
          { title: "Success & Growth", description: "Opens new pathways for personal and professional growth.", icon: "🌟" },
          { title: "Health & Wellbeing", description: "Promotes physical and mental health for you and your family.", icon: "🌿" }
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
        theme_color: "saffron",
        how_it_works: [
          { icon: '📅', title: 'Book Online', description: 'Select your preferred date and provide details.' },
          { icon: '🙏', title: 'Puja Performance', description: 'Our Pandits perform the ritual with strict Vedic vidhi.' },
          { icon: '📦', title: 'Receive Blessings', description: 'Get the video recording and sacred Prasad delivered.' }
        ],
        testimonials_list: [
          { name: "Suresh P.", avatar: "SP", rating: 5, comment: "This puja performed by Mantra Pooja pandits brought immense peace and stability to my business. Highly recommended.", location: "Mumbai" },
          { name: "Anita R.", avatar: "AR", rating: 5, comment: "The detailed explanation of every ritual step made me feel deeply connected. Exceptional service.", location: "Delhi" }
        ],
        faq_list: [
          { question: "What materials do I need to prepare?", answer: "We provide all the essential authentic Samagri required for the puja. You only need to arrange fresh flowers and fruits." },
          { question: "Can I participate in the puja online?", answer: "Yes, we provide a secure, high-quality live video link so you and your family can participate from anywhere in the world." }
        ]
      });
    }
  }

  console.log(`Found ${allPoojas.length} poojas in SQL dump to migrate. Generating batch files...`);

  if (allPoojas.length === 0) return;

  function escapeSqlString(val: string): string {
    return `'${val.replace(/'/g, "''")}'`;
  }

  function formatValue(key: string, val: any): string {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
    if (typeof val === 'number') return val.toString();

    // Arrays of objects or complex objects -> JSONB
    if (['pricing', 'why_perform_cards', 'ritual_steps', 'how_it_works', 'blessings_cards', 'testimonials_list', 'faq_list'].includes(key)) {
      // Double escape single quotes so they survive the SQL insert
      const jsonStr = JSON.stringify(val).replace(/'/g, "''");
      return `'${jsonStr}'::jsonb`;
    }

    // Arrays of strings -> text[]
    if (['images', 'ritual_badges', 'timing_occasions_list', 'tags', 'benefits'].includes(key)) {
      if (!Array.isArray(val) || val.length === 0) return 'ARRAY[]::text[]';
      return `ARRAY[${val.map(v => escapeSqlString(v)).join(', ')}]::text[]`;
    }

    return escapeSqlString(String(val));
  }

  let sqlOutput = `-- Migration generated by script - Full Collection\n\n`;

  for (const pooja of allPoojas) {
    const columns = Object.keys(pooja);
    const values = columns.map(col => formatValue(col, (pooja as any)[col]));

    // For ON CONFLICT updates, exclude slug and created_at
    const updateCols = columns.filter(c => c !== 'slug' && c !== 'created_at');
    const updateSets = updateCols.map(c => `"${c}" = EXCLUDED."${c}"`).join(',\n    ');

    sqlOutput += `INSERT INTO public.poojas (\n  ${columns.map(c => `"${c}"`).join(',\n  ')}\n) \nVALUES (\n  ${values.join(',\n  ')}\n)\nON CONFLICT (slug) DO UPDATE SET\n    ${updateSets};\n\n`;
  }

  const outputPath = path.join(process.cwd(), 'docs', `poojas_migration_full.sql`);
  fs.writeFileSync(outputPath, sqlOutput);
  console.log(`Generated single SQL file with ${allPoojas.length} entries at: ${outputPath}`);
}

migratePoojas().catch(console.error);
