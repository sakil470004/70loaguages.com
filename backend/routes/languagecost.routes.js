import express from "express";

import { getAllLanguageCost,addLanguageCost,editLanguageCost,deleteLanguageCost} from "../controllers/languagecost.controller.js";

const router = express.Router();
// get all languages cost 
router.get("/all/", getAllLanguageCost);
// post a new language cost
router.post("/add/", addLanguageCost);

router.put("/edit/", editLanguageCost);

router.delete("/delete/", deleteLanguageCost);


export default router;