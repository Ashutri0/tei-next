# Developer Reference Guide

Quick reference for developers working with TEI website.

---

## 🎯 What's Working

### ✅ All Systems Operational

```
Frontend (User-facing)
├── Homepage with carousel
├── Product catalog with filters
├── Quote request form
├── Contact form
└── Responsive mobile menu

Admin Panel
├── Product management (add/edit/delete)
├── Quote management
├── Contact message management
├── Settings management
└── Admin authentication

Backend (Data Storage)
├── Context API + localStorage
├── Real-time sync
├── Data persistence
└── No database needed (yet)
```

---

## 📁 File Reference

### Core Files You'll Modify

| File | Purpose | When to Edit |
|------|---------|--------------|
| `lib/store.tsx` | Global state | Adding data types or operations |
| `lib/auth-context.tsx` | Admin login | Changing admin credentials |
| `components/header.tsx` | Navigation | Updating nav links |
| `app/admin/settings/page.tsx` | Company info form | Changing settings fields |
| `lib/data.ts` | Initial data | Seeding default values |

### Don't Edit (Framework)

```
app/layout.tsx
package.json (unless updating deps)
tsconfig.json
next.config.mjs
tailwind.config.js
```

---

## 🔧 Common Tasks

### Add a New Product Field

**Step 1: Update Type**
```typescript
// lib/store.tsx
export type Product = {
  // ... existing fields
  newField: string  // Add here
}
```

**Step 2: Update Form**
```typescript
// app/admin/products/page.tsx - ProductForm component
<Input
  value={formData.newField}
  onChange={(e) => setFormData({...formData, newField: e.target.value})}
/>
```

**Step 3: Update Display**
```typescript
// Components that show products
<p>{product.newField}</p>
```

---

### Change Admin Credentials

**Step 1: Open auth file**
```
lib/auth-context.tsx
```

**Step 2: Update credentials**
```typescript
const defaultAdminCredentials = {
  email: 'newemail@company.com',
  password: 'newpassword123'
}
```

**Step 3: Restart app**
- Clear browser cache
- Log in with new credentials

---

### Add a New Category

**Step 1: Update categories array**
```typescript
// lib/store.tsx
const categories = [
  // ... existing
  {
    name: "New Category",
    subcategories: ["Sub1", "Sub2", "Sub3"]
  }
]
```

**Step 2: That's it!**
- Form will auto-update
- Category appears everywhere

---

### Display Settings Data

**Usage Example:**
```typescript
'use client'

import { useStore } from '@/lib/store'

export function ContactInfo() {
  const { settings } = useStore()
  
  return (
    <div>
      <a href={`mailto:${settings.email}`}>{settings.email}</a>
      <a href={`tel:${settings.phone}`}>{settings.phone}</a>
      {settings.address.map(line => <p key={line}>{line}</p>)}
    </div>
  )
}
```

---

## 🎨 Styling Reference

### Color Tokens (Tailwind)

```css
/* In globals.css */
--background: hsl(0 0% 100%)
--foreground: hsl(0 0% 3.6%)
--primary: hsl(220.9 100% 56.2%)
--muted: hsl(210 40% 96%)
--border: hsl(214.3 31.8% 91.4%)
--destructive: hsl(0 84.2% 60.2%)
```

**Usage:**
```tsx
<div className="bg-background text-foreground border border-border">
  <button className="bg-primary text-primary-foreground">Save</button>
  <p className="text-muted-foreground">Hint text</p>
</div>
```

### Common Classes

```tsx
// Flexbox layouts
<div className="flex items-center justify-between gap-4">

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Responsive text
<h1 className="text-3xl md:text-4xl lg:text-5xl">

// Spacing
<div className="p-4 md:p-6 lg:p-8 mb-4 md:mb-6">

// Hover effects
<button className="hover:bg-primary/90 transition-colors">

// Mobile first
<div className="w-full md:w-1/2 lg:w-1/3">
```

---

## 🗂️ Component Structure

### Page Component Template

```typescript
'use client'

import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function MyPage() {
  const { data, addData } = useStore()
  
  return (
    <main className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-bold">Title</h1>
        {/* Content here */}
      </div>
    </main>
  )
}
```

### Form Component Template

