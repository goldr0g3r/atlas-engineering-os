"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export function MilestoneDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    titleRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open, saving]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = event.currentTarget;

    try {
      const response = await fetch(`/api/projects/${projectId}/milestones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to create milestone");
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to create milestone");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="atlas-button-primary">
        <Plus className="h-4 w-4" /> New milestone
      </button>
      {open && (
        <div
          role="presentation"
          className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) setOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="milestone-dialog-title"
            className="w-full max-w-2xl rounded-[24px] border border-atlas-line bg-white p-5 shadow-2xl sm:p-7"
          >
            <header className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-atlas-muted">Delivery gate</p>
                <h2 id="milestone-dialog-title" className="text-2xl font-semibold">Create milestone</h2>
              </div>
              <button type="button" disabled={saving} onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-atlas-line bg-atlas-panel2" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </header>
            <form onSubmit={submit} className="space-y-4">
              <label className="block text-sm font-medium">Milestone title<input ref={titleRef} name="title" required maxLength={160} className="atlas-field mt-1" placeholder="Example: Plant model validation complete" /></label>
              <label className="block text-sm font-medium">Acceptance criteria<textarea name="description" maxLength={3000} rows={4} className="atlas-field mt-1" placeholder="Define the objective evidence required to close this milestone" /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">Owner<input name="owner" maxLength={120} className="atlas-field mt-1" /></label>
                <label className="block text-sm font-medium">Target date<input name="targetDate" required type="date" className="atlas-field mt-1" /></label>
                <label className="block text-sm font-medium">Status<select name="status" defaultValue="planned" className="atlas-field mt-1"><option value="planned">Planned</option><option value="in-progress">In progress</option><option value="blocked">Blocked</option><option value="completed">Completed</option></select></label>
                <label className="block text-sm font-medium">Progress (%)<input name="progress" type="number" min="0" max="100" step="1" defaultValue="0" className="atlas-field mt-1" /></label>
              </div>
              {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
              <footer className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" disabled={saving} onClick={() => setOpen(false)} className="atlas-button-secondary sm:min-w-28">Cancel</button>
                <button disabled={saving} className="atlas-button-primary sm:min-w-40 disabled:opacity-60">{saving ? "Creating..." : "Create milestone"}</button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
