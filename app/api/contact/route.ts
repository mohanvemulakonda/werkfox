import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendContactNotification } from '@/lib/email';
import { applyRateLimit, RateLimitPresets } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting - 10 requests per minute from same IP
    const rateLimitResult = await applyRateLimit(request, RateLimitPresets.LENIENT);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          message: 'You have exceeded the rate limit. Please wait a moment before submitting again.',
        },
        {
          status: 429,
          headers: rateLimitResult.headers,
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, message, labelFinderData, website, _timingCheck } = body;

    // Server-side honeypot check
    if (website) {
      console.warn('Spam detected: honeypot field filled', { ip: request.headers.get('x-forwarded-for') });
      // Return success to fool bots, but don't save
      return NextResponse.json(
        {
          success: true,
          message: 'Thank you for your message. We will get back to you soon!',
        },
        {
          status: 200,
          headers: rateLimitResult.headers,
        }
      );
    }

    // Server-side timing check - require at least 2 seconds
    if (_timingCheck && _timingCheck < 2000) {
      console.warn('Spam detected: form submitted too quickly', { time: _timingCheck });
      return NextResponse.json(
        { error: 'Please take your time to fill out the form' },
        {
          status: 400,
          headers: rateLimitResult.headers,
        }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        {
          status: 400,
          headers: rateLimitResult.headers,
        }
      );
    }

    // Get IP address and user agent for tracking
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Determine source
    const source = labelFinderData ? 'label_finder' : 'contact_form';

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
        labelFinderData: labelFinderData || null,
        source,
        ipAddress,
        userAgent,
        status: 'NEW',
      },
    });

    console.log('Contact saved to database:', contact.id);

    // Send email notification to sales team
    sendContactNotification(contact).catch(err => {
      // Don't block the response if email fails
      console.error('Email notification failed:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
        contactId: contact.id,
      },
      {
        status: 200,
        headers: rateLimitResult.headers,
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    // Check for database connection errors
    if (error instanceof Error && error.message.includes('Can\'t reach database')) {
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve contacts (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    // Basic authentication check (replace with proper auth)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status') || undefined;

    const contacts = await prisma.contact.findMany({
      where: status ? { status: status as any } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({
      success: true,
      data: contacts,
      total: contacts.length,
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
