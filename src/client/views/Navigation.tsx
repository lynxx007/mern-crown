import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link as Router, useLocation } from "react-router-dom";
import crown from "../assets/crown.svg";
import Badge from "@mui/material/Badge";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useLogoutUserMutation } from "../api/authApiSlice";
import {
  resetError,
  resetSuccess,
  setError,
  setSuccess,
} from "../app/UI/uiSlice";
import { logOut } from "../app/auth/authSlice";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import { deleteItem } from "../app/cart/cartSlice";
import { styled } from "@mui/material";
import { isErrorWithMsg } from "../utils/rtkErrorHandling";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
  pt: 1,
};

interface Item {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string[];
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Navigation({
  open,
  handleDrawerOpen,
}: {
  open?: boolean;
  handleDrawerOpen?: () => void;
}) {
  const selectUser = useAppSelector((state) => {
    if (!state.auth.accessToken) {
      return undefined;
    }

    return state.auth;
  });

  const cartState = useAppSelector((state) => state.cart.items);
  const [logout] = useLogoutUserMutation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElCart, setAnchorElCart] = React.useState<HTMLElement | null>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseCartMenu = () => {
    setAnchorElCart(null);
  };

  const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const logOutHandler = async () => {
    try {
      const response = await logout().unwrap();

      dispatch(logOut(undefined));
      dispatch(setSuccess(response.msg));
      setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
    } catch (error) {
      if (isErrorWithMsg(error)) {
        dispatch(setError(error.data.msg));
        setTimeout(() => dispatch(resetError(undefined)), 5000);
      }
    }
  };

  return (
    <div>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleDrawerOpen} sx={{ padding: 0 }}>
              {location.pathname === "/signUp" ||
              location.pathname === "/signIn" ||
              location.pathname === "/" ||
              location.pathname === "/shop" ||
              location.pathname === "/profile" ||
              location.pathname === "/shop/hats" ||
              location.pathname === "/shop/sneakers" ||
              location.pathname === "/shop/jackets" ||
              location.pathname === "/shop/women" ||
              location.pathname === "/shop/men" ||
              location.pathname === "/checkout" ||
              open ? (
                <MenuIcon sx={{ visibility: "hidden", display: "none" }} />
              ) : (
                <MenuIcon sx={{ color: "white" }} />
              )}
            </IconButton>
            <img
              src={crown}
              alt="Crown Logo"
              style={{ width: 32, marginRight: 8, marginLeft: "10px" }}
            />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              to="/"
              component={Router}
              sx={{ fontSize: { xs: 12 } }}
            >
              {"CROWN"}
            </Link>
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                ...rightLink,
                textDecoration: "none",
                fontSize: {
                  xs: 12,
                },
                mt: selectUser ? 1.2 : 0,
                mr: selectUser ? 1.2 : 0,
              }}
              color="inherit"
              variant="h6"
              to="/shop"
              component={Router}
            >
              {"Shop"}
            </Typography>
            {selectUser ? (
              <>
                <Tooltip title={selectUser?.user?.username}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar
                      src={selectUser?.user?.imageUrl}
                      alt={selectUser?.user?.username}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={Router} to="/profile">
                    {"Profile"}
                  </MenuItem>

                  {selectUser?.user?.roles?.includes("Admin") && (
                    <MenuItem component={Router} to="/dashboard">
                      {"Dashboard"}
                    </MenuItem>
                  )}
                  <MenuItem
                    component={Router}
                    to="/"
                    onClick={logOutHandler}
                    sx={{ color: "red" }}
                  >
                    {"Log Out"}
                  </MenuItem>
                </Menu>
                {/* Add additional elements for the user, if needed */}
              </>
            ) : (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  to="/signIn"
                  component={Router}
                  sx={{ ...rightLink, fontSize: { xs: 12 } }}
                >
                  {"Login"}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  to="/signUp"
                  component={Router}
                  sx={{
                    ...rightLink,
                    color: "secondary.main",
                    fontSize: { xs: 12 },
                  }}
                >
                  {"Register"}
                </Link>
              </>
            )}
            <IconButton
              color="inherit"
              sx={{ ...rightLink, ml: 1 }}
              onClick={handleOpenCartMenu}
            >
              <Badge
                badgeContent={cartState
                  .map((item) => item.quantity)
                  .reduce((a, b) => a + b, 0)}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-cart"
              anchorEl={anchorElCart}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElCart)}
              onClose={handleCloseCartMenu}
            >
              {cartState.map((item: Item) => (
                <MenuItem key={item._id}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: 50, marginRight: 10 }}
                  />
                  <Typography>{`${item.name} x${item.quantity} $${
                    item.price * item.quantity
                  }`}</Typography>
                  <IconButton onClick={() => dispatch(deleteItem(item))}>
                    <DeleteIcon />
                  </IconButton>
                </MenuItem>
              ))}
              {cartState.length === 0 && (
                <MenuItem disabled>
                  <Typography>Your cart is empty</Typography>
                </MenuItem>
              )}
              <Divider />
              <MenuItem
                component={Router}
                to={location.pathname === "/checkout" ? "/shop" : "/checkout"}
              >
                <Typography color="primary" textAlign={"center"}>
                  {location.pathname === "/checkout"
                    ? "Back to shop"
                    : "View cart"}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default Navigation;
