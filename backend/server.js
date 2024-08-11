import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

//  it will give the current directory name
const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the body of the request
app.use(cookieParser()); // to parse the cookies

const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   // root route
//   res.send(`API is running.... ${PORT}`);
// });
// it going catch all the routes that start with /api/auth/xxx** */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
// static files in production
app.use(express.static(path.join(__dirname, "/frontend/dist")));

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
