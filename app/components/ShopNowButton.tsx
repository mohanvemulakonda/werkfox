'use client';

import Link from 'next/link';
import { getLabelHubProductUrl, getLabelHubHomeUrl } from '@/lib/labelhub';

interface ShopNowButtonProps {
  productSlug?: string;
  source?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export default function ShopNowButton({
  productSlug,
  source = 'livato',
  variant = 'primary',
  size = 'md',
  children,
  className = ''
}: ShopNowButtonProps) {
  const href = productSlug
    ? getLabelHubProductUrl(productSlug, source)
    : getLabelHubHomeUrl(source);

  const sizeStyles = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-3 text-sm',
    lg: 'px-8 py-4 text-sm'
  };

  // Primary variant: Blue background with dark hover (matches Livato design)
  if (variant === 'primary') {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center gap-2 ${sizeStyles[size]} bg-[#2563EB] text-white overflow-hidden ${className}`}
      >
        <span className="relative z-10 tracking-wide">{children || 'Shop Now'}</span>
        <div className="absolute inset-0 bg-gray-900 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </Link>
    );
  }

  // Secondary variant: Dark background with blue hover (matches Livato design)
  if (variant === 'secondary') {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative inline-flex items-center gap-2 ${sizeStyles[size]} bg-gray-900 text-white overflow-hidden ${className}`}
      >
        <span className="relative z-10 tracking-wide">{children || 'Shop Now'}</span>
        <div className="absolute inset-0 bg-[#2563EB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </Link>
    );
  }

  // Outline variant: Border with fill on hover (matches Livato design)
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 ${sizeStyles[size]} border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all ${className}`}
    >
      <span className="tracking-wide">{children || 'Shop Now'}</span>
    </Link>
  );
}
