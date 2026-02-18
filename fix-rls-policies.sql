-- Fix RLS Policies for Admin Panel Access
-- Run this SQL in your Supabase SQL Editor

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow public insert on quotes" ON public.quotes;
DROP POLICY IF EXISTS "Allow public insert on contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow authenticated full access on quotes" ON public.quotes;
DROP POLICY IF EXISTS "Allow authenticated full access on contacts" ON public.contacts;

-- Create new policies that allow public read and insert
CREATE POLICY "Allow public read and insert on quotes" ON public.quotes 
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read and insert on contacts" ON public.contacts 
  FOR ALL USING (true) WITH CHECK (true);
