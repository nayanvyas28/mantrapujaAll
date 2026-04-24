
        ALTER TABLE puja_bookings ADD COLUMN IF NOT EXISTS scheduled_date TIMESTAMPTZ;
        ALTER TABLE puja_bookings ADD COLUMN IF NOT EXISTS rating INT;
        ALTER TABLE puja_bookings ADD COLUMN IF NOT EXISTS review_text TEXT;
        ALTER TABLE profiles ADD COLUMN IF NOT EXISTS address JSONB;
    