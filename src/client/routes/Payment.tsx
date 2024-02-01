import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

import { useAppSelector } from "../hooks/reduxHooks";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
const PaymentPage = () => {
  const clientSecret = useAppSelector(
    (state) => state.clientSecret.clientSecret
  );

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 40 }}>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>
        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "stripe" } }}
          >
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentPage;
