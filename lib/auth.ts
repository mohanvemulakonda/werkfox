import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import * as bcrypt from 'bcryptjs';
import prisma from './prisma';

// Force Node.js runtime for auth (not Edge)
export const runtime = 'nodejs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          console.log('[AUTH] Starting authorization...');

          if (!credentials?.email || !credentials?.password) {
            console.error('[AUTH] Missing credentials');
            return null;
          }

          console.log('[AUTH] Looking up user:', credentials.email);

          const user = await prisma.adminUser.findUnique({
            where: {
              email: credentials.email as string
            }
          });

          if (!user) {
            console.error('[AUTH] User not found:', credentials.email);
            return null;
          }

          if (!user.isActive) {
            console.error('[AUTH] User is inactive:', credentials.email);
            return null;
          }

          console.log('[AUTH] User found, checking password...');

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!passwordMatch) {
            console.error('[AUTH] Password mismatch for:', credentials.email);
            return null;
          }

          console.log('[AUTH] Password verified, updating last login...');

          // Update last login
          await prisma.adminUser.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
          });

          console.log('[AUTH] Login successful for:', credentials.email);

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error) {
          console.error('[AUTH] Authorization error:', error);
          console.error('[AUTH] Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
          });
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login/admin',
    error: '/login/admin' // Redirect errors back to login page
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  trustHost: true, // Important for production with custom domains
  debug: process.env.NODE_ENV === 'development'
});
