import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { nowIso, parseTags } from "@/lib/utils";
import { routeError } from "@/lib/api-response";
export async function GET(){try{const userId=await requireUserId();const items=await (await getCollection("experiments")).find({userId}).sort({updatedAt:-1}).toArray();return NextResponse.json(items);}catch(e){return routeError(e);}}
export async function POST(request:Request){try{const userId=await requireUserId();const body=await request.json();if(typeof body.title!=="string"||!body.title.trim())return NextResponse.json({error:"title is required."},{status:400});const item={userId,code:String(body.code??`EXP-${Date.now().toString().slice(-6)}`),title:String(body.title).trim(),projectId:String(body.projectId??""),algorithm:String(body.algorithm??""),parameters:String(body.parameters??""),result:String(body.result??""),status:body.status??"planned",tags:parseTags(body.tags),createdAt:nowIso(),updatedAt:nowIso()};const result=await (await getCollection("experiments")).insertOne(item);return NextResponse.json({...item,_id:result.insertedId.toString()},{status:201});}catch(e){return routeError(e);}}
