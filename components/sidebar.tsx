import Link from "next/link";
import { FolderKanban, Layers3 } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden min-h-dvh border-r border-[#183041] bg-[#0b1b2b] text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
      <div className="flex h-[72px] items-center gap-3 border-b border-white/10 px-5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#103f3d] text-[#66e0ce]"><Layers3 className="h-5 w-5" /></span>
        <span><strong className="block text-sm tracking-wide">ATLAS</strong><span className="text-[11px] text-slate-400">Engineering OS</span></span>
      </div>
      <nav aria-label="Primary navigation" className="flex-1 space-y-1 p-4">
        <Link href="/projects" className="flex min-h-11 items-center gap-3 rounded-xl bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/15">
          <FolderKanban className="h-5 w-5 text-[#66e0ce]" /> Projects
        </Link>
      </nav>
      <p className="px-5 pb-6 text-xs leading-5 text-slate-500">Projects contain tasks, milestones, BOMs, costs, risks, and engineering knowledge.</p>
    </aside>
  );
}
