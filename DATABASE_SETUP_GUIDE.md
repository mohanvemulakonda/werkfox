# Livato Solutions - Hostinger MySQL Database Setup Guide

## Overview
This guide will help you set up a MySQL database on Hostinger to capture all customer data from your Livato Solutions website (contact forms, label finder submissions, downloads, etc.).

---

## Step 1: Create MySQL Database on Hostinger

### 1.1 Login to Hostinger cPanel
1. Go to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Select your hosting account
3. Click "Advanced" → "MySQL Databases"

### 1.2 Create New Database
1. **Database Name:** `u123456_livato` (Hostinger auto-adds prefix)
2. Click "Create Database"

### 1.3 Create Database User
1. Scroll to "MySQL Users" section
2. **Username:** `u123456_livato_user` (auto-prefixed)
3. **Password:** Generate strong password (save this!)
4. Click "Create User"

### 1.4 Grant Permissions
1. Scroll to "Add User to Database"
2. Select your database and user
3. Grant **ALL PRIVILEGES**
4. Click "Add"

### 1.5 Get Connection Details
Note these down:
```
Database Host: mysqlXX.hostinger.com (shown in cPanel)
Database Name: u123456_livato
Database User: u123456_livato_user
Database Pass: [your generated password]
Port: 3306
```

---

## Step 2: Configure Your Local Environment

### 2.1 Install Required Packages
```bash
cd /Users/mohanvemulakonda/projects/LivatoSolutions

# Install Prisma and MySQL client
pnpm install prisma @prisma/client mysql2

# Install Prisma as dev dependency
pnpm install -D prisma
```

### 2.2 Create .env.local File
```bash
# Copy example file
cp .env.local.example .env.local
```

### 2.3 Edit .env.local with Real Credentials
```env
# Replace with your actual Hostinger MySQL credentials
DATABASE_URL="mysql://u123456_livato_user:YOUR_REAL_PASSWORD@mysqlXX.hostinger.com:3306/u123456_livato"

# Example (fill in your values):
# DATABASE_URL="mysql://u789012_livato_user:MySecurePass123@mysql42.hostinger.com:3306/u789012_livato"

# Keep email config (optional for now)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@livatosolutions.com
SMTP_PASSWORD=your-email-password
ADMIN_EMAIL=info@livatosolutions.com

NEXT_PUBLIC_SITE_URL=https://livatosolutions.com
NODE_ENV=development
```

---

## Step 3: Enable Remote MySQL Access (IMPORTANT!)

By default, Hostinger only allows local connections. You need to enable remote access:

### 3.1 In Hostinger cPanel
1. Go to "Remote MySQL"
2. Add Access Host:
   - For development: Add your current IP address
   - For testing: You can use `%` (allow all) temporarily
   - For production: Add your Vercel/deployment server IPs

### 3.2 Find Your IP Address
```bash
# On Mac/Linux
curl ifconfig.me

# Or visit: https://whatismyipaddress.com
```

Add this IP to Remote MySQL access hosts.

---

## Step 4: Initialize Database Schema

### 4.1 Generate Prisma Client
```bash
npx prisma generate
```

### 4.2 Push Schema to Database
```bash
# This will create all tables in your Hostinger MySQL database
npx prisma db push
```

You should see output like:
```
✔ Generated Prisma Client
🚀 Your database is now in sync with your Prisma schema.
✔ Created tables: contacts, subscribers, downloads, quote_requests, page_views
```

### 4.3 Open Prisma Studio (Optional - View Database)
```bash
npx prisma studio
```

This opens a browser interface at http://localhost:5555 to view/edit your database.

---

## Step 5: Test the Connection

### 5.1 Run Development Server
```bash
pnpm dev
```

### 5.2 Test Contact Form
1. Go to http://localhost:3000/contact
2. Fill out the form
3. Submit

### 5.3 Verify Data Saved
Check in one of these ways:

**Option A: Prisma Studio**
```bash
npx prisma studio
# Check the "Contact" model
```

**Option B: Hostinger phpMyAdmin**
1. cPanel → phpMyAdmin
2. Select `u123456_livato` database
3. Click `contacts` table
4. You should see your form submission!

**Option C: Check Console**
The API logs the contact ID in console:
```
Contact saved to database: 1
```

---