```typescript
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function MyForm({ onSubmit }) {
  const [formData, setFormData] = useState({})
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={formData.field}
        onChange={(e) => setFormData({
          ...formData,
          field: e.target.value
        })}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

---

## 🚀 Deployment Quick Reference

### Local Build
```bash
npm install
npm run build
npm start  # Test locally
```

### Create Deployment Package
```bash
zip -r deploy.zip .next public package.json package-lock.json node_modules
```

### GoDaddy Deploy
1. Upload ZIP to public_html
2. Extract files
3. Configure Node.js (v18+)
4. Restart app
5. Visit domain

**See:** QUICK_START_HOSTING.md

---

## 🐛 Debugging

### Check Data in Console

```javascript
// View all data
const store = localStorage
console.log({
  products: JSON.parse(store.getItem('tei_products')),
  quotes: JSON.parse(store.getItem('tei_quotes')),
  contacts: JSON.parse(store.getItem('tei_contacts')),
  settings: JSON.parse(store.getItem('tei_settings'))
})

// View specific product
const products = JSON.parse(store.getItem('tei_products'))
console.log(products.find(p => p.id === '123'))
```

### Debug Store Operations

```typescript
// Add logging to store
const addProduct = (product) => {
  console.log("[DEBUG] Adding product:", product)
  setProducts(prev => [...prev, newProduct])
}
```

### Check Component Props

```typescript
// Add console.log to debug
export function MyComponent(props) {
  console.log("[DEBUG] Component props:", props)
  return <div>...</div>
}
```

### Network Issues

```javascript
// Check localStorage size
new Blob(Object.values(localStorage)).size

// See raw localStorage
Object.entries(localStorage).forEach(([k, v]) => {
  console.log(`${k}: ${v.length} chars`)
})
```

---

## 📊 Data Examples

### Product Structure

```json
{
  "id": "1708108234567",
  "name": "High-Temperature Pump",
  "category": "Mechanical",
  "subcategory": "Pumps",
  "description": "Industrial pump for high-temp applications",
  "specifications": [
    "Max Temp: 350°C",
    "Flow Rate: 500 m³/h"
  ],
  "image": "/pump.jpg",
  "featured": true,
  "createdAt": "2024-02-15"
}
```

### Quote Request Structure

```json
{
  "id": "1708108234567",
  "name": "John Smith",
  "email": "john@company.com",
  "phone": "+1 555-0123",
  "company": "Company Inc",
  "productId": "1708108234567",
  "productName": "High-Temperature Pump",
  "message": "Need 5 units for new line",
  "status": "pending",
  "createdAt": "2024-02-15"
}
```

### Contact Message Structure

```json
{
  "id": "1708108234567",
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@email.com",
  "phone": "+1 555-0123",
  "company": "Company Inc",
  "message": "Interested in your products",
  "status": "new",
  "createdAt": "2024-02-15"
}
```

---

## 🔗 Important URLs

### Public Routes
```
/                    Homepage
/about              About Us
/services           Services
/products           Product Catalog
/products/[id]      Product Details
/quote              Quote Request
/contact            Contact Form
```

### Admin Routes
```
/admin/login        Admin Login
/admin              Dashboard
/admin/products     Product Management
/admin/quotes       Quote Management
/admin/contacts     Contact Management
/admin/settings     Settings
```

---

## 📚 Hook Usage

### useStore Hook

```typescript
const { 
  // Data
  products,
  quotes,
  contacts,
  settings,
  
  // Product operations
  addProduct,
  updateProduct,
  deleteProduct,
  
  // Quote operations
  addQuote,
  updateQuoteStatus,
  
  // Contact operations
  addContact,
  updateContactStatus,
  
  // Settings
  updateSettings
} = useStore()
```

### React Hooks Used

```typescript
import { useState } from 'react'           // State management
import { useEffect } from 'react'          // Side effects
import { useMemo } from 'react'            // Memoization
import { useContext } from 'react'         // Access context
import { useSearchParams } from 'next/navigation'  // URL params
```

---

## ⚙️ Configuration Files

### package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Environment Variables (Optional)

```bash
# .env.local (not in git)
NEXT_PUBLIC_API_URL=https://yourdomain.com
```

### Important: Port Configuration

For GoDaddy deployment:
```json
{
  "scripts": {
    "start": "next start -p 8080"
  }
}
```

---

## 🎯 Development Workflow

### Adding a Feature

1. **Identify what data you need**
   - Add type to `lib/store.tsx`
   - Add initial state
   - Add operations (add/update/delete)

2. **Create store hooks**
   - Use `const { data } = useStore()`
   - Call operations as needed

3. **Build UI components**
   - Create forms for admin
   - Display data on frontend

4. **Test everything**
   - Admin can create data
   - Frontend shows data
   - Data persists

5. **Deploy**
   - See deployment guide

---

## 🔐 Security Checklist

- [ ] Change admin credentials before deploy
- [ ] Use HTTPS on production
- [ ] Keep Node.js updated
- [ ] Regular backups
- [ ] Monitor error logs
- [ ] Validate form inputs
- [ ] Sanitize user data

---

## 📈 Performance Tips

### Optimize Images
```bash
# Use modern formats
# Convert to WebP
# Compress before upload
# Target ~100KB per image
```

### Code Optimization
```typescript
// Use memoization for expensive operations
const filtered = useMemo(() => 
  items.filter(i => i.active),
  [items]
)

