import { put, del, list, head } from '@vercel/blob';

// File type configurations
const FILE_CONFIGS = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    folder: 'images',
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    folder: 'documents',
  },
  invoice: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['application/pdf'],
    folder: 'invoices',
  },
  receipt: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    folder: 'receipts',
  },
  logo: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
    folder: 'logos',
  },
  product: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    folder: 'products',
  },
};

type FileType = keyof typeof FILE_CONFIGS;

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  pathname?: string;
  contentType?: string;
  size?: number;
}

/**
 * Upload a file to Vercel Blob
 */
export async function uploadFile(
  file: File | Blob,
  filename: string,
  type: FileType = 'document'
): Promise<UploadResult> {
  const config = FILE_CONFIGS[type];

  // Validate file size
  if (file.size > config.maxSize) {
    return {
      success: false,
      error: `File size exceeds ${config.maxSize / 1024 / 1024}MB limit`,
    };
  }

  // Validate file type
  if (file instanceof File && !config.allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: `File type ${file.type} not allowed. Allowed types: ${config.allowedTypes.join(', ')}`,
    };
  }

  try {
    const pathname = `${config.folder}/${Date.now()}-${filename}`;

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: file.size,
    };
  } catch (error) {
    console.error('Blob upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload from URL (for importing images)
 */
export async function uploadFromUrl(
  url: string,
  filename: string,
  type: FileType = 'image'
): Promise<UploadResult> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { success: false, error: 'Failed to fetch file from URL' };
    }

    const blob = await response.blob();
    return uploadFile(blob, filename, type);
  } catch (error) {
    console.error('Upload from URL error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload from URL',
    };
  }
}

/**
 * Delete a file from Vercel Blob
 */
export async function deleteFile(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    await del(url);
    return { success: true };
  } catch (error) {
    console.error('Blob delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

/**
 * List files in a folder
 */
export async function listFiles(
  prefix?: string,
  limit: number = 100
): Promise<{ success: boolean; files?: Array<{ url: string; pathname: string; size: number; uploadedAt: Date }>; error?: string }> {
  try {
    const result = await list({ prefix, limit });

    return {
      success: true,
      files: result.blobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      })),
    };
  } catch (error) {
    console.error('Blob list error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'List failed',
    };
  }
}

/**
 * Get file metadata
 */
export async function getFileInfo(url: string): Promise<UploadResult> {
  try {
    const blob = await head(url);

    return {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: blob.size,
    };
  } catch (error) {
    console.error('Blob head error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get file info',
    };
  }
}

// Specific upload helpers
export const upload = {
  /**
   * Upload product image
   */
  productImage: (file: File, productSku: string) =>
    uploadFile(file, `${productSku}-${file.name}`, 'product'),

  /**
   * Upload company logo
   */
  logo: (file: File, companyName: string) =>
    uploadFile(file, `${companyName.toLowerCase().replace(/\s+/g, '-')}-logo${getExtension(file.name)}`, 'logo'),

  /**
   * Upload invoice PDF
   */
  invoice: (file: File, invoiceNumber: string) =>
    uploadFile(file, `${invoiceNumber}.pdf`, 'invoice'),

  /**
   * Upload expense receipt
   */
  receipt: (file: File, expenseId: number) =>
    uploadFile(file, `expense-${expenseId}-${file.name}`, 'receipt'),

  /**
   * Upload general document
   */
  document: (file: File, prefix: string = 'doc') =>
    uploadFile(file, `${prefix}-${file.name}`, 'document'),
};

// Helper to get file extension
function getExtension(filename: string): string {
  const ext = filename.split('.').pop();
  return ext ? `.${ext}` : '';
}
