"use client";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function Modal({open,onClose,title,description,children}:{open:boolean;onClose:()=>void;title:string;description?:string;children:React.ReactNode}){
  const ref=useRef<HTMLDialogElement>(null);
  useEffect(()=>{const dialog=ref.current;if(!dialog)return;if(open&&!dialog.open)dialog.showModal();if(!open&&dialog.open)dialog.close()},[open]);
  return <dialog ref={ref} onClose={onClose} onCancel={event=>{event.preventDefault();onClose()}} aria-labelledby="atlas-modal-title" aria-describedby={description?"atlas-modal-description":undefined} className="m-auto w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 text-slate-950 shadow-2xl backdrop:bg-slate-950/55 dark:border-white/10 dark:bg-[#101b2d] dark:text-slate-100">
    <div className="flex max-h-[min(88vh,820px)] flex-col">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10 sm:px-6">
        <div><h2 id="atlas-modal-title" className="text-xl font-semibold tracking-tight">{title}</h2>{description&&<p id="atlas-modal-description" className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}</div>
        <button type="button" onClick={onClose} className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10" aria-label="Close dialog"><X className="size-5"/></button>
      </header>
      <div className="overflow-y-auto px-5 py-5 sm:px-6">{children}</div>
    </div>
  </dialog>
}
