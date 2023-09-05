import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db: Db | null = null;

export async function connectDatabase() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MongoDB URI not found in environment variables");
    }

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
