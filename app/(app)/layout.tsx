import { auth } from "@/auth";
import { AppShell } from "@/components/app-shell";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.email) redirect("/");
  return <AppShell>{children}</AppShell>;
}
