import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import PlusIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import Navigation from "../views/Navigation";

import { addItem, removeItem } from "../app/cart/cartSlice";
import { useCreatePaymentIntentMutation } from "../api/paymentApiSlice";

import { useNavigate } from "react-router-dom";
import { setClientSecret } from "../app/clientSecret";

const Checkout = () => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await createPaymentIntent({ items: cart.items }).unwrap();
      dispatch(setClientSecret(res.clientSecret));
      navigate(`/payment/${res.clientSecret}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {<Navigation />}
      <Container maxWidth="lg" sx={{ height: "100vh" }}>
        {cart.items.length !== 0 ? (
          <Grid
            container
            spacing={2}
            sx={{ height: "100%" }}
            justifyContent="center"
            alignItems="baseline"
          >
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h5" fontFamily="Raleway">
                  Checkout
                </Typography>
                <Box sx={{ p: 2 }}>
                  {cart.items.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        p: 2,
                        display: "flex",
                        gap: 2,
                        backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        marginBottom: 2,
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        style={{ borderRadius: "8px" }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          flexGrow: 1,
                        }}
                      >
                        <Typography variant="h6" fontFamily="Raleway">
                          {item.name}
                        </Typography>
                        <Typography variant="body1" fontFamily="Raleway">
                          ${item.price}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: { xs: "block", md: "flex" },
                          gap: 1,
                          alignItems: "center",
                          p: 2,
                        }}
                      >
                        <IconButton onClick={() => dispatch(addItem(item))}>
                          <PlusIcon />
                        </IconButton>
                        <Typography
                          variant="body1"
                          fontFamily="Raleway"
                          textAlign={"center"}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton onClick={() => dispatch(removeItem(item))}>
                          <MinusIcon />
                        </IconButton>
                      </Box>
                      <Box
                        sx={{
                          display: { xs: "none", md: "flex" },
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" fontFamily="Raleway">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box sx={{ p: 4 }} display="flex" justifyContent="flex-end">
                <Typography
                  variant="h5"
                  fontFamily="Raleway"
                  sx={{ p: 2 }}
                  textAlign="center"
                  fontWeight={"bold"}
                >
                  Total: $
                  {cart.items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </Typography>
                <Button variant="contained" onClick={handleSubmit}>
                  Proceed to Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" fontFamily="Raleway">
              Your cart is empty
            </Typography>
            <Button variant="contained" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Checkout;
