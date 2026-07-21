"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { SearchResult } from "@/lib/search";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    const normalizedQuery = query.trim();
    if (normalizedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(normalizedQuery)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(`Search request failed with status ${response.status}`);
        }

        const body: { results?: SearchResult[] } = await response.json();
        setResults(body.results ?? []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Workspace search failed", error);
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [query]);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    setResults([]);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="atlas-field flex !w-full max-w-xl items-center gap-3 !rounded-full text-left text-atlas-muted"
        aria-haspopup="dialog"
      >
        <Search className="h-5 w-5" />
        <span className="flex-1">Search projects, BOMs, tasks, notes...</span>
        <kbd className="hidden rounded-lg border border-atlas-line bg-white px-2 py-1 text-xs sm:inline">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/30 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Workspace search"
            className="mx-auto mt-[8vh] max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-atlas-line p-4">
              <Search className="h-5 w-5 text-atlas-muted" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setOpen(false);
                  if (event.key === "Enter" && results[0]) go(results[0].href);
                }}
                className="min-h-12 flex-1 border-0 bg-transparent outline-none"
                placeholder="Search across the workspace"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-atlas-panel2"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {loading && <p className="p-5 text-center text-sm text-atlas-muted">Searching...</p>}
              {!loading && query.trim().length >= 2 && results.length === 0 && (
                <p className="p-8 text-center text-sm text-atlas-muted">No matching project records.</p>
              )}
              {query.trim().length < 2 && (
                <p className="p-8 text-center text-sm text-atlas-muted">
                  Enter at least two characters. Search includes projects, tasks, BOMs,
                  components, research, notes, links, risks, and milestones.
                </p>
              )}
              {results.map((item) => (
                <button
                  type="button"
                  key={`${item.kind}-${item.id}`}
                  onClick={() => go(item.href)}
                  className="flex w-full items-start gap-4 rounded-2xl p-4 text-left hover:bg-atlas-panel2"
                >
                  <span className="atlas-chip rounded-full px-3 py-1 text-xs">{item.kind}</span>
                  <span className="min-w-0">
                    <strong className="block truncate">{item.title}</strong>
                    <span className="mt-1 block truncate text-sm text-atlas-muted">
                      {item.description || "Open record"}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
