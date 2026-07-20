import { auth } from "@/auth";

export async function requireUserId(): Promise<string> {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  if (!email) throw new Error("UNAUTHORIZED");
  return email;
}
