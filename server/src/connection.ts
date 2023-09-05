import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

export async function connectDatabase() {
  try {
    const uri =
      "mongodb+srv://mnosov622:linktag18@cluster0.thdiebn.mongodb.net/users?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    await client.connect();
    db = client.db(); // Store the database connection

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error("MongoDB connection not established");
  }
  return db;
}
