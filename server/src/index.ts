import express, { Express, Request, Response, NextFunction } from "express";
import usersRoute from "./routes/users"; // Import the user search route
import { connectDatabase } from "./connection";
import bodyParser from "body-parser";
import cors from "cors";

const app: Express = express();
const port: number = 4200;

// Connect to MongoDB
connectDatabase().catch((error: Error) => {
  console.error("Failed to connect to MongoDB:", error);
});

app.use(bodyParser.json());

const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
