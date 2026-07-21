"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Beaker, Boxes, ClipboardList, LayoutDashboard, Library } from "lucide-react";

const links = [["/dashboard","Home",LayoutDashboard],["/projects","Projects",ClipboardList],["/bom","BOM",Boxes],["/research","Research",Library],["/experiments","Exp",Beaker]] as const;
export function BottomNav() {
  const path=usePathname();
  return <nav aria-label="Primary navigation" className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-atlas-panel/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"><div className="grid grid-cols-5 gap-1">{links.map(([href,label,Icon]) => <Link key={href} href={href} aria-current={path===href?"page":undefined} className={`flex min-h-14 flex-col items-center justify-center rounded-xl text-[11px] ${path===href?"bg-white/10 text-atlas-accent":"text-slate-400"}`}><Icon className="mb-1 h-5 w-5" />{label}</Link>)}</div></nav>;
}
