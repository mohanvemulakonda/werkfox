# Livato Solutions CRM System Guide

## Overview

The CRM system is designed to manage the entire sales lifecycle - from initial contact to closed deals with proper invoicing and GST compliance.

## System Architecture

### 1. **Contacts → Leads → Opportunities → Invoices**

```
Contact (Website Form)
    ↓
Lead (Qualified Contact)
    ↓
Opportunity (Sales Deal)
    ↓
Quote → Invoice → Payment
```

## Database Models

### 1. Contact Model
**Purpose**: Capture all incoming inquiries from website forms (contact form, label finder, quote requests)

**Key Fields**:
- Basic info: name, email, phone, company
- Source tracking: source (contact_form, label_finder, etc.)
- Status: NEW, CONTACTED, QUALIFIED, QUOTE_SENT, CONVERTED, LOST
- CRM Integration: `convertedToLeadId` - tracks if converted to Lead

**Workflow**:
1. User submits contact form
2. Admin reviews in Contacts page
3. Qualify and convert to Lead for follow-up

---

### 2. Lead Model
**Purpose**: Qualified contacts with complete address and GST details

**Key Fields**:
- Contact info: name, email, phone, company, designation
- Address: billing/shipping address, city, state, pincode
- **GST Details**:
  - `gstNumber`: Customer's GST number
  - `gstType`: REGISTERED, UNREGISTERED, COMPOSITION, SEZ, EXPORT
- Pipeline: stage (NEW, CONTACTED, QUALIFIED, PROPOSAL_SENT, etc.)
- Status: ACTIVE, INACTIVE, CONVERTED, DISQUALIFIED
- Lead score: 0-100 scoring system
- Assignment: assignedTo (team member)
- Follow-up: nextFollowUp, lastContacted

**Relationships**:
- One Contact → One Lead (optional)
- One Lead → Many Opportunities
- One Lead → Many Invoices
- One Lead → Many Activities

**Workflow**:
1. Convert Contact to Lead
2. Add complete address and GST details
3. Assign to sales team member
4. Track follow-ups and activities
5. Create opportunities when deal is identified

---

### 3. Opportunity Model
**Purpose**: Represent potential sales deals with estimated value

**Key Fields**:
- name, description
- `leadId`: Associated lead
- **Deal Value**: `value`, `currency`, `probability` (0-100%)
- Expected/Actual close dates
- Stage: QUALIFICATION, NEEDS_ANALYSIS, PROPOSAL, NEGOTIATION, CLOSED_WON, CLOSED_LOST
- Status: OPEN, WON, LOST, ABANDONED
- Products: Associated products via OpportunityProduct table

**Relationships**:
- Many Opportunities → One Lead
- One Opportunity → Many Products (via OpportunityProduct)
- One Opportunity → Many Invoices (quotes → final invoice)

**Workflow**:
1. Create opportunity for a lead
2. Add products to opportunity
3. Track through sales stages
4. Generate quote from opportunity
5. Mark as WON/LOST

---

### 4. Product Model
**Purpose**: Product/Service catalog with pricing and GST rates

**Key Fields**:
- `sku`: Unique product code
- name, description, category
- **Pricing**: `basePrice`, `currency`
- **Tax**: `hsnCode` (HSN/SAC code), `gstRate` (percentage)
- Unit: "Nos", "Kg", "Meter", etc.
- Inventory: `isActive`, `stockQuantity`

**Example Products**:
```
SKU: LBL-001
Name: Custom Printed Labels (A4)
HSN Code: 4821
GST Rate: 18%
Base Price: 500
Unit: Pack
```

---

### 5. Invoice Model (with GST Breakdown)
**Purpose**: Quotes, Proforma Invoices, Tax Invoices with proper GST calculation

**Key Fields**:

#### Customer Details:
- customerName, customerEmail, customerPhone
- billingAddress, shippingAddress
- `customerGstNumber`, `customerState`
- `placeOfSupply`: State for GST calculation

#### Company Details:
- `companyGstNumber`: Your GST number
- `companyState`: Your state (default: Karnataka)

#### Amounts:
- `subtotal`: Sum of all items before discount/tax
- `discountAmount`, `discountPercent`
- **GST Breakdown**:
  - `cgstAmount`: Central GST (Intra-state)
  - `sgstAmount`: State GST (Intra-state)
  - `igstAmount`: Integrated GST (Inter-state)
  - `totalTax`: Total GST amount
