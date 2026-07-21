import type { LucideIcon } from "lucide-react";
export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: React.ReactNode }) {
  return <section className="atlas-card grid min-h-64 place-items-center rounded-[28px] p-8 text-center"><div className="max-w-md"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><Icon className="h-6 w-6" /></span><h2 className="mt-4 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>{action && <div className="mt-5">{action}</div>}</div></section>;
}
