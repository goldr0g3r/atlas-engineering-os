import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { BottomNav } from "@/components/bottom-nav";
import { GlobalSearch } from "@/components/global-search";
import { NotificationCenter } from "@/components/notification-center";
import { AccountMenu } from "@/components/account-menu";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="min-h-dvh bg-[#f3f7f8] text-atlas-ink">
      <div className="grid min-h-dvh lg:grid-cols-[232px_minmax(0,1fr)]">
        <Sidebar />
        <div className="min-w-0">
          <header className="sticky top-0 z-50 border-b border-atlas-line bg-white/92 backdrop-blur-xl">
            <div className="mx-auto flex h-[72px] w-full max-w-[1600px] items-center gap-3 px-4 sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <GlobalSearch />
              </div>
              <NotificationCenter />
              <AccountMenu name={session.user.name || "Atlas user"} email={session.user.email} />
            </div>
          </header>
          <main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10 lg:pt-8">
            {children}
          </main>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
