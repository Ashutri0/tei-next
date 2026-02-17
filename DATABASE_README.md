# Supabase Database Setup Guide

## Database Configuration

### Environment Variables

Create `.env.local` file in project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://wnsbtruydlxzyycjiagn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_eE5qPajwn4YkaS1btgt87g_NsDHo8ti
```

## Database Schema

### Step 1: Create Tables

Go to Supabase Dashboard → SQL Editor and run:

```sql
-- Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  description TEXT NOT NULL,
  specifications TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TEXT NOT NULL
);

-- Quotes Table
CREATE TABLE quotes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TEXT NOT NULL
);

-- Contacts Table
CREATE TABLE contacts (
  id TEXT PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TEXT NOT NULL
);

-- Settings Table
CREATE TABLE settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT[] DEFAULT '{}',
  business_hours TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Step 2: Enable Row Level Security (RLS)

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
```

### Step 3: Create Security Policies

```sql
-- Public read access
CREATE POLICY "public_read_products" ON products FOR SELECT USING (true);
CREATE POLICY "public_read_settings" ON settings FOR SELECT USING (true);

-- Public insert access
CREATE POLICY "public_insert_quotes" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Full access for all operations (for development)
CREATE POLICY "anon_all_products" ON products FOR ALL USING (true);
CREATE POLICY "anon_all_quotes" ON quotes FOR ALL USING (true);
CREATE POLICY "anon_all_contacts" ON contacts FOR ALL USING (true);
CREATE POLICY "anon_all_settings" ON settings FOR ALL USING (true);
```

### Step 4: Insert Initial Data

```sql
-- Insert Products
INSERT INTO products (id, name, category, subcategory, description, specifications, images, featured, created_at) VALUES
('1', 'High-Temperature Centrifugal Pump', 'Mechanical', 'Pumps', 'Industrial-grade centrifugal pump designed for high-temperature applications in steel mills and power plants. Capable of handling temperatures up to 350°C.', ARRAY['Max Temp: 350°C', 'Flow Rate: 500 m³/h', 'Pressure: 25 bar', 'Material: Stainless Steel 316'], ARRAY['/industrial-centrifugal-pump.jpg'], true, '2024-01-15'),
('2', 'Heavy-Duty Ball Valve', 'Mechanical', 'Valves', 'Robust ball valve for high-pressure industrial applications. Features metal-to-metal sealing for extreme conditions.', ARRAY['Size: DN50-DN300', 'Pressure: PN100', 'Temperature: -29°C to 200°C', 'Body: Carbon Steel'], ARRAY['/industrial-ball-valve.png'], true, '2024-01-20'),
('3', 'Variable Frequency Drive 500kW', 'Electrical', 'Drives', 'High-performance VFD for precise motor control in demanding industrial environments. Energy-efficient with regenerative braking.', ARRAY['Power: 500kW', 'Voltage: 380-480V', 'Efficiency: 98%', 'Protection: IP55'], ARRAY['/variable-frequency-drive-industrial.jpg'], true, '2024-02-01'),
('4', 'Industrial PLC Controller', 'Automation', 'PLCs', 'Modular PLC system for complex automation tasks. Supports multiple communication protocols and expansion modules.', ARRAY['I/O Points: 2048', 'Cycle Time: 0.5ms', 'Memory: 4MB', 'Protocols: Modbus, Profinet, EtherNet/IP'], ARRAY['/industrial-plc-controller.jpg'], true, '2024-02-10'),
('5', 'Electromagnetic Flow Meter', 'Instrumentation', 'Flow Meters', 'Precision electromagnetic flow meter for conductive liquids. Ideal for process control and billing applications.', ARRAY['Accuracy: ±0.2%', 'Size: DN10-DN2000', 'Liner: PTFE/PFA', 'Output: 4-20mA, HART'], ARRAY['/electromagnetic-flow-meter.jpg'], false, '2024-02-15'),
('6', 'High-Efficiency IE4 Motor', 'Electrical', 'Motors', 'Super premium efficiency motor meeting IE4 standards. Reduced energy consumption and lower operating costs.', ARRAY['Power: 75-315kW', 'Efficiency: IE4', 'Frame: Cast Iron', 'Cooling: IC411'], ARRAY['/industrial-electric-motor.jpg'], false, '2024-02-20'),
('7', 'Industrial Touch Panel HMI', 'Automation', 'HMIs', '15-inch industrial touch panel with high-resolution display. Rugged design for harsh environments.', ARRAY['Display: 15" TFT', 'Resolution: 1024x768', 'Protection: IP65', 'Temp Range: -20°C to 60°C'], ARRAY['/industrial-hmi-touch-panel.jpg'], false, '2024-03-01'),
('8', 'Spherical Roller Bearing', 'Mechanical', 'Bearings', 'Self-aligning spherical roller bearing for heavy radial and axial loads. Ideal for steel mill rolling equipment.', ARRAY['Bore: 100-500mm', 'Load Rating: 2000kN', 'Speed: 1500 RPM', 'Seal: Labyrinth'], ARRAY['/spherical-roller-bearing-industrial.jpg'], false, '2024-03-05');

