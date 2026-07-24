"use client";
import{useState,useRef,useEffect}from"react";import{useRouter}from"next/navigation";import{Pencil,Trash2,X}from"lucide-react";
type Kind="tasks"|"research"|"notes"|"links"|"experiments";
const input="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 dark:border-white/10 dark:bg-white/5";
export function ResourceItemCard({item,projectId,kind}:{item:any;projectId:string;kind:Kind}){const router=useRouter();const[editing,setEditing]=useState(false);const[confirmDelete,setConfirmDelete]=useState(false);const[deleting,setDeleting]=useState(false);const[error,setError]=useState("");const dialogRef=useRef<HTMLDialogElement>(null);
useEffect(()=>{const d=dialogRef.current;if(!d)return;const close=()=>setError("");d.addEventListener("close",close);return()=>d.removeEventListener("close",close)},[]);
async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setDeleting(true);setError("");const form=e.currentTarget;try{const r=await fetch(`/api/projects/${projectId}/${kind}/${item._id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))});const b=await r.json().catch(()=>({}));if(!r.ok)throw new Error(typeof b.error==="string"?b.error:"Update failed");setEditing(false);router.refresh()}catch(e){setError(e instanceof Error?e.message:"Update failed")}finally{setDeleting(false)}}
async function doDelete(){setDeleting(true);await fetch(`/api/projects/${projectId}/${kind}/${item._id}`,{method:"DELETE"});setDeleting(false);setConfirmDelete(false);router.refresh();}
return<article className="rounded-2xl bg-atlas-panel p-5"><div className="flex items-start justify-between gap-3"><h2 className="text-xl font-semibold">{item.title}</h2>
<div className="flex items-center gap-1 shrink-0">
{editing?<button onClick={()=>setEditing(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Cancel"><X className="h-3.5 w-3.5"/></button>
:<><button onClick={()=>setEditing(true)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Edit"><Pencil className="h-3.5 w-3.5"/></button>
{confirmDelete?<span className="flex items-center gap-1.5"><button onClick={()=>setConfirmDelete(false)} className="min-h-8 rounded-lg border border-slate-200 px-2.5 text-xs dark:border-white/10">Cancel</button><button onClick={doDelete} disabled={deleting} className="min-h-8 rounded-lg bg-red-600 px-2.5 text-xs font-semibold text-white disabled:opacity-60">{deleting?"...":"Delete"}</button></span>
:<button onClick={()=>setConfirmDelete(true)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10" aria-label="Delete"><Trash2 className="h-3.5 w-3.5"/></button>}
</>}
</div></div>
{item.url&&!editing&&<a className="text-atlas-accent" href={item.url} target="_blank" rel="noreferrer">Open link</a>}
{editing?<form onSubmit={submit} className="mt-4 grid gap-3"><input name="title" required maxLength={200} defaultValue={item.title} className={input} placeholder="Title"/>
{(kind==="links"||kind==="research")&&<input name="url" type="url" defaultValue={item.url??""} placeholder="URL" className={input}/>}
<textarea name="description" placeholder="Details / notes" defaultValue={item.description??""} className="rounded-xl bg-slate-50 px-3 py-3 text-sm dark:bg-white/5"/>
{error&&<p className="text-red-600 text-sm">{error}</p>}
<button disabled={deleting} className="min-h-11 rounded-xl bg-teal-600 px-4 font-semibold text-white disabled:opacity-60">{deleting?"Saving...":"Save"}</button></form>
:<p className="mt-2 whitespace-pre-wrap text-slate-400">{!editing&&item.description}</p>}
</article>}
