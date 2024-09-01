import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,makeAdmin,referUser,checkAdmin,myReferredUsers,getUserById } from "../controllers/user.controller.js";

const router = express.Router();
// check if user is admin 
router.get("/checkadmin/:adminId",protectRoute, checkAdmin);
// this route is used to get all users for the sidebar
router.get("/",protectRoute, getUsersForSidebar);
// get all my referred users
router.get("/myreferredusers/:currentId",protectRoute,myReferredUsers); 
// get user by user id
router.get("/getUser/:userId", getUserById);

// this route used to refer a user to another user
router.post("/refer/",protectRoute, referUser);
// this route is used to make a user an admin
router.post("/makeadmin/",protectRoute, makeAdmin);


export default router;