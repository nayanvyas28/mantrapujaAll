-- Create Festival Bookings Table
CREATE TABLE IF NOT EXISTS festival_bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    festival_name TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' -- Possible: Pending, Contacted, Completed, Cancelled
);

-- Enable RLS (Row Level Security)
ALTER TABLE festival_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public booking)
CREATE POLICY "Allow public to submit bookings" ON festival_bookings
    FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to see all bookings
CREATE POLICY "Allow admins to see all bookings" ON festival_bookings
    FOR SELECT TO authenticated USING (true);

-- Allow admins to update status
CREATE POLICY "Allow admins to update bookings" ON festival_bookings
    FOR UPDATE TO authenticated USING (true);
