
-- Migration to add author profile fields
ALTER TABLE blog_authors ADD COLUMN IF NOT EXISTS biography TEXT;
ALTER TABLE blog_authors ADD COLUMN IF NOT EXISTS philosophy TEXT;
ALTER TABLE blog_authors ADD COLUMN IF NOT EXISTS expertise TEXT;
ALTER TABLE blog_authors ADD COLUMN IF NOT EXISTS slug TEXT;

-- Update existing authors with a slug based on their name
UPDATE blog_authors SET slug = LOWER(REPLACE(name, ' ', '-')) WHERE slug IS NULL;