-- Insert Quotes
INSERT INTO quotes (id, name, email, phone, company, product_id, product_name, message, status, created_at) VALUES
('1', 'John Smith', 'john@steelworks.com', '+1 555-0123', 'Steel Works Inc.', '1', 'High-Temperature Centrifugal Pump', 'We need 5 units for our new processing line. Please provide pricing and lead time.', 'pending', '2024-03-10'),
('2', 'Sarah Johnson', 'sarah@powergen.com', '+1 555-0456', 'PowerGen Solutions', '3', 'Variable Frequency Drive 500kW', 'Looking for VFDs for our turbine control system. Need technical consultation.', 'contacted', '2024-03-08');

-- Insert Settings
INSERT INTO settings (id, email, phone, address, business_hours) VALUES
('default', 'info@tei-solutions.com', '+1 (555) 123-4567', ARRAY['123 Industrial Avenue', 'Manufacturing District', 'City, State 12345'], ARRAY['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM'])
ON CONFLICT (id) DO NOTHING;
```

## Verification

### Check Database Connection

Visit: `http://localhost:3000/api/health/supabase`

Expected response:
```json
{"ok":true,"message":"Supabase connection successful."}
```

### Verify Tables

In Supabase Dashboard → Table Editor, check:
- ✅ `products` table (8 rows)
- ✅ `quotes` table (2 rows)
- ✅ `contacts` table (0 rows initially)
- ✅ `settings` table (1 row)

## Database Operations

### How Data is Saved

- **Products**: Add/Edit/Delete from Admin Panel → Auto-saved to Supabase
- **Quotes**: Submit quote request → Saved to Supabase
- **Contacts**: Submit contact form → Saved to Supabase
- **Settings**: Update from Admin Settings → Saved to Supabase

### Fallback to localStorage

If Supabase is not configured or fails, the app automatically falls back to localStorage.

## Table Structure

### Products Table
- `id` - Unique product ID
- `name` - Product name
- `category` - Main category (Mechanical, Electrical, Automation, Instrumentation)
- `subcategory` - Product subcategory
- `description` - Product description
- `specifications` - Array of specifications
- `images` - Array of image URLs
- `featured` - Boolean for featured products
- `created_at` - Creation date

### Quotes Table
- `id` - Unique quote ID
- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone
- `company` - Company name
- `product_id` - Referenced product ID
- `product_name` - Product name
- `message` - Quote request message
- `status` - Quote status (pending, contacted, quoted, closed)
- `created_at` - Request date

### Contacts Table
- `id` - Unique contact ID
- `first_name` - First name
- `last_name` - Last name
- `email` - Email address
- `phone` - Phone number
- `company` - Company name
- `message` - Contact message
- `status` - Message status (new, read, replied)
- `created_at` - Submission date

### Settings Table
- `id` - Always 'default'
- `email` - Company email
- `phone` - Company phone
- `address` - Array of address lines
- `business_hours` - Array of business hours
- `updated_at` - Last update timestamp

## Troubleshooting

### Connection Failed
- Check `.env.local` file exists
- Verify Supabase URL and key are correct
- Restart development server: `npm run dev`

### Tables Not Found
- Run schema SQL in Supabase SQL Editor
- Check table names are lowercase
- Verify RLS policies are created

### Data Not Saving
- Check browser console for errors
- Verify RLS policies allow operations
- Check Supabase logs in dashboard

## Security Notes

**Current Setup**: Development mode with open policies for easy testing.

**For Production**:
1. Remove `anon_all_*` policies
2. Implement proper authentication
3. Restrict policies to authenticated users only
4. Use service role key for admin operations

## Support

For database issues:
- Check Supabase Dashboard logs
- Visit: https://supabase.com/docs
- Contact: support@tei-solutions.com
