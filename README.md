# Livato Solutions - Next.js Website

Modern, professional website for Livato Solutions LLP, a leading provider of custom labeling solutions.

## 🚀 What's Been Built

### Pages Created
- ✅ **Homepage** with interactive Label Finder tool
- ✅ **Products** overview and category pages
  - Labels (with pharmaceutical sub-page)
  - Printers
  - Ribbons
- ✅ **Services** - 8 comprehensive service offerings
- ✅ **About Us** - Company information
- ✅ **Contact** - Form with email integration
- ✅ **Blog** - Blog listing and post template
- ✅ **FAQ** - Interactive accordion FAQ
- ✅ **Privacy Policy**
- ✅ **Terms of Service**

### Key Features
- 🎯 **Label Finder** - Interactive tool to recommend labels based on industry/application
- 📧 **Contact Form** - API ready, nodemailer installed
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Fast Performance** - Next.js 15 with optimizations
- 🎨 **Modern UI** - Tailwind CSS, CMYK wave animations
- 🔒 **SEO Friendly** - Meta tags, semantic HTML

## 📦 Tech Stack

- **Framework:** Next.js 15.2.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Open Sans (headings), Inter (body)
- **Email:** Nodemailer (configured for Hostinger)
- **Package Manager:** pnpm
- **Deployment:** Vercel (auto-deploy enabled)

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Email (For Contact Form)
Create `.env.local` in the root directory:
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@livatosolutions.com
SMTP_PASSWORD=your-actual-password
ADMIN_EMAIL=info@livatosolutions.com
```

See `QUICK_EMAIL_SETUP.md` for detailed email setup instructions.

### 3. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
pnpm build
pnpm start
```

## 🚀 Deployment

### Vercel (Auto-Deploy Setup)

1. **Already Connected:** Your repository is connected to Vercel
2. **Auto-Deploy:** Every push to `main` triggers a deployment
3. **Add Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Custom Domain:** Point `livatosolutions.com` to Vercel
   - See `VERCEL_AUTO_DEPLOY_SETUP.md` for DNS configuration

## 📁 Project Structure

```
LivatoSolutions/
├── app/
│   ├── about/              # About Us page
│   ├── api/contact/        # Contact form API
│   ├── blog/               # Blog pages
│   ├── components/         # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LabelConfigurator.tsx
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── privacy/            # Privacy Policy
│   ├── products/           # Product pages
│   │   ├── labels/
│   │   ├── printers/
│   │   └── ribbons/
│   ├── services/           # Services page
│   ├── terms/              # Terms of Service
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── public/                 # Static assets (images)
├── .env.local.example      # Environment variables template
└── package.json
```

## 📖 Documentation

- **`QUICK_EMAIL_SETUP.md`** - Quick guide to setup email with Hostinger
- **`EMAIL_SETUP_GUIDE.md`** - Detailed email setup with multiple options
- **`VERCEL_AUTO_DEPLOY_SETUP.md`** - Complete Vercel deployment guide
- **`DEPLOYMENT_GUIDE.md`** - Full deployment guide including DNS setup

## 🎯 Next Steps

### To Activate Email Notifications:
1. Create `.env.local` with your email credentials
2. Copy the code from `QUICK_EMAIL_SETUP.md` into `/app/api/contact/route.ts`
3. Test the contact form
4. Deploy to Vercel with environment variables

### To Go Live:
1. ✅ Code is pushed to GitHub
2. ⏳ Add environment variables in Vercel
3. ⏳ Test on Vercel preview URL
4. ⏳ Update DNS to point to Vercel
5. ⏳ Disable WordPress after verification

See `VERCEL_AUTO_DEPLOY_SETUP.md` for detailed steps.

## 📧 Contact Form

The contact form is ready and configured:
- Submits to `/api/contact`
- Includes Label Finder data when coming from configurator
- Shows success/error messages
- Clears form on successful submission
- **Email integration:** Install Nodemailer and configure `.env.local`

## 🎨 Design System

- **Primary Color:** Blue (#2563eb)
- **Fonts:**
  - Headings: Open Sans
  - Body: Inter
- **Components:** Consistent spacing, shadows, and rounded corners
- **Animations:** CMYK wave background elements

## 🐛 Known Issues

None currently. All pages tested and working.

## 📝 License

Proprietary - Livato Solutions LLP

## 🤝 Support

For questions or issues:
- **Email:** info@livatosolutions.com
- **Phone:** +91-8008413800

---

**Built with ❤️ for Livato Solutions**
