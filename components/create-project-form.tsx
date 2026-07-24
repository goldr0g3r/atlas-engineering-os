"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Plus, X } from "lucide-react";

export function CreateProjectForm({ project, onClose }: { project?: any; onClose?: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(!!project);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const isEdit = !!project;

  function close() { setOpen(false); setError(""); onClose?.(); }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = event.currentTarget;
    const body = JSON.stringify(Object.fromEntries(new FormData(form)));
    const url = isEdit ? `/api/projects/${project._id}` : "/api/projects";
    const response = await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const b = await response.json();
    setSaving(false);
    if (!response.ok) return setError(b.error ?? "Unable to save project");
    if (!isEdit) { router.push(`/projects/${b._id}`); } else { close(); }
    router.refresh();
  }

  return (
    <>
      {!isEdit && !open && (
        <button onClick={() => setOpen(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#123b3a] px-5 font-semibold text-white">
          <Plus className="h-4 w-4" /> New project
        </button>
      )}
      {open && (
        <div className="fixed inset-0 z-[90] bg-slate-950/35 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="create-project-title" className="absolute inset-x-3 top-1/2 mx-auto w-full max-w-xl -translate-y-1/2 rounded-[28px] bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div><p className="text-sm text-slate-500">{isEdit ? "Edit workspace" : "Start a workspace"}</p><h2 id="create-project-title" className="text-2xl font-semibold">{isEdit ? "Edit project" : "Create project"}</h2></div>
              <button onClick={close} className="grid h-11 w-11 place-items-center rounded-full bg-slate-100" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <label className="block text-sm font-medium">Project name<input autoFocus name="name" required maxLength={120} defaultValue={project?.name ?? ""} className="atlas-field mt-1 min-h-12 w-full rounded-xl px-4" placeholder="Example: Project Legion" /></label>
              <label className="block text-sm font-medium">Purpose and scope<textarea name="description" maxLength={2000} rows={4} defaultValue={project?.description ?? ""} className="atlas-field mt-1 w-full rounded-xl p-4" placeholder="What outcome should this project deliver?" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">Status<select name="status" defaultValue={project?.status ?? "planning"} className="atlas-field mt-1 min-h-12 w-full rounded-xl px-4"><option value="planning">Planning</option><option value="active">Active</option><option value="on-hold">On hold</option><option value="completed">Completed</option><option value="archived">Archived</option></select></label>
                <label className="block text-sm font-medium">Priority<select name="priority" defaultValue={project?.priority ?? "medium"} className="atlas-field mt-1 min-h-12 w-full rounded-xl px-4"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option></select></label>
              </div>
              {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
              <button disabled={saving} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123b3a] font-semibold text-white disabled:opacity-60">
                {saving ? "Saving..." : isEdit ? "Save changes" : "Create and open project"}<ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
