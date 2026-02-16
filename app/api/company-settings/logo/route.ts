import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { uploadFile, deleteFile } from '@/lib/blob';

// POST /api/company-settings/logo — upload company logo
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('logo') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const result = await uploadFile(file, file.name, 'logo');

    if (!result.success || !result.url) {
      return NextResponse.json(
        { error: result.error || 'Upload failed' },
        { status: 500 }
      );
    }

    // Get or create settings
    let settings = await prisma.company_settings.findFirst();
    if (!settings) {
      settings = await prisma.company_settings.create({
        data: { companyName: 'My Company', updatedAt: new Date() },
      });
    }

    // Delete old logo if exists
    if (settings.logoUrl) {
      await deleteFile(settings.logoUrl).catch(() => {});
    }

    // Save new logo URL
    const updated = await prisma.company_settings.update({
      where: { id: settings.id },
      data: { logoUrl: result.url, updatedAt: new Date() },
    });

    return NextResponse.json({ logoUrl: updated.logoUrl });
  } catch (error) {
    console.error('Error uploading logo:', error);
    return NextResponse.json(
      { error: 'Failed to upload logo' },
      { status: 500 }
    );
  }
}

// DELETE /api/company-settings/logo — remove company logo
export async function DELETE() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await prisma.company_settings.findFirst();
    if (!settings?.logoUrl) {
      return NextResponse.json({ success: true });
    }

    // Delete blob
    await deleteFile(settings.logoUrl).catch(() => {});

    // Clear URL in DB
    await prisma.company_settings.update({
      where: { id: settings.id },
      data: { logoUrl: null, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting logo:', error);
    return NextResponse.json(
      { error: 'Failed to delete logo' },
      { status: 500 }
    );
  }
}
