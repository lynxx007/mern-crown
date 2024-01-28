import Button from "@mui/material/Button";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { emptyCart } from "../app/cart/cartSlice";

import { useAppDispatch } from "../hooks/reduxHooks";

const CheckoutForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe || !clientSecret) return;
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment/success",
      },
    });

    dispatch(emptyCart(undefined));

    setIsLoading(false);
  };
  return (
    <form>
      <PaymentElement options={{ layout: "tabs" }} />
      <Button
        disabled={!stripe || !elements || isLoading}
        variant="contained"
        type="submit"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}
      >
        Process Payment
      </Button>
    </form>
  );
};

export default CheckoutForm;
