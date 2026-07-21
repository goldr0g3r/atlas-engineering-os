"use client";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

type CaptureType = "task" | "note" | "research" | "experiment" | "link";

export function QuickCreate({ projectId }: { projectId?: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<CaptureType>("note");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (!projectId) return null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true); setError("");
    try {
      const response = await fetch("/api/quick-capture", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projectId, type, title: title.trim(), description: description.trim() }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to save capture");
      setTitle(""); setDescription(""); setOpen(false); router.refresh();
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save capture"); }
    finally { setSaving(false); }
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="atlas-button-primary fixed bottom-24 right-5 z-40 h-14 w-14 !p-0 shadow-xl lg:bottom-8" aria-label="Quick create"><Plus className="h-6 w-6" /></button>
      {open && <div className="fixed inset-0 z-[90] bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="quick-capture-title" className="absolute bottom-0 inset-x-0 rounded-t-[28px] bg-white p-6 shadow-2xl lg:bottom-auto lg:left-auto lg:right-8 lg:top-24 lg:w-[420px] lg:rounded-[28px]">
          <div className="mb-6 flex items-start justify-between"><div><p className="text-sm text-atlas-muted">Selected project</p><h2 id="quick-capture-title" className="text-2xl font-semibold">Quick capture</h2></div><button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-atlas-panel2" aria-label="Close"><X className="h-5 w-5" /></button></div>
          <div className="space-y-4">
            <label className="block text-sm font-medium">Type<select value={type} onChange={(event) => setType(event.target.value as CaptureType)} className="atlas-field mt-1"><option value="note">Note</option><option value="task">Task</option><option value="research">Research</option><option value="experiment">Experiment</option><option value="link">Link or document</option></select></label>
            <label className="block text-sm font-medium">Title<input required maxLength={160} value={title} onChange={(event) => setTitle(event.target.value)} className="atlas-field mt-1" /></label>
            <label className="block text-sm font-medium">Description<textarea maxLength={2000} value={description} onChange={(event) => setDescription(event.target.value)} rows={4} className="atlas-field mt-1" /></label>
            {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
            <button disabled={saving} className="atlas-button-primary w-full disabled:opacity-60">{saving ? "Saving..." : "Save to project"}</button>
          </div>
        </form>
      </div>}
    </>
  );
}
