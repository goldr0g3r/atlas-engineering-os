import Link from "next/link";
import { ArrowRight, FolderKanban, Plus } from "lucide-react";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { serialize } from "@/lib/object-id";
import { CreateProjectForm } from "@/components/create-project-form";
export const dynamic = "force-dynamic";

export default async function Projects() {
  const userId = await requireUserId();
  const projects: any[] = serialize(await (await getCollection("projects")).find({ userId }).sort({ updatedAt: -1 }).toArray());
  return (
    <main className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-sm font-medium text-slate-500">Choose where to work</p><h1 className="mt-1 text-4xl font-semibold tracking-[-.04em]">Your projects</h1><p className="mt-2 text-slate-500">Every BOM, note, document, link, task, and experiment belongs to a project.</p></div>
        <CreateProjectForm />
      </header>
      {projects.length === 0 ? (
        <section className="atlas-card grid min-h-80 place-items-center rounded-[28px] p-8 text-center">
          <div className="max-w-lg"><span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-emerald-50 text-emerald-700"><FolderKanban /></span><h2 className="mt-5 text-2xl font-semibold">Create the first project workspace</h2><p className="mt-2 text-slate-500">Atlas will organize BOM lists, research, notes, document links, repository links, tasks, and experiments beneath the project.</p><div className="mt-6"><CreateProjectForm /></div></div>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Link key={project._id} href={`/projects/${project._id}`} className="atlas-card group rounded-[26px] p-5 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><FolderKanban className="h-5 w-5" /></span><span className="atlas-chip rounded-full px-3 py-1 text-xs capitalize">{project.status}</span></div>
              <h2 className="mt-6 text-xl font-semibold">{project.name}</h2><p className="mt-2 min-h-12 line-clamp-2 text-sm leading-6 text-slate-500">{project.description || "Ready for project details, BOMs, knowledge, and connected engineering work."}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#166f67]">Open workspace <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
