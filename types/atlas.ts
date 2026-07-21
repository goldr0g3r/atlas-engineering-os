export type ProjectStatus = "planning" | "active" | "on-hold" | "completed" | "archived";
export type ProjectPriority = "low" | "medium" | "high" | "critical";
export type BomStatus = "draft" | "active" | "released" | "obsolete";
export interface ProjectInput { name:string; description?:string; status?:ProjectStatus; priority?:ProjectPriority; tags?:string[]|string; }
export interface BomListInput { name:string; description?:string; revision?:string; status?:BomStatus; }
export interface BomItemInput { partName:string; partNumber?:string; manufacturer?:string; supplier?:string; supplierPartNumber?:string; quantity?:number; unit?:string; unitCost?:number; currency?:string; link?:string; datasheetUrl?:string; status?:string; notes?:string; }
export interface QuickCaptureInput { projectId?:string; type:"task"|"note"|"bom"|"research"|"experiment"|"link"; title:string; description?:string; }
