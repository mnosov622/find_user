import express from "express";
import usersRoute from "./routes/users"; // Import the user search route
import { connectDatabase } from "./connection";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 4200;

// Connect to MongoDB
connectDatabase().catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
});

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/users", usersRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
