# TEI Website - Technical API & System Documentation

This document provides complete technical documentation of the TEI website system, including data structures, store operations, and component APIs.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Data Store (Context)](#data-store-context)
3. [Data Types](#data-types)
4. [Store Operations](#store-operations)
5. [Component APIs](#component-apis)
6. [Page Routes](#page-routes)
7. [Data Flow Diagrams](#data-flow-diagrams)
8. [localStorage Keys](#localstorage-keys)

---

## System Architecture

### Overview

The application uses a **Client-Side State Management Pattern** with Context API + localStorage:

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  StoreProvider (lib/store.tsx)                       │   │
│  │  - Manages global state                             │   │
│  │  - Syncs to localStorage                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  useStore() Hook                                    │   │
│  │  - Provides access to state                         │   │
│  │  - Available in all client components               │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Components                                          │   │
│  │  - Display data                                     │   │
│  │  - Trigger actions                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Browser localStorage                               │   │
│  │  - Persists data across sessions                   │   │
│  │  - Survives page refreshes                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Action** → Component triggers store action
2. **Store Update** → Context updates state
3. **localStorage Sync** → Data saved to browser storage
4. **Component Re-render** → UI reflects new data
5. **Page Refresh** → Data restored from localStorage

---

## Data Store (Context)

### Location
`lib/store.tsx`

### Store Provider

```typescript
export function StoreProvider({ children }: { children: ReactNode })
```

**Usage in Layout:**
```tsx
// app/layout.tsx
import { StoreProvider } from '@/lib/store'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
```

### Hook Usage

```typescript
import { useStore } from '@/lib/store'

export function MyComponent() {
  const { products, addProduct, deleteProduct } = useStore()
  
  // Now you can use all store operations
}
```

---

## Data Types

### 1. Product

```typescript
export type Product = {
  id: string                    // Unique identifier (timestamp)
  name: string                  // Product name
  category: string              // Main category (Mechanical, Electrical, etc.)
  subcategory: string           // Subcategory (Pumps, Motors, etc.)
  description: string           // Detailed description
  specifications: string[]      // Array of spec strings
  image: string                 // Image URL or base64 data
  featured: boolean             // Show on homepage
  createdAt: string            // Date created (YYYY-MM-DD)
}
```

**Example:**
```json
{
  "id": "1234567890",
  "name": "High-Temperature Centrifugal Pump",
  "category": "Mechanical",
  "subcategory": "Pumps",
  "description": "Industrial-grade pump for high-temp applications",
  "specifications": [
    "Max Temp: 350°C",
    "Flow Rate: 500 m³/h",
    "Pressure: 25 bar"
  ],
  "image": "/pump.jpg",
  "featured": true,
  "createdAt": "2024-03-15"
}
```

### 2. QuoteRequest

```typescript
export type QuoteRequest = {
  id: string                                        // Unique identifier
  name: string                                      // Customer name
  email: string                                     // Customer email
  phone: string                                     // Customer phone
  company: string                                   // Company name
  productId: string                                 // Product being quoted
  productName: string                               // Product name (cached)
  message: string                                   // Additional message
  status: "pending" | "contacted" | "quoted" | "closed" // Quote status
  createdAt: string                                 // Date submitted
}
```

**Status Meanings:**
- `pending` - New quote request, not yet reviewed
- `contacted` - Admin has reached out to customer
- `quoted` - Quote has been sent
- `closed` - Deal closed or cancelled

### 3. ContactMessage

```typescript
export type ContactMessage = {
  id: string                            // Unique identifier
  firstName: string                     // First name
  lastName: string                      // Last name
  email: string                         // Email address
  phone: string                         // Phone number
  company: string                       // Company name
  message: string                       // Message content
  status: "new" | "read" | "replied"   // Message status
  createdAt: string                     // Date submitted
}
```

**Status Meanings:**
- `new` - Unread message
- `read` - Admin has read
- `replied` - Admin has replied

### 4. SiteSettings

```typescript
export type SiteSettings = {
  email: string              // Primary email address
  phone: string              // Phone number
  address: string[]          // Address lines (array for multi-line)
  businessHours: string[]    // Business hours (array for multiple entries)
}
```

**Example:**
```json
{
  "email": "info@tei-solutions.com",
  "phone": "+1 (555) 123-4567",
  "address": [
    "123 Industrial Avenue",
    "Manufacturing District",
    "City, State 12345"
  ],
  "businessHours": [
    "Monday - Friday: 8:00 AM - 6:00 PM",
    "Saturday: 9:00 AM - 1:00 PM"
  ]
}
```

---

## Store Operations

### Product Operations

#### Add Product

```typescript
const { addProduct } = useStore()

addProduct({
  name: "New Product",
  category: "Mechanical",
  subcategory: "Pumps",
  description: "Product description",
  specifications: ["Spec 1", "Spec 2"],
  image: "/product.jpg",
  featured: true,
  createdAt: "2024-03-15"
})
```

**Notes:**
- `id` is auto-generated from timestamp
- Automatically saved to localStorage
- Instantly available to all components

#### Update Product

```typescript
const { updateProduct } = useStore()

updateProduct({
  id: "1234567890",
  name: "Updated Name",
  category: "Mechanical",
  subcategory: "Pumps",
  description: "Updated description",
  specifications: ["New Spec"],
  image: "/new-image.jpg",
  featured: false,
  createdAt: "2024-03-15"
})
```

**Notes:**
- Must provide complete product object
- ID must match existing product
- Replaces entire product

#### Delete Product

```typescript
const { deleteProduct } = useStore()

deleteProduct("1234567890")
```

**Notes:**
- Permanently removes product
- No confirmation by default
- Add your own confirmation dialog

#### Get All Products

```typescript
const { products } = useStore()

// products is an array of all Product objects
console.log(products.length) // Total products

// Filter by featured
const featured = products.filter(p => p.featured)

// Filter by category
const mechanical = products.filter(p => p.category === "Mechanical")
```

---

### Quote Request Operations

#### Add Quote Request

```typescript
const { addQuote } = useStore()

addQuote({
  name: "John Doe",
  email: "john@company.com",
  phone: "+1 555-0123",
  company: "Company Inc.",
  productId: "1234567890",
  productName: "Product Name",
  message: "We need 5 units..."
})
```

**Notes:**
- `id`, `createdAt`, and `status` are auto-generated
- Status defaults to "pending"
- Dates in YYYY-MM-DD format

#### Update Quote Status

```typescript
const { updateQuoteStatus } = useStore()

updateQuoteStatus("1234567890", "contacted")
```

**Valid Statuses:**
- "pending"
- "contacted"
- "quoted"
- "closed"

#### Get All Quotes

```typescript
const { quotes } = useStore()

// Get pending quotes
const pending = quotes.filter(q => q.status === "pending")

// Get quotes for specific product
const productQuotes = quotes.filter(q => q.productId === productId)

// Sort by date (newest first)
const sorted = [...quotes].sort((a, b) => 
  new Date(b.createdAt) - new Date(a.createdAt)
)
```

---

### Contact Message Operations

#### Add Contact Message

```typescript
const { addContact } = useStore()

addContact({
  firstName: "John",
  lastName: "Doe",
  email: "john@email.com",
  phone: "+1 555-0123",
  company: "Company Inc.",
  message: "I'm interested in your products..."
})
```

**Notes:**
- `id`, `createdAt`, and `status` auto-generated
- Status defaults to "new"

#### Update Contact Status

```typescript
const { updateContactStatus } = useStore()

updateContactStatus("1234567890", "read")
// or
updateContactStatus("1234567890", "replied")
```

#### Get All Contacts

```typescript
const { contacts } = useStore()

// Get new messages
const newMessages = contacts.filter(c => c.status === "new")

// Get unread count
const unreadCount = contacts.filter(c => c.status === "new").length
```

---

### Site Settings Operations

#### Update Settings

```typescript
const { updateSettings } = useStore()

updateSettings({
  email: "newemail@tei.com",
  phone: "+1 (555) 999-9999",
  address: [
    "New Address",
    "City, State"
  ],
  businessHours: [
    "Monday - Friday: 9:00 AM - 5:00 PM"
  ]
})
```

#### Get Settings

```typescript
const { settings } = useStore()

console.log(settings.email)
console.log(settings.phone)
console.log(settings.address[0])
```

---

## Component APIs

### Featured Products Component

**File:** `components/featured-products.tsx`

```tsx
<FeaturedProducts />
```

**Props:** None

**Behavior:**
- Displays top 4 featured products
- Automatically syncs with store
- Responsive grid layout

### Hero Carousel

**File:** `components/hero-carousel.tsx`

```tsx
<HeroCarousel />
```

**Props:** None

**Features:**
- Auto-rotating banner images
- Manual navigation controls
- Responsive images

### Product Form (Admin)

**File:** `app/admin/products/page.tsx` (ProductForm component)

```tsx
<ProductForm 
  product={optionalProduct}
  onClose={() => {}}
  onSave={(product) => {}}
/>
```

**Props:**
- `product?: Product` - Product to edit (optional)
- `onClose: () => void` - Close dialog callback
- `onSave: (product) => void` - Save callback

**Features:**
- Add new products
- Edit existing products
- Image upload (base64) or URL
- Category/subcategory selection
- Specification management

---

## Page Routes

### Public Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.tsx` | Homepage with hero and featured products |
| `/about` | `app/about/page.tsx` | Company information |
| `/services` | `app/services/page.tsx` | Services offered |
| `/products` | `app/products/page.tsx` | Full product catalog with filters |
| `/products/[id]` | `app/products/[id]/page.tsx` | Individual product details |
| `/quote` | `app/quote/page.tsx` | Quote request form |
| `/contact` | `app/contact/page.tsx` | Contact form |

### Admin Pages

| Route | File | Description |
|-------|------|-------------|
| `/admin/login` | `app/admin/login/page.tsx` | Admin login |
| `/admin` | `app/admin/page.tsx` | Dashboard |
| `/admin/products` | `app/admin/products/page.tsx` | Manage products |
| `/admin/quotes` | `app/admin/quotes/page.tsx` | View quote requests |
| `/admin/contacts` | `app/admin/contacts/page.tsx` | View contact messages |
| `/admin/settings` | `app/admin/settings/page.tsx` | Site settings |

---

## Data Flow Diagrams

### Adding a Product Flow

```
Admin User
    ↓
Admin Products Page
    ↓
Click "Add Product"
    ↓
ProductForm Dialog Opens
    ↓
Admin fills form + uploads image
    ↓
Click "Save Product"
    ↓
addProduct() called
    ↓
Store updates state (products array)
    ↓
useEffect triggers → saves to localStorage
    ↓
All components using useStore() re-render
    ↓
Frontend homepage shows new product
    ↓
Frontend products page shows new product
    ↓
Featured products section updated
```

### Quote Request Flow

```
Frontend User
    ↓
Visit /quote page
    ↓
Select product + fill form
    ↓
Click "Submit Quote Request"
    ↓
addQuote() called
    ↓
Quote added to store (quotes array)
    ↓
useEffect triggers → saves to localStorage
    ↓
User sees success message
    ↓
Admin sees quote in /admin/quotes
    ↓
Admin updates status
    ↓
Quote stored with new status
```

### Contact Form Flow

```
Frontend User
    ↓
Visit /contact page
    ↓
Fill contact form
    ↓
Click "Send Message"
    ↓
addContact() called
    ↓
Message added to store (contacts array)
    ↓
useEffect triggers → saves to localStorage
    ↓
User sees success message
    ↓
Admin sees message in /admin/contacts
    ↓
Admin marks as read/replied
```

---

## localStorage Keys

### Storage Structure

All data is stored in browser's localStorage under these keys:

```javascript
{
  "tei_products": "[...]",    // Array of all products
  "tei_quotes": "[...]",      // Array of all quotes
  "tei_contacts": "[...]",    // Array of all contacts
  "tei_settings": "{...}"     // Settings object
}
```

### Accessing localStorage Directly

**In Browser Console:**
```javascript
// Get all products
JSON.parse(localStorage.getItem('tei_products'))

// Get all quotes
JSON.parse(localStorage.getItem('tei_quotes'))

// Get all contacts
JSON.parse(localStorage.getItem('tei_contacts'))

// Get settings
JSON.parse(localStorage.getItem('tei_settings'))

// Clear all data (WARNING - deletes everything!)
localStorage.clear()

// Export data as JSON (for backup)
const backup = {
  products: JSON.parse(localStorage.getItem('tei_products')),
  quotes: JSON.parse(localStorage.getItem('tei_quotes')),
  contacts: JSON.parse(localStorage.getItem('tei_contacts')),
  settings: JSON.parse(localStorage.getItem('tei_settings'))
}
console.log(JSON.stringify(backup, null, 2))
```

### Data Size Limits

- localStorage limit: ~5-10MB per domain
- Current data size: < 100KB (plenty of room)
- Can store hundreds of products safely

---

## Categories Reference

Used throughout the application:

```typescript
const categories = [
  {
    name: "Mechanical",
    subcategories: ["Pumps", "Valves", "Bearings", "Couplings", "Gearboxes"]
  },
  {
    name: "Electrical",
    subcategories: ["Motors", "Drives", "Transformers", "Switchgear", "Cables"]
  },
  {
    name: "Automation",
    subcategories: ["PLCs", "HMIs", "Sensors", "Actuators", "SCADA Systems"]
  },
  {
    name: "Instrumentation",
    subcategories: ["Flow Meters", "Pressure Gauges", "Temperature Sensors", "Level Indicators", "Analyzers"]
  }
]
```

---

## Common Use Cases

### Get Latest Quote Requests

```typescript
const { quotes } = useStore()
const latest = quotes.sort((a, b) => 
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
).slice(0, 5)
```

### Count Statistics

```typescript
const { products, quotes, contacts } = useStore()

const stats = {
  totalProducts: products.length,
  featuredProducts: products.filter(p => p.featured).length,
  pendingQuotes: quotes.filter(q => q.status === "pending").length,
  newMessages: contacts.filter(c => c.status === "new").length
}
```

### Search Products

```typescript
const { products } = useStore()
const query = "pump"

const results = products.filter(p => 
  p.name.toLowerCase().includes(query.toLowerCase()) ||
  p.description.toLowerCase().includes(query.toLowerCase())
)
```

### Filter by Category

```typescript
const { products } = useStore()
const mechanical = products.filter(p => p.category === "Mechanical")
```

---

## Debugging Tips

### Enable Store Logging

Add this to `lib/store.tsx` for debugging:

```typescript
const addProduct = (product: Omit<Product, "id">) => {
  const newProduct = {
    ...product,
    id: String(Date.now()),
  }
  console.log("[v0] Adding product:", newProduct)
  setProducts((prev) => [...prev, newProduct])
}
```

### Monitor localStorage Changes

```javascript
// In browser console
const originalSetItem = Storage.prototype.setItem;
Storage.prototype.setItem = function(key, value) {
  console.log(`localStorage updated: ${key}`, JSON.parse(value));
  return originalSetItem.apply(this, arguments);
};
```

### Check Store Hydration

```typescript
// In a component
import { useEffect, useState } from 'react'

export function DebugStore() {
  const [mounted, setMounted] = useState(false)
  const { products, quotes } = useStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div>Loading...</div>

  return (
    <div>
      <p>Products: {products.length}</p>
      <p>Quotes: {quotes.length}</p>
    </div>
  )
}
```

---

## Troubleshooting

### Data Not Persisting

**Issue:** Data disappears after page refresh

**Solution:**
1. Check localStorage quota isn't full
2. Verify localStorage isn't disabled
3. Check for browser private/incognito mode
4. Clear browser cache and try again

### Products Not Showing on Frontend

**Issue:** Admin adds product but it doesn't appear on homepage

**Solution:**
1. Verify StoreProvider wraps all components in layout
2. Check useStore() is called correctly
3. Check featured flag is true for homepage
4. Check browser console for errors
5. Reload page

### Image Upload Not Working

**Issue:** Image upload in admin fails

**Solution:**
1. Check image file size (< 5MB recommended)
2. Verify supported format (JPG, PNG, WebP)
3. Check browser localStorage space available
4. Try URL instead of upload
5. Check browser console for errors

---

## Performance Considerations

1. **localStorage Size:** Current implementation works well up to 10MB
2. **Component Re-renders:** Store updates cause full provider re-render
3. **Large Datasets:** If > 1000 products, consider pagination
4. **Image Storage:** Base64 images increase localStorage usage

### Optimization Tips

```typescript
// Memoize filtered results
const featured = useMemo(() => 
  products.filter(p => p.featured), 
  [products]
)

// Debounce search
const [searchQuery, setSearchQuery] = useState("")
const [debouncedSearch, setDebouncedSearch] = useState("")

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery)
  }, 300)
  return () => clearTimeout(timer)
}, [searchQuery])
```

---

## Migration to Backend Database

When ready to upgrade from localStorage to a real database:

1. **Create API Routes** in `/app/api/products`, `/app/api/quotes`, etc.
2. **Update Store** to make HTTP calls instead of localStorage
3. **Add Server-Side Authentication** for admin panel
4. **Database Migrations** for schema setup
5. **Environment Variables** for database credentials

Example migration structure:

```typescript
// Old: Direct store access
const { products } = useStore()

// New: API call
const [products, setProducts] = useState([])
useEffect(() => {
  fetch('/api/products').then(r => r.json()).then(setProducts)
}, [])
```

---

## Support & Maintenance

For issues or questions:
1. Check this documentation
2. Review store implementation in `lib/store.tsx`
3. Check component code
4. Review deployment guide
5. Contact support

---

**Document Version:** 1.0
**Last Updated:** February 2026
**Framework:** Next.js 16 with React 19
**State Management:** Context API + localStorage
