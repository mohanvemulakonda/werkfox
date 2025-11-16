# Invoice Import Guide

This guide will help you import your historical invoices from 2021 (or any other year) into the database.

## Step-by-Step Instructions

### Step 1: Prepare Your Data

You need to create TWO CSV files:

1. **invoices-import.csv** - Main invoice data
2. **invoice-items-import.csv** - Line items for each invoice

Template files have been created for you:
- `invoices-import-template.csv`
- `invoice-items-import-template.csv`

### Step 2: Fill in Your Invoice Data

#### Invoices CSV Format

Open `invoices-import-template.csv` and fill in your data with these columns:

| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| invoiceNumber | Unique invoice number | Yes | INV210001 |
| date | Invoice date (YYYY-MM-DD) | Yes | 2021-01-15 |
| customerName | Customer/Company name | Yes | ABC Pharmaceuticals |
| customerEmail | Customer email | Yes | abc@example.com |
| customerPhone | Customer phone | No | 9876543210 |
| customerState | Customer state | Yes | Karnataka |
| customerGstNumber | Customer GST number | No | 29XXXXX1234X1Z1 |
| companyState | Your company state | No | Karnataka |
| type | INVOICE, QUOTE, or PROFORMA | Yes | INVOICE |
| status | DRAFT, SENT, PAID, etc. | Yes | PAID |
| subtotal | Amount before tax | Yes | 100000 |
| discountAmount | Discount amount | No | 0 |
| cgst | CGST amount | Yes | 9000 |
| sgst | SGST amount | Yes | 9000 |
| igst | IGST amount | Yes | 0 |
| total | Final total amount | Yes | 118000 |
| notes | Additional notes | No | First invoice |
| paymentTerms | Payment terms | No | Net 30 |
| paidAmount | Amount paid | No | 118000 |
| billingAddress | Billing address | No | 123 MG Road |
| shippingAddress | Shipping address | No | 123 MG Road |
| placeOfSupply | Place of supply | No | Karnataka |

#### Invoice Items CSV Format

Open `invoice-items-import-template.csv` and fill in with these columns:

| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| invoiceNumber | Must match invoice number | Yes | INV210001 |
| itemName | Product/service name | Yes | Pharmaceutical Labels |
| description | Item description | No | Custom printed labels |
| hsnCode | HSN/SAC code | No | 49119900 |
| quantity | Quantity | Yes | 1000 |
| unit | Unit of measurement | No | Nos |
| unitPrice | Price per unit | Yes | 100 |
| discount | Discount amount | No | 0 |
| gstRate | GST rate (18, 12, etc.) | Yes | 18 |

### Step 3: Export from Google Drive

If your invoices are in Google Sheets:

1. Open your Google Sheet
2. File → Download → Comma Separated Values (.csv)
3. Save as `invoices-import.csv` in the project root
4. Repeat for items sheet and save as `invoice-items-import.csv`

If your invoices are in Excel:

1. Open the Excel file
2. File → Save As → CSV (Comma delimited)
3. Save both files in the project root

### Step 4: Place CSV Files

Copy both CSV files to the project root directory:
```
/Users/mohanvemulakonda/projects/LivatoSolutions/
├── invoices-import.csv
└── invoice-items-import.csv
```

### Step 5: Install Dependencies (if needed)

```bash
npm install ts-node --save-dev
```

### Step 6: Run the Import Script

```bash
npx ts-node scripts/import-invoices.ts
```

The script will:
- ✅ Validate your data
- ✅ Check for duplicate invoice numbers (skip if exists)
- ✅ Calculate taxes automatically
- ✅ Import all invoices with their items
- ✅ Show progress and summary

### Expected Output

```
Starting invoice import...

Found 150 invoices to import
Found 420 items to import

✅ Imported invoice INV210001 (3 items)
✅ Imported invoice INV210002 (2 items)
⏭️  Invoice INV210003 already exists, skipping...
✅ Imported invoice INV210004 (5 items)
...

📊 Import Summary:
   ✅ Successfully imported: 145 invoices
   ❌ Failed: 2 invoices
   ⏭️  Skipped: 3 invoices

Import completed!
```

## Important Notes

1. **Invoice Numbers Must Be Unique** - The script will skip invoices that already exist
2. **Every Invoice Needs Items** - Invoices without items will be skipped
3. **Date Format** - Use YYYY-MM-DD format (e.g., 2021-01-15)
4. **Tax Calculation** - The script automatically calculates CGST/SGST for same state, IGST for inter-state
5. **Backup First** - Always backup your database before running bulk imports

## Troubleshooting

### Error: "Invoice CSV file not found"
- Make sure the CSV files are in the project root
- Check the file names match exactly: `invoices-import.csv` and `invoice-items-import.csv`

### Error: "No items found for invoice"
- Ensure the invoiceNumber in items CSV matches exactly with invoices CSV
- Check for extra spaces or typos in invoice numbers

### Error: Failed to import specific invoice
- Check the console for the specific error message
- Common issues: missing required fields, invalid date format, invalid type/status values

## Need Help?

If you encounter any issues:
1. Check the error messages in the console
2. Verify your CSV format matches the templates
3. Make sure all required fields have values
4. Check for special characters that might break CSV format (use quotes if needed)

## Alternative: Manual Import via Admin Panel

If you prefer not to use the script, you can also:
1. Use the "Create Invoice" button in the admin panel
2. Fill in the form manually for each invoice
3. This is slower but gives you more control
