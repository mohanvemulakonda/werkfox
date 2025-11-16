import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, company, resourceType, resourceName, resourcePath } = body;

    // Validate required fields
    if (!resourceType || !resourceName || !resourcePath) {
      return NextResponse.json(
        { error: 'Missing resource information' },
        { status: 400 }
      );
    }

    // Get IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Track download
    const download = await prisma.download.create({
      data: {
        email: email ? email.toLowerCase() : null,
        name: name || null,
        company: company || null,
        resourceType,
        resourceName,
        resourcePath,
        ipAddress,
        userAgent,
      }
    });

    console.log('Download tracked:', download.id);

    return NextResponse.json({
      success: true,
      message: 'Download tracked successfully',
      downloadId: download.id,
    });

  } catch (error) {
    console.error('Download tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    );
  }
}
