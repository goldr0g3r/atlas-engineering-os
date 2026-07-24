"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  FolderKanban,
  Layers3,
  PanelLeftClose,
  Settings,
} from "lucide-react";

const navigation = [
  { href: "/projects", label: "Projects", description: "Project workspaces", icon: FolderKanban },
] as const;

const bottomLinks = [
  { href: "/settings", label: "Settings", description: "Preferences & account", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="atlas-sidebar hidden min-h-dvh border-r border-[#203546] bg-[#0d2030] text-slate-100 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-[248px] lg:flex-col">
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-white/10 px-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#245650] bg-[#123d3b] text-[#69e5d2] shadow-sm">
          <Layers3 className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <strong className="block truncate text-sm font-bold tracking-[0.08em] text-white">
            ATLAS
          </strong>
          <span className="block truncate text-[11px] font-medium text-slate-400">
            Engineering OS
          </span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Workspace
        </p>
        <nav aria-label="Primary navigation" className="space-y-1.5">
          {navigation.map(({ href, label, description, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex min-h-[52px] items-center gap-3 rounded-[14px] border px-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69e5d2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2030] ${
                  active
                    ? "border-[#2a615b] bg-[#153b3a] text-white shadow-[0_8px_20px_rgba(0,0,0,.16)]"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border transition ${
                    active
                      ? "border-[#31756d] bg-[#1a4c49] text-[#78ead8]"
                      : "border-white/10 bg-white/[0.04] text-slate-400 group-hover:text-[#78ead8]"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold leading-5">
                    {label}
                  </span>
                  <span
                    className={`block truncate text-[11px] leading-4 ${
                      active ? "text-[#a7d8d1]" : "text-slate-500 group-hover:text-slate-400"
                    }`}
                  >
                    {description}
                  </span>
                </span>
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transition ${
                    active ? "text-[#70dfce]" : "text-slate-600 group-hover:translate-x-0.5 group-hover:text-slate-400"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 border-t border-white/10 p-4">
        <nav className="space-y-1.5">
          {bottomLinks.map(({ href, label, description, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex min-h-[44px] items-center gap-3 rounded-[14px] border px-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#69e5d2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2030] ${
                  active
                    ? "border-[#2a615b] bg-[#153b3a] text-white"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition ${
                  active ? "border-[#31756d] bg-[#1a4c49] text-[#78ead8]" : "border-white/10 bg-white/[0.04] text-slate-400"
                }`}>
                  <Icon className="h-[16px] w-[16px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold leading-5">{label}</span>
                  <span className={`block truncate text-[11px] leading-4 ${
                    active ? "text-[#a7d8d1]" : "text-slate-500"
                  }`}>{description}</span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
