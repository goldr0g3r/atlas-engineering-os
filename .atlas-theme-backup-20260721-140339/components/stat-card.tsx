import type { LucideIcon } from "lucide-react";

export function StatCard({ title, value, icon: Icon, tone = "blue" }: { title: string; value: number; icon: LucideIcon; tone?: "blue" | "green" | "amber" | "red" }) {
  const colors = { blue: "bg-blue-50 text-blue-700", green: "bg-emerald-50 text-emerald-700", amber: "bg-orange-50 text-orange-700", red: "bg-rose-50 text-rose-700" };
  return (
    <article className="atlas-card rounded-[24px] p-5">
      <div className="flex items-start justify-between">
        <div><p className="text-sm text-atlas-muted">{title}</p><p className="mt-2 text-3xl font-semibold tracking-tight text-atlas-ink">{value}</p></div>
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${colors[tone]}`}><Icon className="h-5 w-5" /></span>
      </div>
    </article>
  );
}
