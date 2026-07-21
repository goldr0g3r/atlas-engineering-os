import client from"@/lib/mongodb";
let setup:Promise<void>|undefined;
export function ensureAtlasIndexes(){return setup??=(async()=>{const db=client.db("atlas");await Promise.all([db.collection("projects").createIndex({userId:1,status:1,name:1}),db.collection("bomLists").createIndex({userId:1,projectId:1,updatedAt:-1}),db.collection("bomItems").createIndex({userId:1,projectId:1,bomListId:1,createdAt:1}),...(["tasks","research","notes","links","experiments"] as const).map(name=>db.collection(name).createIndex({userId:1,projectId:1,updatedAt:-1}))]);})()}
