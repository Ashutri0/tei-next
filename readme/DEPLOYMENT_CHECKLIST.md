# Deployment Checklist for TEI Website

**Print this page or use it as a reference while deploying**

---

## 📋 Pre-Deployment Preparation (5 minutes)

```
☐ GoDaddy hosting account active
☐ Domain pointed to GoDaddy
☐ cPanel login credentials ready
☐ Node.js 18+ available in cPanel
☐ Project built locally (npm run build)
☐ Deployment ZIP file created
☐ Backup of any existing site
☐ Admin credentials to change ready
```

---

## 🔧 Step 1: Build Project Locally (5 minutes)

```bash
# In your project directory:
npm install
npm run build

# Create deployment package:
zip -r tei-website.zip .next public package.json package-lock.json node_modules
```

**Completion Check:**
```
☐ Build completed without errors
☐ .next folder exists
☐ ZIP file created (150MB approx)
☐ ZIP file ready for upload
```

---

## 📤 Step 2: Upload to GoDaddy (5-10 minutes)

### Method: File Manager (Easiest)

```
☐ Log in to GoDaddy.com
☐ Click "My Products"
☐ Find hosting plan
☐ Click "Manage"
☐ Click "cPanel"
☐ Click "File Manager"
☐ Click "public_html" folder
☐ Create backup folder (optional but recommended)
☐ Move old files into backup
☐ Click "Upload"
☐ Select tei-website.zip
☐ Wait for upload (2-5 minutes)
☐ Right-click ZIP > "Extract"
☐ Wait for extraction
☐ Verify files extracted to public_html:
   ☐ .next folder visible
   ☐ public folder visible
   ☐ package.json visible
   ☐ node_modules folder visible
```

**Verification:**
```
public_html/
  ├── .next/
  ├── public/
  ├── node_modules/
  ├── package.json
  └── package-lock.json
```

---

## ⚙️ Step 3: Configure Node.js (3 minutes)

```
☐ In cPanel, search for "Node.js"
☐ Click "Node.js Manager" or "Node.js Selector"
☐ Click "Create Application"
☐ Set Node.js Version: 18 or 20 ✓
☐ Set Application Root: /home/yourusername/public_html ✓
☐ Set Application URL: yourdomain.com ✓
☐ Set Application Startup File: npm start (or auto-filled) ✓
☐ Click "Create" ✓
☐ Wait for confirmation (usually instant)
```

**Verification:**
```
☐ App created successfully
☐ Status shows "Running"
☐ No error messages
```

---

## ✅ Step 4: Verify package.json Start Script (2 minutes)

**Check in cPanel > File Manager > public_html > package.json:**

Look for this section:
```json
"scripts": {
  "build": "next build",
  "start": "next start -p 8080",
  "dev": "next dev"
}
```

If it says `-p 3000` instead, edit to say `-p 8080`

```
☐ Start script points to port 8080
☐ File saved
☐ Ready to test
```

---

## 🌐 Step 5: Test Website (5 minutes)

### Open your browser and test:

```
☐ Visit https://yourdomain.com
   ☐ Homepage loads
   ☐ Images display
   ☐ Navigation works
   
☐ Check responsive (mobile view)
   ☐ Hamburger menu works
   ☐ Content readable
   ☐ Images display

☐ Visit all pages:
   ☐ /about - loads
   ☐ /services - loads
   ☐ /products - loads
   ☐ /contact - loads
   
☐ Test admin access:
   ☐ Go to /admin/login
   ☐ Login works with default credentials
   ☐ Admin dashboard shows
```

**If site doesn't load:**
```
☐ Clear browser cache (Ctrl+Shift+Delete)
☐ Try different browser
☐ Check cPanel - is Node.js still running?
☐ Restart Node.js in cPanel
☐ Check error log in cPanel > Error Log
☐ Contact GoDaddy support
```

---

## 🔐 Step 6: Change Admin Credentials (5 minutes)

**IMPORTANT - Do this before sharing access!**

```
☐ In cPanel > File Manager > public_html
☐ Find file: lib/auth-context.tsx
☐ Right-click > "Edit"
☐ Find this section:
   const defaultAdminCredentials = {
     email: 'admin@tei.com',
     password: 'admin123'
   }
☐ Change to your credentials
☐ Save file
☐ Clear browser cache
☐ Restart Node.js app in cPanel
☐ Test login with new credentials
```

