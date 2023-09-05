"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = exports.connectDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db = null;
async function connectDatabase() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MongoDB URI not found in environment variables");
        }
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
