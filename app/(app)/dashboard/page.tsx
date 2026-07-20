import { getCollection } from "@/lib/collections";
import { requireUserId } from "@/lib/auth-guard";
import { StatCard } from "@/components/stat-card";
import { ItemCard } from "@/components/item-card";
import { Beaker, Boxes, ClipboardList, Library } from "lucide-react";

export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  const userId=await requireUserId();
  const [projects,bom,research,experiments,captures]=await Promise.all([
    getCollection("projects").then(c=>c.countDocuments({userId})),getCollection("bom").then(c=>c.countDocuments({userId})),getCollection("research").then(c=>c.countDocuments({userId})),getCollection("experiments").then(c=>c.countDocuments({userId})),getCollection("quickCaptures").then(c=>c.find({userId}).sort({createdAt:-1}).limit(5).toArray())]);
  return <div className="space-y-6"><section><h2 className="text-2xl font-bold">Dashboard</h2><p className="mt-1 text-sm text-slate-400">Your engineering workspace in one place.</p></section><section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard title="Projects" value={projects} icon={ClipboardList}/><StatCard title="BOM Items" value={bom} icon={Boxes} tone="green"/><StatCard title="Research" value={research} icon={Library} tone="amber"/><StatCard title="Experiments" value={experiments} icon={Beaker} tone="red"/></section><section><h3 className="mb-3 text-lg font-semibold">Recent Captures</h3><div className="space-y-3">{captures.length===0?<p className="rounded-3xl border border-white/10 bg-atlas-panel p-5 text-sm text-slate-400">No captures yet. Use the + button.</p>:captures.map(item=><ItemCard key={item._id.toString()} title={String(item.title)} subtitle={String(item.description??"")} meta={new Date(String(item.createdAt)).toLocaleString()} status={String(item.type)}/>)}</div></section></div>;
}
