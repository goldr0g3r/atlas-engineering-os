"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Github, LoaderCircle } from "lucide-react";

type Mode = "login" | "register";

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      if (mode === "register") {
        const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Registration failed.");
      }
      const result = await signIn("credentials", { email: values.email, password: values.password, redirect: false });
      if (result?.error) throw new Error("Invalid email or password.");
      window.location.assign("/projects");
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Authentication failed."); }
    finally { setLoading(false); }
  }

  return <div className="atlas-card rounded-[28px] p-6 md:p-8">
    <div className="grid grid-cols-2 rounded-full bg-atlas-panel2 p-1">
      {(["login","register"] as Mode[]).map(item => <button type="button" key={item} onClick={() => { setMode(item); setError(""); }} className={`min-h-11 rounded-full text-sm font-semibold capitalize ${mode===item?"bg-white shadow-sm":"text-atlas-muted"}`}>{item}</button>)}
    </div>
    <form onSubmit={submit} className="mt-6 space-y-4">
      {mode === "register" && <><label className="block text-sm font-medium">Full name<input name="name" required minLength={2} maxLength={80} autoComplete="name" className="atlas-field mt-1" /></label><label className="block text-sm font-medium">Username<input name="username" required minLength={3} maxLength={32} pattern="[A-Za-z0-9][A-Za-z0-9._-]{2,31}" autoComplete="username" className="atlas-field mt-1" /></label></>}
      <label className="block text-sm font-medium">Email<input name="email" required type="email" maxLength={254} autoComplete="email" className="atlas-field mt-1" /></label>
      <label className="block text-sm font-medium">Password<input name="password" required type="password" minLength={12} maxLength={128} autoComplete={mode==="login"?"current-password":"new-password"} className="atlas-field mt-1" /><span className="mt-1 block text-xs text-atlas-muted">12-128 characters</span></label>
      {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
      <button disabled={loading} className="atlas-button-primary w-full disabled:opacity-60">{loading?<LoaderCircle className="h-4 w-4 animate-spin"/>:null}{mode==="login"?"Sign in":"Create account"}</button>
    </form>
    <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-atlas-line"/><span className="text-xs text-atlas-muted">OR</span><span className="h-px flex-1 bg-atlas-line"/></div>
    <button type="button" onClick={() => signIn("github", { callbackUrl: "/projects" })} className="atlas-button-secondary w-full"><Github className="h-5 w-5"/>Continue with GitHub</button>
  </div>;
}
