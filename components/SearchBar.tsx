"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  logo: string | null;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q.trim())}`
      );
      if (res.ok) {
        const data = await res.json();
        setResults(data.tools ?? data.results ?? data ?? []);
      }
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    setOpen(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchResults(value);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) {
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          navigateToTool(results[activeIndex].slug);
        }
        break;
      case "Escape":
        setOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const navigateToTool = (slug: string) => {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(`/tools/${slug}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      {/* Input */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search tools..."
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] py-2.5 pl-10 pr-16 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-colors"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden rounded-md border border-[var(--border)] bg-[var(--bg-tertiary)] px-1.5 py-0.5 text-xs text-[var(--text-tertiary)] sm:inline-block">
          {"\u2318"}K
        </kbd>
      </div>

      {/* Dropdown */}
      {open && (query.trim().length > 0 || results.length > 0) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-lg">
          {loading && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-[var(--text-tertiary)]">
              Searching...
            </div>
          )}

          {!loading && query.trim().length > 0 && results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-[var(--text-tertiary)]">
              No tools found for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto py-1">
              {results.map((tool, index) => (
                <li key={tool.id}>
                  <button
                    onClick={() => navigateToTool(tool.slug)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      activeIndex === index
                        ? "bg-[var(--bg-secondary)]"
                        : "hover:bg-[var(--bg-secondary)]"
                    )}
                  >
                    {tool.logo ? (
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="h-8 w-8 flex-shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm font-semibold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                        {tool.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                        {tool.name}
                      </p>
                      <p className="truncate text-xs text-[var(--text-secondary)]">
                        {tool.tagline}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
