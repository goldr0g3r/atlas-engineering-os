import client from"@/lib/mongodb";import{ensureAtlasIndexes}from"@/lib/atlas-indexes";
let connection:Promise<typeof client>|undefined;
async function connectedClient(){return connection??=client.connect()}
export async function getCollection(name:string){const active=await connectedClient();if(process.env.NODE_ENV!=="test")void ensureAtlasIndexes().catch(error=>console.error("Atlas index initialization failed",error));return active.db("atlas").collection(name)}
