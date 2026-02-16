# Admin Guide - Multiple Product Images

## Quick Start

### Add a Product with Multiple Images

1. **Go to Admin Panel**
   - Navigate to `/admin/login`
   - Login: `admin@tei.com` / `admin123`
   - Click "Products" in sidebar

2. **Click "Add Product" Button**
   - Modal opens with 75% height
   - Content area is scrollable
   - Header stays at top

3. **Fill Basic Information**
   - Product Name
   - Category (Mechanical, Electrical, etc.)
   - Subcategory (auto-populates based on category)
   - Description (full text about the product)
   - Specifications (one per line)

4. **Add Images** (3 ways)

   **Method 1: Upload Multiple Files**
   ```
   - Click file input
   - Select 2-5 images at once
   - They appear in preview grid
   ```

   **Method 2: Add Image URL**
   ```
   - Paste image URL
   - Click "Add" button
   - Image added to grid
   ```

   **Method 3: Mixed**
   ```
   - Upload 2 images
   - Add 1 via URL
   - Continue adding as needed
   ```

5. **Manage Images**
   - See all images in grid preview
   - Hover image to see "Remove" button
   - Click remove to delete that image
   - Order doesn't matter (first image = main image)

6. **Mark as Featured** (Optional)
   - Toggle "Featured Product" switch
   - Featured products appear on homepage

7. **Save**
   - Click "Save Product"
   - Product appears in list
   - Images synced to frontend immediately

---

## Image Best Practices

### File Formats
- ✅ JPEG - Best for photos
- ✅ PNG - Best for graphics
- ✅ WebP - Modern format
- ✅ URLs - External images

### Recommended Sizes
- **Main Image**: 1200x1200px (square)
- **Detail Photos**: 800x600px or wider
- **Multiple Angles**: 3-5 images per product
- **File Size**: <2MB per image

### Organization Tips
1. **First Image**: Main/hero image
2. **Second Image**: Front angle detail
3. **Third Image**: Side/back view
4. **Fourth Image**: Close-up of key feature
5. **Fifth Image**: In-use scenario (optional)

---

## Frontend Display

### Product Listing Page (/products)
- Shows **first image only**
- Grid layout, 3-4 products per row
- Hover effect enlarges image
- Click to go to detail page

### Product Detail Page (/products/[id])
- **Image Carousel**:
  - Large main image (full width on mobile)
  - Previous/Next buttons (arrows)
  - Image counter (2/5)
  - Thumbnail strip below
  - Click thumbnail to jump to image

### Featured Products (Homepage)
- Shows **first image only**
- 4 featured products in grid
- On mobile: 1-2 products per row
- Swipe carousel on mobile

---

## Admin Interface

### Products Table
| Column | Shows |
|--------|-------|
| Product | Thumbnail + name |
| Category | Blue badge |
| Subcategory | Plain text |
| Featured | Star icon (filled if featured) |
| Actions | Edit/Delete buttons |

### Image Count
- If product has 2+ images: Shows "2 images" under name
- Single image: No label shown
- Click edit to modify

### Edit Product
- Same form as add
- Can add more images
- Can remove existing images
- All images displayed in grid

---

## Troubleshooting

### Image Not Uploading
**Problem**: File upload not working
**Solution**:
- Check file size (max 2MB recommended)
- Verify file format (JPG, PNG, WebP)
- Try using URL method instead
- Clear browser cache and try again

### Image Not Showing on Frontend
**Problem**: Uploaded image not visible on product page
**Solution**:
- Check admin product was saved successfully
- Refresh frontend page (hard refresh: Ctrl+Shift+R)
- Check browser console for errors
- Verify at least one image was uploaded

### Images Disappeared After Refresh
**Problem**: Images gone after browser refresh
**Solution**:
- Check localStorage is enabled
- Try different browser
- Images saved to localStorage (~1MB per product)
- Check browser storage limit not exceeded

### Modal Won't Scroll
**Problem**: Can't see all form fields in modal
**Solution**:
- Modal is designed to scroll at 75% height
- Scroll inside the modal content area
- On mobile: Modal takes up full height, scroll works normally
- If still stuck: Try zooming out browser (Ctrl + -)

---

## Data Persistence

### Where Data is Stored
- **Browser**: localStorage (automatic)
- **Format**: JSON with base64 images
- **Limit**: 5-10MB per browser (can store 50+ products)
- **Persistence**: Survives browser restart

### Backup Your Data
Before deploying to production:
```
1. Export products from admin
2. Download as JSON
3. Keep as backup
4. Can be restored later
```

### Migration to Database
When ready to use real database:
1. No code changes needed in UI
2. Just update store.tsx to fetch from API
3. All images work the same way
4. Images can be uploaded to cloud storage (S3, etc.)

---

## Tips & Tricks

### Fast Image Addition
1. Prepare 3-5 product images
2. Name them clearly (product-1.jpg, etc.)
3. Upload all at once (select multiple files)
4. Drag from File Explorer to upload field (on desktop)

### Carousel Navigation
**Desktop Users**:
- Click left/right arrows
- Click thumbnails
- Use arrow keys (future feature)

**Mobile Users**:
- Swipe left/right on main image
- Tap thumbnails
- Full carousel experience

### Featured Products
- Homepage shows 4 featured products
- Set 4-6 products as featured for variety
- Change featured status to rotate promotions
- Updates live immediately

### Search & Filter
- Filter by category in product list
- Search by product name
- Shows product count
- Useful for large catalogs

---

## Common Tasks

### Task: Replace Product Image
1. Click edit pencil icon next to product
2. Hover problematic image
3. Click "Remove"
4. Add new image (upload or URL)
5. Click "Save Product"
✅ Done in 30 seconds

### Task: Add Angle Photos to Existing Product
1. Edit product
2. Upload new photos
3. Existing photos stay
4. New photos added to carousel
5. Save

### Task: Reorder Images
1. Current order: Based on upload time
2. Future: Can drag to reorder
3. Workaround now:
   - Delete all images
   - Re-upload in desired order
   - Or edit to reorder manually

### Task: Bulk Upload Products
1. Prepare all product data
2. Add one product at a time (or automate)
3. Each gets its images
4. All synced to frontend
5. Scales to 100+ products

---

## Performance Tips

### Optimize Upload Speed
1. Resize images to 1200x1200 max
2. Save as JPG (smaller than PNG)
3. Use compression tool first
4. Images load instantly from localStorage

### Manage Storage
1. Typical setup: 50 products × 4 images = 200 files
2. Average size: 100-200KB per image
3. Total: ~20-40MB (well within browser limits)
4. Monitor in DevTools → Application → Storage

### Mobile Optimization
1. Images automatically resize for mobile
2. Responsive carousel works perfectly
3. Touch-friendly controls
4. Minimal bandwidth usage

---

## Security Notes

### Data Protection
- Images stored in browser only (secure)
- No server access to products initially
- Deploy to GoDaddy for server storage
- Use HTTPS for secure data transfer

### Admin Access
- Login: `admin@tei.com` / `admin123`
- Change password after first login
- Don't share admin credentials
- Can create additional admin accounts later

---

## Getting Help

### Documentation Files
- `LATEST_UPDATES.md` - Technical details
- `README.md` - Project overview
- `QUICK_START_HOSTING.md` - Deployment guide
- `API_DOCUMENTATION.md` - Developer reference

### Support Steps
1. Check troubleshooting section above
2. Clear browser cache and try again
3. Test in different browser
4. Check browser console (F12) for errors
5. Contact support with error details

---

**Version**: 1.0
**Last Updated**: 2024
**Status**: Production Ready ✅
