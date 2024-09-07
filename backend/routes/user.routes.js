import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,makeAdmin,referUser,checkAdmin,myReferredUsers,getUserById,sendReferByEmail } from "../controllers/user.controller.js";

const router = express.Router();
// check if user is admin 
router.get("/checkadmin/:adminId", checkAdmin);
// this route is used to get all users for the sidebar
router.get("/:uid", getUsersForSidebar);
// get all my referred users
// router.get("/myreferredusers/:currentId",protectRoute,myReferredUsers); 
router.get("/myreferredusers/:currentId",myReferredUsers); 
// get user by user id
router.get("/getUser/:userId", getUserById);

// this route used to refer a user to another user
router.post("/refer/", referUser);
// this route is used to make a user an admin
router.post("/makeadmin/", makeAdmin);
// this route is used to send refer by email
router.post("/sendReferByEmail/",sendReferByEmail);


export default router;