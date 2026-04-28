ALTER TABLE applications   ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false;
ALTER TABLE resumevariants ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false;
ALTER TABLE contacts       ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false;
