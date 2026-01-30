'use client';

import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      {/* Logo and Branding */}
      <Link href="/" className="flex flex-col items-center mb-8">
        <Image
          src="/logo.png"
          alt="WerkFox"
          width={80}
          height={80}
          className="w-20 h-20 mb-4"
        />
        <span className="text-3xl font-bold text-gray-900 font-open-sans">WerkFox</span>
        <p className="text-gray-500 mt-1">ERP & CRM for Manufacturing</p>
      </Link>

      {/* Sign In Form */}
      <SignIn
        forceRedirectUrl="/admin"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-2xl border-0 rounded-2xl',
          }
        }}
      />

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-400">
        Welcome back to WerkFox
      </p>
    </div>
  );
}
