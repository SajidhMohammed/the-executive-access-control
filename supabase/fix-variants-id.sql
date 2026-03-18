-- Run this in your Supabase SQL Editor to fix the Variants table constraint issues.

-- 1. Ensure the 'id' column has a proper UUID default
ALTER TABLE public.variants 
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 2. Ensure 'id' is NOT NULL
ALTER TABLE public.variants 
ALTER COLUMN id SET NOT NULL;

-- 3. Notify PostgREST to reload the schema
NOTIFY pgrst, 'reload schema';
