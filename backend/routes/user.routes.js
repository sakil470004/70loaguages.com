import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,makeAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/makeadmin/",protectRoute, makeAdmin);
router.get("/",protectRoute, getUsersForSidebar);


export default router;