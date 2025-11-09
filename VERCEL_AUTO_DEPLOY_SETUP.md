# Vercel Auto-Deploy Setup Guide

Since you already have Vercel, here's how to connect your new Next.js site for automatic deployments.

## Quick Setup (5 Minutes)

### Step 1: Initialize Git Repository

```bash
cd /Users/mohanvemulakonda/projects/LivatoSolutions

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Livato Solutions Next.js website"

# Rename branch to main
git branch -M main
```

### Step 2: Create GitHub Repository

**Option A: Via GitHub Website**
1. Go to https://github.com/new
2. Repository name: `LivatoSolutions` (or any name you want)
3. Make it Private or Public
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

**Option B: Via GitHub CLI** (if you have it installed)
```bash
gh repo create LivatoSolutions --private --source=. --remote=origin --push
```

### Step 3: Push to GitHub

After creating the repository on GitHub, it will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR-USERNAME/LivatoSolutions.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 4: Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings:
   - Framework Preset: **Next.js** ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅

5. **IMPORTANT: Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   SMTP_HOST = smtp.hostinger.com
   SMTP_PORT = 465
   SMTP_SECURE = true
   SMTP_USER = info@livatosolutions.com
   SMTP_PASSWORD = your-actual-email-password
   ADMIN_EMAIL = info@livatosolutions.com
   ```

6. Click **"Deploy"**

### Step 5: Verify Deployment

1. Wait for deployment to complete (2-3 minutes)
2. Vercel will give you a URL like: `livatosolutions.vercel.app`
3. Test your site on that URL
4. Test the contact form to make sure emails work

### Step 6: Connect Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add `livatosolutions.com`
4. Add `www.livatosolutions.com`
5. Vercel will show you DNS records to update

### Step 7: Update DNS in Hostinger

1. Log into Hostinger
2. Go to **Domains** → **Manage** → **DNS/Nameservers**
3. Add/Update these records:

**For livatosolutions.com (root domain):**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

**For www.livatosolutions.com:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**For domain verification:**
```
Type: TXT
Name: _vercel
Value: (Vercel will provide this - copy from Vercel dashboard)
TTL: 3600
```

4. **Keep your email MX records unchanged!** They should look like:
```
Type: MX
Name: @
Value: mx1.hostinger.com (or similar)
Priority: 10
```

---

## Auto-Deploy is Now Active! 🎉

From now on:
1. Make changes to your code
2. Commit: `git add . && git commit -m "Your message"`
3. Push: `git push`
4. Vercel automatically deploys! ✨

You'll get:
- Preview deployments for every push
- Production deployment on `main` branch
- Automatic HTTPS
- CDN distribution worldwide
- Deployment notifications

---

## Daily Workflow

```bash
# Make your changes to files...

# Stage changes
git add .

# Commit with a message
git commit -m "Updated contact page"

# Push to GitHub (this triggers Vercel deploy)
git push

# Check deployment status
# Go to vercel.com/dashboard or check your email
```

---

## Useful Vercel Features

### Preview Deployments
- Every branch gets its own preview URL
- Perfect for testing before going live
- Share with team for review

### Environment Variables
- Add in Vercel dashboard → Settings → Environment Variables
- Can have different values for Production/Preview/Development
- Never commit `.env.local` to Git!

### Deployment Rollback
- If something breaks, you can instantly rollback
- Go to Deployments → Click previous version → "Promote to Production"

### Analytics
- Vercel provides free analytics
- See page views, performance metrics
- Enable in Settings → Analytics

---

## Testing Before Going Live

1. **Test on Vercel Preview URL First:**
   - livatosolutions.vercel.app
   - Test all pages
   - Submit contact form
   - Use Label Finder
   - Check on mobile

2. **Get Feedback:**
   - Share preview URL with team
   - Test on different devices
   - Check email delivery

3. **Only Then Update DNS:**
   - Point livatosolutions.com to Vercel
   - Wait 24-48 hours for propagation
   - Monitor for issues

---

## Important Files

### `.gitignore` (Already configured)
Make sure these are in your .gitignore:
```
.env.local
.env*.local
node_modules
.next
```

### `package.json` (Already configured)
Your build scripts are set:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Troubleshooting

### Build Fails on Vercel
- Check the build logs in Vercel dashboard
- Common issues:
  - Missing environment variables
  - TypeScript errors
  - Missing dependencies

### Email Not Working
- Verify environment variables in Vercel
- Check SMTP credentials
- Test locally first with `npm run dev`

### DNS Not Working
- DNS changes take time (up to 48 hours)
- Use https://dnschecker.org to check propagation
- Make sure you didn't delete MX records (email)

---

## Next Steps After Deployment

1. **Monitor first week closely**
2. **Keep WordPress running for 1 week as backup**
3. **Test thoroughly on live domain**
4. **Once stable, disable WordPress**

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** dashboard → Help
- **GitHub Issues:** Create issues in your repo for tracking

---

## Summary Checklist

- [ ] Git init and first commit
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Import to Vercel
- [ ] Add environment variables
- [ ] Test on preview URL (*.vercel.app)
- [ ] Add custom domain
- [ ] Update DNS records
- [ ] Wait for DNS propagation
- [ ] Test on live domain
- [ ] Monitor and verify everything works
- [ ] Disable WordPress after 1 week

Congratulations! You now have a modern, fast, auto-deploying website! 🚀
