// import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import appRoutes from "./routes/app.routes.js";
import jobRoutes from "./routes/job.routes.js";
import cors from "cors";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
app.use(cors())
//  it will give the current root directory name
// const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the body of the request
app.use(cookieParser()); // to parse the cookies

const PORT = process.env.PORT || 5000;
// node mailer for sending email //it's need to create in root directory.otherwise it will not work
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});


// it going catch all the routes that start with /api/auth/xxx** */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/app", appRoutes);
app.use("/api/job", jobRoutes);
app.get("/", (req, res) => {
  // root route
  res.send(`API is running.... ${PORT}`);
});

// static files in production remove for vercel
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// // any file without the routes above will be served from the frontend/dist folder
// // redirect backend server to frontend server
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
