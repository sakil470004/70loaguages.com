import express from "express";
// import protectRoute from "../middleware/protectRoute.js";
import {
    getAllPaymentCurrentUser
    , createPayment
} from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/getAllPayment/:userId", getAllPaymentCurrentUser);
router.post("/createPayment", createPayment);



export default router;
