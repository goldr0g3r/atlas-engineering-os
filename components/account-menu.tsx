"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";

export function AccountMenu({ name, email }: { name: string; email?: string | null }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", key);
    };
  }, []);

  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "A";

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-11 max-w-[220px] items-center gap-2 rounded-full border border-atlas-line bg-white px-2 pr-3 text-left shadow-sm transition hover:bg-atlas-panel2"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#123b3a] text-xs font-bold text-white">{initials}</span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-semibold leading-4">{name}</span>
          <span className="block text-[11px] leading-4 text-atlas-muted">Account</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-atlas-muted transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-13 z-[120] w-[min(90vw,300px)] overflow-hidden rounded-[20px] border border-atlas-line bg-white p-2 shadow-2xl">
          <div className="border-b border-atlas-line px-3 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#123b3a] text-sm font-bold text-white">{initials}</span>
              <span className="min-w-0">
                <strong className="block truncate text-sm">{name}</strong>
                <span className="block truncate text-xs text-atlas-muted">{email || "No email available"}</span>
              </span>
            </div>
          </div>
          <div className="py-2">
            <Link role="menuitem" href="/settings" onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium hover:bg-atlas-panel2">
              <Settings className="h-4 w-4 text-atlas-muted" /> Account settings
            </Link>
            <button role="menuitem" type="button" onClick={() => signOut({ callbackUrl: "/" })} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-rose-700 hover:bg-rose-50">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
