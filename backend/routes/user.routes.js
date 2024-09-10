import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,makeAdmin,referUser,checkAdmin,myReferredUsers,getUserById,sendReferByEmail,getAllUserForRefresh,addAllThePrevUser } from "../controllers/user.controller.js";

const router = express.Router();
// check if user is admin 
router.get("/checkadmin/:adminId", checkAdmin);

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

// special case for what to change model
router.get("/getAllUsers", getAllUserForRefresh);
// this route is used to add all the previous user 
router.post("/addAllThePrevUser", addAllThePrevUser);

// this route is used to get all users for the sidebar
router.get("/:uid", getUsersForSidebar);

export default router;