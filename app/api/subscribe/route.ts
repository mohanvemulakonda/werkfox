import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 400 }
        );
      } else {
        // Reactivate subscription
        await prisma.subscriber.update({
          where: { email: email.toLowerCase() },
          data: {
            isActive: true,
            unsubscribedAt: null
          }
        });

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.'
        });
      }
    }

    // Create new subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        source: 'website_footer',
        isActive: true,
      }
    });

    console.log('New subscriber:', subscriber.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You\'ll receive our latest updates.'
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
