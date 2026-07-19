-- Create push_notifications table
CREATE TABLE IF NOT EXISTS public.push_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    notification_type TEXT DEFAULT 'general', -- 'general', 'coins', 'vrat', etc.
    coin_amount INTEGER DEFAULT 0,
    target_vrat_id TEXT,
    image_url TEXT,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on status and schedule columns for fast queries
CREATE INDEX IF NOT EXISTS idx_push_notifications_status_schedule 
ON public.push_notifications (status, scheduled_date, scheduled_time);

-- Create user_push_tokens table (if missing)
CREATE TABLE IF NOT EXISTS public.user_push_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    push_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.push_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_push_tokens ENABLE ROW LEVEL SECURITY;

-- Create Policies for push_notifications (Admin bypasses using Service Role)
-- Allow authenticated users to view notifications if needed
CREATE POLICY "Allow public read access to push_notifications" 
ON public.push_notifications 
FOR SELECT 
USING (true);

-- Create Policies for user_push_tokens (Users can manage their own tokens)
CREATE POLICY "Users can insert their own push tokens" 
ON public.user_push_tokens 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own push tokens" 
ON public.user_push_tokens 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own push tokens" 
ON public.user_push_tokens 
FOR DELETE 
USING (auth.uid() = user_id);
