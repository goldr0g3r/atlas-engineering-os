import { auth, signOut } from "@/auth";
import { BottomNav } from "@/components/bottom-nav";
import { QuickCreate } from "@/components/quick-create";
import { Sidebar } from "@/components/sidebar";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-atlas-bg text-slate-100">
      <div className="flex">
        <Sidebar />
        <main className="min-h-screen min-w-0 flex-1 pb-24 lg:pb-6">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-atlas-bg/90 px-4 py-3 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div><p className="text-xs uppercase tracking-widest text-atlas-accent">Atlas</p><h1 className="text-lg font-semibold">Engineering OS</h1></div>
              <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
                <button type="submit" className="min-h-11 rounded-xl bg-white/10 px-3 py-2 text-xs hover:bg-white/20">Sign out</button>
              </form>
            </div>
            <p className="mt-1 truncate text-xs text-slate-400">{session?.user?.email}</p>
          </header>
          <div className="px-4 py-5 lg:px-8">{children}</div>
        </main>
      </div>
      <QuickCreate />
      <BottomNav />
    </div>
  );
}
