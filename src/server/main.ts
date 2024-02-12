import express from "express";
import ViteExpress from "vite-express";
import connectDb from "./config/connectDb";
import { errorHandler } from "./middlewares/errorCheck";
import HomeRoute from "../server/routes/home";
import ShopRoute from "../server/routes/shop";
import AuthRoute from "../server/routes/auth";
import ProductRoute from "../server/routes/product";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
// import { createClient } from "redis";
import UserRoute from "../server/routes/user";
import PaymentRoute from "../server/routes/payment";
import "dotenv/config";
import googleAuth from "./config/passportSetup";

connectDb();

// export const client = createClient({
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT),
//   },
// });

// client.on("connect", () => {
//   console.log("Redis client connected to the server");
// });

// client.connect();

const app = express();

ViteExpress.config({ mode: "production" });

app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());

googleAuth();

app.use("/api/v1/home", HomeRoute);
app.use("/api/v1/shop", ShopRoute);
app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/payment", PaymentRoute);

app.use(errorHandler);
ViteExpress.listen(app, Number(process.env.PORT), () =>
  console.log("Server is listening on port 3000...")
);
