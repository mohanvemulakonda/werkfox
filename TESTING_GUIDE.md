# WerkFox E2E Testing Guide - Full Business Process

**Base URL:** `http://localhost:3000`
**Auth:** Clerk authentication required - sign in at `/sign-in`

This guide walks through the **complete document chain** like a real user would:
```
Lead -> Opportunity -> Customer + Quotation -> Sales Order -> Production Order
-> Material Request -> Purchase Order -> GRN -> Dispatch -> Invoice -> Payment
```

---

## PRE-REQUISITES

### P1. Verify App Is Running
1. Open `http://localhost:3000`
2. Verify the homepage loads without errors
3. Navigate to `http://localhost:3000/sign-in`
4. Sign in with valid Clerk credentials
5. Verify redirect to `/admin` dashboard
6. **PASS:** Dashboard shows stats cards (Leads, Opportunities, Customers, Invoices)

### P2. Verify Settings Are Configured
1. Navigate to `http://localhost:3000/admin/settings`
2. Click the **"Company Profile"** tab
3. Verify company name is filled in (needed for invoices)
4. Click the **"Tax & Banking"** tab
5. Verify GST number and state are configured
6. Click the **"Documents"** tab
7. Verify document prefixes exist for: INV, SO, QT, PO, GRN, WO, PROD, MR, DC, PAY
8. Click the **"Modules"** tab (NEW)
9. Verify 4 toggle switches appear: Approval Workflows, QC Inspections, Returns & Credit Notes, Audit Trail
10. Toggle "Approval Workflows" ON, then OFF - verify save works
11. **PASS:** All settings tabs load, toggles work, document prefixes configured

### P3. Verify ERP Sidebar Navigation
1. Navigate to `http://localhost:3000/admin/erp`
2. Check the left sidebar contains ALL these sections:
   - **ERP** (header with link to /admin/erp)
   - **Inventory & Warehouse:** Products, Stock Levels, Warehouses
   - **Sales & Billing:** Quotes, Sales Orders, Invoices, Customers
   - **Procurement:** Vendors, Purchase Orders, GRN, Material Requests
   - **Manufacturing:** Production Orders, Work Orders
   - **Fulfillment:** Dispatch Orders
   - **Finance:** Payments
   - **Quick Links:** Dashboard, CRM Modules
3. Click each sidebar link and verify the page loads without error
4. **PASS:** All sidebar links work, all pages load

### P4. Ensure Base Data Exists
1. Navigate to `/admin/erp/products` - verify at least 1 product exists
   - If none: Create a product with name "Test Widget", SKU "TW-001", price 1000, HSN "8479"
2. Navigate to `/admin/erp/warehouses` - verify at least 1 warehouse exists
3. Navigate to `/admin/erp/vendors` - verify at least 1 vendor exists
   - If none: Create via `/admin/erp/vendors` -> "Add Vendor" with name "Test Supplier", email, and state
4. **PASS:** Products, warehouses, and vendors exist

---

## TEST FLOW 1: CRM - Lead to Opportunity Conversion

### T1.1 Create a New Lead
1. Navigate to `http://localhost:3000/admin/crm/leads`
2. Click **"Create Lead"** or **"Add Lead"** button (top right)
3. Fill in the form:
   - **Name:** `John Smith`
   - **Email:** `john.smith@testcorp.com`
   - **Phone:** `+91 98765 43210`
   - **Company:** `TestCorp Industries`
   - **Designation:** `Procurement Manager`
   - **Source:** `Website` (or any available option)
   - **Industry:** `Manufacturing`
   - **Stage:** `NEW`
   - **Status:** `ACTIVE`
   - **City:** `Mumbai`
   - **State:** `Maharashtra`
   - **Country:** `India`
   - **Pincode:** `400001`
   - **GST Number:** `27AADCT1234F1Z5`
   - **GST Type:** `REGISTERED`
   - **Notes:** `Interested in bulk order of widgets`
4. Click **Submit/Save**
5. **PASS:** Lead is created, redirected to lead detail page or leads list

### T1.2 View Lead Detail & Qualify
1. Navigate to the lead detail page: `/admin/crm/leads/{id}` (click the lead from list)
2. Verify all fields are displayed correctly:
   - Name: John Smith
   - Email, phone, company shown
   - Stage badge shows "NEW"
   - Status shows "ACTIVE"
