ALTER TABLE joblistings    ADD COLUMN IF NOT EXISTS snapshot_text TEXT;
ALTER TABLE joblistings    ADD COLUMN IF NOT EXISTS snapshot_date TIMESTAMPTZ;
ALTER TABLE resumevariants ADD COLUMN IF NOT EXISTS content_text  TEXT;
