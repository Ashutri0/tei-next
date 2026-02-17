-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  description TEXT NOT NULL,
  specifications TEXT[] NOT NULL DEFAULT '{}',
  images TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes Table
CREATE TABLE IF NOT EXISTS public.quotes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT[] NOT NULL DEFAULT '{}',
  business_hours TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on settings" ON public.settings FOR SELECT USING (true);

-- Create policies for public insert on quotes and contacts
CREATE POLICY "Allow public insert on quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert on contacts" ON public.contacts FOR INSERT WITH CHECK (true);

-- Create policies for authenticated users (admin) to do everything
CREATE POLICY "Allow authenticated full access on products" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on quotes" ON public.quotes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on contacts" ON public.contacts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial settings
INSERT INTO public.settings (id, email, phone, address, business_hours)
VALUES (
  'default',
  'info@tei-solutions.com',
  '+1 (555) 123-4567',
  ARRAY['123 Industrial Avenue', 'Manufacturing District', 'City, State 12345'],
  ARRAY['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM']
)
ON CONFLICT (id) DO NOTHING;