3. Click **"Edit"** button
4. Change **Stage** to `QUALIFIED`
5. Change **Lead Score** to `75`
6. Click **"Save Changes"**
7. Verify stage badge now shows "QUALIFIED" (green)
8. **PASS:** Lead is editable, stage updated to QUALIFIED

### T1.3 Convert Lead to Opportunity
1. On the lead detail page (stage = QUALIFIED, status = ACTIVE)
2. Verify a green **"Convert to Opportunity"** button appears in the header (next to Edit/Delete)
3. Click **"Convert to Opportunity"**
4. Verify button shows "Converting..." loading state
5. **PASS:** Redirected to the new Opportunity detail page at `/admin/crm/opportunities/{id}`
6. Verify opportunity was created with:
   - Name derived from lead name/company
   - Lead information section shows "John Smith" with link back to lead
   - Stage shows "QUALIFICATION"
7. Navigate back to the lead: `/admin/crm/leads/{id}`
8. Verify lead status is now "CONVERTED"
9. Verify the "Convert to Opportunity" button is NO LONGER visible
10. **PASS:** Lead converted, opportunity created, lead marked CONVERTED

### T1.4 Negative Tests - Convert Lead Button Visibility
1. Create a new lead with stage = `NEW`, status = `ACTIVE`
2. Go to its detail page
3. Verify "Convert to Opportunity" button does **NOT** appear (stage is NEW)
4. Edit lead, set stage to `LOST`
5. Verify "Convert to Opportunity" button does **NOT** appear
6. Edit lead, set status to `DISQUALIFIED`
7. Verify "Convert to Opportunity" button does **NOT** appear
8. **PASS:** Button correctly hidden for NEW, LOST, CONVERTED, DISQUALIFIED states

---

## TEST FLOW 2: Opportunity to Customer + Quotation

### T2.1 Edit Opportunity & Mark as Won
1. Navigate to the opportunity created in T1.3: `/admin/crm/opportunities/{id}`
2. Click **"Edit"** button
3. Set **Stage** to `CLOSED_WON`
4. Set **Status** to `WON`
5. Set **Value** to `500000`
6. Set **Probability** to `100`
7. Click **"Save Changes"**
8. **PASS:** Opportunity updated, stage shows "CLOSED WON" (green badge)

### T2.2 Convert Opportunity to Customer
1. On the opportunity detail page (status = WON)
2. Verify a green **"Convert to Customer"** button appears in the header
3. Click **"Convert to Customer"**
4. Verify loading state appears
5. **PASS:** Page refreshes, "Convert to Customer" button disappears
6. Verify a new **"Linked Customer"** section appears in the sidebar showing:
   - Customer name (from lead data)
   - Link to customer page
7. Click the customer link - verify it navigates to `/admin/customers`
8. **PASS:** Customer created from lead data, linked to opportunity

### T2.3 Create Quotation from Opportunity
1. Navigate back to the opportunity detail page
2. Verify **"Create Quotation"** button (blue) now appears (because customer is linked)
3. Click **"Create Quotation"**
4. **PASS:** Redirected to quotation detail page at `/admin/erp/quotes/{id}`
5. Verify quotation was created with:
   - Auto-generated QT number (e.g., QT-2602-0001)
   - Customer name from the linked customer
   - Products from opportunity (if any were added)
6. Verify a **"Source Document"** section shows: "Created from Opportunity: {name}" with clickable link
7. Click the opportunity link - verify it goes back to the opportunity
8. **PASS:** Quotation created, linked to opportunity, traceability link works

### T2.4 Create Work Order from Opportunity
1. Navigate back to the opportunity detail page
2. Verify **"Create Work Order"** button (purple) appears
3. Click **"Create Work Order"**
4. **PASS:** Redirected to work order detail page at `/admin/erp/work-orders/{id}`
5. Verify work order was created with auto-generated WO number
6. **PASS:** Work order created from opportunity

### T2.5 Negative Tests - Opportunity Button Visibility
1. Create a new opportunity with status = `OPEN`
2. Verify "Convert to Customer" button does **NOT** appear (status is not WON)
3. Verify "Create Quotation" button does **NOT** appear (no customer linked)
4. Verify "Create Work Order" button **DOES** appear (works for OPEN too)
5. **PASS:** Buttons show/hide correctly based on status and customer state

---

