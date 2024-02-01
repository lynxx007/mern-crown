import React from "react";
import { Container, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <CheckCircleOutlineIcon sx={{ color: "success.main", fontSize: 80 }} />
      <Typography
        variant="h4"
        component="h1"
        sx={{ mt: 3, color: "success.main" }}
      >
        Payment Successful
      </Typography>
      <Typography variant="body1" sx={{ mt: 3 }}>
        Your payment has been successfully processed. Thank you for your
        purchase!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3, fontWeight: "bold" }}
        onClick={() => navigate("/")}
      >
        Return to Homepage
      </Button>
    </Container>
  );
};

export default PaymentSuccessPage;