**Test:**
```
☐ Go to /admin/login
☐ Enter new email
☐ Enter new password
☐ Login successful
☐ Dashboard loads
```

---

## 🏢 Step 7: Update Company Information (5 minutes)

```
☐ Go to https://yourdomain.com/admin
☐ You should already be logged in
☐ Click "Settings" in admin menu
☐ Update these fields:
   ☐ Email address
   ☐ Phone number
   ☐ Office address (line 1)
   ☐ Office address (line 2)
   ☐ Business hours
☐ Click "Save Changes"
☐ Go to homepage footer
☐ Verify info displays correctly
```

---

## 📸 Step 8: Add Sample Products (10 minutes)

```
☐ Go to /admin/products
☐ Click "Add Product"
☐ Fill in test product:
   ☐ Name: "Test Product"
   ☐ Category: Select one
   ☐ Subcategory: Select one
   ☐ Description: "Test description"
   ☐ Specifications: Add test specs
   ☐ Image: Upload test image or paste URL
   ☐ Check "Featured" if desired
☐ Click "Save Product"
☐ Go to /products page
☐ Verify product appears
☐ Click product to see details
☐ Go to homepage
☐ Check if product appears in featured section
```

**Test Data to Add:**
```
Product 1:
  Name: High-Pressure Pump
  Category: Mechanical
  Subcategory: Pumps
  Description: Industrial pump for pressure systems
  Image: Upload or paste URL
  Featured: Yes

Product 2:
  Name: Control System
  Category: Automation
  Subcategory: PLCs
  Description: Advanced control system
  Image: Upload or paste URL
  Featured: No
```

---

## 🧪 Step 9: Test All Functions (10 minutes)

### Test Quote System:
```
☐ Go to /quote
☐ Select product from dropdown
☐ Fill in contact info
☐ Enter test message
☐ Click "Submit"
☐ See success message
☐ Go to /admin/quotes
☐ See the test quote appears
☐ Try changing quote status
☐ Verify status updates
☐ Refresh page - status persists
```

### Test Contact Form:
```
☐ Go to /contact
☐ Fill in test contact info
☐ Enter test message
☐ Click "Submit"
☐ See success message
☐ Go to /admin/contacts
☐ See the test message appears
☐ Try marking as "read"
☐ Verify status updates
☐ Refresh page - status persists
```

### Test Data Persistence:
```
☐ Add test product
☐ Refresh page - product still there
☐ Submit test quote
☐ Go to admin - quote still there
☐ Restart browser
☐ Go to website - products still there
☐ Data persists ✓
```

---

## 🔍 Step 10: Final Verification (5 minutes)

```
☐ No errors in browser console (F12)
☐ HTTPS working (lock icon in address bar)
☐ Mobile responsive tested
☐ All navigation working
☐ All forms working
☐ Admin panel working
☐ Data persisting
☐ Images all loading
☐ Footer showing correct info
☐ Performance good (pages load fast)
```

---

## 📊 Verification Checklist (Quick)

### Run through these fast tests:

```
Homepage:
  ☐ Loads without errors
  ☐ Images visible
  ☐ Carousel works
  ☐ Featured products show

Products Page:
  ☐ Products list shows
  ☐ Search works
  ☐ Filters work
  ☐ Product detail page works

Admin Panel:
  ☐ Can log in
  ☐ Can add products
  ☐ Can view quotes
  ☐ Can view contacts
  ☐ Can update settings

Data:
  ☐ Admin data appears on frontend
  ☐ Frontend data appears in admin
  ☐ Data survives refresh

Mobile:
  ☐ Menu works
  ☐ Content readable
  ☐ Forms usable
  ☐ Images display
```

**All checked? Site is live! ✅**

---

## 🐛 Troubleshooting Quick Fixes

### Website shows 404 or blank page
```
☐ Check Node.js is running in cPanel
☐ Restart Node.js app
☐ Clear browser cache (Ctrl+Shift+Delete)
☐ Check error log in cPanel
☐ Try different browser
```

