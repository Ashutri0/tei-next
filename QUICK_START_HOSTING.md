# Quick Start: GoDaddy/cPanel Hosting - For UI Developers

**TL;DR:** Follow these 7 steps to deploy your website live in 30 minutes.

---

## Prerequisites (5 min)

- [ ] GoDaddy hosting account active
- [ ] Domain pointing to GoDaddy nameservers
- [ ] cPanel access credentials
- [ ] Project built locally (`npm run build`)

---

## Step 1: Prepare Project for Deployment (5 min)

### Local Build
```bash
# In your project directory
npm install
npm run build
```

### Create Deployment Package
```bash
# Create ZIP with all necessary files
# Include: .next, public, package.json, package-lock.json, node_modules

# macOS/Linux:
zip -r tei-website.zip .next public package.json package-lock.json node_modules

# Windows:
# Right-click project folder > Send to > Compressed (zipped) folder
```

### Result
- You now have: `tei-website.zip` (~150MB)

---

## Step 2: Access GoDaddy cPanel (2 min)

### 1. Log in to GoDaddy
- Go to [GoDaddy.com](https://www.godaddy.com)
- Click "Sign In" (top right)
- Enter your email/password

### 2. Find Your Hosting
- Click "My Products" (top left)
- Find "Web Hosting" or "Linux Hosting"
- Click "Manage"

### 3. Open cPanel
- Scroll down
- Click "cPanel" or "Open cPanel" (usually blue button)

### Result
- You're now in cPanel dashboard

---

## Step 3: Upload Files to GoDaddy (10 min)

### Method A: Using File Manager (Easiest)

**Steps:**
1. In cPanel, click **"File Manager"**
2. Click **"public_html"** folder (this is your website root)
3. **IMPORTANT:** Before proceeding, backup existing files:
   - Create new folder called "old_backup"
   - Move old files into it
   - (You can delete after confirming new site works)
4. Click **"Upload"** button
5. Select your **`tei-website.zip`** file
6. Once uploaded (usually 2-5 min):
   - Right-click the ZIP file
   - Select **"Extract"**
7. After extraction, move files:
   - Open extracted folder
   - Move `.next`, `public`, `package.json`, `package-lock.json`, `node_modules` to `public_html`

**Expected Result:**
```
public_html/
  ├── .next/
  ├── public/
  ├── node_modules/
  ├── package.json
  └── package-lock.json
```

---

## Step 4: Configure Node.js (3 min)

### 1. Find Node.js Manager
- In cPanel, search for **"Node.js"** or **"App Manager"**
- Click **"Node.js Manager"** or **"Node.js Selector"**

### 2. Create New Application
- Click **"Create Application"**
- Fill in:
  - **Node.js Version:** 18 or 20
  - **Application Root:** `/home/yourusername/public_html`
  - **Application URL:** Your domain name
  - **Application Startup File:** `npm start`

### 3. Advanced Settings (if available)
- **Environment:** Production
- **Run as:** default user

### 4. Create
- Click **"Create"**
- Wait for confirmation (usually instant)

### Result
- Node.js app is running on your domain

---

## Step 5: Verify Package.json (2 min)

### Check Start Script

In cPanel, go to **"File Manager"** > `public_html`:
- Find `package.json`
- Right-click > **"Edit"**
- Look for this section:

```json
"scripts": {
  "build": "next build",
  "start": "next start -p 8080",
  "dev": "next dev"
}
```

If it says `"start": "next start -p 3000"` → Change to port `8080`

**Why:** GoDaddy requires apps to run on port 8080

---

## Step 6: Test Your Website (3 min)

### 1. Visit Your Domain
- Open browser
- Go to `https://yourdomain.com`
- You should see your website! 🎉

### 2. Verify Features
- [ ] Homepage loads
- [ ] Images display
- [ ] Navigation works
- [ ] Responsive on mobile
- [ ] Admin login accessible at `/admin/login`

### 3. Test Admin Panel
- Go to `https://yourdomain.com/admin/login`
- Log in:
  - Email: `admin@tei.com`
  - Password: `admin123`
- Add a test product
- Check it appears on homepage

### If Something Doesn't Work
→ See **Troubleshooting** section below

---

## Step 7: Final Setup (5 min)

### 1. Change Admin Credentials

**IMPORTANT:** Do this before sharing with team!

1. In cPanel > File Manager > `public_html`
2. Find file: `lib/auth-context.tsx`
3. Edit it
4. Find this section:
```typescript
const defaultAdminCredentials = {
  email: 'admin@tei.com',
  password: 'admin123'
}
```

5. Change to your credentials:
```typescript
const defaultAdminCredentials = {
  email: 'your-email@company.com',
  password: 'your-secure-password'
}
```

6. Save file
7. In cPanel, restart Node.js app

### 2. Update Contact Information
- Go to `https://yourdomain.com/admin`
- Log in with new credentials
- Click **"Settings"**
- Update:
  - Email address
  - Phone number
  - Office address
  - Business hours
- Click **"Save Changes"**
- These now appear in footer on all pages

### 3. Add Your Products
- Go to **Products** in admin
- Click **"Add Product"**
- Upload/add image
- Fill details
- Save
- Product appears on frontend immediately!

---

## Troubleshooting

### ❌ "Cannot GET /"

**Cause:** Node.js app not running

**Fix:**
1. cPanel > Node.js Manager
2. Check app status (should be "Running")
3. If stopped, click "Start"
4. Wait 10 seconds, refresh browser

### ❌ Images Not Loading

**Cause:** Public folder not uploaded

**Fix:**
1. File Manager > public_html
2. Make sure `public` folder exists
3. Inside should be your images
4. If missing, upload public folder
5. Refresh website

### ❌ 404 Errors on Routes

**Cause:** Next.js routing not configured

**Fix:**
1. cPanel > File Manager > public_html
2. Create `.htaccess` file with:
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

3. Or contact GoDaddy to enable URL rewriting

### ❌ Admin Login Not Working

**Cause:** Wrong credentials

**Fix:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try credentials again
3. If changed credentials, file might not be saved
4. Check file was edited correctly

### ❌ Slow Loading

**Cause:** Normal for first request after deployment

**Fix:**
1. Refresh page (second load is fast)
2. Check Node.js version is 18+
3. Consider upgrading GoDaddy hosting plan

### ❌ Contact Form Not Saving

**Cause:** localStorage issue on different browsers

**Fix:**
1. Submit from same browser
2. Go to admin on same browser
3. Data should appear
4. This is expected (browser-specific storage)
5. To fix: Upgrade to real database

---

## Important Notes

### ⚠️ Data Storage
- All data is stored in **browser's localStorage**
- Each browser/device sees different data
- Clearing cache deletes data

**Recommendation:** Once site is live, upgrade to real database (Supabase, MongoDB, etc.) if multiple users need shared data.

### ⚠️ SSL/HTTPS
- Most GoDaddy plans include free SSL
- If not, contact support for Let's Encrypt
- Your site should auto-redirect to `https://`

### ⚠️ Backups
- Create backups regularly:
  1. In cPanel, click **"Backups"**
  2. Download backup of entire account
  3. Store locally

### ⚠️ Monitoring
- Check website daily first week
- Monitor for errors:
  1. cPanel > Error Log
  2. Browser DevTools > Console
- Have support ready if issues arise

---

## What's Happening Behind the Scenes?

```
Your Domain (yourdomain.com)
    ↓
GoDaddy Servers
    ↓
Node.js Application
    ↓
Next.js Framework
    ↓
React Components
    ↓
Browser localStorage
    ↓
Website Rendered
```

- **Public folder:** Contains images, styles, assets
- **.next folder:** Compiled application code
- **package.json:** Defines how app runs
- **Admin panel:** Stored in browser's localStorage
- **Data:** Persists automatically

---

## Quick Commands (if using SSH)

For advanced users, SSH to your hosting:

```bash
# Connect
ssh username@yourdomain.com

# Go to website folder
cd public_html

# Check if Node.js is running
pm2 status

# View logs
pm2 logs

# Restart app
pm2 restart all

# Clear Node.js cache
rm -rf .next
npm run build
```

---

## Success Checklist

After deployment, verify:

- [ ] Website loads at yourdomain.com
- [ ] HTTPS works (secure lock icon)
- [ ] Homepage displays
- [ ] Navigation works
- [ ] Images load
- [ ] Admin login works
- [ ] Can add products in admin
- [ ] Products appear on frontend
- [ ] Quote form works
- [ ] Contact form works
- [ ] Mobile responsive
- [ ] Footer shows correct contact info

**If all checked:** Your website is live! 🚀

---

## Support

### GoDaddy Help
- Live Chat: Log in to GoDaddy > Help > Contact Support
- Phone: Find number for your region on GoDaddy
- Knowledge Base: godaddy.com/help

### Common Fixes
1. **Restart Node.js** in cPanel
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Check file permissions** (should be 755 for folders, 644 for files)
4. **Contact GoDaddy support** if still stuck

---

## Next Steps

1. **Monitor:** Check website works daily for first week
2. **Update:** Add products and manage content via admin
3. **Optimize:** As user base grows, consider upgrading
4. **Backup:** Do weekly backups in cPanel
5. **Upgrade:** When ready, migrate to real database

---

## Performance Tips

For fast loading:

1. **Compress images** before uploading
2. **Use modern formats** (WebP)
3. **Enable caching** in cPanel
4. **Minimize redirects**
5. **Monitor error logs**

---

## Security Tips

Before sharing with others:

1. ✅ Change admin password
2. ✅ Update contact information
3. ✅ Enable HTTPS
4. ✅ Regular backups
5. ✅ Monitor error logs
6. ✅ Keep Node.js updated

---

## Estimated Costs

**GoDaddy Hosting:**
- Basic Linux Hosting: ~$2-5/month
- With Node.js: ~$5-10/month (depends on plan)
- Domain: ~$10-15/year
- SSL: Usually free (Let's Encrypt)

**Total first year:** ~$70-150

---

## When to Upgrade

Consider upgrading when:
- Site has 1000+ products
- Multiple admin users needed
- You want shared data across devices
- Performance needs optimization
- Need email functionality
- Want scheduled tasks/automation

**Upgrade Path:**
1. Add real database (Supabase, MongoDB)
2. Migrate API calls
3. Upgrade hosting plan if needed
4. Add advanced features

---

## Getting Help

**Documentation Files:**
- `README.md` - Project overview
- `DEPLOYMENT_GUIDE.md` - Detailed hosting guide
- `API_DOCUMENTATION.md` - Technical documentation
- `VERIFICATION_CHECKLIST.md` - Full system verification

**Still stuck?**
1. Check troubleshooting section above
2. Review error logs in cPanel
3. Contact GoDaddy support with error details
4. Provide them this guide + error messages

---

## Celebrate! 🎉

Your website is now live! You've successfully:

- ✅ Built a professional B2B website
- ✅ Created admin panel for product management
- ✅ Set up quote request system
- ✅ Deployed to production
- ✅ Connected frontend and backend
- ✅ Implemented responsive design
- ✅ Configured data persistence

**Next:** Start managing your products, quotes, and growing your business!

---

**Version:** 1.0
**Last Updated:** February 2026
**Hosting:** GoDaddy with cPanel
**Time to Deploy:** ~30-45 minutes
**Difficulty:** Beginner to Intermediate
