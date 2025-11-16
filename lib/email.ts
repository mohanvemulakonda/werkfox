import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export async function sendContactNotification(contact: any) {
  const salesEmail = process.env.SALES_EMAIL || 'sales@livatosolutions.com';

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: salesEmail,
      subject: `New Contact Form Submission - ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 3px solid #2563EB; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Contact Information</h3>
            <p><strong>Name:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contact.email}">${contact.email}</a></p>
            ${contact.phone ? `<p><strong>Phone:</strong> <a href="tel:${contact.phone}">${contact.phone}</a></p>` : ''}
            ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937;">Message</h3>
            <p style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">
              ${contact.message}
            </p>
          </div>

          ${contact.source ? `
            <p style="font-size: 14px; color: #6b7280;">
              <strong>Source:</strong> ${contact.source}
            </p>
          ` : ''}

          ${contact.labelFinderData ? `
            <div style="margin: 20px 0; background-color: #eff6ff; padding: 15px; border-radius: 8px;">
              <h4 style="margin-top: 0; color: #1e40af;">Label Finder Recommendations</h4>
              <pre style="background-color: white; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">
${contact.labelFinderData}
              </pre>
            </div>
          ` : ''}

          <p style="font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 30px;">
            Received on ${new Date(contact.createdAt).toLocaleString()}
          </p>

          <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contacts/${contact.id}"
               style="background-color: #2563EB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Panel
            </a>
          </p>
        </div>
      `
    });

    console.log(`✅ Email notification sent to ${salesEmail} for contact #${contact.id}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Failed to send email notification:', error);
    return { success: false, error };
  }
}

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Livato Solutions" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments
    });

    return { success: true, info };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return { success: false, error };
  }
}

export function generateInvoiceEmailHTML(
  customerName: string,
  invoiceNumber: string,
  total: number,
  dueDate: Date | null
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .invoice-details {
      background: #f9fafb;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
      border-left: 4px solid #2563eb;
    }
    .invoice-details p {
      margin: 8px 0;
    }
    .invoice-details strong {
      color: #1f2937;
      min-width: 120px;
      display: inline-block;
    }
    .total {
      font-size: 24px;
      color: #2563eb;
      font-weight: bold;
    }
    .button {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 6px;
      margin: 20px 0;
      font-weight: 600;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      border: 1px solid #e5e7eb;
      border-top: none;
      font-size: 14px;
      color: #6b7280;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Livato Solutions</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Tax Invoice</p>
  </div>

  <div class="content">
    <p>Dear ${customerName},</p>

    <p>Thank you for your business! Please find attached your invoice.</p>

    <div class="invoice-details">
      <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
      <p><strong>Total Amount:</strong> <span class="total">₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
      ${dueDate ? `<p><strong>Due Date:</strong> ${new Date(dueDate).toLocaleDateString('en-IN')}</p>` : ''}
    </div>

    <p>The invoice is attached as a PDF file to this email. If you have any questions or concerns about this invoice, please don't hesitate to contact us.</p>

    <p style="margin-top: 30px;">Best regards,<br><strong>Livato Solutions Team</strong></p>
  </div>

  <div class="footer">
    <p><strong>Livato Solutions</strong></p>
    <p>Hyderabad, Telangana 500098, India</p>
    <p>GSTIN: 36AAIFL5524C1ZJ</p>
    <p>Phone: 8008413800 | Email: livatosolutions@gmail.com</p>
  </div>
</body>
</html>
  `;
}

export function generateInvoiceEmailText(
  customerName: string,
  invoiceNumber: string,
  total: number,
  dueDate: Date | null
) {
  return `
Dear ${customerName},

Thank you for your business! Please find attached your invoice.

Invoice Number: ${invoiceNumber}
Total Amount: ₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
${dueDate ? `Due Date: ${new Date(dueDate).toLocaleDateString('en-IN')}` : ''}

The invoice is attached as a PDF file to this email. If you have any questions or concerns about this invoice, please don't hesitate to contact us.

Best regards,
Livato Solutions Team

---
Livato Solutions
Hyderabad, Telangana 500098, India
GSTIN: 36AAIFL5524C1ZJ
Phone: 8008413800
Email: livatosolutions@gmail.com
  `;
}
