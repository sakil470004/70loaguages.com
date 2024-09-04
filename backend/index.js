import app from "./server.js";
import cors from "cors";
app.use(cors({
  origin: '*', // This allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  exposedHeaders: ['Content-Type', 'Authorization'], // Exposed headers
  credentials: true, // Allow credentials (cookies, HTTP authentication)
  preflightContinue: false, // Pass the CORS preflight response to the next handler
  optionsSuccessStatus: 204 // Status code for successful OPTIONS request
}));


export default function (req, res) {
  app(req, res);
};