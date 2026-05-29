const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LOCAL_PUJA_DIR = path.join(process.cwd(), 'public', 'pujaimages');

async function checkUrl(url) {
  if (!url || typeof url !== 'string' || !url.startsWith('http')) return false;
  
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    try {
      const req = protocol.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      });
      req.on('error', () => resolve(false));
      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.end();
    } catch (e) {
      resolve(false);
    }
  });
}

async function runAudit() {
  console.log('--- STARTING PUJA IMAGE INVENTORY ---');
  
  // First, get one record to see columns
  const { data: sample } = await supabase.from('poojas').select('*').limit(1);
  const columns = Object.keys(sample[0]);
  console.log('Available columns:', columns.join(', '));

  const imageColumns = columns.filter(c => c.toLowerCase().includes('image') || c === 'images');
  console.log('Detected image columns:', imageColumns.join(', '));

  const { data: pujas, error } = await supabase
    .from('poojas')
    .select(`id, name, slug, is_active, ${imageColumns.join(', ')}`)
    .order('name');

  if (error) {
    console.error('Supabase fetch error:', error);
    return;
  }

  const results = [];
  const localFiles = fs.readdirSync(LOCAL_PUJA_DIR).map(f => f.toLowerCase());

  for (const puja of pujas) {
    const entry = {
      id: puja.id,
      name: puja.name,
      slug: puja.slug,
      is_active: puja.is_active,
      validation: []
    };

    const imageCandidates = [];
    imageColumns.forEach(col => {
      const val = puja[col];
      if (Array.isArray(val)) {
        val.forEach(v => imageCandidates.push({ source: col, value: v }));
      } else if (val) {
        imageCandidates.push({ source: col, value: val });
      }
    });

    if (imageCandidates.length === 0) {
      entry.status = 'MISSING_ALL';
    } else {
      for (const cand of imageCandidates) {
        const trimmed = String(cand.value).trim();
        if (trimmed === '') continue;

        const v = { source: cand.source, original: trimmed, type: 'unknown', status: 'pending' };
        
        if (trimmed.startsWith('http')) {
          v.type = trimmed.includes('supabase.co') ? 'Supabase' : 
                   trimmed.includes('cloudinary.com') ? 'Cloudinary' : 'External';
          v.exists = await checkUrl(trimmed);
          v.status = v.exists ? 'VALID' : 'BROKEN_URL';
        } else if (trimmed.startsWith('/pujaimages/') || trimmed.startsWith('pujaimages/') || trimmed.startsWith('/puja images/')) {
          v.type = 'Local';
          const filename = path.basename(trimmed).toLowerCase();
          v.exists = localFiles.includes(filename);
          v.status = v.exists ? 'VALID' : 'MISSING_FILE';
        } else if (trimmed === '/diya.png' || trimmed === 'diya.png') {
          v.type = 'Fallback';
          v.exists = true;
          v.status = 'FALLBACK_REF';
        } else {
          v.type = 'Invalid';
          v.status = 'INVALID_FORMAT';
        }
        entry.validation.push(v);
      }
      
      const hasValid = entry.validation.some(v => v.status === 'VALID');
      entry.status = hasValid ? 'HEALTHY' : 'BROKEN';
    }
    results.push(entry);
  }

  const resultsPath = path.join(__dirname, 'image_inventory_results.json');
  const summaryPath = path.join(__dirname, 'image_audit_summary.json');

  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  // Summary Stats
  const summary = {
    total: results.length,
    healthy: results.filter(r => r.status === 'HEALTHY').length,
    broken: results.filter(r => r.status === 'BROKEN').length,
    missing_all: results.filter(r => r.status === 'MISSING_ALL').length,
    type_counts: {},
    status_counts: {}
  };

  results.forEach(r => {
    r.validation.forEach(v => {
      summary.type_counts[v.type] = (summary.type_counts[v.type] || 0) + 1;
      summary.status_counts[v.status] = (summary.status_counts[v.status] || 0) + 1;
    });
  });

  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log('Summary:', summary);
  console.log('--- AUDIT COMPLETE ---');
}

runAudit();
