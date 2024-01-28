import * as React from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface Item {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  size: string[];
  quantity?: number;
}

const NewProductCards = ({ items }: { items: Item }) => {
  const renderImg = (
    <Box
      component={"img"}
      alt={items.name}
      src={items.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );
  const renderPrice = (
    <Typography variant="subtitle1">${items.price}</Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>{renderImg}</Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color={"inherit"} underline="hover" variant="subtitle2" noWrap>
          {items.name}
        </Link>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
};

export default NewProductCards;
