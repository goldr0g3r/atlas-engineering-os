export type SearchResult={id:string;kind:string;title:string;description:string;href:string;projectName?:string;updatedAt?:string};
export function escapeRegex(value:string){return value.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
