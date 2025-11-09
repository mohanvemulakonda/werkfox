# Quick Email Setup for Hostinger (3 Simple Steps)

Since you already have Hostinger email, this is super easy!

## Step 1: Install Nodemailer (Run in Terminal)

```bash
cd /Users/mohanvemulakonda/projects/LivatoSolutions
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Step 2: Create `.env.local` File

Create a new file called `.env.local` in your project root folder and add:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=info@livatosolutions.com
SMTP_PASSWORD=YourActualEmailPassword
ADMIN_EMAIL=info@livatosolutions.com
```

**Replace `YourActualEmailPassword` with your real email password (the same one you use in Apple Mail)**

## Step 3: Update the API Route

Replace the contents of `/app/api/contact/route.ts` with this:

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
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
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

    // Send email to yourself
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `🔔 New Website Contact: ${name}`,
      text: `
NEW CONTACT FORM SUBMISSION
============================

CONTACT DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company || 'Not provided'}

MESSAGE:
${message}
${labelFinderInfo}

Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e5e7eb;
    }
    .detail-row {
      margin-bottom: 12px;
      padding: 8px 0;
    }
    .label {
      font-weight: 600;
      color: #4b5563;
      display: inline-block;
      width: 120px;
    }
    .value {
      color: #1f2937;
    }
    .value a {
      color: #2563eb;
      text-decoration: none;
    }
    .message-box {
      background: #f9fafb;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #2563eb;
      margin-top: 10px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .finder-config {
      background: #dbeafe;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
      border-left: 4px solid #2563eb;
    }
    .finder-config h3 {
      margin-top: 0;
      color: #1e40af;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
    .quick-actions {
      margin: 20px 0;
      padding: 15px;
      background: #f0fdf4;
      border-radius: 6px;
      border: 1px solid #86efac;
    }
    .quick-actions a {
      display: inline-block;
      margin: 5px;
      padding: 8px 16px;
      background: #2563eb;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🔔 New Website Contact</h2>
    </div>

    <div class="content">
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="detail-row">
          <span class="label">Name:</span>
          <span class="value">${name}</span>
        </div>
        <div class="detail-row">
          <span class="label">Email:</span>
          <span class="value"><a href="mailto:${email}">${email}</a></span>
        </div>
        <div class="detail-row">
          <span class="label">Phone:</span>
          <span class="value">${phone || 'Not provided'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Company:</span>
          <span class="value">${company || 'Not provided'}</span>
        </div>
      </div>

      <div class="quick-actions">
        <strong>Quick Actions:</strong><br>
        <a href="mailto:${email}">Reply to ${name}</a>
      </div>

      <div class="section">
        <div class="section-title">Message</div>
        <div class="message-box">${message}</div>
      </div>

      ${labelFinderInfo ? `
      <div class="finder-config">
        <h3>📊 Label Finder Configuration</h3>
        <p>This customer used the Label Finder tool. Here's what they're looking for:</p>
        <div style="margin-top: 15px;">${labelFinderInfo.replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}

    </div>

    <div class="footer">
      <strong>Livato Solutions - Website Contact Form</strong><br>
      Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
    </div>
  </div>
</body>
</html>
      `,
    });

    // Send auto-reply to customer
    await transporter.sendMail({
      from: `"Livato Solutions" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Livato Solutions',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .content {
      padding: 30px;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
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
        <li><a href="https://livatosolutions.com/products" style="color: #2563eb;">Product Catalog</a></li>
        <li><a href="https://livatosolutions.com/services" style="color: #2563eb;">Services</a></li>
        <li><a href="https://livatosolutions.com/blog" style="color: #2563eb;">Blog & Resources</a></li>
      </ul>
      <p>Best regards,<br>
      <strong>Livato Solutions Team</strong></p>
    </div>
    <div class="footer">
      <strong>Livato Solutions LLP</strong><br>
      HNO 17-50/13, Vishnupuri Colony, Peerzadiguda<br>
      Hyderabad, Telangana 500098, India<br>
      Phone: <a href="tel:+918008413800" style="color: #2563eb;">+91-8008413800</a><br>
      Email: <a href="mailto:info@livatosolutions.com" style="color: #2563eb;">info@livatosolutions.com</a>
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

## Done! 🎉

After completing these 3 steps:
1. Restart your dev server: `npm run dev`
2. Test the contact form on your website
3. You'll receive emails at info@livatosolutions.com

## Troubleshooting

If emails don't work:
- Double-check your password in `.env.local`
- Make sure you're using `smtp.hostinger.com`
- Check if Hostinger requires you to enable SMTP in their control panel
- Try port `587` instead of `465` if it doesn't work

## Security Note
- Never commit `.env.local` to GitHub (it's already in `.gitignore`)
- Keep your email password secure
