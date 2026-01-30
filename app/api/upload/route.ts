import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'document';
    const filename = formData.get('filename') as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const validTypes = ['image', 'document', 'invoice', 'receipt', 'logo', 'product'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await uploadFile(
      file,
      filename || file.name,
      type as 'image' | 'document' | 'invoice' | 'receipt' | 'logo' | 'product'
    );

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
