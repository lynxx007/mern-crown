import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import BarIcon from "@mui/icons-material/BarChart";
import UserIcon from "@mui/icons-material/Person";
import ProductIcon from "@mui/icons-material/Inventory2";
import { useGetAllUsersQuery } from "../../api/userApiSlice";
import Spinner from "../../components/Spinner";
import { useGetAllProductsQuery } from "../../api/productSlice";
import { useGetTotalAmountPaidQuery } from "../../api/paymentApiSlice";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useMediaQuery, useTheme } from "@mui/material";

const Overview = () => {
  const { data, isSuccess, isLoading } = useGetAllUsersQuery(undefined);
  const {
    data: allProducts,
    isSuccess: isSuccessProduct,
    isLoading: isLoadingProduct,
  } = useGetAllProductsQuery();
  const {
    data: totalAmount,
    isSuccess: isSuccessAmount,
    isLoading: isLoadingAmount,
  } = useGetTotalAmountPaidQuery();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  let content;
  if (isLoading || isLoadingProduct || isLoadingAmount) {
    content = <Spinner />;
  } else if (isSuccess && isSuccessProduct && isSuccessAmount) {
    console.log(totalAmount);

    content = (
      <>
        <Grid item xs={12} md={12}>
          <Box display={"flex"} justifyContent={"space-evenly"}>
            <Box
              sx={{
                minWidth: 200,
                minHeight: 100,
                borderRadius: 2,
                border: "1px solid grey",
              }}
            >
              <Box display={"flex"}>
                <IconButton color="primary">
                  <BarIcon />
                </IconButton>
                <Typography variant="subtitle1" align="center" pt={1}>
                  Total Sales
                </Typography>
              </Box>
              <Typography variant="h3" align="left" px={2}>
                ${totalAmount.totalAll}
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 200,
                minHeight: 100,
                borderRadius: 2,
                border: "1px solid grey",
              }}
            >
              <Box display={"flex"}>
                <IconButton color="primary">
                  <UserIcon />
                </IconButton>
                <Typography variant="subtitle1" align="center" pt={1}>
                  Total Users
                </Typography>
              </Box>
              <Typography variant="h3" align="left" px={2}>
                {data.count}
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 200,
                minHeight: 100,
                borderRadius: 2,
                border: "1px solid grey",
              }}
            >
              <Box display={"flex"}>
                <IconButton color="primary">
                  <ProductIcon />
                </IconButton>
                <Typography variant="subtitle1" align="center" pt={1}>
                  Total Products
                </Typography>
              </Box>
              <Typography variant="h3" align="left" px={2}>
                {allProducts.totalProducts[0].info.length}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} mt={2}>
          <Typography variant="h5" align="center" fontWeight={"bold"}>
            Total Amount Chart
          </Typography>
          <LineChart
            width={matches ? 1000 : 700}
            height={300}
            data={[
              ...totalAmount.totalByMonth,
              // fake data
              { month: "2024-02", total: 2000 },
              { month: "2024-03", total: 4000 },
              { month: "2024-04", total: 4121 },
              { month: "2024-05", total: 3212 },
              { month: "2024-06", total: 1121 },
              { month: "2024-07", total: 1500 },
              { month: "2024-08", total: 3000 },
              { month: "2024-09", total: 4000 },
              { month: "2024-10", total: 4012 },
              { month: "2024-11", total: 2121 },
              { month: "2024-12", total: 1000 },
            ]}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type={"monotone"} dataKey={"total"} stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
          <Typography variant="h5" align="center" fontWeight={"bold"}>
            Total Users Chart
          </Typography>
          <LineChart
            width={matches ? 1000 : 700}
            height={300}
            data={[
              ...data.howManyUsersHasBeenCreatedInAMonth,
              // fake data
              { _id: { month: 2, year: 2024 }, count: 20 },
              { _id: { month: 3, year: 2024 }, count: 40 },
              { _id: { month: 4, year: 2024 }, count: 41 },
              { _id: { month: 5, year: 2024 }, count: 32 },
              { _id: { month: 6, year: 2024 }, count: 11 },
              { _id: { month: 7, year: 2024 }, count: 15 },
              { _id: { month: 8, year: 2024 }, count: 30 },
              { _id: { month: 9, year: 2024 }, count: 40 },
              { _id: { month: 10, year: 2024 }, count: 41 },
              { _id: { month: 11, year: 2024 }, count: 21 },
              { _id: { month: 12, year: 2024 }, count: 10 },
            ]}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type={"monotone"} dataKey={"count"} stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey={"_id.month"} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Typography variant="h5" fontWeight={"bold"}>
        Overview
      </Typography>
      <Grid container spacing={2} mt={2} justifyContent={"center"}>
        {content}
      </Grid>
    </>
  );
};
export default Overview;
