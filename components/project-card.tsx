"use client";
import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateProjectForm } from "@/components/create-project-form";
import { EditDeleteActions } from "@/components/edit-delete-actions";

export function ProjectCard({ project }: { project: any }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);

  if (editing) return <div className="flex min-h-[230px] flex-col rounded-[22px] border border-atlas-line bg-white p-5 shadow-[0_8px_24px_rgba(30,55,70,.06)]"><CreateProjectForm project={project} onClose={() => setEditing(false)} /></div>;

  return (
    <Link key={project._id} href={`/projects/${project._id}`} className="group flex min-h-[230px] flex-col rounded-[22px] border border-atlas-line bg-white p-5 shadow-[0_8px_24px_rgba(30,55,70,.06)] transition hover:-translate-y-0.5 hover:border-[#9fcfc8] hover:shadow-[0_16px_36px_rgba(30,55,70,.10)]">
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><FolderKanban className="h-5 w-5" /></span>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-atlas-line bg-[#f7fafb] px-3 py-1 text-xs capitalize text-atlas-muted">{project.status}</span>
          <span onClick={(e) => e.preventDefault()} className="flex">
            <EditDeleteActions
              onEdit={() => setEditing(true)}
              onDelete={async () => { await fetch(`/api/projects/${project._id}`, { method: "DELETE" }); router.refresh(); }}
              label={project.name || "project"}
            />
          </span>
        </div>
      </div>
      <h2 className="mt-5 text-xl font-semibold">{project.name}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-atlas-muted">{project.description || "Ready for project details and engineering work."}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#14766d]">Open workspace <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
    </Link>
  );
}
