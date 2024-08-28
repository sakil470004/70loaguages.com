import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addJob,
  getAllJob,
  getCurrentJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/getAllJob", getAllJob);
router.get("/getCurrentJob/:id", getCurrentJob);

router.post("/addJob", addJob);

export default router;
