import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addItem } from "../app/cart/cartSlice";
import { resetSuccess, setSuccess } from "../app/UI/uiSlice";
interface Item {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;

  size: string[];
  quantity?: number;
}

const ProductCard = ({ items }: { items: Item }) => {
  const { imageUrl, name, price } = items;
  const dispatch = useAppDispatch();
  const addToCart = () => {
    dispatch(addItem(items));
    dispatch(setSuccess("Item added to cart"));
    setTimeout(() => dispatch(resetSuccess(undefined)), 5000);
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", sm: "250px" },
        display: "flex",
        flexDirection: "column",
        height: 350,
        alignItems: "center",
        position: "relative",
        pb: 1,
        ":hover": {
          "& .img": { opacity: 0.8 },
          "& .button": { opacity: 0.85, display: "flex" },
        },
      }}
    >
      <CardMedia
        component="img"
        alt={name}
        className="img"
        image={imageUrl}
        sx={{
          minWidth: "100%",
          height: "75%", // Adjust height to leave space for name and price
          objectFit: "cover",
          mb: 2,
          transition: "opacity 0.3s ease",
        }}
      />
      <Button
        variant="contained"
        className="button"
        color="primary"
        sx={{
          minWidth: "80%",
          opacity: 0.7,
          position: "absolute",
          top: "260px",
          display: "none",
          transition: "opacity 0.3s ease, display 0.3s ease",
        }}
        onClick={addToCart}
      >
        Add to Cart
      </Button>
      <CardContent>
        <Box
          sx={{
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body1" sx={{ mb: 0.5, fontFamily: "monospace" }}>
            {name}
          </Typography>
          <Typography variant="body1">${price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
