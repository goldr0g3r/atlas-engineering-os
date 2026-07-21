import Link from "next/link";
import { FolderKanban, Layers3, LayoutDashboard } from "lucide-react";

const links = [
  ["/projects", "Projects", FolderKanban],
  ["/dashboard", "Overview", LayoutDashboard],
] as const;

export function Sidebar() {
  return (
    <aside className="hidden border-r border-slate-200/70 bg-white/55 px-4 py-6 lg:flex lg:flex-col lg:items-center">
      <Link href="/projects" className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-[#123b3a] text-white" aria-label="Atlas projects">
        <Layers3 />
      </Link>
      <nav aria-label="Primary navigation" className="flex flex-1 flex-col gap-3">
        {links.map(([href, label, Icon]) => (
          <Link key={href} href={href} title={label} aria-label={label} className="grid h-12 w-12 place-items-center rounded-2xl text-slate-500 transition hover:bg-[#123b3a] hover:text-white">
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
