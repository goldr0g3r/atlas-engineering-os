import { getCollection } from "@/lib/collections";
import { objectId } from "@/lib/object-id";
export async function requireProject(userId:string, projectId:string) { const project=await (await getCollection("projects")).findOne({_id:objectId(projectId,"projectId"),userId}); if(!project) throw new Error("PROJECT_NOT_FOUND"); return project; }
export async function ensureProjectResource(userId:string,projectId:string,collection:string,id:string){await requireProject(userId,projectId);const item=await(await getCollection(collection)).findOne({_id:objectId(id),projectId,userId});if(!item)throw new Error("RESOURCE_NOT_FOUND");return item;}
