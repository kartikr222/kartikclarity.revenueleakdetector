-- Create diagnoses table
CREATE TABLE IF NOT EXISTS public.diagnoses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email TEXT,
  inputs JSONB NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  categories JSONB NOT NULL,
  raw_response TEXT,
  ip_address INET
);

-- Index on created_at for efficient querying
CREATE INDEX IF NOT EXISTS diagnoses_created_at_idx ON public.diagnoses(created_at DESC);

-- Index on email for lookups
CREATE INDEX IF NOT EXISTS diagnoses_email_idx ON public.diagnoses(email) WHERE email IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;

-- Policy: allow public inserts (anyone can submit a diagnosis)
CREATE POLICY "Allow public inserts"
ON public.diagnoses
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: no public selects (data is private)
CREATE POLICY "No public selects"
ON public.diagnoses
FOR SELECT
TO anon
USING (false);

-- Policy: authenticated selects (for a future admin panel)
CREATE POLICY "Allow authenticated selects"
ON public.diagnoses
FOR SELECT
TO authenticated
USING (true);

COMMENT ON TABLE public.diagnoses IS 'Stores revenue leak diagnosis results';
