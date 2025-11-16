# Livato → LabelHub Integration Guide

## 🎯 Strategy Overview

### **Two-Site Funnel:**
```
Livato Solutions (Next.js)          LabelHub (Laravel E-commerce)
Marketing & Lead Gen        →       Online Store & Checkout
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Product information                - Shopping cart
- Label Finder tool                  - Online ordering
- Resources & downloads              - Checkout & payment
- Contact form (B2B/bulk)            - Order tracking
- Captures leads in MySQL ✅         - Product catalog
```

---

## 📊 **Customer Journey:**

### **Scenario 1: Small Order / Quick Buy**
```
1. User lands on Livato
2. Uses Label Finder
3. Sees recommendations
4. Clicks "Shop Now" → LabelHub
5. Adds to cart & checkout
```

### **Scenario 2: Bulk / Custom Order**
```
1. User lands on Livato
2. Browses products/resources
3. Needs bulk or custom solution
4. Fills contact form
5. Sales team follows up
```

---

## 🔗 **LabelHub URL Structure:**

Based on `/Users/mohanvemulakonda/Documents/GitHub/LabelHub_Laravel/routes/web.php`:

### **Public Routes:**
- Homepage: `https://labelhub.yourdomain.com/`
- Categories: `https://labelhub.yourdomain.com/categories`
- Products: `https://labelhub.yourdomain.com/products/{slug}`
  - Example: `/products/thermal-labels`
  - Example: `/products/barcode-labels`
- Contact: `https://labelhub.yourdomain.com/contact`

### **Authenticated Routes** (requires login):
- Shopping Cart: `/order`
- My Orders: `/myorder`
- Profile: `/profile`

---

## 🛠️ **Integration Points on Livato:**

### **1. Global "Shop Now" Button** (Header/Hero)
```tsx
<Link
  href="https://labelhub.yourdomain.com"
  className="shop-now-cta"
  target="_blank"
>
  Shop Labels Online
</Link>
```

### **2. Product Pages**
Each product description includes:
```tsx
<div className="cta-section">
  <button>Contact for Bulk Orders</button>
  <Link href="https://labelhub.yourdomain.com/products/{slug}">
    Buy Online →
  </Link>
</div>
```

### **3. Label Finder Results**
After recommendations:
```tsx
<div className="label-finder-results">
  <h3>Recommended: {material} Labels</h3>
  <div className="actions">
    <Link href="https://labelhub.yourdomain.com/products/{recommendedProduct}">
      Shop These Labels
    </Link>
    <Link href="/contact?source=label-finder">
      Request Quote
    </Link>
  </div>
</div>
```

### **4. Resources/Downloads**
After downloading catalog:
```
"Ready to order? Shop on LabelHub →"
```

---

## 📝 **URL Parameter Strategy:**

### **Option A: Simple Link**
```
https://labelhub.yourdomain.com/products/thermal-labels
```

### **Option B: With Source Tracking** (Recommended)
```
https://labelhub.yourdomain.com/products/thermal-labels?source=livato&tool=label-finder
```

LabelHub can track where traffic comes from!

### **Option C: Pre-fill Cart** (Advanced)
```
https://labelhub.yourdomain.com/order?product=thermal-labels&qty=100
```

Requires LabelHub modification to read URL params.

---

## 🎨 **CTA Button Styles:**

### **Primary CTA: "Shop Now"**
For immediate purchase intent:
```tsx
<Link
  href="https://labelhub.yourdomain.com/products/{slug}"
  className="bg-[#2563EB] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
  target="_blank"
>
  Shop Now on LabelHub →
</Link>
```

### **Secondary CTA: "Contact Us"**
For B2B/bulk/custom:
```tsx
<Link
  href="/contact"
  className="border-2 border-gray-900 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
>
  Request Bulk Quote
</Link>
```

---

## 🚀 **Implementation Checklist:**

### **Phase 1: Basic Integration** (30 mins)
- [ ] Add environment variable for LabelHub URL
- [ ] Create `ShopNowButton` component
- [ ] Add "Shop Now" to homepage hero
- [ ] Add "Shop Now" to product pages
- [ ] Add "Shop Now" to Label Finder results

### **Phase 2: Smart Routing** (1 hour)
- [ ] Map Livato products → LabelHub product slugs
- [ ] Create product mapping config
- [ ] Add source tracking parameters
- [ ] Test all links

### **Phase 3: Analytics** (30 mins)
- [ ] Track "Shop Now" clicks (Google Analytics)
- [ ] Track Label Finder → LabelHub conversions
- [ ] Track Contact Form vs Shop Now split

---

## 📋 **Product Mapping Example:**

Create `/lib/labelhub-products.ts`:
```typescript
export const productMapping = {
  // Livato product → LabelHub slug
  'thermal-labels': 'thermal-paper-labels',
  'barcode-labels': 'barcode-labels',
  'polyester-labels': 'polyester-labels',
  'custom-labels': 'custom-labels',
  // ... add all products
};

export function getLabelHubUrl(product: string, source: string = 'livato') {
  const baseUrl = process.env.NEXT_PUBLIC_LABELHUB_URL;
  const slug = productMapping[product] || product;
  return `${baseUrl}/products/${slug}?source=${source}`;
}
```

---

## 🎯 **Messaging Strategy:**

### **On Livato:**
- "Explore our solutions" (information)
- "Find the perfect label" (guidance)
- "Download resources" (education)
- **CTA: "Shop Now on LabelHub" or "Contact Us"**

### **On LabelHub:**
- "Buy labels online" (transactional)
- "Add to cart" (action)
- "Checkout" (conversion)

---

## 💡 **Future Enhancements:**

### **Option 1: Single Sign-On (SSO)**
User logs in on Livato → auto-logged into LabelHub

### **Option 2: Unified Cart**
Show LabelHub cart badge on Livato header

### **Option 3: Embedded Checkout**
Checkout on Livato using LabelHub API

---

## 📊 **Success Metrics:**

Track these to measure success:
- Livato → LabelHub click-through rate
- Label Finder → Shop Now conversion
- Contact Form (B2B) vs Shop Now (B2C) split
- Overall conversion funnel

---

**Next Step:** Add environment variable and create ShopNowButton component!

Would you like me to implement Phase 1 now?
