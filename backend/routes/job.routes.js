import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  addJob,
  getAllJob,
  getCurrentJob,
  getCurrentUserJob,
  deleteJob,
  updateJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/getAllJob", getAllJob);
router.get("/getCurrentJob/:id", getCurrentJob);
router.get("/getCurrentUserJob/:userId",protectRoute,getCurrentUserJob)

router.post("/addJob",protectRoute, addJob);

// update by jobId
router.put("/updateJob/:id", protectRoute, updateJob);

// delete by jobId
router.delete("/delete/:id", protectRoute, deleteJob);


export default router;