## TEST FLOW 3: Quotation to Sales Order

### T3.1 Accept Quotation & Convert to Sales Order
1. Navigate to the quotation from T2.3: `/admin/erp/quotes/{id}`
2. If quotation has no items, edit it to add at least one line item:
   - Select a product
   - Quantity: 100
   - Unit price: 5000
   - Tax rate: 18
3. Look for an **"Accept"** or status change action
4. Look for a **"Convert to Sales Order"** button
5. Click **"Convert to Sales Order"**
6. **PASS:** Redirected to sales order detail page at `/admin/erp/sales-orders/{id}`
7. Verify the SO was created with:
   - Auto-generated SO number (e.g., SO-2602-0001)
   - Customer details carried over
   - Line items matching the quotation
   - Status: PENDING
8. Verify **"Source Document"** section shows: "Created from Quotation: QT-xxxx-xxxx" with link
9. Click the quotation link - verify it navigates back
10. **PASS:** Sales order created from quotation with traceability

---

## TEST FLOW 4: Sales Order Actions (Confirm, Production, Dispatch, Invoice)

### T4.1 Confirm Sales Order
1. Navigate to the sales order from T3.1: `/admin/erp/sales-orders/{id}`
2. Verify status is `PENDING`
3. Verify action buttons visible: **Edit**, **Confirm**, **Put On Hold**, **Cancel**
4. Click **"Confirm"**
5. Verify status changes to `CONFIRMED`
6. **PASS:** Status timeline shows CONFIRMED step highlighted

### T4.2 Create Production Order from Sales Order
1. On the confirmed sales order page
2. Verify new buttons appeared: **Start Processing**, **Convert to Invoice**, **Create Production Order** (amber), **Create Dispatch** (teal)
3. Click **"Create Production Order"** (amber button)
4. **PASS:** Redirected to production order detail page at `/admin/erp/production/{id}`
5. Verify production order was created with:
   - Auto-generated PROD number (e.g., PROD-2602-0001)
   - Product and quantities from the sales order items
   - Status: PLANNED
   - Link/reference to source sales order
6. **PASS:** Production order created from sales order

### T4.3 Create Dispatch from Sales Order
1. Navigate back to the sales order page
2. Click **"Create Dispatch"** (teal button)
3. **PASS:** Redirected to dispatch order detail page at `/admin/erp/dispatch/{id}`
4. Verify dispatch order created with:
   - Auto-generated DC number (e.g., DC-2602-0001)
   - Customer details from sales order
   - Items from sales order
   - Status: PENDING
5. Verify **Sales Order** link is shown on the dispatch detail page
6. **PASS:** Dispatch order created from sales order

### T4.4 Convert Sales Order to Invoice
1. Navigate back to the sales order page
2. Click **"Convert to Invoice"** (green button)
3. **PASS:** Redirected to invoice detail page at `/admin/erp/invoices/{id}`
4. Verify invoice created with:
   - Auto-generated INV number
   - Customer details, line items, totals matching the SO
   - Status: DRAFT
5. Verify **"Sales Order"** link appears in the invoice details section
6. Click the SO link - verify it goes back to the sales order
7. **PASS:** Invoice created with full traceability

### T4.5 Sales Order - Start Processing & Complete Flow
1. Navigate to a confirmed sales order
2. Click **"Start Processing"** -> status becomes IN_PROGRESS
3. Verify buttons: **Complete**, **Convert to Invoice**, **Create Production Order**, **Create Dispatch**, **Put On Hold**
4. Click **"Complete"** -> status becomes COMPLETED
5. Verify only **"Create Dispatch"** button remains in COMPLETED state
6. **PASS:** Full status lifecycle works

---

## TEST FLOW 5: Production Orders & Material Requests

### T5.1 View Production Order Detail
1. Navigate to `/admin/erp/production`
2. Click on the production order created in T4.2
3. Verify detail page shows:
   - PROD number and status badge (PLANNED)
   - Product details and quantities
   - BOM (Bill of Materials) items table
4. **PASS:** Production order detail page renders correctly

### T5.2 Create Production Order Manually
1. Navigate to `/admin/erp/production`
2. Click **"Create Production Order"** button
3. Fill the form:
   - Select a product
   - Planned Quantity: 50
   - Priority: HIGH
   - Planned Start Date: today
   - Add BOM items (raw materials)
