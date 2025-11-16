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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.adminUser.findUnique({
          where: {
            email: credentials.email as string
          }
        });

        if (!user || !user.isActive) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        // Update last login
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        });

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
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
    signIn: '/login/admin'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
});
