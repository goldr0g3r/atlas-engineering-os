"use client";
import{useState,useMemo}from"react";import{useRouter}from"next/navigation";import{EditDeleteActions}from"@/components/edit-delete-actions";import{ProjectModuleForm}from"@/components/project-module-form";
type SortKey="title"|"type"|"priority"|"status"|"createdAt";
export function WorkItemsTable({items,projectId}:{items:any[];projectId:string}){const router=useRouter();const[sortKey,setSortKey]=useState<SortKey>("createdAt");const[sortDir,setSortDir]=useState<"asc"|"desc">("desc");const[editingId,setEditingId]=useState<string|null>(null);
function toggle(key:SortKey){if(key===sortKey)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortKey(key);setSortDir(key==="createdAt"?"desc":"asc")}}
const sorted=useMemo(()=>[...items].sort((a,b)=>{const aVal=a[sortKey],bVal=b[sortKey];const cmp=String(aVal??"").localeCompare(String(bVal??""));return sortDir==="asc"?cmp:-cmp}),[items,sortKey,sortDir]);
const header=(key:SortKey,label:string)=><th className="p-3 cursor-pointer select-none hover:text-slate-900 dark:hover:text-white" onClick={()=>toggle(key)}>{label}{sortKey===key?(sortDir==="asc"?" ▲":" ▼"):""}</th>;
if(editingId)return<ProjectModuleForm projectId={projectId} kind="work-items" label="Work item" item={items.find(i=>i._id===editingId)}/>;
return<div className="overflow-x-auto rounded-2xl bg-atlas-panel"><table className="w-full min-w-[600px] text-left"><thead><tr className="border-b border-white/10 text-sm text-slate-500">{header("title","Title")}{header("type","Type")}{header("priority","Priority")}{header("status","Status")}{header("createdAt","Created")}<th className="p-3 w-20">Actions</th></tr></thead><tbody>{sorted.map(i=><tr key={i._id} className="border-b border-white/5"><td className="p-3 font-medium">{i.title}</td><td className="p-3"><span className="rounded bg-slate-100 px-2 py-0.5 text-xs dark:bg-white/10">{i.type}</span></td><td className="p-3"><span className={`rounded px-2 py-0.5 text-xs text-white ${i.priority==="critical"?"bg-red-500":i.priority==="high"?"bg-amber-500":i.priority==="medium"?"bg-blue-500":"bg-slate-400"}`}>{i.priority}</span></td><td className="p-3 text-sm">{i.status}</td><td className="p-3 text-sm text-slate-500">{i.createdAt?.slice(0,10)}</td><td className="p-3"><EditDeleteActions
onEdit={()=>setEditingId(i._id)}
onDelete={async()=>{await fetch(`/api/projects/${projectId}/work-items/${i._id}`,{method:"DELETE"});router.refresh()}}
label={i.title}
/></td></tr>)}</tbody></table></div>}
