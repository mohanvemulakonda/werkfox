# Deployment Guide: Moving from WordPress to Next.js

## Current Situation
- Your website is currently on WordPress via Hostinger
- You've built a new Next.js website that's ready to replace WordPress

## Best Deployment Options

### Option 1: Vercel (RECOMMENDED - Easiest & Free)

Vercel is made by the creators of Next.js and offers the best performance and easiest deployment.

#### Step 1: Push Code to GitHub
```bash
cd /Users/mohanvemulakonda/projects/LivatoSolutions
git init
git add .
git commit -m "Initial commit - Next.js Livato Solutions website"
git branch -M main
# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/livatosolutions.git
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to https://vercel.com/signup
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
6. Add Environment Variables:
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=info@livatosolutions.com
   SMTP_PASSWORD=your-email-password
   ADMIN_EMAIL=info@livatosolutions.com
   ```
7. Click "Deploy"

#### Step 3: Connect Custom Domain
1. In Vercel dashboard, go to Settings → Domains
2. Add `livatosolutions.com` and `www.livatosolutions.com`
3. Vercel will provide DNS records

#### Step 4: Update DNS in Hostinger
1. Log into Hostinger
2. Go to Domains → Manage → DNS/Nameservers
3. Update these records:

**For Root Domain (livatosolutions.com):**
- Type: A Record
- Name: @
- Value: 76.76.21.21 (Vercel IP)

**For WWW (www.livatosolutions.com):**
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

**Verify Domain:**
- Type: TXT
- Name: @ or _vercel
- Value: (Vercel will provide this)

#### Step 5: Disable WordPress
Once your new site is live and verified:
1. Log into Hostinger
2. Go to Websites
3. Stop or delete the WordPress installation
4. Keep your email settings intact!

---

### Option 2: Hostinger (Same Hosting Provider)

Since you're already with Hostinger, you can host the Next.js app there too.

#### Requirements:
- Node.js hosting support (check with Hostinger)
- Or use Hostinger's VPS/Cloud hosting

#### Steps:
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload to Hostinger:**
   - Upload all files via FTP/SFTP
   - Or use Git deployment if available

3. **Configure Node.js:**
   - Set Node.js version to 18 or higher
   - Set start command: `npm start`
   - Set port (usually 3000 or as assigned)

4. **Environment Variables:**
   Add the same .env variables in Hostinger's control panel

5. **Point Domain:**
   Update the document root to your Next.js app

**Note:** This is more complex and may require VPS/Cloud hosting. Contact Hostinger support for Node.js hosting setup.

---

### Option 3: Netlify (Alternative to Vercel)

#### Steps:
1. Push code to GitHub (same as Vercel Step 1)
2. Go to https://www.netlify.com/
3. Sign up and connect GitHub
4. Import repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variables
7. Deploy
8. Configure custom domain (similar to Vercel)

---

## DNS Changes Summary

### Current Setup (WordPress on Hostinger):
- Domain: livatosolutions.com
- Hosting: Hostinger WordPress
- DNS: Points to Hostinger servers

### New Setup (Next.js on Vercel):
- Domain: livatosolutions.com
- Hosting: Vercel (or Netlify)
- DNS: Points to Vercel servers
- Email: Still on Hostinger (unchanged!)

### Important Notes:
✅ **Email stays with Hostinger** - DNS changes won't affect your email!
- MX records remain unchanged
- Your info@livatosolutions.com continues to work
- Apple Mail continues to work

❌ **WordPress will be disconnected** - But only after:
1. New site is fully tested
2. DNS changes have propagated (24-48 hours)
3. You confirm everything works

---

## Migration Checklist

### Before Deployment:
- [ ] Test contact form locally
- [ ] Verify all pages work correctly
- [ ] Test Label Finder functionality
- [ ] Check mobile responsiveness
- [ ] Install nodemailer and configure email
- [ ] Create `.env.local` with email credentials
- [ ] Push code to GitHub

### During Deployment:
- [ ] Deploy to Vercel (or chosen platform)
- [ ] Test the preview URL
- [ ] Configure environment variables
- [ ] Add custom domain
- [ ] Update DNS records

### After Deployment (Testing Phase):
- [ ] Test on preview URL (e.g., livatosolutions.vercel.app)
- [ ] Submit contact form and verify email delivery
- [ ] Test Label Finder → Contact flow
- [ ] Check all pages and links
- [ ] Test on mobile devices
- [ ] Share with team for feedback

### Go Live:
- [ ] Point DNS to new site
- [ ] Wait 24-48 hours for DNS propagation
- [ ] Monitor for issues
- [ ] Keep WordPress running for 1 week as backup
- [ ] Once confirmed stable, disable WordPress

---

## Recommended Timeline

**Week 1:**
- Deploy to Vercel
- Test thoroughly on preview URL
- Get team feedback

**Week 2:**
- Make any necessary fixes
- Update DNS to point to new site
- Monitor both old and new sites

**Week 3:**
- If everything works perfectly, disable WordPress
- Celebrate! 🎉

---

## Backup Plan

Keep WordPress running for 2 weeks after switching DNS:
- If issues arise, you can quickly revert DNS
- WordPress site will still be accessible

---

## Cost Comparison

### Current (WordPress on Hostinger):
- Hosting: ~$3-10/month

### New (Next.js on Vercel):
- Vercel Free Plan: $0/month
  - 100 GB bandwidth
  - Unlimited projects
  - Automatic HTTPS
  - Perfect for business sites

### New (Next.js on Netlify):
- Netlify Free Plan: $0/month
  - Similar features to Vercel

---

## Need Help?

1. **Vercel Docs:** https://vercel.com/docs
2. **Next.js Deployment:** https://nextjs.org/docs/deployment
3. **Hostinger Support:** Contact them about Node.js hosting or DNS changes

---

## Quick Start (Recommended Path)

```bash
# 1. Install nodemailer
npm install nodemailer --legacy-peer-deps

# 2. Create .env.local (don't commit this!)
# Add your email credentials

# 3. Test locally
npm run dev
# Test contact form at http://localhost:3000/contact

# 4. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# 5. Deploy to Vercel
# Go to vercel.com and import your GitHub repo

# 6. Test on Vercel preview URL

# 7. Update DNS when ready to go live
```

That's it! You'll have a faster, more modern website with better SEO and performance than WordPress!
