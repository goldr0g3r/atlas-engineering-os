import { NextResponse } from "next/server";
import { getCollection } from "@/lib/collections";
import { ensureCredentialIndexes, normalizeEmail, normalizeUsername, validEmail, validPassword, validUsername } from "@/lib/credential-user";
import { hashPassword } from "@/lib/password";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const ownOrigin = new URL(request.url).origin;
  if (requestOrigin && requestOrigin !== ownOrigin) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 }); }

  const name = String(body.name ?? "").trim();
  const username = normalizeUsername(String(body.username ?? ""));
  const email = normalizeEmail(String(body.email ?? ""));
  const password = String(body.password ?? "");

  if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Name must be between 2 and 80 characters." }, { status: 400 });
  if (!validUsername(username)) return NextResponse.json({ error: "Username must be 3-32 characters using letters, numbers, dot, underscore, or hyphen." }, { status: 400 });
  if (!validEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!validPassword(password)) return NextResponse.json({ error: "Password must be between 12 and 128 characters." }, { status: 400 });

  await ensureCredentialIndexes();
  const collection = await getCollection("credentialUsers");
  const existing = await collection.findOne({ $or: [{ email }, { username }] }, { projection: { _id: 1 } });
  if (existing) return NextResponse.json({ error: "An account with this email or username already exists." }, { status: 409 });

  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();
  try {
    const result = await collection.insertOne({ name, username, email, passwordHash, authMethod: "credentials", createdAt: now, updatedAt: now });
    return NextResponse.json({ id: result.insertedId.toString(), name, username, email }, { status: 201 });
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "An account with this email or username already exists." }, { status: 409 });
    }
    console.error("Registration failed", error);
    return NextResponse.json({ error: "Unable to create the account." }, { status: 500 });
  }
}
