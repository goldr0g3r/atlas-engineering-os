import type { LucideIcon } from "lucide-react";
export function StatCard({title,value,icon:Icon,tone="blue"}:{title:string;value:number;icon:LucideIcon;tone?:"blue"|"green"|"amber"|"red"}) {
  const colors={blue:"text-atlas-accent bg-atlas-accent/15",green:"text-atlas-green bg-atlas-green/15",amber:"text-atlas-amber bg-atlas-amber/15",red:"text-atlas-red bg-atlas-red/15"};
  return <div className="rounded-3xl border border-white/10 bg-atlas-panel p-5 shadow-xl"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-400">{title}</p><p className="mt-2 text-3xl font-bold">{value}</p></div><div className={`rounded-2xl p-3 ${colors[tone]}`}><Icon className="h-6 w-6" /></div></div></div>;
}
