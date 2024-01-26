import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { DirectoryCategory } from "../../@types/DirectoryCategory";
import React from "react";
import { Link } from "react-router-dom";

type DirectoryItemProps = {
  category: DirectoryCategory;
};

const HomeItems = ({ category }: DirectoryItemProps) => {
  const { title, imageUrl, route } = category;

  return (
    <Grid
      item
      sx={{
        minWidth: "20%",
        height: 240,
        flex: "1 1 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "0 7.5px 15px",
        overflow: "hidden",
        position: "relative",
        "&:first-of-type": {
          marginRight: 1.5,
        },
        "&:last-child": {
          marginLeft: 1,
        },
        "&:hover": {
          cursor: "pointer",
          "& .backgroundImage": {
            transform: "scale(1.1)",
            transition: "transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)",
          },
          "& .body": {
            opacity: 2,
          },
        },
      }}
      component={Link}
      to={route}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white", // Set background color here
        }}
      >
        <CardMedia
          className="backgroundImage"
          component="img"
          alt={title}
          height="140"
          image={imageUrl}
          sx={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CardContent
          className="body"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 25px",
            border: "1px solid black",
            opacity: 0.7,
            "& h2": {
              fontWeight: "bold",
              margin: "0 6px 0",
              fontSize: 22,
              color: "black",
              textTransform: "uppercase",
            },
            "& p": {
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        >
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body2">Shop Now</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default HomeItems;
