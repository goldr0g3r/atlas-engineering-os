import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { nowIso } from "@/lib/utils";
import { routeError } from "@/lib/api-response";
const types=new Set(["task","note","bom","research","experiment"]);
export async function POST(request:Request){try{const userId=await requireUserId();const body=await request.json();const title=typeof body.title==="string"?body.title.trim():"";if(!title||title.length>160||!types.has(body.type))return NextResponse.json({error:"Valid type and a title up to 160 characters are required."},{status:400});const item={userId,type:body.type,title,description:typeof body.description==="string"?body.description.trim().slice(0,2000):"",createdAt:nowIso(),updatedAt:nowIso()};const result=await (await getCollection("quickCaptures")).insertOne(item);return NextResponse.json({...item,_id:result.insertedId.toString()},{status:201});}catch(e){return routeError(e);}}
