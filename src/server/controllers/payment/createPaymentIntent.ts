import expressAsyncHandler from "express-async-handler";
import { stripeConfig } from "../../config/stripe";
import calculateOrderAmount from "../../utils/calculateOrderAmount";

const createPaymentIntent = expressAsyncHandler(async (req, res) => {
  const { items } = req.body;
  const paymentIntent = await stripeConfig.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  if (!paymentIntent) {
    res.status(400);
    throw new Error("Payment intent not created");
  }
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

export default createPaymentIntent;
