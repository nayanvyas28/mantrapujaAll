
-- PERFORMANCE OPTIMIZATION FOR Spritual_locations
CREATE INDEX IF NOT EXISTS idx_spritual_locations_content_gin ON "public"."Spritual_locations" USING GIN ("content");
CREATE INDEX IF NOT EXISTS idx_spritual_locations_slug ON "public"."Spritual_locations" ("slug");
CREATE INDEX IF NOT EXISTS idx_spritual_locations_state_id ON "public"."Spritual_locations" ("state_id");
ANALYZE "public"."Spritual_locations";
