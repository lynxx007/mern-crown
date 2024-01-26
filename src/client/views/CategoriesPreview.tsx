import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link as Router } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { useGetShopDataQuery } from "../api/apiSlice";
import Spinner from "../components/Spinner";
import Error from "../routes/Error";
import ProductCard from "../components/ProductsCard";
import Navigation from "./Navigation";
import Footer from "./Footer";

const CategoriesPreview = () => {
  useTitle("Shop | CROWN");
  const { data, isLoading, isError, isSuccess } = useGetShopDataQuery();

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isError) {
    content = <Error />;
  } else if (isSuccess) {
    content = data.map((items) => {
      const { _id, category, info } = items;

      return (
        <Box key={_id} sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
          <Typography
            component={Router}
            to={`/shop/${category}`}
            variant="h5"
            sx={{
              mb: 4,
              color: (theme) => theme.palette.primary.main,
              fontSize: { xs: 24, sm: 28 },
              cursor: "pointer",
              textDecoration: "none",
              width: "fit-content",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            {category}
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              columnGap: 1,
              mx: "auto",
            }}
          >
            {info.slice(0, 4).map((product) => (
              <ProductCard key={product._id} items={product} />
            ))}
          </Grid>
        </Box>
      );
    });
  }
  return (
    <>
      <Navigation />
      {content}
      <Footer />
    </>
  );
};

export default CategoriesPreview;
