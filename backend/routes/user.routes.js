import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,makeAdmin,referUser,checkAdmin } from "../controllers/user.controller.js";

const router = express.Router();
// this route is used to make a user an admin
router.post("/makeadmin/",protectRoute, makeAdmin);
// check if user is admin 
router.get("/checkadmin/:adminId",protectRoute, checkAdmin);
// this route is used to get all users for the sidebar
router.get("/",protectRoute, getUsersForSidebar);
// this route used to refer a user to another user
router.post("/refer/",protectRoute, referUser);


export default router;