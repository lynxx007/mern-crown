import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import Navigation from "../views/Navigation";

const AboutPage = () => {
  return (
    <>
      <Navigation />
      <Container sx={{ marginTop: 4 }} maxWidth="md">
        <Paper sx={{ padding: 3 }} elevation={3}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our website! We are a team of passionate individuals
            dedicated to providing valuable information and services to our
            users.
          </Typography>
          <Typography variant="body1" paragraph>
            Feel free to explore our website and learn more about what we have
            to offer.
          </Typography>
          <Typography variant="h5" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or inquiries, please do not hesitate to
            contact us at{" "}
            <a href="mailto:luthfirizky777@gmail.com">
              luthfirizky777@gmail.com
            </a>
            .
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontStyle: "italic" }}>
            This project is just for portfolio purpose.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default AboutPage;
