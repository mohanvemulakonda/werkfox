import { NextRequest, NextResponse } from 'next/server';

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

    // TODO: Implement email sending here
    // For now, we'll just log the data and return success
    console.log('Contact Form Submission:', {
      name,
      email,
      phone,
      company,
      message,
      labelFinderData: labelFinderData ? JSON.parse(labelFinderData) : null,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending
    // In production, you would use one of these services:
    // 1. Nodemailer with SMTP
    // 2. SendGrid API
    // 3. Resend API
    // 4. AWS SES

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
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
