import express from "express";
import createPaymentIntent from "../controllers/payment/createPaymentIntent";
import checkAuth from "../middlewares/checkAuth";
import getTotalAmountPaid from "../controllers/payment/getTotalAmountPaid";

const router = express.Router();

router.post("/create-payment-intent", checkAuth, createPaymentIntent);

router.get("/getAmountPaid", checkAuth, getTotalAmountPaid);

export default router;
