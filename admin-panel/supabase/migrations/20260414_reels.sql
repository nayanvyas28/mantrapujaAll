-- Create reels table for the Divine Feed feature
CREATE TABLE IF NOT EXISTS public.reels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    title_hi TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    category TEXT DEFAULT 'Spiritual',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add basic RLS (Row Level Security) - Allow public read, restrict write to authenticated admin
ALTER TABLE public.reels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for reels"
ON public.reels FOR SELECT
USING (true);

-- Assuming service_role or admin user for writes - 
-- For simplicity in dev, allow all for now if no specific admin role is set, 
-- but in production this should be restricted.
CREATE POLICY "Allow authenticated full access for reels"
ON public.reels FOR ALL
USING (auth.role() = 'authenticated');

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_reels_updated_at
    BEFORE UPDATE ON public.reels
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
