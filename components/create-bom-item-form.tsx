"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

export function CreateBomItemForm({ projectId, bomId }: { projectId: string; bomId: string }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    firstField.current?.focus();
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) setOpen(false);
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      trigger.current?.focus();
    };
  }, [open, saving]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = event.currentTarget;
    try {
      const response = await fetch(`/api/projects/${projectId}/boms/${bomId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Unable to add BOM item");
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to add BOM item");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className="atlas-button-primary" aria-haspopup="dialog">
        <Plus className="h-4 w-4" /> Add BOM item
      </button>
      {open && (
        <div className="fixed inset-0 z-[110] bg-slate-950/35 p-3 backdrop-blur-sm sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !saving) setOpen(false); }}>
          <aside role="dialog" aria-modal="true" aria-labelledby="bom-item-heading" className="ml-auto h-full w-full max-w-xl overflow-y-auto rounded-[24px] border border-atlas-line bg-white p-5 shadow-2xl sm:p-7">
            <header className="mb-6 flex items-start justify-between gap-4">
              <div><p className="text-sm text-atlas-muted">Component requirement</p><h2 id="bom-item-heading" className="text-2xl font-semibold">Add BOM item</h2></div>
              <button type="button" disabled={saving} onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-atlas-line bg-atlas-panel2" aria-label="Close"><X className="h-4 w-4" /></button>
            </header>
            <form onSubmit={submit} className="space-y-5">
              <section className="space-y-4"><h3 className="text-sm font-semibold">Part details</h3><label className="block text-sm font-medium">Part name<input ref={firstField} name="partName" required maxLength={160} className="atlas-field mt-1" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Part number<input name="partNumber" maxLength={120} className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Manufacturer<input name="manufacturer" maxLength={120} className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Quantity<input name="quantity" required type="number" min="0.0001" step="any" defaultValue="1" className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Unit<input name="unit" required maxLength={20} defaultValue="pcs" className="atlas-field mt-1" /></label></div><label className="block text-sm font-medium">Notes<textarea name="notes" rows={3} maxLength={2000} className="atlas-field mt-1" /></label></section>
              <details className="rounded-[18px] border border-atlas-line bg-atlas-panel2/60 p-4"><summary className="cursor-pointer text-sm font-semibold">Initial sourcing details</summary><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Supplier<input name="supplier" maxLength={120} className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Unit cost<input name="unitCost" type="number" min="0" step="0.0001" className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Currency<input name="currency" defaultValue="INR" maxLength={3} className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Supplier URL<input name="link" type="url" className="atlas-field mt-1" /></label></div></details>
              {error && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
              <footer className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-atlas-line bg-white pt-4 sm:flex-row sm:justify-end"><button type="button" disabled={saving} onClick={() => setOpen(false)} className="atlas-button-secondary sm:min-w-28">Cancel</button><button disabled={saving} className="atlas-button-primary sm:min-w-36 disabled:opacity-60">{saving ? "Adding..." : "Add item"}</button></footer>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}
