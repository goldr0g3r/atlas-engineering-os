import { auth, signIn } from "@/auth";
import { Github, Layers3 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-atlas-bg px-5 py-8 text-white">
      <section className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-3xl bg-atlas-panel p-5 shadow-2xl">
          <Layers3 className="h-12 w-12 text-atlas-accent" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Atlas Engineering OS</h1>
        <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Projects, BOMs, research, experiments and engineering notes in one mobile-first workspace.
        </p>
        <form action={async () => { "use server"; await signIn("github", { redirectTo: "/dashboard" }); }}>
          <button type="submit" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 shadow-lg hover:bg-slate-200">
            <Github className="h-5 w-5" /> Sign in with GitHub
          </button>
        </form>
      </section>
    </main>
  );
}