4. Click **Submit/Save**
5. **PASS:** Production order created, appears in list

### T5.3 Production Order Status Transitions
1. On a PLANNED production order detail page
2. Look for action buttons: **Request Materials**, **Start Production**, etc.
3. Click **"Request Materials"** or equivalent to create a material request
4. **PASS:** Redirected to material request page or status updated

### T5.4 Create Material Request
1. Navigate to `/admin/erp/material-requests`
2. Click **"Create Material Request"** button
3. Fill the form:
   - Type: `PRODUCTION` or `WAREHOUSE`
   - Department: `Production`
   - Required Date: tomorrow
   - Priority: HIGH
   - Add items: select a product, quantity 100
4. Click **Submit/Save**
5. **PASS:** Material request created with MR number (e.g., MR-2602-0001)

### T5.5 View Material Request Detail
1. Click on the created material request from the list
2. Verify detail page shows:
   - MR number, status (DRAFT), type, priority
   - Items table with product, requested qty
   - Action buttons
3. **PASS:** Material request detail renders

### T5.6 Material Request -> Submit -> Approve -> Convert to PO
1. On the material request detail page (status = DRAFT)
2. Click **"Submit"** action button -> status becomes SUBMITTED
3. Click **"Approve"** action button -> status becomes APPROVED
4. Click **"Convert to PO"** action button
5. **PASS:** Redirected to a new Purchase Order page
6. Verify the PO was created with items from the material request
7. Navigate back to material request - verify status shows PO_CREATED or similar
8. **PASS:** Full MR lifecycle works

---

## TEST FLOW 6: Procurement (Vendors, PO, GRN)

### T6.1 Create a Vendor
1. Navigate to `/admin/erp/vendors`
2. Click **"Add Vendor"**
3. Fill in:
   - Name: `Raw Materials Supplier`
   - Code: `RMS-001`
   - Email: `supplier@rawmaterials.com`
   - Phone: `+91 87654 32100`
   - State: `Gujarat`
   - GST Number: `24AADCS1234F1Z5`
4. Click Save
5. **PASS:** Vendor created, appears in list

### T6.2 Create a Purchase Order
1. Navigate to `/admin/erp/purchase-orders`
2. Click **"Create Purchase Order"**
3. Fill in:
   - Select vendor: `Raw Materials Supplier`
   - Add line items (select product, qty, price)
   - Delivery date: next week
4. Click Save
5. **PASS:** PO created with auto-generated PO number

### T6.3 Purchase Order -> Approve -> GRN
1. On PO detail page, confirm/approve the PO
2. Click **"Create GRN"** or equivalent action
3. Fill GRN details (received quantities)
4. **PASS:** GRN created, inventory updated

---

## TEST FLOW 7: Work Orders

### T7.1 Create Work Order Manually
1. Navigate to `/admin/erp/work-orders`
2. Click **"Create Work Order"** button
3. Fill the form:
   - **Type:** `SERVICE`
   - **Title:** `Annual Maintenance Contract - TestCorp`
   - **Customer:** select the customer created earlier
   - **Priority:** `HIGH`
   - **Scheduled Date:** today
   - **Estimated Hours:** 8
   - **Description:** `Annual maintenance service visit`
   - Add work order items:
     - Type: LABOR, Description: "Technician visit", Qty: 8, Unit Price: 500
     - Type: MATERIAL, Select product, Qty: 2, Unit Price: 1000
4. Click **Submit/Save**
5. **PASS:** Work order created with auto-generated WO number (e.g., WO-2602-0001)

### T7.2 View Work Order Detail
1. Navigate to the work order detail page
2. Verify all information displays:
   - WO number, type badge (SERVICE), status (PENDING), priority
   - Customer details
   - Items table with labor and material lines
   - Total cost calculation
3. **PASS:** Detail page renders correctly with all data

### T7.3 Work Order Status Flow
1. On the PENDING work order detail page
2. Verify action buttons: **Edit**, **Assign**, **Start**
3. Click **"Assign"** or move to ASSIGNED status
4. Click **"Start"** -> status becomes IN_PROGRESS
5. Click **"Complete"** -> status becomes COMPLETED
6. **PASS:** Status transitions work correctly

### T7.4 Work Order Edit
1. Navigate to `/admin/erp/work-orders/{id}/edit`
2. Modify the title and add an item
3. Click Save
4. Verify changes are persisted
5. **PASS:** Edit works correctly

