import { MongoClient, type Db } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) return clientPromise;

  const uri = process.env["MONGODB_URI"];
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  // In development reuse across hot-reloads via globalThis
  if (process.env["NODE_ENV"] !== "production") {
    const g = globalThis as typeof globalThis & { _mongoClientPromise?: Promise<MongoClient> };
    if (!g._mongoClientPromise) {
      g._mongoClientPromise = new MongoClient(uri).connect();
    }
    clientPromise = g._mongoClientPromise;
  } else {
    clientPromise = new MongoClient(uri).connect();
  }

  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db("sleek");
}
