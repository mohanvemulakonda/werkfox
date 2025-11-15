# Quick Brochure System - Add PDFs in 2 Minutes!

## 🚀 How to Add New Brochures (Super Easy!)

### Step 1: Add Your PDF
Place your PDF file in: `/public/downloads/your-brochure-name.pdf`

### Step 2: Add Configuration
Open `lib/brochures.ts` and add your brochure to the array:

```typescript
{
  id: 'your-brochure-id',
  title: 'Your Brochure Title',
  description: 'Brief description of what this brochure covers.',
  highlights: [
    'Key feature 1',
    'Key feature 2',
    'Key feature 3',
    'Key feature 4',
  ],
  pdfFile: 'your-brochure-name.pdf',
  category: 'application', // Options: 'application', 'industry', 'material', 'comprehensive'
  color: 'blue', // Options: 'red', 'blue', 'green', 'purple', 'orange'
  pageCount: 8,
  fileSize: '2.5 MB',
}
```

### Step 3: Done! ✅
That's it! Your brochure will automatically appear on:
- `/downloads` page (in the brochures section)
- `/brochure/your-brochure-id` (dedicated viewer page)

---

## 📋 Quick Reference

### Categories
- `comprehensive` - Full product catalogs (like main portfolio)
- `industry` - Industry-specific solutions (Pharma, Retail, Food, etc.)
- `application` - Application-based (Barcodes, Serialization, etc.)
- `material` - Material-specific (Polyester, Vinyl, etc.)

### Colors
- `red` - Red gradient background
- `blue` - Blue gradient background
- `green` - Green gradient background
- `purple` - Purple gradient background
- `orange` - Orange gradient background

### Making a Brochure Featured
Add `featured: true` to make it the hero brochure on the downloads page!

---

## 🎯 Example: Adding 5 Brochures at Once

1. **Place PDFs in `/public/downloads/`:**
   - automotive-labels.pdf
   - logistics-labels.pdf
   - tamper-evident-labels.pdf
   - qr-code-labels.pdf
   - polyester-material.pdf

2. **Add all 5 to `lib/brochures.ts`:**

```typescript
export const brochures: Brochure[] = [
  // ... existing brochures ...

  {
    id: 'automotive-labels',
    title: 'Automotive Labeling Solutions',
    description: 'Durable labels for automotive parts, VINs, and harsh environments.',
    highlights: [
      'Heat & chemical resistant',
      'Automotive grade adhesives',
      'VIN & part identification',
      'Long-term durability',
    ],
    pdfFile: 'automotive-labels.pdf',
    category: 'industry',
    color: 'orange',
    pageCount: 6,
    fileSize: '2.2 MB',
  },
  {
    id: 'logistics-labels',
    title: 'Logistics & Shipping Labels',
    description: 'Complete shipping label solutions - compliance, tracking, routing.',
    highlights: [
      'GS1-128 compliant',
      'Carrier-approved materials',
      'Weather resistant',
      'High-speed printing',
    ],
    pdfFile: 'logistics-labels.pdf',
    category: 'industry',
    color: 'blue',
    pageCount: 8,
    fileSize: '2.8 MB',
  },
  {
    id: 'tamper-evident-labels',
    title: 'Tamper-Evident Security Labels',
    description: 'Anti-counterfeit and tamper-evident labeling solutions.',
    highlights: [
      'Void & checkerboard patterns',
      'Destructible materials',
      'Holographic features',
      'Custom security messages',
    ],
    pdfFile: 'tamper-evident-labels.pdf',
    category: 'application',
    color: 'red',
    pageCount: 4,
    fileSize: '1.9 MB',
  },
  {
    id: 'qr-code-labels',
    title: 'QR Code & 2D Barcode Labels',
    description: 'Advanced 2D barcode labeling for track & trace applications.',
    highlights: [
      'Data Matrix & QR codes',
      'High-density data encoding',
      'Verification included',
      'Mobile scanning optimized',
    ],
    pdfFile: 'qr-code-labels.pdf',
    category: 'application',
    color: 'purple',
    pageCount: 4,
    fileSize: '1.6 MB',
  },
  {
    id: 'polyester-material',
    title: 'Polyester Label Materials',
    description: 'Technical specifications for polyester label stocks.',
    highlights: [
      'Extreme durability',
      'Chemical & solvent resistant',
      'Temperature range -40°C to 150°C',
      'UV resistant',
    ],
    pdfFile: 'polyester-material.pdf',
    category: 'material',
    color: 'green',
    pageCount: 3,
    fileSize: '1.2 MB',
  },
];
```

3. **Refresh the page!** All 5 brochures now appear automatically!

---

## 🎨 Advanced: Organizing Brochures on Downloads Page

Currently all brochures show in one section. To organize them:

1. Edit `/app/downloads/page.tsx`
2. Use the helper functions:

```typescript
import { getBrochuresByCategory } from '@/lib/brochures';

// Get all industry brochures
const industryBrochures = getBrochuresByCategory('industry');

// Get all application brochures
const applicationBrochures = getBrochuresByCategory('application');
```

---

## 📦 What Gets Created Automatically

When you add a brochure, you get:

✅ **Download link** - Direct PDF download
✅ **View online page** - Full-screen PDF viewer at `/brochure/your-id`
✅ **Preview card** - On downloads page with your specified color
✅ **Highlights list** - Automatically formatted
✅ **SEO metadata** - Generated from your description

---

## 🔥 Pro Tips

1. **Consistent naming:** Use kebab-case for IDs (`automotive-labels`, not `Automotive Labels`)
2. **PDF optimization:** Keep PDFs under 5MB for fast loading
3. **Highlight count:** 3-4 highlights work best for card layout
4. **Page count:** Include for better user experience
5. **Color choice:** Match to your brand or category (e.g., pharma = blue, food = green)

---

## ❓ Troubleshooting

**PDF not showing?**
- Check the filename matches exactly in `pdfFile`
- Verify PDF is in `/public/downloads/`
- Clear browser cache and refresh

**Brochure not appearing on page?**
- Make sure you added it to the `brochures` array in `lib/brochures.ts`
- Check for syntax errors (missing commas, brackets)
- Restart dev server

---

Need help? The system is designed to be foolproof - just copy/paste the template and change the details!
