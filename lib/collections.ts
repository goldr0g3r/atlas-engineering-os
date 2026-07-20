import client from "@/lib/mongodb";

export async function getCollection(name: string) {
  await client.connect();
  return client.db("atlas").collection(name);
}
