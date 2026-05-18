-- PRODUCTION PERFORMANCE OPTIMIZATION FOR spiritual_places
-- Goal: High-speed search, AI-extraction efficiency, and App Router scalability

-- 1. GIN INDEX ON CONTENT JSONB
-- This enables fast searches within the complex nested data like rituals and lore
CREATE INDEX IF NOT EXISTS idx_spiritual_places_content_gin ON "public"."spiritual_places" USING GIN ("content");

-- 2. INDEX ON SLUG
-- Already unique, but ensuring it is optimized for high-speed lookups during SSR
CREATE INDEX IF NOT EXISTS idx_spiritual_places_slug ON "public"."spiritual_places" ("slug");

-- 3. INDEX ON STATE_ID
-- Optimizes regional filtering and aggregation
CREATE INDEX IF NOT EXISTS idx_spiritual_places_state_id ON "public"."spiritual_places" ("state_id");

-- 4. VACUUM ANALYZE
-- Ensures the query planner has the latest statistics
ANALYZE "public"."spiritual_places";
