import Navigation from "../views/Navigation";
import useTitle from "../hooks/useTitle";
import Grid from "@mui/material/Grid";
import HomeItems from "../views/HomeItems";
import { DirectoryCategory } from "../../@types/DirectoryCategory";
import { useHomeQuery } from "../api/apiSlice";
import Error from "./Error";
import Footer from "../views/Footer";
import React from "react";
import Spinner from "../components/Spinner";
function Landing() {
  useTitle("Home | CROWN");
  const { data, isLoading, isError, isSuccess } = useHomeQuery();

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = data.map((category: DirectoryCategory) => (
      <HomeItems key={category.id} category={category} />
    ));
  } else if (isError) {
    content = <Error />;
  }

  return (
    <>
      <Navigation />
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {content}
      </Grid>
      <Footer />
    </>
  );
}

export default Landing;
