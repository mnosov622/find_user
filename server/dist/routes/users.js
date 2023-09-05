"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../connection");
const router = (0, express_1.Router)();
router.post("/search", async (req, res) => {
    const { email, number } = req.body;
    console.log("email", email, number);
    try {
        const db = (0, connection_1.getDatabase)();
        console.log("Connected to database:", db.databaseName);
        const usersCollection = db.collection("users");
        console.log("usersCollection", usersCollection);
        const user = await usersCollection.findOne({ email, number });
        console.log("user", user);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error("Error searching for user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = router;
