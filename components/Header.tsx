"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Search, Menu, X, Sun, Moon, Rocket } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
            <Rocket size={18} />
          </div>
          <span className="text-xl font-bold">
            Tools<span className="text-brand-500">Finder</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/tools"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Categories
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)] transition-colors sm:flex"
          >
            <Search size={14} />
            <span>Search...</span>
            <kbd className="ml-2 rounded bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs text-[var(--text-tertiary)]">
              /
            </kbd>
          </Link>

          <button
            onClick={toggle}
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <SignedIn>
            <Link
              href="/submit"
              className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors sm:block"
            >
              Submit a Tool
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
            >
              Get Started
            </Link>
          </SignedOut>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[var(--text-secondary)] md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/tools"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              onClick={() => setMobileOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/categories"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
              onClick={() => setMobileOpen(false)}
            >
              Categories
            </Link>
            <SignedIn>
              <Link
                href="/submit"
                className="rounded-lg px-3 py-2 text-sm font-medium text-brand-500"
                onClick={() => setMobileOpen(false)}
              >
                Submit a Tool
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
}
