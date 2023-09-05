"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users")); // Import the user search route
const connection_1 = require("./connection");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 4200;
// Connect to MongoDB
(0, connection_1.connectDatabase)().catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
});
app.use(body_parser_1.default.json());
const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/users", users_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
