import { ObjectId } from "mongodb";
export function objectId(value:string, field="id") { if(!ObjectId.isValid(value)) throw new Error(`INVALID_${field.toUpperCase()}`); return new ObjectId(value); }
export function serialize<T>(value:T):T { return JSON.parse(JSON.stringify(value,(_k,v)=>v instanceof ObjectId?v.toString():v)); }
