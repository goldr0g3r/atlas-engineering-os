import{requireUserId}from"@/lib/auth-guard";import{getCollection}from"@/lib/collections";import{KpiCard}from"@/components/kpi-card";import{FolderKanban,AlertTriangle,CalendarCheck,Activity}from"lucide-react";
export const dynamic="force-dynamic";

export default async function Dashboard(){
const userId=await requireUserId();
const[projects,tasks,risks,milestones,activity]=await Promise.all([
getCollection("projects").then(c=>c.find({userId}).toArray()),
getCollection("tasks").then(c=>c.find({userId}).toArray()),
getCollection("risks").then(c=>c.find({userId}).toArray()),
getCollection("milestones").then(c=>c.find({userId}).toArray()),
getCollection("activityEvents").then(c=>c.find({userId}).sort({createdAt:-1}).limit(10).toArray()),
]);
const active=projects.filter((p:any)=>p.status==="active").length;
const highRisks=risks.filter((r:any)=>!["done","closed","mitigated","accepted"].includes(String(r.status??"").toLowerCase())&&Number(r.score)>=10).length;
const today=new Date().toISOString().slice(0,10);
const upcomingMilestones=milestones.filter((m:any)=>!["done","completed","closed"].includes(String(m.status??"").toLowerCase())&&m.targetDate>=today).length;
return<main className="space-y-6"><div><h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1><p className="mt-1 text-slate-500">Overview across all projects.</p></div><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
<KpiCard label="Total projects" value={projects.length} detail={active+" active, "+(projects.length-active)+" inactive"} icon={FolderKanban} tone="teal"/>
<KpiCard label="Open tasks" value={tasks.filter((t:any)=>t.status!=="done"&&t.status!=="completed").length} detail="Across all projects" icon={Activity} tone="blue"/>
<KpiCard label="High risks" value={highRisks} detail={"Score >= 10 across "+risks.length+" total risks"} icon={AlertTriangle} tone="rose"/>
<KpiCard label="Upcoming milestones" value={upcomingMilestones} detail="Target dates not yet reached" icon={CalendarCheck} tone="orange"/>
</section><section className="grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#101b2d]"><h2 className="font-semibold">Projects by status</h2><div className="mt-4 space-y-3">{["planning","active","on-hold","completed","archived"].map(s=>{const count=projects.filter((p:any)=>p.status===s).length;return<div key={s} className="flex items-center justify-between"><span className="text-sm capitalize text-slate-600 dark:text-slate-300">{s}</span><div className="flex items-center gap-3"><div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-teal-500" style={{width:projects.length?Math.round(count/projects.length*100)+"%":"0%"}}/></div><span className="text-sm font-semibold">{count}</span></div></div>})}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#101b2d]"><h2 className="font-semibold">Recent activity</h2><div className="mt-4 space-y-2">{activity.length===0?<p className="text-sm text-slate-500">No recorded activity yet.</p>:activity.map((a:any)=><div key={a._id.toString()} className="flex items-start gap-3 rounded-lg px-2 py-2 text-sm"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-teal-400"/><div><p className="text-slate-700 dark:text-slate-200">{a.message??a.action}</p><p className="text-xs text-slate-500">{a.createdAt}</p></div></div>)}</div></div></section></main>}