### T7.5 Convert Work Order to Invoice
1. On a COMPLETED work order detail page
2. Click **"Convert to Invoice"** button
3. **PASS:** Redirected to invoice detail page
4. Verify invoice was created with:
   - Line items matching WO items (labor + materials)
   - Correct totals with GST
5. **PASS:** WO -> Invoice conversion works

---

## TEST FLOW 8: Dispatch Orders

### T8.1 View Dispatch List
1. Navigate to `/admin/erp/dispatch`
2. Verify the list page loads with table columns:
   - Dispatch #, Sales Order, Customer, Status, Shipping Method, Date
3. Verify the dispatch created in T4.3 appears in the list
4. **PASS:** Dispatch list page works

### T8.2 Create Dispatch Manually
1. Click **"Create Dispatch Order"** button
2. Fill the form:
   - **Sales Order:** select an existing SO
   - **Customer:** auto-populated from SO
   - **Shipping Method:** `STANDARD_DELIVERY`
   - **Carrier Name:** `BlueDart Express`
   - **Tracking Number:** `BD12345678`
   - **Vehicle Number:** `MH-01-AB-1234`
   - **Driver Name:** `Raju Kumar`
   - **Driver Phone:** `+91 99887 76655`
   - **Shipping Address:** `123 Industrial Area, Andheri East`
   - **City:** `Mumbai`
   - **State:** `Maharashtra`
   - **Pincode:** `400069`
   - **Estimated Weight:** `50`
   - **Number of Packages:** `5`
   - **Shipping Cost:** `2500`
   - **Dispatch Date:** today
   - **Estimated Delivery:** next week
   - Add dispatch items with quantities
3. Click **Submit/Save**
4. **PASS:** Dispatch order created with auto-generated DC number

### T8.3 Dispatch Status Flow
1. On the PENDING dispatch order detail page
2. Verify action buttons based on status:
   - PENDING: **Edit**, **Mark as Packed**
3. Click **"Mark as Packed"** -> status becomes PACKED
4. Verify new button: **"Dispatch"**
5. Click **"Dispatch"** -> status becomes DISPATCHED
6. Verify new button: **"In Transit"**
7. Click **"In Transit"** -> status becomes IN_TRANSIT
8. Verify new button: **"Mark Delivered"**
9. Click **"Mark Delivered"** -> status becomes DELIVERED
10. Verify no more action buttons (terminal state)
11. **PASS:** Complete dispatch lifecycle works: PENDING -> PACKED -> DISPATCHED -> IN_TRANSIT -> DELIVERED

### T8.4 Dispatch Edit (while PENDING)
1. Create a new dispatch order
2. While status is PENDING, click **"Edit"**
3. Navigate to edit page `/admin/erp/dispatch/{id}/edit`
4. Modify carrier name and tracking number
5. Click Save
6. Verify changes saved
7. **PASS:** Edit works for PENDING dispatches

### T8.5 Dispatch Detail - Sales Order Link
1. On a dispatch detail page that was created from a sales order
2. Verify **"Sales Order"** section shows the linked SO with clickable link
3. Click the SO link -> navigates to sales order detail
4. **PASS:** Traceability link works

---

## TEST FLOW 9: Payments (AP & AR)

### T9.1 View Payments List
1. Navigate to `/admin/erp/payments`
2. Verify the page loads with table:
   - Payment #, Type, Customer/Vendor, Amount, Method, Reference, Date, Status
3. **PASS:** Payments list page renders

### T9.2 Record Payment (Received from Customer)
1. Click **"Record Payment"** button
2. Fill the form:
   - **Payment Type:** `Payment Received (AR)`
   - **Amount:** `250000`
   - **Customer:** select the customer from earlier
   - **Payment Method:** `BANK_TRANSFER`
   - **Payment Date:** today
   - **Reference Number:** `UTR123456789`
   - **Bank Name:** `HDFC Bank`
   - **Notes:** `Partial payment for Invoice INV-xxxx`
3. Click **"Record Payment"**
4. **PASS:** Redirected to payment detail page
5. Verify payment detail shows:
   - Auto-generated PAY number (e.g., PAY-2602-0001)
   - Type badge: RECEIVED (green)
   - Amount: INR 2,50,000.00
   - Customer name, method, reference, bank
   - Status: DRAFT or CONFIRMED

