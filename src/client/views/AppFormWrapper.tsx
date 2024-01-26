import Box from "@mui/material/Box";
import crownLogo from "../assets/crown.svg";
import Paper from "@mui/material/Paper";
import React from "react";
import Grid from "@mui/material/Grid";

const AppForm = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children } = props;
  return (
    <Grid container component={"main"} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${crownLogo})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppForm;
