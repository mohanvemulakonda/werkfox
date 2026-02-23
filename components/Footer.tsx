import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
                <Rocket size={18} />
              </div>
              <span className="text-lg font-bold">
                Tools<span className="text-brand-500">Finder</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Discover the best tools for your stack. Curated by the community.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Discover
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/submit"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Submit a Tool
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://stacknex.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  StackNex.io
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Legal
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--text-tertiary)]">
          &copy; {new Date().getFullYear()} ToolsFinder. A{" "}
          <a
            href="https://stacknex.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 hover:underline"
          >
            StackNex.io
          </a>{" "}
          product.
        </div>
      </div>
    </footer>
  );
}
