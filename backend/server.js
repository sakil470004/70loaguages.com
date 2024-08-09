import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

app.use(express.json());// to parse the body of the request
app.use(cookieParser());// to parse the cookies

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   // root route
//   res.send(`API is running.... ${PORT}`);
// });
// it going catch all the routes that start with /api/auth/xxx** */
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
