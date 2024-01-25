import express from "express";
import createPaymentIntent from "../controllers/payment/createPaymentIntent";
import checkAuth from "../middlewares/checkAuth";

const router = express.Router();

router.post("/create-payment-intent", checkAuth, createPaymentIntent);

export default router;
