-- Fix RLS Policies - Run this in Supabase SQL Editor
-- This allows public users to read and insert quotes/contacts

-- Drop old policies
DROP POLICY IF EXISTS "Allow public insert on quotes" ON public.quotes;
DROP POLICY IF EXISTS "Allow public insert on contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated full access on quotes" ON public.quotes;
DROP POLICY IF EXISTS "Allow authenticated full access on contacts" ON public.contacts;

-- Create new policies for full public access
CREATE POLICY "Allow all on quotes" ON public.quotes 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all on contacts" ON public.contacts 
  FOR ALL USING (true) WITH CHECK (true);