- `shippingCharges`, `otherCharges`
- `total`: Final amount
- `roundOff`: Rounding adjustment

#### Type & Status:
- Type: QUOTE, PROFORMA, INVOICE, CREDIT_NOTE, DEBIT_NOTE
- Status: DRAFT, SENT, VIEWED, ACCEPTED, REJECTED, PARTIALLY_PAID, PAID, OVERDUE, CANCELLED

#### Payment:
- paymentTerms, paymentMethod
- dueDate, paidAt, paidAmount

#### Conversion Tracking:
- `convertedFromQuoteId`: Track Quote → Invoice conversion

**GST Logic**:
```javascript
// Intra-state (same state as company)
if (customerState === companyState) {
  cgstAmount = taxableAmount * (gstRate / 2) / 100
  sgstAmount = taxableAmount * (gstRate / 2) / 100
  igstAmount = 0
}

// Inter-state (different state)
if (customerState !== companyState) {
  cgstAmount = 0
  sgstAmount = 0
  igstAmount = taxableAmount * gstRate / 100
}
```

**Example**:
```
Invoice #: INV-2025-001
Customer: ABC Pvt Ltd
Customer State: Maharashtra
Company State: Karnataka

Items:
1. Custom Labels x 100 @ ₹500 = ₹50,000
   GST @ 18% (IGST) = ₹9,000
   Total = ₹59,000

Subtotal: ₹50,000
CGST (9%): ₹0
SGST (9%): ₹0
IGST (18%): ₹9,000
Total Tax: ₹9,000
Grand Total: ₹59,000
```

---

### 6. InvoiceItem Model
**Purpose**: Line items for invoices with individual GST calculation

**Key Fields**:
- `productId`: Link to Product (optional)
- itemName, description, hsnCode
- Quantity & Pricing: quantity, unit, unitPrice, discount
- `taxableAmount`: Amount after discount
- **GST**: gstRate, cgst, sgst, igst
- total: Line item total including tax

---

### 7. Activity Model
**Purpose**: Track all interactions with leads and opportunities

**Key Fields**:
- Type: CALL, EMAIL, MEETING, TASK, NOTE, DEMO, FOLLOW_UP
- subject, description, outcome
- Scheduling: scheduledAt, completedAt
- Status: PENDING, COMPLETED, CANCELLED
- Assignment: assignedTo, createdBy

**Usage**:
- Log all customer interactions
- Schedule follow-up calls/meetings
- Track sales activities
- Activity timeline for each lead

---

### 8. AdminUser / Team Members
**Purpose**: Team access and permission management

**Key Fields**:
- Basic: email, password, name, phone
- **Role**: SUPER_ADMIN, ADMIN, SALES_MANAGER, SALES, MARKETING, SUPPORT, FINANCE, VIEWER
- department, designation
- **Permissions**:
  - canCreateLeads, canEditLeads, canDeleteLeads
  - canCreateInvoices, canApproveInvoices
  - canViewAllLeads (or only assigned leads)
- **Team Hierarchy**: managerId → Self-referential for reporting structure
- **Targets**: monthlyTarget, quarterlyTarget (for sales team)

**Example Team Structure**:
```
Super Admin (You)
  ├─ Sales Manager
  │   ├─ Sales Executive 1
  │   └─ Sales Executive 2
  ├─ Marketing Manager
  └─ Finance Manager
```

---

## Complete Sales Workflow

### Scenario 1: Website Contact → Quote → Invoice

1. **Customer submits contact form** on website
   - Creates Contact record with status "NEW"

2. **Admin reviews contact**
   - Navigate to `/admin/contacts`
   - Review contact details
   - Click "Convert to Lead"

3. **Create Lead**
   - Fill in complete address
   - Add GST number and GST type
   - Assign to sales team member
   - Set lead stage to "CONTACTED"

4. **Sales follow-up**
   - Log calls/emails using Activity model
   - Understand requirements
   - Move to "QUALIFIED" stage

5. **Create Opportunity**
   - Navigate to lead page
   - Click "Create Opportunity"
   - Enter deal name and estimated value
   - Add products from catalog

6. **Generate Quote**
   - From opportunity, click "Generate Quote"
   - System auto-fills customer details from lead
   - Select products (auto-populated from opportunity)
   - System calculates GST based on customer state
   - Review and send quote (type: QUOTE, status: SENT)

