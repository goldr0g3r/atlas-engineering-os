import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { serialize } from "@/lib/object-id";
import { CreateProjectForm } from "@/components/create-project-form";
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const userId = await requireUserId();
  const projects: any[] = serialize(await (await getCollection("projects")).find({ userId }).sort({ updatedAt: -1 }).toArray());
  return <div className="mx-auto w-full max-w-[1320px] space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-sm font-medium text-atlas-muted">Choose where to work</p><h1 className="mt-1 text-3xl font-semibold tracking-[-.03em] sm:text-4xl">Your projects</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-atlas-muted sm:text-base">Every BOM, note, document, link, task, and experiment belongs to a project.</p></div>
      <CreateProjectForm />
    </header>
    {projects.length === 0 ? <section className="grid min-h-80 place-items-center rounded-[24px] border border-dashed border-slate-300 bg-white p-8 text-center"><div className="max-w-md"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700"><FolderKanban /></span><h2 className="mt-4 text-xl font-semibold">Create the first project</h2><p className="mt-2 text-sm leading-6 text-atlas-muted">Start a project workspace for delivery, costs, BOMs, risks, and engineering records.</p><div className="mt-5"><CreateProjectForm /></div></div></section> : <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <Link key={project._id} href={`/projects/${project._id}`} className="group flex min-h-[230px] flex-col rounded-[22px] border border-atlas-line bg-white p-5 shadow-[0_8px_24px_rgba(30,55,70,.06)] transition hover:-translate-y-0.5 hover:border-[#9fcfc8] hover:shadow-[0_16px_36px_rgba(30,55,70,.10)]"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><FolderKanban className="h-5 w-5" /></span><span className="rounded-full border border-atlas-line bg-[#f7fafb] px-3 py-1 text-xs capitalize text-atlas-muted">{project.status}</span></div><h2 className="mt-5 text-xl font-semibold">{project.name}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-atlas-muted">{project.description || "Ready for project details and engineering work."}</p><span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#14766d]">Open workspace <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></Link>)}</section>}
  </div>;
}
