"use client";
import{useState}from"react";import{useRouter}from"next/navigation";import{Pencil,Trash2}from"lucide-react";
export function EditDeleteActions({onEdit,onDelete,label}:{onEdit:()=>void;onDelete:()=>Promise<void>;label:string}){const router=useRouter();const[confirmDelete,setConfirmDelete]=useState(false);const[deleting,setDeleting]=useState(false);
async function doDelete(){setDeleting(true);try{await onDelete();router.refresh()}finally{setDeleting(false);setConfirmDelete(false)}}
return<span className="flex shrink-0 gap-1">
{!confirmDelete&&<button onClick={onEdit} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white" aria-label={`Edit ${label}`}><Pencil className="h-3.5 w-3.5"/></button>}
{confirmDelete?<span className="flex items-center gap-1.5"><button onClick={()=>setConfirmDelete(false)} className="min-h-8 rounded-lg border border-slate-200 px-2.5 text-xs dark:border-white/10">Cancel</button><button onClick={doDelete} disabled={deleting} className="min-h-8 rounded-lg bg-red-600 px-2.5 text-xs font-semibold text-white disabled:opacity-60">{deleting?"...":"Delete"}</button></span>
:<button onClick={()=>setConfirmDelete(true)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400" aria-label={`Delete ${label}`}><Trash2 className="h-3.5 w-3.5"/></button>}
</span>}
