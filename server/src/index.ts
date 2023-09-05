import express, { Request, Response } from "express";

const app = express();
const port = 4200;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