### T9.3 Record Payment Made (to Vendor)
1. Navigate to `/admin/erp/payments/create`
2. Fill the form:
   - **Payment Type:** `Payment Made (AP)`
   - **Amount:** `100000`
   - **Vendor:** select a vendor
   - **Payment Method:** `UPI`
   - **Payment Date:** today
   - **Reference Number:** `UPI-REF-9876`
3. Click **"Record Payment"**
4. **PASS:** Payment created with type MADE (red badge)

### T9.4 Record Refund
1. Navigate to `/admin/erp/payments/create`
2. Select **Payment Type:** `Refund`
3. Verify **Customer** dropdown appears (not Vendor)
4. Fill in customer, amount, method
5. Click save
6. **PASS:** Refund payment created

### T9.5 Record Advance Payment
1. Navigate to `/admin/erp/payments/create`
2. Select **Payment Type:** `Advance Payment`
3. Verify **Vendor** dropdown appears
4. Fill in vendor, amount, method
5. Click save
6. **PASS:** Advance payment created

### T9.6 Payment Detail Page
1. Navigate to any payment detail page `/admin/erp/payments/{id}`
2. Verify detail sections:
   - Payment number, status badge, type badge
   - Payment date
   - Amount (large, bold)
   - Payment method, reference, bank name
   - Customer or vendor link (clickable)
   - Allocations table (if any)
   - Notes section (if any)
3. Click customer/vendor link -> navigates correctly
4. **PASS:** Payment detail page complete and functional

---

## TEST FLOW 10: Invoice Payment Recording (Inline)

### T10.1 Record Payment from Invoice Detail
1. Navigate to an invoice detail page: `/admin/erp/invoices/{id}`
2. Verify a green **"Record Payment"** button appears (if invoice is not PAID)
3. Click **"Record Payment"**
4. Verify an inline payment form expands with fields:
   - Amount (pre-filled with balance due)
   - Payment Method dropdown
   - Payment Date
   - Reference Number
5. Fill in:
   - Amount: `100000` (partial payment)
   - Method: `BANK_TRANSFER`
   - Date: today
   - Reference: `NEFT-123456`
6. Click **"Record INR 1,00,000.00"** submit button
7. **PASS:** Form closes, page refreshes
8. Verify a green **payment info banner** appears showing:
   - Amount Paid: INR 1,00,000.00
   - Balance Due: remaining amount
9. Verify "Record Payment" button still appears (partial payment, not fully paid)

### T10.2 Full Payment
1. Click "Record Payment" again
2. Enter the remaining balance amount
3. Submit
4. **PASS:** Invoice status changes to PAID
5. Verify "Record Payment" button disappears (status = PAID)

### T10.3 Cancel Payment Form
1. On another unpaid invoice, click "Record Payment"
2. Click **"Cancel"** button
3. **PASS:** Form collapses, no payment recorded

---

## TEST FLOW 11: Document Traceability Chain

### T11.1 Full Chain Navigation
Starting from a Sales Order that was created from a Quotation:

1. Navigate to **Sales Order** detail page
2. Verify **"Source Document"** section shows linked Quotation with clickable link
3. Click the Quotation link -> lands on Quotation detail
4. On the Quotation page, verify **"Source Document"** section shows linked Opportunity
5. Click the Opportunity link -> lands on Opportunity detail
6. On the Opportunity page, verify Lead Information section with link to lead
7. Click the Lead link -> lands on Lead detail
8. **PASS:** Complete backward chain: SO -> Quotation -> Opportunity -> Lead

### T11.2 Forward Chain from Invoice
1. Navigate to an **Invoice** created from a Sales Order
2. Verify the invoice details section shows **"Sales Order"** with clickable link
3. Click the SO link -> lands on Sales Order detail
4. **PASS:** Invoice -> SO traceability works

### T11.3 Dispatch -> Sales Order Link
1. Navigate to a **Dispatch Order** that has a linked Sales Order
2. Verify the Sales Order link is shown and clickable
3. **PASS:** Dispatch -> SO link works

---

## TEST FLOW 12: ERP Sidebar & Page Loading

### T12.1 All Manufacturing Pages Load
1. Navigate to `/admin/erp/production` -> verify table loads
2. Navigate to `/admin/erp/production/create` -> verify form renders
3. Navigate to `/admin/erp/work-orders` -> verify table loads
4. Navigate to `/admin/erp/work-orders/create` -> verify form renders
5. **PASS:** All manufacturing pages load without errors

