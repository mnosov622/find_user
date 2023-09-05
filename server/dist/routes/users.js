"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = require("../connection");
const router = (0, express_1.Router)();
let currentSearchTimeout = null;
router.post("/search", async (req, res) => {
    const { email, number } = req.body;
    if (currentSearchTimeout) {
        clearTimeout(currentSearchTimeout);
        currentSearchTimeout = null;
    }
    currentSearchTimeout = setTimeout(async () => {
        try {
            const db = (0, connection_1.getDatabase)();
            const usersCollection = db.collection("users");
            // Remove dashes from the number, if present
            const cleanNumber = number ? number.replace(/-/g, "") : undefined;
            let query = { email };
            // Only add the "number" field to the query if it is provided
            if (cleanNumber) {
                query.number = cleanNumber;
            }
            const user = await usersCollection.findOne(query);
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
    }, 5000); // 5 seconds delay
});
exports.default = router;
