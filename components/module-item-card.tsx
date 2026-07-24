"use client";
import{useState}from"react";import{ProjectModuleForm}from"@/components/project-module-form";import{EditDeleteActions}from"@/components/edit-delete-actions";
type Kind="milestones"|"risks"|"costs"|"budgets"|"work-items";
const labelMap:Record<Kind,string>={milestones:"Milestone",risks:"Risk",costs:"Cost",budgets:"Budget","work-items":"Work item"};
export function ModuleItemCard({item,projectId,kind}:{item:any;projectId:string;kind:Kind}){const[editing,setEditing]=useState(false);
return editing?<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101b2d]"><ProjectModuleForm projectId={projectId} kind={kind} label={labelMap[kind]} item={item}/></div>
:<article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#101b2d]"><div className="flex items-start justify-between gap-3"><h3 className="font-semibold">{item.title}</h3><div className="flex items-center gap-2 shrink-0">{item.status&&<span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-white/10">{item.status}</span>}<EditDeleteActions
onEdit={()=>setEditing(true)}
onDelete={async()=>{await fetch(`/api/projects/${projectId}/${kind}/${item._id}`,{method:"DELETE"});}}
label={labelMap[kind]}
/></div></div><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description||"No description"}</p>
{kind==="risks"&&<p className="mt-4 font-semibold">Score {item.score} ({item.probability} × {item.impact})</p>}
{kind==="milestones"&&<p className="mt-4 text-sm">Target: {item.targetDate}</p>}
{(kind==="costs"||kind==="budgets")&&<p className="mt-4 text-lg font-semibold">{item.currency} {Number(item.amount||0).toFixed(2)}</p>}
</article>}