// Debounce search
const [debouncedSearch, setDebouncedSearch] = useState('')
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search)
  }, 300)
  return () => clearTimeout(timer)
}, [search])
```

### Caching Strategy
```typescript
// Cache filtered results
const cache = useMemo(() => ({
  featured: products.filter(p => p.featured),
  byCategory: groupBy(products, 'category')
}), [products])
```

---

## 🐛 Common Issues & Fixes

### Issue: Data Not Showing

**Check:**
1. Is StoreProvider in layout.tsx?
2. Is component using useStore()?
3. Is localStorage enabled?
4. Check browser console for errors

**Fix:**
```typescript
// Verify hook usage
const { products } = useStore()
console.log(products) // Should not be empty
```

### Issue: Images Not Loading

**Check:**
1. Is image in public folder?
2. Is path correct? (should be `/image.jpg`)
3. Is file type supported? (JPG, PNG, WebP)

**Fix:**
```typescript
<img src="/image.jpg" alt="desc" />
// Not: src="./image.jpg" or src="image.jpg"
```

### Issue: Form Not Submitting

**Check:**
1. Is `e.preventDefault()` called?
2. Are required fields filled?
3. Check console for errors

**Fix:**
```typescript
const handleSubmit = (e) => {
  e.preventDefault()  // This line is critical
  // Then process form
}
```

---

## 📞 Support Resources

### Documentation
- `README.md` - Overview
- `API_DOCUMENTATION.md` - Technical details
- `DEPLOYMENT_GUIDE.md` - Hosting instructions
- `QUICK_START_HOSTING.md` - Quick deploy

### Tools
- Next.js: https://nextjs.org/docs
- React: https://react.dev
- Tailwind: https://tailwindcss.com
- shadcn/ui: https://ui.shadcn.com

### Getting Help
1. Check documentation first
2. Review error in console
3. Check troubleshooting sections
4. Contact support with error details

---

## 🎓 Learning Path

### Beginner: Just Deploy
1. Read QUICK_START_HOSTING.md
2. Follow 7 steps
3. Done!

### Intermediate: Manage Content
1. Add products via admin
2. Update settings
3. Manage quotes/contacts
4. Monitor website

### Advanced: Customize
1. Read API_DOCUMENTATION.md
2. Add new features
3. Modify components
4. Deploy changes

---

## ✅ Before Going Live

- [ ] Test all pages
- [ ] Test admin panel
- [ ] Update company info
- [ ] Add sample products
- [ ] Change admin password
- [ ] Enable HTTPS
- [ ] Create backup
- [ ] Test mobile
- [ ] Clear cache and test
- [ ] Monitor first 24 hours

---

## 🚀 After Going Live

### Week 1
- Monitor daily
- Check error logs
- Get user feedback
- Fix any issues

### Week 2-4
- Add more products
- Optimize based on feedback
- Build content
- Plan next features

### Month 2+
- Analyze metrics
- Plan upgrades
- Scale as needed
- Add features

---

**Quick Links:**
- Deploy: QUICK_START_HOSTING.md
- Technical: API_DOCUMENTATION.md
- Hosting: DEPLOYMENT_GUIDE.md
- Status: VERIFICATION_CHECKLIST.md
- System: SYSTEM_STATUS.md

---

**Version:** 1.0
**Last Updated:** February 2026
**For:** UI Developers & Admins
