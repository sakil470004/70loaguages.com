import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
    getAllLanguage
    , addLanguage
    , updateLanguage
    , deleteLanguage
    , addMultipleAllLanguage
} from "../controllers/languageManagement.controller.js";

const router = express.Router();

router.get("/getAllLanguage", getAllLanguage);
router.post("/addLanguage",protectRoute,  addLanguage);
router.put("/updateLanguage/:id",protectRoute, updateLanguage);
router.delete("/deleteLanguage/:id",protectRoute, deleteLanguage);
// note this route for development purpose only
router.post("/addMultipleAllLanguage", addMultipleAllLanguage);

export default router;
