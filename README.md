# Thermal Energy International (TEI) - Product Showcase Website

A modern, full-stack product showcase website for Thermal Energy International, an industrial solutions company providing mechanical, electrical, and automation equipment for steel mills, power plants, cement plants, and other industrial facilities.

## Features

### Public Website

- **Homepage**: Hero section with image carousel, featured products, industries served, and call-to-action sections
- **About Us**: Company history, mission, values, and milestone timeline
- **What We Offer (Services)**: Four main service categories - Mechanical, Electrical, Automation, and Instrumentation
- **Products**: Full product catalog with search, category/subcategory filtering
- **Product Details**: Individual product pages with specifications and related products
- **Contact**: Contact form with company information cards
- **Request Quote**: Multi-step quote request form with product selection

### Admin Panel

Access the admin panel at `/admin/login`

**Default Credentials:**
- Email: `admin@tei.com`
- Password: `admin123`

**Admin Features:**
- **Dashboard**: Overview statistics for products, quotes, and contact messages
- **Products Management**: Add, edit, delete products; toggle featured status
- **Quote Requests**: View and manage customer quote requests with status tracking
- **Contact Messages**: View and respond to contact form submissions
- **Settings**: Update company contact information (email, phone, address, business hours)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context with Supabase persistence
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono
- **Authentication**: Supabase Auth

## Project Structure

```
├── app/
│   ├── page.tsx                 # Homepage
│   ├── about/page.tsx           # About Us page
│   ├── services/page.tsx        # What We Offer page
│   ├── products/
│   │   ├── page.tsx             # Products listing
│   │   └── [id]/page.tsx        # Product detail page
│   ├── contact/page.tsx         # Contact page
│   ├── quote/page.tsx           # Quote request page
│   └── admin/
│       ├── layout.tsx           # Admin layout with sidebar
│       ├── login/page.tsx       # Admin login
│       ├── page.tsx             # Admin dashboard
│       ├── products/page.tsx    # Product management
│       ├── quotes/page.tsx      # Quote requests management
│       ├── contacts/page.tsx    # Contact messages
│       └── settings/page.tsx    # Site settings
├── components/
│   ├── header.tsx               # Main site header
│   ├── footer.tsx               # Main site footer
│   ├── hero-carousel.tsx        # Homepage image carousel
│   ├── featured-products.tsx    # Featured products section
│   ├── industries-section.tsx   # Industries served section
│   ├── cta-section.tsx          # Call-to-action section
│   └── main-layout.tsx          # Layout wrapper
├── lib/
│   ├── store.tsx                # Global state management
│   ├── auth-context.tsx         # Authentication context
│   ├── supabaseClient.ts        # Supabase client configuration
│   └── utils.ts                 # Utility functions
├── supabase-schema.sql          # Database schema
├── supabase-initial-data.sql    # Initial data setup
└── public/
    └── [images]                 # Product and site images
```

## Database & Data Persistence

This application uses **Supabase** as the primary database for all data persistence:

- **Products**: Complete product catalog with images and specifications
- **Quote Requests**: Customer quote submissions with status tracking
- **Contact Messages**: Contact form submissions
- **Settings**: Site configuration and contact information

### Database Schema

```sql
products (id, name, category, subcategory, description, specifications, images, featured, created_at)
quotes (id, name, email, phone, company, product_id, product_name, message, status, created_at)
contacts (id, first_name, last_name, email, phone, company, message, status, created_at)
settings (id, email, phone, address, business_hours)
```

## Setup & Installation

### Prerequisites

- Node.js 18+ 
- Supabase account and project

### 1. Clone and Install

```bash
git clone <repository-url>
cd tei-next
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Run the SQL from `supabase-schema.sql` to create tables
3. Run the SQL from `supabase-initial-data.sql` to populate initial data
4. Set up Row Level Security (RLS) policies as defined in the schema

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Product Categories

- **Mechanical**: Pumps, Valves, Bearings, Couplings, Gearboxes
- **Electrical**: Motors, Drives, Transformers, Switchgear, Cables
- **Automation**: PLCs, HMIs, Sensors, Actuators, SCADA Systems
- **Instrumentation**: Flow Meters, Pressure Gauges, Temperature Sensors, Level Indicators, Analyzers

## Industries Served

- Steel Mills
- Power Plants
- Cement Plants
- Petrochemical
- Manufacturing

## Admin Operations

### Updating Contact Information

1. Log in to the admin panel at `/admin/login`
2. Navigate to **Settings**
3. Update email, phone, address, and business hours
4. Click **Save Changes**

### Managing Products

1. Log in to the admin panel
2. Navigate to **Products**
3. Use the **Add Product** button to create new products
4. Click the edit icon to modify existing products
5. Toggle the star icon to mark products as featured
6. Changes are automatically saved to Supabase

### Processing Quote Requests

1. Log in to the admin panel
2. Navigate to **Quote Requests**
3. Click the eye icon to view request details
4. Update status as you process each request (pending → contacted → quoted → closed)
5. Status changes are automatically saved to Supabase

### Managing Contact Messages

1. Log in to the admin panel
2. Navigate to **Contact Messages**
3. View and respond to customer inquiries
4. Update message status (new → read → replied)

## Database Management

### Backup & Restore

- Use Supabase dashboard for automated backups
- Export data using Supabase's export functionality
- Initial data available in `supabase-initial-data.sql`

### Monitoring

- Check browser console for real-time operation logs
- Monitor Supabase dashboard for database performance
- All database operations include comprehensive error logging

## Security Features

- **Row Level Security (RLS)**: Properly configured database policies
- **Authentication**: Secure admin login system
- **Data Validation**: Input validation on all forms
- **Error Handling**: Comprehensive error logging and user feedback

## Performance Optimizations

- **Real-time Updates**: Instant data synchronization across all users
- **Efficient Loading**: Optimized database queries with proper indexing
- **Caching**: Smart state management with React Context
- **Responsive Design**: Mobile-optimized user interface

## Troubleshooting

### Common Issues

**Supabase Connection Error:**
- Verify `.env.local` credentials
- Check Supabase project URL and anon key
- Ensure Supabase project is active

**Data Not Loading:**
- Check browser console for error messages
- Verify database tables exist
- Check RLS policies in Supabase

**Admin Login Issues:**
- Verify default credentials: admin@tei.com / admin123
- Check authentication context configuration

### Debug Mode

The application includes comprehensive debugging logs:
- `🔍 Starting Supabase data load...`
- `🔍 Adding product/quote/contact...`
- `✅ Successfully saved to Supabase`
- `❌ Error messages with detailed information`

## Deployment

### Production Setup

1. Set production environment variables
2. Configure Supabase for production use
3. Enable proper RLS policies
4. Set up custom domain (optional)
5. Configure SSL certificates

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## License

This project is proprietary to Thermal Energy International.

## Support

For technical support, contact [support@tei-solutions.com](mailto:support@tei-solutions.com)
