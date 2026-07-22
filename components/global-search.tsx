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
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => document.removeEventListener("keydown", keyboard);
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const value = query.trim();
    if (value.length < 2) { setResults([]); setLoading(false); return; }
    const controller = new AbortController();
    timer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Search failed");
        const data: { results?: SearchResult[] } = await response.json();
        setResults(data.results ?? []);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) setResults([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => { controller.abort(); if (timer.current) clearTimeout(timer.current); };
  }, [query]);

  const go = (href: string) => { setOpen(false); setQuery(""); setResults([]); router.push(href); };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="flex h-11 w-full max-w-[920px] items-center gap-3 rounded-full border border-atlas-line bg-[#f7fafb] px-4 text-left text-sm text-atlas-muted transition hover:border-[#9fcfc8] hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100">
        <Search className="h-4.5 w-4.5 shrink-0" /><span className="min-w-0 flex-1 truncate">Search projects, BOMs, tasks, notes...</span><kbd className="hidden rounded-lg border border-atlas-line bg-white px-2 py-1 text-[11px] sm:block">Ctrl K</kbd>
      </button>
      {open && <div className="fixed inset-0 z-[140] bg-slate-950/35 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-label="Workspace search" className="mx-auto mt-[8vh] w-full max-w-3xl overflow-hidden rounded-[24px] border border-atlas-line bg-white shadow-2xl">
          <div className="flex items-center gap-3 border-b border-atlas-line px-5 py-3"><Search className="h-5 w-5 text-atlas-muted" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); if (event.key === "Enter" && results[0]) go(results[0].href); }} className="h-12 min-w-0 flex-1 border-0 bg-transparent outline-none" placeholder="Search the Atlas workspace" /><button type="button" onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-atlas-line bg-atlas-panel2" aria-label="Close"><X className="h-4 w-4" /></button></div>
          <div className="max-h-[62vh] overflow-y-auto p-3">{loading && <p className="p-6 text-center text-sm text-atlas-muted">Searching...</p>}{!loading && query.trim().length < 2 && <p className="p-8 text-center text-sm text-atlas-muted">Enter at least two characters.</p>}{!loading && query.trim().length >= 2 && !results.length && <p className="p-8 text-center text-sm text-atlas-muted">No matching records.</p>}{results.map((item) => <button type="button" key={`${item.kind}-${item.id}`} onClick={() => go(item.href)} className="flex w-full items-start gap-3 rounded-xl p-3 text-left hover:bg-atlas-panel2"><span className="atlas-chip rounded-full px-2.5 py-1 text-xs">{item.kind}</span><span className="min-w-0"><strong className="block truncate text-sm">{item.title}</strong><span className="block truncate text-xs text-atlas-muted">{item.description || "Open record"}</span></span></button>)}</div>
        </section>
      </div>}
    </>
  );
}
