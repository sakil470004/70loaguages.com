import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { setBossCommission,setUserCommission ,getVariables} from "../controllers/app.controller.js";

const router = express.Router();
router.get("/variables",protectRoute, getVariables);

router.post("/usercommission",protectRoute, setUserCommission);
router.post('/bosscommission',protectRoute, setBossCommission)



export default router;