7. **Quote Accepted**
   - Update quote status to "ACCEPTED"
   - Convert quote to invoice
   - System copies all details and creates INVOICE type

8. **Payment Received**
   - Update invoice status to "PAID"
   - Set paidAt date and paidAmount
   - Update opportunity status to "CLOSED_WON"
   - Update lead stage to "WON"

9. **Analytics & Reporting**
   - Track sales pipeline
   - Monitor team performance against targets
   - Analyze won/lost opportunities
   - GST reports by state

---

### Scenario 2: Direct Quote Request → Quote → Invoice

1. **Customer fills quote request form**
   - Creates QuoteRequest record

2. **Admin creates Lead directly**
   - Navigate to `/admin/leads/create`
   - Fill all details including GST info

3. **Create Opportunity** (optional for tracking)
   - Add products and deal value

4. **Generate Quote**
   - Same process as above

---

## GST Compliance Features

### 1. **Automatic CGST/SGST/IGST Calculation**
```javascript
// Pseudo-code for GST calculation
function calculateGST(invoice) {
  const isSameState = invoice.customerState === invoice.companyState;

  invoice.items.forEach(item => {
    if (isSameState) {
      // Intra-state: CGST + SGST
      item.cgst = item.taxableAmount * (item.gstRate / 2) / 100;
      item.sgst = item.taxableAmount * (item.gstRate / 2) / 100;
      item.igst = 0;
    } else {
      // Inter-state: IGST
      item.cgst = 0;
      item.sgst = 0;
      item.igst = item.taxableAmount * item.gstRate / 100;
    }
  });

  // Sum up all items
  invoice.cgstAmount = sum(items.cgst);
  invoice.sgstAmount = sum(items.sgst);
  invoice.igstAmount = sum(items.igst);
  invoice.totalTax = invoice.cgstAmount + invoice.sgstAmount + invoice.igstAmount;
}
```

### 2. **GST Invoice Requirements**
The system captures all required fields:
- Invoice number (sequential)
- Invoice date
- Supplier details (your GST number, address, state)
- Customer details (GST number if registered, address, state)
- Place of supply
- HSN/SAC codes for each item
- Taxable amount
- GST rate, CGST, SGST, IGST breakdown
- Total amount

### 3. **GST Types Supported**
- **REGISTERED**: Normal GST registered business (B2B)
- **UNREGISTERED**: Non-GST registered (B2C)
- **COMPOSITION**: Composition scheme dealers
- **SEZ**: SEZ units (usually 0% GST)
- **EXPORT**: Export customers (0% GST with IGST refund)

---

## Sales Pipeline Stages

### Lead Stages:
1. **NEW**: Just created, not contacted
2. **CONTACTED**: Initial contact made
3. **QUALIFIED**: Meets criteria, has potential
4. **PROPOSAL_SENT**: Quote/proposal sent
5. **NEGOTIATION**: In discussion
6. **WON**: Converted to customer
7. **LOST**: Did not convert

### Opportunity Stages:
1. **QUALIFICATION**: Understanding requirements
2. **NEEDS_ANALYSIS**: Analyzing customer needs
3. **PROPOSAL**: Preparing/sent proposal
4. **NEGOTIATION**: Price/terms discussion
5. **CLOSED_WON**: Deal won
6. **CLOSED_LOST**: Deal lost

---

## Reports & Analytics

### Key Metrics to Track:

1. **Sales Funnel**:
   - Contacts → Leads conversion rate
   - Leads → Opportunities conversion rate
   - Opportunities → Won deals conversion rate

2. **Revenue**:
   - Total opportunity value in pipeline
   - Expected revenue (value × probability)
   - Won deals value (monthly/quarterly)
   - Average deal size

3. **Team Performance**:
   - Leads assigned vs converted by team member
   - Opportunities won/lost by sales executive
   - Achievement vs target (monthly/quarterly)

4. **GST Reports**:
   - Total CGST collected
   - Total SGST collected
   - Total IGST collected
   - State-wise GST breakdown

---

## Next Steps for Implementation

### Phase 1: Core CRM Pages
1. Create Leads listing page (`/admin/leads`)
2. Create Lead detail page (`/admin/leads/[id]`)
3. Create "Convert to Lead" functionality from contacts
4. Create Opportunity listing and detail pages
5. Create Products catalog pages

