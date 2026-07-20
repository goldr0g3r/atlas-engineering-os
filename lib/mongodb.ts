import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing required environment variable MONGODB_URI.");

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
};

const globalForMongo = globalThis as typeof globalThis & {
  _atlasMongoClient?: MongoClient;
};

const client = globalForMongo._atlasMongoClient ?? new MongoClient(uri, options);
if (process.env.NODE_ENV !== "production") globalForMongo._atlasMongoClient = client;

export default client;
