import Stripe from "stripe";

export const stripeConfig = new Stripe(process.env.STRIPE_SECRET_KEY as string);
