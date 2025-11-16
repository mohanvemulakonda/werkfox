# Vercel Environment Variables Setup

## Required Environment Variables

To fix the authentication and database connection issues, you need to add these environment variables to your Vercel project:

### 1. Database Configuration

```
DATABASE_URL=mysql://u859308447_livato_user:111aaa%23%23%23%24A@srv1428.hstgr.io:3306/u859308447_Livato
```

### 2. NextAuth Configuration

```
NEXTAUTH_URL=https://www.livatosolutions.com
NEXTAUTH_SECRET=livato-admin-secret-key-change-in-production-2024
```

**IMPORTANT:** For production, you should generate a new secure secret:
```bash
openssl rand -base64 32
```

### 3. Optional: Email Configuration (for contact forms and invoices)

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=sales@livatosolutions.com
```

### 4. Optional: LabelHub Integration

```
NEXT_PUBLIC_LABELHUB_URL=https://labels-hub.com
```

## How to Add Environment Variables to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project: **LivatoSolutions**
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - Name: `DATABASE_URL`
   - Value: (paste the value)
   - Environment: Check **Production**, **Preview**, and **Development**
   - Click **Save**
5. Repeat for all variables above

## Redeploy After Adding Variables

After adding all environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **Redeploy** button
4. Or push a new commit to trigger automatic deployment

## Testing Authentication

After deployment, test the admin login:

1. Go to: https://www.livatosolutions.com/login/admin
2. Use your admin credentials
3. You should be redirected to: https://www.livatosolutions.com/admin

## Troubleshooting

### If you still get auth errors:

1. Check Vercel Function Logs:
   - Go to your deployment
   - Click on **Functions** tab
   - Look for errors in `/api/auth/[...nextauth]`

2. Verify environment variables are set:
   - Go to Settings → Environment Variables
   - Make sure all variables are present

3. Check database connection:
   - The DATABASE_URL might need to be URL-encoded
   - Special characters in password should be encoded: `#` = `%23`, `$` = `%24`

4. Clear browser cache and cookies:
   - Clear cookies for `livatosolutions.com`
   - Try logging in again

## Creating an Admin User

If you don't have an admin user yet, run this script locally:

```bash
node scripts/create-admin.ts
```

Or create one manually in your MySQL database.
