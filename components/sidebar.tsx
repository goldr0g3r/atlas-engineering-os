import Link from "next/link";
import { Beaker, Boxes, ClipboardList, LayoutDashboard, Layers3, Library } from "lucide-react";

const links = [
  ["/dashboard", "Dashboard", LayoutDashboard], ["/projects", "Projects", ClipboardList],
  ["/bom", "BOM", Boxes], ["/research", "Research", Library], ["/experiments", "Experiments", Beaker]
] as const;

export function Sidebar() {
  return <aside className="sticky top-0 hidden h-screen w-72 border-r border-white/10 bg-atlas-panel p-5 lg:block">
    <div className="mb-8 flex items-center gap-3"><div className="rounded-2xl bg-atlas-accent/20 p-3"><Layers3 className="h-6 w-6 text-atlas-accent" /></div><div><h2 className="font-bold">Atlas</h2><p className="text-xs text-slate-400">Personal Engineering OS</p></div></div>
    <nav className="space-y-2">{links.map(([href,label,Icon]) => <Link key={href} href={href} className="flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white"><Icon className="h-5 w-5" />{label}</Link>)}</nav>
  </aside>;
}
