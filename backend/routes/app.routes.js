import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import { setBossCommission,setUserCommission ,getVariables,setTier1,setTier2,setTier3,updateSellsRefCommission} from "../controllers/app.controller.js";

const router = express.Router();
router.get("/variables", getVariables);

router.post("/usercommission", setUserCommission);
router.post('/bosscommission', setBossCommission);
router.post('/tier1', setTier1);
router.post('/tier2', setTier2);
router.post('/tier3', setTier3);
router.post('/salerepcommission',updateSellsRefCommission); 



export default router;