### Phase 2: Invoice Builder
1. Create invoice/quote builder UI
2. Implement GST calculation logic
3. Add product selection from catalog
4. Auto-fill customer details from lead
5. Generate PDF invoices

### Phase 3: Activity Tracking
1. Activity timeline component
2. Schedule follow-ups
3. Email integration
4. Calendar view

### Phase 4: Analytics & Reports
1. Sales dashboard
2. Pipeline visualization
3. Team performance reports
4. GST reports

### Phase 5: Team Management
1. User management pages
2. Role-based access control
3. Team hierarchy
4. Permission management

---

## API Endpoints Needed

```typescript
// Leads
POST   /api/leads              // Create lead
GET    /api/leads              // List leads
GET    /api/leads/[id]         // Get lead details
PUT    /api/leads/[id]         // Update lead
DELETE /api/leads/[id]         // Delete lead
POST   /api/contacts/[id]/convert-to-lead // Convert contact

// Opportunities
POST   /api/opportunities      // Create opportunity
GET    /api/opportunities      // List opportunities
POST   /api/opportunities/[id]/add-products // Add products

// Invoices
POST   /api/invoices           // Create invoice/quote
GET    /api/invoices           // List invoices
POST   /api/invoices/[id]/calculate-gst // Calculate GST
POST   /api/invoices/[id]/send // Send invoice via email
POST   /api/invoices/[id]/convert // Convert quote to invoice
GET    /api/invoices/[id]/pdf // Generate PDF

// Products
POST   /api/products           // Create product
GET    /api/products           // List products

// Activities
POST   /api/activities         // Log activity
GET    /api/leads/[id]/activities // Get lead activities

// Team
POST   /api/team               // Add team member
GET    /api/team               // List team members
```

---

## Database Relationships Summary

```
Contact (1) ----→ Lead (1)
               ↓
Lead (1) ----→ Opportunity (Many)
        ↓
        └----→ Invoice (Many)
               ↓
               └---→ InvoiceItem (Many)
                    ↓
                    └---→ Product (1)

Opportunity (Many) ----→ Product (Many) via OpportunityProduct
AdminUser (1) ----→ AdminUser (Many) // Team hierarchy
```

---

## Example Data Flow

### Creating an Invoice with GST:

```javascript
// 1. Customer in Karnataka (same state as company)
const invoice = {
  customerName: "ABC Industries",
  customerState: "Karnataka",
  companyState: "Karnataka",
  placeOfSupply: "Karnataka",
  items: [
    {
      itemName: "Custom Labels (A4)",
      hsnCode: "4821",
      quantity: 100,
      unitPrice: 500,
      gstRate: 18,
      // Calculated:
      taxableAmount: 50000,
      cgst: 4500,  // 9% of 50000
      sgst: 4500,  // 9% of 50000
      igst: 0,
      total: 59000
    }
  ],
  subtotal: 50000,
  cgstAmount: 4500,
  sgstAmount: 4500,
  igstAmount: 0,
  totalTax: 9000,
  total: 59000
}

// 2. Customer in Maharashtra (different state)
const invoice2 = {
  customerName: "XYZ Corp",
  customerState: "Maharashtra",
  companyState: "Karnataka",
  placeOfSupply: "Maharashtra",
  items: [
    {
      itemName: "Custom Labels (A4)",
      hsnCode: "4821",
      quantity: 100,
      unitPrice: 500,
      gstRate: 18,
      // Calculated:
      taxableAmount: 50000,
      cgst: 0,
      sgst: 0,
      igst: 9000,  // 18% of 50000
      total: 59000
    }
  ],
  subtotal: 50000,
  cgstAmount: 0,
  sgstAmount: 0,
  igstAmount: 9000,
  totalTax: 9000,
  total: 59000
}
```

---

## Configuration

Add these to your `.env`:

```env
# Company GST Details
COMPANY_GST_NUMBER=29XXXXXXXXXXXXX
COMPANY_STATE=Karnataka
COMPANY_NAME=Livato Solutions
COMPANY_ADDRESS=Your complete address

# Invoice Settings
INVOICE_PREFIX=INV
QUOTE_PREFIX=QTE
PROFORMA_PREFIX=PRO

# Payment Terms
DEFAULT_PAYMENT_TERMS=Net 30 Days
```

---

This CRM system gives you complete control over your sales pipeline with proper GST compliance for Indian businesses!
