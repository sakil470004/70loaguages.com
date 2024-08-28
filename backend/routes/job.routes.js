import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addJob,
  getAllJob,
  getCurrentJob,
  getCurrentUserJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/getAllJob", getAllJob);
router.get("/getCurrentJob/:id", getCurrentJob);
router.get("/getCurrentUserJob/:userId",getCurrentUserJob)

router.post("/addJob", addJob);


export default router;
