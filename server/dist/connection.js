"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
let db = null;
async function connectDatabase() {
    try {
        const uri = "mongodb+srv://mnosov622:linktag18@cluster0.thdiebn.mongodb.net/?retryWrites=true&w=majority";
        const client = new mongodb_1.MongoClient(uri);
        await client.connect();
        db = client.db(); // Store the database connection
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
}
exports.connectDatabase = connectDatabase;
function getDatabase() {
    if (!db) {
        throw new Error("MongoDB connection not established");
    }
    return db;
}
exports.getDatabase = getDatabase;
