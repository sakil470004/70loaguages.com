import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import { setBossCommission,setUserCommission ,getVariables} from "../controllers/app.controller.js";

const router = express.Router();
router.get("/variables", getVariables);

router.post("/usercommission", setUserCommission);
router.post('/bosscommission', setBossCommission)



export default router;