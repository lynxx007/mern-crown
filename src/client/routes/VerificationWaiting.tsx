import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Navigation from "../views/Navigation";
import Footer from "../views/Footer";
import React from "react";
import useTitle from "../hooks/useTitle";
import { useNavigate } from "react-router-dom";
const waitingForVerifications = () => {
  useTitle("Verification Waiting | CROWN");
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <CircularProgress
          size={75}
          thickness={5}
          color="primary"
          sx={{ display: "flex" }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h5">Waiting for verification...</Typography>
          <Typography variant="body2">
            We are verifying your email address to ensure the security of your
            account. Please check your inbox for a verification email and follow
            the instructions. The verification token will expire in 15 minutes.
          </Typography>
          <Typography variant="body2">
            If you cannot find it, it might be in the spam folder.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Implement resend verification email functionality
              navigate("/verifyEmail");
            }}
            sx={{ mt: 2 }}
          >
            Resend Verification Email
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default waitingForVerifications;
