import { auth, signIn } from "@/auth";
import { ArrowRight, Boxes, BookOpen, FolderKanban, Github, Link2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/projects");

  return (
    <main className="min-h-screen px-5 py-8 md:grid md:place-items-center">
      <section className="atlas-shell mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] lg:grid-cols-[1.1fr_.9fr]">
        <div className="p-8 md:p-12 lg:p-16">
          <div className="mb-14 inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold shadow-sm">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#123b3a] text-white"><FolderKanban className="h-4 w-4" /></span>
            Atlas Engineering OS
          </div>
          <p className="text-sm font-semibold uppercase tracking-[.18em] text-[#228f83]">One project. One source of truth.</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold tracking-[-.05em] md:text-6xl">Keep every engineering decision connected.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Select a project, then manage its BOMs, research, notes, document links, code repositories, tasks, and experiments in one workspace.</p>
          <form className="mt-10" action={async () => { "use server"; await signIn("github", { redirectTo: "/projects" }); }}>
            <button className="inline-flex min-h-13 items-center gap-3 rounded-full bg-[#123b3a] px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-950/10">
              <Github className="h-5 w-5" /> Continue with GitHub <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="grid content-center gap-4 bg-white/45 p-6 md:p-10">
          {[
            [Boxes, "BOMs", "Multiple revisioned BOM lists and component registers"],
            [BookOpen, "Knowledge", "Research, notes, decisions, and experiments"],
            [Link2, "Connected work", "Documents, references, and repository links"],
          ].map(([Icon, title, description]) => (
            <article key={String(title)} className="atlas-card rounded-[24px] p-5">
              <Icon className="mb-5 h-6 w-6 text-[#228f83]" />
              <h2 className="text-lg font-semibold">{String(title)}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">{String(description)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
