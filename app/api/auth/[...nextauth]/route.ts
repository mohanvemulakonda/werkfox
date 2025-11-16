import { handlers } from '@/lib/auth';

// Force Node.js runtime (not Edge) for Prisma and bcrypt
export const runtime = 'nodejs';

export const { GET, POST } = handlers;
