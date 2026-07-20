import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { nowIso, parseTags } from "@/lib/utils";
import { routeError } from "@/lib/api-response";
export async function GET(){try{const userId=await requireUserId();const items=await (await getCollection("research")).find({userId}).sort({updatedAt:-1}).toArray();return NextResponse.json(items);}catch(e){return routeError(e);}}
export async function POST(request:Request){try{const userId=await requireUserId();const body=await request.json();if(typeof body.title!=="string"||!body.title.trim())return NextResponse.json({error:"title is required."},{status:400});const item={userId,title:String(body.title).trim(),authors:String(body.authors??""),link:String(body.link??""),doi:String(body.doi??""),tags:parseTags(body.tags),status:body.status??"to-read",notes:String(body.notes??""),createdAt:nowIso(),updatedAt:nowIso()};const result=await (await getCollection("research")).insertOne(item);return NextResponse.json({...item,_id:result.insertedId.toString()},{status:201});}catch(e){return routeError(e);}}
