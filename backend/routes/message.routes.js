import express from "express";
import {
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", getMessages);
router.post("/send/:id", sendMessages);

export default router;
