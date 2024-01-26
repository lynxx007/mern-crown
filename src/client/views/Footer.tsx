import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as Router } from "react-router-dom";
import React from "react";
const Footer = () => {
  return (
    <Box
      component={"footer"}
      sx={{
        maxWidth: "auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.common.white,
        padding: (theme) => theme.spacing(3),
        mt: { md: 0 },
      }}
    >
      <Grid container>
        <Grid item xs={12} md={4} sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ mb: 2, color: (theme) => theme.palette.common.white }}
          >
            Quick Links
          </Typography>
          <Link
            color="inherit"
            underline="none"
            component={Router}
            to="/"
            sx={{ display: "block", mb: 2 }}
          >
            Home
          </Link>
          <Link
            color="inherit"
            underline="none"
            component={Router}
            to="/about"
            sx={{ display: "block", mb: 2 }}
          >
            About
          </Link>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              color: (theme) => theme.palette.common.white,
            }}
          >
            Contact Information
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <LocationOnIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1" sx={{ color: "white" }}>
              Medan, Indonesia
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <MailOutlineIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1" sx={{ color: "white" }}>
              luthfirizky7@gmail.common
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "white",
              justifyContent: "center",
            }}
          >
            <PhoneIcon sx={{ marginRight: 1 }} />
            <Typography variant="body1" sx={{ color: "white" }}>
              08123456789
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ marginBottom: 4, color: "white" }}>
            Socials Media
          </Typography>
          <BottomNavigation
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              justifyContent: { xs: "space-evenly" },
              alignItems: "center",
              backgroundColor: (theme) => theme.palette.primary.main,
              rowGap: 1,
            }}
          >
            <BottomNavigationAction
              LinkComponent={Router}
              icon={<InstagramIcon />}
            />
            <BottomNavigationAction
              LinkComponent={Router}
              icon={<FacebookIcon />}
            />
            <BottomNavigationAction
              LinkComponent={Router}
              icon={<TwitterIcon />}
            />
          </BottomNavigation>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
