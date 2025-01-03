import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import fs from "fs";
// import OpenAI from "openai";
// import multer from "multer";
import cors from "cors";
import Stripe from "stripe";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import appRoutes from "./routes/app.routes.js";
import jobRoutes from "./routes/job.routes.js";
import languageCostRoutes from "./routes/languagecost.routes.js";
import notification from "./routes/notification.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import languageManagement from "./routes/languageManagement.routes.js";
import reviewRoutes from "./routes/review.routes.js";

import { Parser } from "json2csv";
import cron from "node-cron";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import User from "./models/user.model.js";



// Middleware setup
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// // Initialize the OpenAI client
// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
// // Multer setup for handling file uploads
// const upload = multer({ dest: "uploads/" });

// Route for transcribing audio files using OpenAI's Whisper model
// app.post("/transcribe", upload.single("audio"), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No audio file provided." });
//   }

//   const audioFilePath = req.file.path;

//   try {
//     // Use OpenAI's Whisper API to transcribe the audio
//     const transcription = await openai.audio.transcriptions.create({
//       file: fs.createReadStream(audioFilePath),
//       model: "whisper-1",
//     });

//     // Return the transcription result to the client
//     await console.log("Transcription:", transcription);
//     res.status(200).json({ transcription: transcription.text });
//   } catch (error) {
//     console.error("Error processing transcription:", error.message || error);
//     res.status(500).json({ error: "Error processing transcription." });
//   } finally {
//     // Clean up the uploaded file after processing
//     fs.unlink(audioFilePath, (err) => {
//       if (err) console.error("Failed to delete temp file:", err);
//     });
//   }
// });

// Payment intent creation route using Stripe
const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);
app.post("/create-payment-intent", async (req, res) => {
  try {
    const job = req.body;
    const { price, success_url, cancel_url } = job;

    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const amount = parseInt(price * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: job.title },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${success_url}`,
      cancel_url: `${cancel_url}`,
    });

    res.json({ url: session.url, session });
  } catch (err) {
    console.error("Error creating payment intent:", err);
    res.status(500).json({
      error: "Payment intent creation failed. Please try again.",
      message: err.message,
    });
  }
});

// Nodemailer configuration for email sending
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});
// =============
// Connect to MongoDB
connectToMongoDB();
// =============
// for automatic file save
// 2. Fetch all user data
const fetchAllUserData = async () => {
  try {
    const users = await User.find(); // Fetch all users from the collection
    return users.map(user => user.toObject()); // Convert to plain objects
  } catch (error) {
    console.error('Error fetching user data from MongoDB:', error);
    return [];
  }
};

// 3. Convert user data to CSV
const convertToCSV = (userData) => {
  try {
    if (!userData.length) {
      console.log('No user data found to convert to CSV');
      return '';
    }
    const fields = Object.keys(userData[0]); // Get keys (fields) from first user
    const json2csvParser = new Parser({ fields });
    return json2csvParser.parse(userData); // Convert to CSV
  } catch (error) {
    console.error('Error converting to CSV:', error);
    return '';
  }
};
// 4. Save CSV data to a file
const saveCSVToFile = (csvData) => {
  if (!csvData) return;
  
  const date = new Date();
  const fileName = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}.csv`;

  fs.writeFile("./cvsData/"+fileName, csvData, (err) => {
    if (err) {
      console.error('Error saving CSV file:', err);
    } else {
      console.log(`CSV file saved as ${fileName}`);
    }
  });
};
// 5. Main function to handle fetching, converting, and saving user data
const generateUserReport = async () => {
  console.log('Generating user data report...');
  const userData = await fetchAllUserData();
  const csvData = convertToCSV(userData);
  saveCSVToFile(csvData);
};
// Schedule to run every Sunday at midnight
cron.schedule('0 0 * * 0', () => {
  console.log('Running weekly user data export...');
  generateUserReport();
});

//=======finished
// for automatic file save
// ====================
// Routing setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/app", appRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/languagecost", languageCostRoutes);
app.use("/api/notification", notification);
app.use("/api/payment", paymentRoutes);
app.use("/api/languageManagement", languageManagement);
app.use("/api/review", reviewRoutes);

// Serve static files in production
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

// Start the server and connect to MongoDB
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});

export default app;
