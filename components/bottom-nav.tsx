"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, LayoutDashboard } from "lucide-react";

const links = [
  ["/projects", "Projects", FolderKanban],
  ["/dashboard", "Overview", LayoutDashboard],
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary mobile navigation" className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xs items-center justify-around rounded-[24px] border border-white/80 bg-white/90 p-2 shadow-2xl backdrop-blur lg:hidden">
      {links.map(([href, label, Icon]) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-w-28 flex-col items-center gap-1 rounded-2xl px-4 py-2 text-xs ${active ? "bg-[#123b3a] text-white" : "text-slate-500"}`}>
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
