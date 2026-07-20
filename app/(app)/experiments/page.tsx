import { getCollection } from "@/lib/collections";
import { requireUserId } from "@/lib/auth-guard";
import { ItemCard } from "@/components/item-card";
export const dynamic = "force-dynamic";
export default async function Page() { const userId=await requireUserId(); const items=await getCollection("experiments").then(c=>c.find({userId}).sort({updatedAt:-1}).toArray()); return <div className="space-y-5"><div><h2 className="text-2xl font-bold">Experiments</h2><p className="text-sm text-slate-400">Log RL, simulation and HIL experiments.</p></div><div className="space-y-3">{items.length===0?<div className="rounded-3xl border border-white/10 bg-atlas-panel p-6 text-sm text-slate-400">No entries yet. Use the API or Quick Capture.</div>:items.map(item=><ItemCard key={item._id.toString()} title={String(item.title??"Untitled")} subtitle={String(item.algorithm??"")} meta={String(item.parameters??"")} status={String(item.status??"")}/>)}</div></div>; }