### Images not showing
```
☐ Check public folder is uploaded
☐ Images should be in: public_html/public/
☐ Try absolute paths: /image.jpg
☐ Check browser console for errors
```

### Admin login not working
```
☐ Clear browser cache completely
☐ Check credentials you entered
☐ Verify file was saved correctly
☐ Restart Node.js app
☐ Try in private/incognito window
```

### Data not showing on frontend
```
☐ Wait 30 seconds for sync
☐ Refresh page
☐ Check browser console
☐ Try adding product again
☐ Verify data in localStorage (see Step 11)
```

### Performance slow
```
☐ Wait - first request is slow (initialization)
☐ Second request is fast
☐ Check if hosting plan needs upgrade
☐ Compress images before upload
```

---

## 💾 Step 11: Backup & Data Check

### Backup Your Work:
```
☐ In cPanel > Backups
☐ Download full backup
☐ Store locally
☐ Set reminder for weekly backups
```

### Check Data Location:
```
In browser console (F12):

☐ View storage:
   Object.keys(localStorage)
   
☐ Should see:
   - tei_products
   - tei_quotes
   - tei_contacts
   - tei_settings

☐ View data:
   JSON.parse(localStorage.getItem('tei_products'))
   
☐ Should see products you added
```

---

## 📞 Post-Deployment Support

### If something doesn't work:

1. **Check Documentation:**
   - See: QUICK_START_HOSTING.md (Troubleshooting section)
   - See: DEPLOYMENT_GUIDE.md (full troubleshooting)

2. **Check Error Log:**
   - cPanel > Error Log
   - Browser Console (F12)
   - Check error messages

3. **Try Quick Fixes Above**

4. **Contact GoDaddy Support:**
   - Provide error message
   - Provide steps you took
   - Reference deployment guide

---

## ✨ Site Going Live - Final Verification

### Final Checklist Before Announcing:

```
Functionality:
  ☐ All pages load
  ☐ All forms work
  ☐ Images display
  ☐ Mobile responsive

Content:
  ☐ Company name correct
  ☐ Contact info accurate
  ☐ Products added
  ☐ Sample data in admin

Security:
  ☐ Admin password changed
  ☐ HTTPS enabled
  ☐ No test data left

Backup:
  ☐ Initial backup created
  ☐ Backup location documented
  ☐ Backup procedure noted

Documentation:
  ☐ Team has access to docs
  ☐ Admin trained
  ☐ Support contacts available

Performance:
  ☐ Website loads fast
  ☐ No console errors
  ☐ Mobile tested

Monitoring:
  ☐ Error log setup
  ☐ Daily monitoring plan
  ☐ Contact available
```

---

## 🎉 Deployment Complete!

When all items checked:

✅ **Site is Live!**
✅ **Admin panel working!**
✅ **Data persisting!**
✅ **Ready for production!**

---

## 📝 Notes for Your Team

```
Website: https://yourdomain.com
Admin Panel: https://yourdomain.com/admin
Admin Email: [YOUR EMAIL]
Admin Password: [KEEP SECURE]

Documentation:
  - User Guide: README.md
  - Admin Guide: DEPLOYMENT_GUIDE.md
  - Tech Docs: API_DOCUMENTATION.md
  - Support: DOCUMENTATION_INDEX.md

Contacts:
  Website Support: [YOUR CONTACT]
  Domain: [YOUR DOMAIN]
  Hosting: GoDaddy
```

---

## 🔄 After Going Live

### Week 1:
```
☐ Monitor daily
☐ Check error logs
☐ Get user feedback
☐ Make notes of issues
☐ Create weekly backup
```

### Week 2-4:
```
☐ Add more products
☐ Optimize based on feedback
☐ Monitor performance
☐ Plan improvements
☐ Weekly backups
```

### Ongoing:
```
☐ Daily monitoring
☐ Regular backups
☐ Content updates
☐ Performance checks
☐ Security monitoring
```

---

## 📎 Keep This Handy

**Print or bookmark this checklist for:**
- Quick reference during deployment
- Troubleshooting later
- Training new team members
- Annual audits

---

**Deployment Checklist v1.0**
**Last Updated: February 2026**
**Status: Ready to Use**

Good luck with your deployment! 🚀
