import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AuthPanel } from "@/components/auth-panel";
import { Boxes, FolderKanban, Link2 } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/projects");
  return <main className="min-h-screen px-5 py-8 md:grid md:place-items-center"><section className="atlas-shell mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] lg:grid-cols-[1.05fr_.95fr]"><div className="p-8 md:p-12 lg:p-16"><div className="mb-14 inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold shadow-sm"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#123b3a] text-white"><FolderKanban className="h-4 w-4"/></span>Atlas Engineering OS</div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#228f83]">One project. One source of truth.</p><h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-[-.05em] md:text-6xl">Keep every engineering decision connected.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Manage projects, BOM sourcing, costs, risks, milestones, research, documents, and experiments in a connected workspace.</p><div className="mt-10 grid gap-3 sm:grid-cols-2">{[[Boxes,"Costed BOMs"],[Link2,"Connected records"]].map(([Icon,label]:any)=><div key={label} className="atlas-card rounded-2xl p-4"><Icon className="h-5 w-5 text-[#228f83]"/><p className="mt-3 font-semibold">{label}</p></div>)}</div></div><div className="grid content-center bg-white/45 p-6 md:p-10"><AuthPanel/></div></section></main>;
}