### T12.2 All Procurement Pages Load
1. Navigate to `/admin/erp/vendors` -> verify table loads
2. Navigate to `/admin/erp/purchase-orders` -> verify table loads
3. Navigate to `/admin/erp/grn` -> verify table loads
4. Navigate to `/admin/erp/material-requests` -> verify table loads
5. Navigate to `/admin/erp/material-requests/create` -> verify form renders
6. **PASS:** All procurement pages load

### T12.3 All Fulfillment & Finance Pages Load
1. Navigate to `/admin/erp/dispatch` -> verify table loads
2. Navigate to `/admin/erp/dispatch/create` -> verify form renders (or redirect)
3. Navigate to `/admin/erp/payments` -> verify table loads
4. Navigate to `/admin/erp/payments/create` -> verify form renders
5. **PASS:** All pages load without errors

---

## TEST FLOW 13: Edge Cases & Error Handling

### T13.1 Duplicate Conversion Prevention
1. Convert a lead to opportunity (T1.3)
2. Verify the "Convert to Opportunity" button disappears after conversion
3. Attempt API call directly: `POST /api/leads/{id}/convert-to-opportunity`
4. **PASS:** Returns error (lead already converted or invalid status)

### T13.2 Invalid Status Transitions
1. On a DELIVERED dispatch order, verify no action buttons appear
2. On a PAID invoice, verify "Record Payment" button doesn't appear
3. On a CANCELLED sales order, verify minimal/no action buttons
4. **PASS:** Terminal states have no invalid actions

### T13.3 Required Field Validation
1. On `/admin/erp/payments/create`, try submitting without amount
2. Verify browser validation prevents submission
3. On `/admin/erp/work-orders/create`, try submitting without title
4. Verify validation works
5. **PASS:** Forms enforce required fields

### T13.4 Empty State Pages
1. Navigate to `/admin/erp/production` with no production orders
2. Verify a "No production orders found" message appears (not a crash)
3. Repeat for work-orders, material-requests, dispatch, payments
4. **PASS:** Empty states handled gracefully

### T13.5 Non-Existent Record
1. Navigate to `/admin/erp/production/99999`
2. Verify appropriate "not found" message or 404 page
3. Repeat for `/admin/erp/work-orders/99999`, `/admin/erp/dispatch/99999`
4. **PASS:** Invalid IDs handled gracefully

---

## TEST FLOW 14: Customer & Vendor Payment Tracking

### T14.1 Customer Outstanding Balance
1. Make API call: `GET /api/customers/{id}/outstanding`
2. Verify response includes:
   - Total invoiced amount
   - Total paid amount
   - Outstanding balance
   - List of unpaid/partially paid invoices
3. **PASS:** Customer outstanding API works

### T14.2 Customer Payment History
1. Make API call: `GET /api/customers/{id}/payments`
2. Verify response lists all payments received from this customer
3. **PASS:** Customer payments API works

### T14.3 Vendor Outstanding Balance
1. Make API call: `GET /api/vendors/{id}/outstanding`
2. Verify response includes outstanding PO amounts
3. **PASS:** Vendor outstanding API works

### T14.4 Vendor Payment History
1. Make API call: `GET /api/vendors/{id}/payments`
2. Verify response lists all payments made to this vendor
3. **PASS:** Vendor payments API works

---

## TEST FLOW 15: Settings - Module Toggles

### T15.1 Toggle Modules
1. Navigate to `/admin/settings`
2. Click **"Modules"** tab
3. Verify 4 toggle cards:
   - **Approval Workflows:** Multi-level approval chains...
   - **QC Inspections:** Quality control inspection...
   - **Returns & Credit Notes:** Handle sales/purchase returns...
   - **Audit Trail:** Comprehensive logging...
4. Toggle **Approval Workflows** ON
5. Click **"Save Module Settings"**
6. Verify success message
7. Refresh page - verify toggle is still ON
8. Toggle back OFF, save again
9. **PASS:** Module toggles persist across page loads

