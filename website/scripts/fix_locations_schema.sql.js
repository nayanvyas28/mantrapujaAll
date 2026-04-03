const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const sql = `
DO $$ 
BEGIN
    -- Add missing columns to locations if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'type') THEN
        ALTER TABLE public.locations ADD COLUMN type TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'state_id') THEN
        ALTER TABLE public.locations ADD COLUMN state_id TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'x') THEN
        ALTER TABLE public.locations ADD COLUMN x NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'y') THEN
        ALTER TABLE public.locations ADD COLUMN y NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'size') THEN
        ALTER TABLE public.locations ADD COLUMN size INTEGER DEFAULT 10;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'images') THEN
        ALTER TABLE public.locations ADD COLUMN images TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'content') THEN
        ALTER TABLE public.locations ADD COLUMN content JSONB DEFAULT '{}'::jsonb;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'is_active') THEN
        ALTER TABLE public.locations ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;

    -- Migration of old image_url to images array if applicable
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'locations' AND column_name = 'image_url') THEN
        -- We can keep it or migrate and drop. Let's just keep for safety but use images for new logic.
    END IF;
END $$;
`;

// However, I can't run raw SQL. I'll have to ask the user to run it in Supabase or use a dirty trick if possible.
// Wait, I can't even use rpc if the function doesn't exist.
// Let me check if there's any other way.

console.log("PLEASE RUN THE FOLLOWING SQL IN YOUR SUPABASE SQL EDITOR:");
console.log(sql);
