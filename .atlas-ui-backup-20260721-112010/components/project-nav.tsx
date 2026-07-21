import Link from "next/link";
const links=[["","Overview"],["tasks","Tasks"],["boms","BOMs"],["research","Research"],["notes","Notes"],["links","Links & docs"],["experiments","Experiments"]] as const;
export function ProjectNav({projectId}:{projectId:string}){return <nav className="flex gap-2 overflow-x-auto pb-2">{links.map(([path,label])=><Link className="whitespace-nowrap rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10" key={path} href={`/projects/${projectId}${path?`/${path}`:""}`}>{label}</Link>)}</nav>}
