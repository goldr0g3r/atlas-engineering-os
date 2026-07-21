export function ItemCard({ title, subtitle, meta, status }: { title: string; subtitle?: string; meta?: string; status?: string }) {
  return (
    <article className="atlas-card rounded-[24px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-atlas-ink">{title}</h3>
          {subtitle && <p className="mt-1 line-clamp-2 text-sm leading-6 text-atlas-muted">{subtitle}</p>}
          {meta && <p className="mt-3 text-xs text-atlas-muted">{meta}</p>}
        </div>
        {status && <span className="atlas-chip shrink-0 rounded-full px-3 py-1 text-xs capitalize">{status}</span>}
      </div>
    </article>
  );
}
