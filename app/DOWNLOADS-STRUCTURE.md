# Downloads Page Structure Guide

## Directory Organization

```
/app
├── datasheets/              # Product specification sheets
│   ├── shipping-labels/     # ✅ Created (Example)
│   ├── pharmaceutical-labels/
│   ├── automotive-labels/
│   └── food-beverage-labels/
│
├── catalogs/                # Product catalogs
│   ├── 2025/               # Full product catalog
│   ├── printers/           # Printer catalog
│   └── labels/             # Labels catalog
│
├── guides/                  # Technical & application guides
│   ├── material-selection/  # Material selection guide
│   ├── ribbon-selection/    # Ribbon selection chart
│   └── healthcare-labeling/ # Healthcare guide
│
└── flyers/                  # Marketing flyers
    ├── shipping-solutions/
    └── pharmaceutical-solutions/
```

## How to Add New Documents

### 1. DATASHEETS (Product Specifications)

**Location:** `/app/datasheets/[product-name]/page.tsx`

**Example:** Shipping Labels Datasheet
- Path: `/app/datasheets/shipping-labels/page.tsx`
- URL: `http://localhost:3003/datasheets/shipping-labels`

**To create a new datasheet:**
```bash
# Copy the shipping labels template
cp -r /app/datasheets/shipping-labels /app/datasheets/pharmaceutical-labels

# Edit the new file
# Update: title, description, specifications, materials, printers
```

**What to include:**
- Product title and description
- Key applications and features
- Label image placeholder (on the right)
- Recommended materials table
- Compatible ribbons
- Recommended printers
- Standard sizes
- Contact information

---

### 2. CATALOGS (Full Product Listings)

**Location:** `/app/catalogs/[catalog-name]/page.tsx`

**Example:** Create 2025 Product Catalog
```bash
mkdir -p /app/catalogs/2025
touch /app/catalogs/2025/page.tsx
```

**To create:**
- Use multi-page layout
- Include all products with images
- Pricing tables (if applicable)
- Product comparison charts
- Index/table of contents

---

### 3. GUIDES (Technical & Application Guides)

**Location:** `/app/guides/[guide-name]/page.tsx`

**Example:** Material Selection Guide
```bash
mkdir -p /app/guides/material-selection
touch /app/guides/material-selection/page.tsx
```

**What to include:**
- Step-by-step instructions
- Decision trees/flowcharts
- Comparison tables
- Best practices
- Case studies

---

### 4. FLYERS (Marketing Materials)

**Location:** `/app/flyers/[flyer-name]/page.tsx`

**Example:** Single-page marketing flyer
```bash
mkdir -p /app/flyers/shipping-solutions
touch /app/flyers/shipping-solutions/page.tsx
```

**What to include:**
- Eye-catching header
- Key benefits (3-4 points)
- Product images
- Call-to-action
- Contact information

---

## Adding to Downloads Page

After creating a document, add it to `/app/downloads/page.tsx`:

```typescript
{
  title: 'Pharmaceutical Labels - Product Datasheet',
  description: 'FDA compliant pharmaceutical labeling solutions',
  type: 'Datasheet',
  size: '2.3 MB',
  viewUrl: '/datasheets/pharmaceutical-labels',
  downloadUrl: '/downloads/pdf/pharmaceutical-labels-datasheet.pdf'
}
```

---

## Document Template Structure

Each document should have:

### Header Section
- Company logo and name
- Document type badge (Datasheet/Catalog/Guide)
- Version and date

### Content Sections
- Overview with image
- Specifications/details
- Technical information
- Applications

### Footer Section
- Contact information
- Copyright notice
- Company location

### Action Bar (top)
- "Print / Save as PDF" button
- "Back to [parent]" link

---

## File Naming Conventions

- **Directories:** lowercase-with-hyphens
- **Page files:** Always `page.tsx`
- **URLs:** Match directory structure
  - `/datasheets/shipping-labels` → `/app/datasheets/shipping-labels/page.tsx`

---

## Quick Copy Commands

### Copy shipping labels template to create new datasheet:
```bash
cp -r app/datasheets/shipping-labels app/datasheets/NEW-PRODUCT-NAME
```

### Create new catalog:
```bash
mkdir -p app/catalogs/CATALOG-NAME
touch app/catalogs/CATALOG-NAME/page.tsx
```

### Create new guide:
```bash
mkdir -p app/guides/GUIDE-NAME
touch app/guides/GUIDE-NAME/page.tsx
```

---

## Remember

1. **Each document is a web page** that can be viewed online
2. **Print/PDF functionality** is built into each page
3. **Downloads page lists all documents** with "View Online" and "Download PDF" buttons
4. **Consistent design** across all documents
5. **Include image placeholders** for product visuals

---

## Next Steps

1. Create more datasheets by copying the shipping labels template
2. Update downloads page with new entries
3. Replace image placeholders with actual product photos
4. Generate PDF versions for download links
