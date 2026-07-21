"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban } from "lucide-react";
export function BottomNav(){const pathname=usePathname();const active=pathname==="/projects";return <nav aria-label="Global mobile navigation" className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[180px] items-center justify-center rounded-[24px] border border-white/80 bg-white/90 p-2 shadow-2xl backdrop-blur lg:hidden"><Link href="/projects" aria-current={active?"page":undefined} className={`flex min-w-32 flex-col items-center gap-1 rounded-2xl px-4 py-2 text-xs ${active?"bg-[#123b3a] text-white":"text-slate-500"}`}><FolderKanban className="h-5 w-5"/><span>Projects</span></Link></nav>}
