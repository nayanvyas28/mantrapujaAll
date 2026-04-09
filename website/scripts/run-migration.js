#!/usr/bin/env node

/**
 * Migration Runner Script
 * Runs the production-ready migration directly via Supabase client
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
let env = {};
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length) {
            env[key.trim()] = valueParts.join('=').trim();
        }
    });
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing required environment variables:');
    console.error('   NEXT_PUBLIC_SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗');
    console.error('   SUPABASE_SERVICE_ROLE_KEY:', SUPABASE_SERVICE_KEY ? '✓' : '✗');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Color codes
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runMigration() {
    log('\n═══════════════════════════════════════════', 'blue');
    log('  RUNNING SQL MIGRATION', 'blue');
    log('═══════════════════════════════════════════', 'blue');

    // Get migration file from arguments or use default
    const argFile = process.argv[2];
    let migrationPath;

    if (argFile) {
        migrationPath = path.isAbsolute(argFile) ? argFile : path.join(process.cwd(), argFile);
    } else {
        migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260215_production_ready_complete.sql');
    }

    if (!fs.existsSync(migrationPath)) {
        log(`❌ Migration file not found: ${migrationPath}`, 'red');
        process.exit(1);
    }

    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    log('\n📄 Migration file loaded', 'cyan');
    log(`   Path: ${migrationPath}`, 'yellow');
    log(`   Size: ${migrationSQL.length} bytes`, 'yellow');

    // Split SQL into individual statements (rough split by semicolons outside of functions)
    // For complex migrations, we'll run the whole thing as one
    log('\n🚀 Executing migration...', 'cyan');

    try {
        // Use rpc to execute raw SQL
        const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL }).catch(async (err) => {
            // If exec_sql doesn't exist, we need to run statements individually
            // This is a fallback approach
            log('   Using fallback execution method...', 'yellow');

            // Execute the migration by creating tables one by one
            // We'll use the REST API directly for DDL statements
            const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_SERVICE_KEY,
                    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
                },
                body: JSON.stringify({ query: migrationSQL })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            return { data: await response.json(), error: null };
        });

        if (error) {
            log(`\n❌ Migration failed: ${error.message}`, 'red');
            console.error(error);
            process.exit(1);
        }

        log('\n✅ Migration executed successfully!', 'green');

    } catch (error) {
        log(`\n⚠️  Direct SQL execution not available. Please run migration manually:`, 'yellow');
        log('\n   Option 1: Supabase Dashboard', 'cyan');
        log('   1. Go to https://supabase.com/dashboard', 'yellow');
        log('   2. Select your project', 'yellow');
        log('   3. Go to SQL Editor', 'yellow');
        log('   4. Paste the contents of:', 'yellow');
        log(`      ${migrationPath}`, 'yellow');
        log('   5. Click "Run"', 'yellow');

        log('\n   Option 2: psql', 'cyan');
        log('   psql -h <your-db-host> -U postgres -d postgres -f supabase/migrations/20260215_production_ready_complete.sql', 'yellow');

        log('\n   The migration file is ready at:', 'cyan');
        log(`   ${migrationPath}`, 'yellow');

        return false;
    }

    // Verify tables were created
    log('\n🔍 Verifying migration...', 'cyan');

    const tablesToCheck = ['festivals', 'locations'];
    let allTablesExist = true;

    for (const table of tablesToCheck) {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(1);

        if (error && error.code === '42P01') {
            log(`   ❌ Table '${table}' not found`, 'red');
            allTablesExist = false;
        } else if (error) {
            log(`   ⚠️  Error checking '${table}': ${error.message}`, 'yellow');
        } else {
            log(`   ✅ Table '${table}' exists`, 'green');
        }
    }

    if (!allTablesExist) {
        log('\n⚠️  Some tables were not created. Please run migration manually.', 'yellow');
        return false;
    }

    log('\n═══════════════════════════════════════════', 'blue');
    log('  MIGRATION COMPLETE', 'blue');
    log('═══════════════════════════════════════════', 'blue');

    return true;
}

// Run migration
runMigration()
    .then((success) => {
        if (success) {
            log('\n✅ Ready to test webhooks!', 'green');
            log('   Run: node scripts/test-all-webhooks.js', 'cyan');
        }
        process.exit(success ? 0 : 1);
    })
    .catch((error) => {
        log(`\n❌ Unexpected error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });
