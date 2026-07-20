import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth-guard";
import { getCollection } from "@/lib/collections";
import { nowIso, parseTags, safeNumber } from "@/lib/utils";
import { routeError } from "@/lib/api-response";
export async function GET(){try{const userId=await requireUserId();const items=await (await getCollection("bom")).find({userId}).sort({updatedAt:-1}).toArray();return NextResponse.json(items);}catch(e){return routeError(e);}}
export async function POST(request:Request){try{const userId=await requireUserId();const body=await request.json();if(typeof body.partName!=="string"||!body.partName.trim())return NextResponse.json({error:"partName is required."},{status:400});const item={userId,projectId:String(body.projectId??""),partName:String(body.partName).trim(),partNumber:String(body.partNumber??""),supplier:String(body.supplier??""),link:String(body.link??""),quantity:Math.max(0,safeNumber(body.quantity,1)),unitCost:Math.max(0,safeNumber(body.unitCost,0)),status:body.status??"needed",createdAt:nowIso(),updatedAt:nowIso()};const result=await (await getCollection("bom")).insertOne(item);return NextResponse.json({...item,_id:result.insertedId.toString()},{status:201});}catch(e){return routeError(e);}}
