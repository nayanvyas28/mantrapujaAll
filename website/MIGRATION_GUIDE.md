# Quick Migration Guide

## Step 1: Run the Migration

### Option A: Supabase Dashboard (Recommended)
1. Open https://supabase.com/dashboard
2. Select your MantraPooja project
3. Click "SQL Editor" in the left sidebar
4. Click "New query"
5. Copy the entire contents of this file:
   `/Users/sahilpatel/Documents/Growth/mantrapooja/mantrapooja-final/supabase/migrations/20260215_production_ready_complete.sql`
6. Paste into the SQL editor
7. Click "Run" (bottom right)
8. Wait for "Success" message

### Option B: Command Line (if you have psql)
```bash
# Get your database connection string from Supabase Dashboard > Settings > Database
psql "your-connection-string-here" -f supabase/migrations/20260215_production_ready_complete.sql
```

## Step 2: Verify Migration

After running, check that these tables exist in Supabase Dashboard > Table Editor:
- ✅ festivals
- ✅ locations  
- ✅ poojas (with new columns: benefits, category_id, is_active, etc.)
- ✅ categories (with new columns: content_structure_url, parent_id, order)

## Step 3: Test Webhooks

Once migration is complete, run:
```bash
node scripts/test-all-webhooks.js
```

This will test all 5 webhook endpoints:
- /api/blogs
- /api/festivals  
- /api/locations
- /api/poojas
- /api/categories

## What the Migration Does

✅ Creates `festivals` table (dates, content, SEO)
✅ Creates `locations` table (map coordinates, types)
✅ Enhances `poojas` table (7 new fields)
✅ Enhances `categories` table (3 new fields)
✅ Creates 13 performance indexes
✅ Sets up RLS policies for security
✅ Creates update triggers
✅ Grants proper permissions
✅ Inserts sample data (Maha Shivratri, Varanasi)

## Need Help?

If you encounter any errors:
1. Check the error message in Supabase
2. Look at the line number mentioned
3. The migration uses `IF NOT EXISTS` so it's safe to run multiple times
