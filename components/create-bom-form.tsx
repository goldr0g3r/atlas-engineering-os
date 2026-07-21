"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export function CreateBomForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    nameRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, saving]);

  function close() {
    if (saving) return;
    setError("");
    setOpen(false);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = event.currentTarget;
    try {
      const response = await fetch(`/api/projects/${projectId}/boms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to create BOM");
      form.reset();
      setOpen(false);
      router.push(`/projects/${projectId}/boms/${body._id}`);
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to create BOM");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="atlas-button-primary" aria-haspopup="dialog">
        <Plus className="h-4 w-4" />
        New BOM
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[95] grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-bom-title"
            aria-describedby="create-bom-description"
            className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-atlas-muted">Project bill of materials</p>
                <h2 id="create-bom-title" className="text-2xl font-semibold">Create BOM</h2>
                <p id="create-bom-description" className="mt-1 text-sm text-atlas-muted">Create a BOM list, then add components and supplier sources inside it.</p>
              </div>
              <button type="button" onClick={close} disabled={saving} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-atlas-panel2 disabled:opacity-50" aria-label="Close create BOM dialog">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <label className="block text-sm font-medium">
                BOM name
                <input ref={nameRef} name="name" required maxLength={120} className="atlas-field mt-1" placeholder="Example: Electronics prototype" />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Revision
                  <input name="revision" maxLength={30} className="atlas-field mt-1" placeholder="A" />
                </label>
                <label className="block text-sm font-medium">
                  Status
                  <select name="status" defaultValue="draft" className="atlas-field mt-1">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="released">Released</option>
                    <option value="obsolete">Obsolete</option>
                  </select>
                </label>
              </div>
              <label className="block text-sm font-medium">
                Description
                <textarea name="description" maxLength={2000} rows={4} className="atlas-field mt-1" placeholder="Scope, build variant, or intended use" />
              </label>
              {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={close} disabled={saving} className="atlas-button-secondary sm:min-w-28">Cancel</button>
                <button disabled={saving} className="atlas-button-primary sm:min-w-36 disabled:opacity-60">
                  {saving ? "Creating..." : "Create and open"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
