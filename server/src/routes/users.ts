import { Router, Request, Response } from "express";
import { getDatabase } from "../connection";

const router = Router();

router.post("/search", async (req: Request, res: Response) => {
  const { email, number } = req.body;
  try {
    const db = getDatabase();

    const usersCollection = db.collection("users");

    // Remove dashes from the number, if present
    const cleanNumber = number ? number.replace(/-/g, "") : undefined;

    let query: { email: string; number?: string } = { email };

    // Only add the "number" field to the query if it is provided
    if (cleanNumber) {
      query.number = cleanNumber;
    }
    const user = await usersCollection.findOne(query);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error searching for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