## Step 6: Deploy to Production

### 6.1 Update package.json
Ensure these scripts exist:
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

### 6.2 Deploy to Vercel (or your hosting)

**For Vercel:**
1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variable:
   ```
   DATABASE_URL=mysql://u123456_livato_user:password@mysqlXX.hostinger.com:3306/u123456_livato
   ```
4. Deploy!

**For Hostinger (if hosting Next.js there too):**
1. Upload files via FTP or Git
2. Create `.env` file with DATABASE_URL
3. Run:
   ```bash
   npm install
   npm run build
   npm start
   ```

---

## Database Tables Created

Your Prisma schema created these tables:

### 1. **contacts** - Contact Form Submissions
Stores all contact form and label finder submissions:
- id, name, email, phone, company, message
- labelFinderData (JSON)
- source, ipAddress, userAgent
- status (NEW, CONTACTED, QUALIFIED, etc.)
- createdAt, updatedAt

### 2. **subscribers** - Newsletter Subscribers
For future newsletter functionality:
- id, email, name
- isActive, source
- subscribedAt, unsubscribedAt

### 3. **downloads** - Download Tracking
Track catalog/datasheet downloads:
- id, email, name, company
- resourceType, resourceName, resourcePath
- ipAddress, userAgent
- downloadedAt

### 4. **quote_requests** - Quote Requests
For future quote functionality:
- id, customer info
- product details, quantity
- status, estimatedValue
- createdAt, updatedAt

### 5. **page_views** - Analytics (Optional)
Track page views:
- id, path, title
- ipAddress, referrer
- viewedAt

---

## Viewing Your Leads

### Method 1: Prisma Studio (Development)
```bash
npx prisma studio
```
Browse all tables at http://localhost:5555

### Method 2: phpMyAdmin (Hostinger)
1. cPanel → phpMyAdmin
2. Select your database
3. Click any table to view data

### Method 3: API Endpoint (Built-in)
Add this to .env.local:
```env
ADMIN_API_KEY=your-secret-api-key-here
```

Then fetch contacts:
```bash
curl -H "Authorization: Bearer your-secret-api-key-here" \
  https://livatosolutions.com/api/contact?limit=50
```

### Method 4: Build Admin Dashboard (Future)
You can create `/app/admin/contacts/page.tsx` to view leads in your app.

---

## Common Issues & Solutions

### Issue 1: "Can't reach database server"
**Solution:** Enable Remote MySQL in Hostinger cPanel and add your IP.

### Issue 2: "Access denied for user"
**Solution:** Check DATABASE_URL credentials. Common mistakes:
- Wrong password
- Missing `@` or `:` in URL
- Wrong database name prefix

### Issue 3: Prisma CLI not found
**Solution:**
```bash
pnpm install -D prisma
npx prisma generate
```

### Issue 4: Tables not created
**Solution:**
```bash
npx prisma db push --force-reset
```

---

## Security Best Practices

1. ✅ **Never commit .env.local** to Git (already in .gitignore)
2. ✅ **Use strong passwords** for database users
3. ✅ **Restrict Remote MySQL** access to specific IPs when possible
4. ✅ **Use environment variables** for all sensitive data
5. ✅ **Regularly backup database** (Hostinger has automatic backups)

---

## Manual Backup Script

Create `scripts/backup-database.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -h mysqlXX.hostinger.com -u u123456_livato_user -p \
  u123456_livato > backups/livato_backup_$DATE.sql
```

Run monthly:
```bash
chmod +x scripts/backup-database.sh
./scripts/backup-database.sh
```

---

## Next Steps

1. ✅ Set up database on Hostinger
2. ✅ Configure .env.local
3. ✅ Run `npx prisma db push`
4. ✅ Test contact form
5. ⏭️ Deploy to production
6. ⏭️ Monitor leads in phpMyAdmin or Prisma Studio
7. ⏭️ (Optional) Build admin dashboard
8. ⏭️ (Optional) Add email notifications

---

## Questions?

- **Prisma Docs:** https://www.prisma.io/docs
- **Hostinger MySQL:** Check cPanel documentation
- **Need help?** Check console logs for errors

---

**Created:** November 2024
**Last Updated:** November 2024
**Author:** Claude Code
**For:** Livato Solutions Customer Data Capture System