### T15.2 Document Number Settings
1. Click **"Documents"** tab
2. Verify all 14 document types grouped by category:
   - **Sales & Billing:** Invoice, Sales Order, Quotation
   - **Procurement:** Purchase Order, GRN
   - **Manufacturing:** Work Order, Production Order, Material Request
   - **Fulfillment:** Dispatch/Challan
   - **Finance:** Payment
   - **Quality:** QC Inspection, Return, Credit Note
3. Modify a prefix (e.g., change WO prefix to "WRK")
4. Save
5. Create a new work order and verify the new prefix is used
6. **PASS:** Document numbering is configurable per type

---

## COMPLETE E2E HAPPY PATH (Run as single flow)

This is the full chain test in sequence:

1. **Create Lead** (T1.1) -> John Smith at TestCorp
2. **Qualify Lead** (T1.2) -> Stage = QUALIFIED
3. **Convert Lead to Opportunity** (T1.3) -> Green button
4. **Win Opportunity** (T2.1) -> Stage = CLOSED_WON, Status = WON
5. **Convert to Customer** (T2.2) -> Green button creates customer
6. **Create Quotation** (T2.3) -> Blue button creates quote with items
7. **Convert Quote to Sales Order** (T3.1) -> Creates SO
8. **Confirm Sales Order** (T4.1) -> Status = CONFIRMED
9. **Create Production Order** (T4.2) -> Amber button
10. **Create Material Request** from production -> MR created
11. **Approve & Convert MR to PO** (T5.6) -> PO created from MR
12. **Receive Goods (GRN)** (T6.3) -> Inventory updated
13. **Complete Production** -> Status = COMPLETED
14. **Create Dispatch** from SO (T4.3) -> Teal button, DC created
15. **Process Dispatch** (T8.3) -> PACKED -> DISPATCHED -> IN_TRANSIT -> DELIVERED
16. **Convert SO to Invoice** (T4.4) -> Invoice created
17. **Record Partial Payment** (T10.1) -> Inline form on invoice
18. **Record Full Payment** (T10.2) -> Invoice becomes PAID
19. **Verify Chain** (T11.1) -> Navigate: Invoice -> SO -> Quote -> Opportunity -> Lead

**TOTAL PASS: All 19 steps complete the full business cycle**

---

## Bug Reporting Format

If a test fails, report using this format:

```
TEST ID: T{X}.{Y}
STEP: {step number}
EXPECTED: {what should happen}
ACTUAL: {what actually happened}
URL: {page URL when error occurred}
SCREENSHOT: {describe what's visible}
CONSOLE ERRORS: {any browser console errors}
SEVERITY: CRITICAL / HIGH / MEDIUM / LOW
```

---

## Quick Reference - All Test URLs

| Module | List | Create | Detail |
|--------|------|--------|--------|
| Leads | /admin/crm/leads | /admin/crm/leads/create | /admin/crm/leads/{id} |
| Opportunities | /admin/crm/opportunities | /admin/crm/opportunities/create | /admin/crm/opportunities/{id} |
| Customers | /admin/customers | /admin/customers/create | /admin/customers/{id} |
| Products | /admin/erp/products | - | - |
| Quotes | /admin/erp/quotes | /admin/erp/quotes/create | /admin/erp/quotes/{id} |
| Sales Orders | /admin/erp/sales-orders | /admin/erp/sales-orders/create | /admin/erp/sales-orders/{id} |
| Invoices | /admin/erp/invoices | /admin/erp/invoices/create | /admin/erp/invoices/{id} |
| Vendors | /admin/erp/vendors | /admin/erp/vendors (inline) | /admin/erp/vendors/{id} |
| Purchase Orders | /admin/erp/purchase-orders | /admin/erp/purchase-orders/create | /admin/erp/purchase-orders/{id} |
| GRN | /admin/erp/grn | /admin/erp/grn/create | /admin/erp/grn/{id} |
| Material Requests | /admin/erp/material-requests | /admin/erp/material-requests/create | /admin/erp/material-requests/{id} |
| Production Orders | /admin/erp/production | /admin/erp/production/create | /admin/erp/production/{id} |
| Work Orders | /admin/erp/work-orders | /admin/erp/work-orders/create | /admin/erp/work-orders/{id} |
| Dispatch | /admin/erp/dispatch | /admin/erp/dispatch/create | /admin/erp/dispatch/{id} |
| Payments | /admin/erp/payments | /admin/erp/payments/create | /admin/erp/payments/{id} |
| Settings | /admin/settings | - | - |
