import { auth as clerkAuth, currentUser } from '@clerk/nextjs/server';

/**
 * Auth wrapper that provides session-like object for compatibility
 * with existing code that used NextAuth's getServerSession
 */
export async function auth() {
  const { userId } = await clerkAuth();

  if (!userId) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  return {
    user: {
      id: user.id,
      name: user.fullName || user.firstName || 'User',
      email: user.emailAddresses[0]?.emailAddress || '',
      image: user.imageUrl,
    },
  };
}
