import Link from "next/link";
import { Boxes, FolderKanban, LayoutDashboard, Layers3, Settings } from "lucide-react";
const links=[
 ["/dashboard","Dashboard",LayoutDashboard],
 ["/projects","Projects",FolderKanban],
 ["/bom","All BOMs",Boxes],
 ["/settings","Settings",Settings]
] as const;
export function Sidebar(){return <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-3 py-5 dark:border-white/10 dark:bg-[#0b1625] lg:flex lg:flex-col"><Link href="/dashboard" className="mb-6 flex items-center gap-3 rounded-2xl px-3 py-2"><span className="grid size-11 place-items-center rounded-xl bg-teal-950 text-white"><Layers3 className="size-6"/></span><span><strong className="block text-slate-950 dark:text-white">Atlas</strong><span className="text-xs text-slate-500 dark:text-slate-400">Engineering OS</span></span></Link><nav aria-label="Primary navigation" className="grid gap-1">{links.map(([href,label,Icon])=><Link href={href} key={href} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"><Icon className="size-5"/><span>{label}</span></Link>)}</nav><p className="mt-auto px-3 pt-6 text-xs leading-5 text-slate-400">Projects contain tasks, milestones, BOMs, costs, risks and knowledge.</p></aside>}
