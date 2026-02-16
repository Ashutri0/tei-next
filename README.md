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

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Context with localStorage persistence
- **Icons**: Lucide React
- **Font**: Geist Sans & Geist Mono

## Project Structure

\`\`\`
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
│   └── utils.ts                 # Utility functions
└── public/
    └── [images]                 # Product and site images
\`\`\`

## Data Persistence

The application uses localStorage for data persistence. All data (products, quotes, contacts, settings) is automatically saved and loaded from the browser's local storage.

**Note**: For production use, consider integrating with a proper database solution like Supabase, Neon, or another backend service.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

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

## Customization

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

### Processing Quote Requests

1. Log in to the admin panel
2. Navigate to **Quote Requests**
3. Click the eye icon to view request details
4. Update status as you process each request (pending → contacted → quoted → closed)

## License

This project is proprietary to Thermal Energy International.

## Support

For technical support, contact [support@tei-solutions.com](mailto:support@tei-solutions.com)
