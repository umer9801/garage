import { MongoClient, type Db } from "mongodb";

const uri = process.env["MONGODB_URI"] as string;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// In development, reuse the connection across hot-reloads
if (process.env["NODE_ENV"] !== "production") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  return c.db("sleek");
}

export default clientPromise;
