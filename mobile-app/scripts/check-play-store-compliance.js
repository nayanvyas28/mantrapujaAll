const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const PROJECT_ROOT = path.join(__dirname, '..');
const APP_JSON_PATH = path.join(PROJECT_ROOT, 'app.json');
const DOTENV_PATH = path.join(PROJECT_ROOT, '.env');

console.log('🚀 Starting Play Store Compliance Audit (Including DB Check)...\n');

const results = {
    warnings: [],
    errors: [],
    passed: []
};

// 1. Audit app.json
try {
    const rawData = fs.readFileSync(APP_JSON_PATH, 'utf8');
    const appJsonFull = JSON.parse(rawData);
    const appJson = appJsonFull.expo;
    console.log('📦 Auditing app.json metadata...');

    // Check Package Names
    if (appJson.ios?.bundleIdentifier !== appJson.android?.package) {
        results.warnings.push(`Package Mismatch: iOS (${appJson.ios?.bundleIdentifier}) vs Android (${appJson.android?.package})`);
    } else {
        results.passed.push('Package names are consistent.');
    }

    // Check Assets
    const assets = [
        { name: 'icon', path: appJson.icon },
        { name: 'android.adaptiveIcon.foregroundImage', path: appJson.android?.adaptiveIcon?.foregroundImage },
        { name: 'web.favicon', path: appJson.web?.favicon }
    ];
    assets.forEach(asset => {
        if (asset.path) {
            const assetPath = path.join(PROJECT_ROOT, asset.path);
            if (!fs.existsSync(assetPath)) {
                results.errors.push(`Missing Asset (${asset.name}): ${asset.path} not found`);
            }
        }
    });

    // Check Cleartext Traffic
    if (appJson.android?.usesCleartextTraffic === true) {
        results.warnings.push('CRITICAL: android.usesCleartextTraffic is set to true. Play Store prefers HTTPS only.');
    }

} catch (err) {
    results.errors.push(`Could not read/parse app.json: ${err.message}`);
}

// 2 & 3. Audit Files for Placeholders and HTTP
console.log('🔍 Scanning code for placeholders and non-HTTPS links...');
const placeholders = ['Test Blog', 'Placeholder', 'Dummy Data', 'Lorem Ipsum', 'Test User'];
const httpRegex = /http:\/\/(?!localhost|10\.|192\.168|127\.0\.0\.1|172\.)[a-zA-Z0-9.-]+/g;

const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules' && file !== 'assets' && file !== '.expo') scanDir(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const relPath = path.relative(PROJECT_ROOT, fullPath);

            // Check Placeholders
            placeholders.forEach(term => {
                if (content.toLowerCase().includes(term.toLowerCase())) {
                    results.warnings.push(`Placeholder Content: "${term}" found in ${relPath}`);
                }
            });

            // Check HTTP
            if (httpRegex.test(content)) {
                results.warnings.push(`Security Risk: Non-HTTPS URL found in ${relPath}`);
            }
        }
    });
};

scanDir(path.join(PROJECT_ROOT, 'app'));
scanDir(path.join(PROJECT_ROOT, 'components'));
scanDir(path.join(PROJECT_ROOT, 'utils'));

// 4. DB Check (Supabase)
async function auditDatabase() {
    console.log('🗄️  Auditing Database (Supabase) for test entries...');
    try {
        const dotenv = fs.readFileSync(DOTENV_PATH, 'utf8');
        const urlMatch = dotenv.match(/EXPO_PUBLIC_SUPABASE_URL=(.+)/);
        const keyMatch = dotenv.match(/EXPO_PUBLIC_SUPABASE_ANON_KEY=(.+)/);

        if (!urlMatch || !keyMatch) throw new Error('Missing Supabase credentials in .env');

        const supabase = createClient(urlMatch[1].trim(), keyMatch[1].trim());

        const tables = ['blogs', 'poojas', 'products_99', 'destinations'];
        const testTerms = ['Test', 'Dummy', 'Placeholder', 'Lorem'];

        for (const table of tables) {
            const { data, error } = await supabase.from(table).select('*').limit(100);
            if (error) console.warn(`Could not audit table ${table}: ${error.message}`);
            
            if (data) {
                const count = data.filter(item => {
                    const str = JSON.stringify(item).toLowerCase();
                    return testTerms.some(term => str.includes(term.toLowerCase()));
                }).length;

                if (count > 0) {
                    results.warnings.push(`DB AUDIT [${table}]: Found ${count} entries with "Test" or "Placeholder" data.`);
                }
            }
        }
    } catch (e) {
        console.warn('DB Audit skipped:', e.message);
    }
}

// 5. Build Report
async function buildReport() {
    await auditDatabase();

    // Permissions Check
    try {
        const appJson = JSON.parse(fs.readFileSync(APP_JSON_PATH, 'utf8')).expo;
        const permissions = appJson.android?.permissions || [];
        const sensitive = ['ACCESS_FINE_LOCATION', 'RECORD_AUDIO', 'CAMERA', 'ACCESS_COARSE_LOCATION'];
        console.log('🔐 Reviewing Permissions...');
        permissions.forEach(p => {
            if (sensitive.includes(p)) {
                results.warnings.push(`SENSITIVE PERMISSION: ${p} - Requires "Store Presence" disclosure.`);
            }
        });
    } catch(e) {}

    // Final Report Output
    console.log('\n--- 📝 AUDIT REPORT ---');
    if (results.errors.length > 0) {
        console.log('\n❌ ERRORS (Must Fix):');
        results.errors.forEach(e => console.log(`  - ${e}`));
    }

    if (results.warnings.length > 0) {
        console.log('\n⚠️  WARNINGS (Review Before Submitting):');
        const uniqueWarnings = [...new Set(results.warnings)];
        uniqueWarnings.slice(0, 15).forEach(w => console.log(`  - ${w}`));
        if (uniqueWarnings.length > 15) console.log(`  ... and ${uniqueWarnings.length - 15} more warnings.`);
    }

    if (results.passed.length > 0) {
        console.log('\n✅ PASSED Checks:');
        results.passed.forEach(p => console.log(`  - ${p}`));
    }

    if (results.errors.length === 0 && results.warnings.length === 0) {
        console.log('\n🌟 App looks Play Store ready!');
    } else {
        console.log('\n💡 Please address the items above to minimize rejection risk.');
    }
}

buildReport();
