-- This script ensures the foreign key relationship between products and categories exists.
-- Run this in the Supabase SQL Editor to resolve "PGRST200" relationship errors.

-- 1. Ensure category_id column exists (it should, but just in case)
-- 2. Add the foreign key constraint if it doesn't exist

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'products_category_id_fkey' 
        AND table_name = 'products'
    ) THEN
        ALTER TABLE public.products 
        ADD CONSTRAINT products_category_id_fkey 
        FOREIGN KEY (category_id) 
        REFERENCES public.categories(id) 
        ON DELETE SET NULL;
    END IF;
END $$;

-- 3. Also ensure variants relationship exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'variants_product_id_fkey' 
        AND table_name = 'variants'
    ) THEN
        ALTER TABLE public.variants 
        ADD CONSTRAINT variants_product_id_fkey 
        FOREIGN KEY (product_id) 
        REFERENCES public.products(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- 4. Enable RLS on categories (it was missing in some versions of the script)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 5. Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
