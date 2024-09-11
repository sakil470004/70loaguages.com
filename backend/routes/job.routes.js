import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import {
  addJob,
  getAllJob,
  getCurrentJob,
  getCurrentUserJob,
  deleteJob,
  updateJob,
  getAllTakerJob
} from "../controllers/job.controller.js";

const router = express.Router();

router.get("/getAllJob", getAllJob);
router.get("/getCurrentJob/:id", getCurrentJob);
router.get("/getCurrentUserJob/:userId",getCurrentUserJob)
// get all job by using takerId
router.get("/getAllTakerJob/:takerId", getAllTakerJob);

router.post("/addJob", addJob);

// update by jobId
router.put("/updateJob/:id", updateJob);

// delete by jobId
router.delete("/delete/:id", deleteJob);


export default router;
