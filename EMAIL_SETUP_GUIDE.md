# Email Setup Guide for Contact Form

The contact form is now connected to the API route at `/api/contact`. Currently, it logs submissions to the console. To receive actual email notifications, you need to implement one of the following options:

## Option 1: Nodemailer with Hostinger Email (RECOMMENDED - You Already Have This!)

### Step 1: Install Nodemailer
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 2: Get Your Hostinger Email Credentials
You already have this! Just use your existing Hostinger email credentials:
- Email: info@livatosolutions.com (or whatever email you use)
- Password: Your email password (same one you use in Apple Mail)

### Step 3: Create `.env.local` file in your project root
```env
# Hostinger Email Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@livatosolutions.com
SMTP_PASSWORD=your-email-password-here
ADMIN_EMAIL=info@livatosolutions.com
```

**Note:** The `.env.local` file is already in `.gitignore` so your credentials won't be committed to GitHub.

### Step 4: Update `/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, labelFinderData } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter for Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.hostinger.com
      port: Number(process.env.SMTP_PORT), // 465
      secure: true, // true for port 465
      auth: {
        user: process.env.SMTP_USER, // info@livatosolutions.com
        pass: process.env.SMTP_PASSWORD, // your email password
      },
    });

    // Parse Label Finder data if present
    let labelFinderInfo = '';
    if (labelFinderData) {
      const data = JSON.parse(labelFinderData);
      labelFinderInfo = `

📊 LABEL FINDER CONFIGURATION:
Industry: ${data.industry}
Application: ${data.application}
Material: ${data.material}
Ribbon: ${data.ribbon}
Barcode: ${data.barcode}
Printer: ${data.printer}
      `;
    }

    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${name}`,
      text: `
New contact form submission from ${name}

CONTACT DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}

MESSAGE:
${message}
${labelFinderInfo}

Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { background: #f9fafb; padding: 20px; margin: 20px 0; }
    .label { font-weight: bold; color: #1f2937; }
    .value { color: #4b5563; margin-bottom: 15px; }
    .finder-config { background: #dbeafe; padding: 15px; margin: 15px 0; border-left: 4px solid #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <h3>Contact Details</h3>
      <div class="value"><span class="label">Name:</span> ${name}</div>
      <div class="value"><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></div>
      <div class="value"><span class="label">Phone:</span> ${phone || 'Not provided'}</div>
      <div class="value"><span class="label">Company:</span> ${company || 'Not provided'}</div>

      <h3>Message</h3>
      <div class="value">${message.replace(/\n/g, '<br>')}</div>

      ${labelFinderInfo ? `
      <div class="finder-config">
        <h3>📊 Label Finder Configuration</h3>
        ${labelFinderInfo.replace(/\n/g, '<br>')}
      </div>
      ` : ''}

      <div style="margin-top: 20px; color: #6b7280; font-size: 12px;">
        Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    // Auto-reply to user
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting Livato Solutions',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Thank You for Contacting Us!</h2>
    </div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>Thank you for reaching out to Livato Solutions. We have received your inquiry and our team will respond within 24 hours during business days.</p>
      <p>In the meantime, feel free to explore our:</p>
      <ul>
        <li><a href="https://livatosolutions.com/products">Product Catalog</a></li>
        <li><a href="https://livatosolutions.com/services">Services</a></li>
        <li><a href="https://livatosolutions.com/blog">Blog & Resources</a></li>
      </ul>
      <p>Best regards,<br>
      <strong>Livato Solutions Team</strong></p>
      <hr>
      <p style="font-size: 12px; color: #6b7280;">
        Livato Solutions LLP<br>
        HNO 17-50/13, Vishnupuri Colony, Peerzadiguda<br>
        Hyderabad, Telangana 500098<br>
        Phone: +91-8008413800<br>
        Email: info@livatosolutions.com
      </p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
```

---

## Option 2: SendGrid (FREE tier: 100 emails/day)

### Step 1: Sign up at SendGrid
https://signup.sendgrid.com/

### Step 2: Get API Key
1. Go to Settings > API Keys
2. Create API Key with "Mail Send" permissions
3. Copy the key

### Step 3: Install SendGrid
```bash
npm install @sendgrid/mail
```

### Step 4: Update `.env.local`
```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=info@livatosolutions.com
```

### Step 5: Update `/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, labelFinderData } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let labelFinderInfo = '';
    if (labelFinderData) {
      const data = JSON.parse(labelFinderData);
      labelFinderInfo = `
Label Finder Configuration:
- Industry: ${data.industry}
- Application: ${data.application}
- Material: ${data.material}
- Ribbon: ${data.ribbon}
- Barcode: ${data.barcode}
- Printer: ${data.printer}
      `;
    }

    // Send email
    await sgMail.send({
      to: process.env.ADMIN_EMAIL!,
      from: process.env.SENDGRID_FROM_EMAIL!, // Must be verified in SendGrid
      subject: `New Contact Form - ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}

Message:
${message}

${labelFinderInfo}
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('SendGrid error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
```

---

## Option 3: Resend (Modern, Developer-Friendly)

### Step 1: Sign up at Resend
https://resend.com/

### Step 2: Install Resend
```bash
npm install resend
```

### Step 3: Update `.env.local`
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=info@livatosolutions.com
```

### Step 4: Update `/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, labelFinderData } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Livato Solutions <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact - ${name}`,
      html: `<h2>New Contact Form</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

---

## Option 4: Database Storage (For Later)

You can also save submissions to a database. Popular options:

### Vercel Postgres
```bash
npm install @vercel/postgres
```

### MongoDB
```bash
npm install mongodb
```

### Supabase (PostgreSQL)
```bash
npm install @supabase/supabase-js
```

---

## Current Setup

Right now, the form:
1. ✅ Submits data to `/api/contact`
2. ✅ Shows success/error messages
3. ✅ Clears form on success
4. ✅ Handles Label Finder data
5. ⏳ **Logs to console** (implement one of the options above to get emails)

---

## Testing

1. Submit a test form
2. Check browser console (currently logs there)
3. Once email is set up, check your inbox at `info@livatosolutions.com`

---

## Recommendation

**Start with Option 1 (Gmail + Nodemailer)** - It's free, quick to set up, and works well for moderate traffic. Once you exceed Gmail's limits (500 emails/day), upgrade to SendGrid or Resend.

## Need Help?

Contact me if you need assistance implementing any of these options!
