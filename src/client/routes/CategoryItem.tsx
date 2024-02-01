import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { useGetDataForCategoryQuery } from "../api/apiSlice";
import Spinner from "../components/Spinner";
import Error from "../routes/Error";
import ProductCard from "../components/ProductsCard";
import Navigation from "../views/Navigation";
import Footer from "../views/Footer";
import * as React from "react";

const CategoryItem = () => {
  const { category } = useParams();

  if (!category)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Error />
      </Box>
    );

  useTitle(`Shop | ${category?.toUpperCase()}`);

  const { data, isLoading, isError, isSuccess } = useGetDataForCategoryQuery(
    category.toLowerCase()
  );

  let content;
  if (isLoading) content = <Spinner />;
  else if (isError) content = <Error />;
  else if (isSuccess)
    content = data.map((item) => {
      return (
        <Grid item key={item._id} xs={6} sm={6} md={4} lg={3}>
          <ProductCard items={item} />
        </Grid>
      );
    });

  return (
    <>
      <Navigation />
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Typography
          variant="h2"
          fontSize={"38px"}
          mb={"25px"}
          sx={{ textAlign: "center" }}
        >
          {category}
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {content}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryItem;
