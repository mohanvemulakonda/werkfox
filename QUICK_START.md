# Livato Solutions - Database Setup Quick Start

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd /Users/mohanvemulakonda/projects/LivatoSolutions
pnpm install
```

### Step 2: Configure Database Connection

Create `.env.local` file (if not exists):
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Hostinger MySQL credentials:
```env
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:3306/DATABASE"
```

**Get these from Hostinger cPanel → MySQL Databases**

### Step 3: Create Database Tables
```bash
pnpm run db:push
```

This creates all tables in your Hostinger MySQL database:
- ✅ contacts (form submissions)
- ✅ subscribers (newsletter)
- ✅ downloads (resource tracking)
- ✅ quote_requests (quotes)
- ✅ page_views (analytics)

### Step 4: Test It!
```bash
# Start dev server
pnpm dev

# Visit http://localhost:3000/contact
# Submit a form
# Check database!
```

### Step 5: View Your Data

**Option A: Prisma Studio (Recommended)**
```bash
pnpm run db:studio
```
Opens http://localhost:5555 - beautiful database browser!

**Option B: Hostinger phpMyAdmin**
1. Login to Hostinger cPanel
2. Click phpMyAdmin
3. Select your database
4. View `contacts` table

---

## 📊 What Data Gets Captured?

### Contact Form (/contact)
- ✅ Name, Email, Phone, Company
- ✅ Message
- ✅ Label Finder data (if from label finder)
- ✅ IP Address & User Agent (for tracking)
- ✅ Source (contact_form or label_finder)
- ✅ Status (NEW by default)
- ✅ Timestamp

### Future Features (Already in Schema)
- Newsletter subscriptions
- Download tracking (catalogs, datasheets)
- Quote requests
- Page view analytics

---

## 🛠️ Useful Commands

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm run postinstall

# Push schema to database
pnpm run db:push

# Open database browser
pnpm run db:studio

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production server
pnpm start
```

---

## 🔧 Troubleshooting

### "Can't reach database server"
1. Enable Remote MySQL in Hostinger cPanel
2. Add your IP address to allowed hosts
3. Find your IP: `curl ifconfig.me`

### "Authentication failed"
1. Check DATABASE_URL in `.env.local`
2. Verify credentials in Hostinger cPanel
3. Make sure user has ALL PRIVILEGES

### "Table doesn't exist"
```bash
# Reset and recreate tables
pnpm run db:push
```

---

## 📁 Important Files

- `prisma/schema.prisma` - Database schema
- `lib/prisma.ts` - Database connection
- `app/api/contact/route.ts` - Contact form API (saves to DB)
- `.env.local` - Your database credentials (never commit!)
- `DATABASE_SETUP_GUIDE.md` - Full documentation

---

## 🎯 Next Steps

1. ✅ Test contact form submission
2. ⏭️ Deploy to production (Vercel/Hostinger)
3. ⏭️ Set up email notifications (optional)
4. ⏭️ Build admin dashboard to view leads
5. ⏭️ Add newsletter subscription feature
6. ⏭️ Track downloads

---

## 🚀 Ready to Deploy?

**For Vercel:**
1. Push to GitHub
2. Connect to Vercel
3. Add environment variable: `DATABASE_URL`
4. Deploy!

**For Hostinger:**
1. Upload via FTP/Git
2. Create `.env` with DATABASE_URL
3. Run `npm install && npm run build`
4. Done!

---

**Need help?** Check `DATABASE_SETUP_GUIDE.md` for detailed instructions.
