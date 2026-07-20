import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { nowIso, parseTags } from "@/lib/utils";
import { routeError } from "@/lib/api-response";
export async function GET(){try{const userId=await requireUserId();const items=await (await getCollection("projects")).find({userId}).sort({updatedAt:-1}).toArray();return NextResponse.json(items);}catch(e){return routeError(e);}}
export async function POST(request:Request){try{const userId=await requireUserId();const body=await request.json();if(typeof body.name!=="string"||!body.name.trim())return NextResponse.json({error:"name is required."},{status:400});const item={userId,name:String(body.name).trim(),description:String(body.description??"").trim(),status:body.status??"active",priority:body.priority??"medium",tags:parseTags(body.tags),createdAt:nowIso(),updatedAt:nowIso()};const result=await (await getCollection("projects")).insertOne(item);return NextResponse.json({...item,_id:result.insertedId.toString()},{status:201});}catch(e){return routeError(e);}}
