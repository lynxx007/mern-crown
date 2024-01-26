import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";

import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Navigation from "./Navigation";
import Logo from "../components/Logo";
import ChartIcon from "@mui/icons-material/BarChart";
import ProductsIcon from "@mui/icons-material/LocalMall";
import CustomersIcon from "@mui/icons-material/Person";
import { Outlet, Link as Router } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";

import OrderIcon from "@mui/icons-material/Receipt";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const listItemsUp = [
  {
    text: "Overview",
    icon: <ChartIcon />,
    to: "/dashboard",
  },
  {
    text: "Products",
    icon: <ProductsIcon />,
    to: "/dashboard/products",
  },
  {
    text: "Customers",
    icon: <CustomersIcon />,
    to: "/dashboard/customers",
  },
  {
    text: "Orders",
    icon: <OrderIcon />,
    to: "/dashboard/orders",
  },
];

const listItemsDown = [
  {
    text: "Settings",
    icon: <SettingsIcon />,
    to: "/dashboard/settings",
  },
  {
    text: "Logout",
    icon: <LogoutIcon />,
    to: "/signIn",
    onclick: () => {},
  },
];
const SideNav = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navigation open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "grey",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: theme.palette.primary.main }}>
          <Logo />
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, textAlign: "center", color: "white" }}
          >
            DASHBOARD
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listItemsUp.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Router}
                to={item.to}
                sx={{
                  textDecoration: "none",
                  color: "inherit", // Inherit color from the parent
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Change background color on hover
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {listItemsDown.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Router} to={item.to}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};
export default SideNav;
