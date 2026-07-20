export type AtlasStatus = "backlog" | "active" | "blocked" | "done";
export type AtlasPriority = "low" | "medium" | "high" | "critical";

export interface ProjectInput {
  name: string;
  description?: string;
  status?: AtlasStatus;
  priority?: AtlasPriority;
  tags?: string[] | string;
}

export interface QuickCaptureInput {
  type: "task" | "note" | "bom" | "research" | "experiment";
  title: string;
  description?: string;
}
