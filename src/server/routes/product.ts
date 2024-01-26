import express from "express";
import checkAuth from "../middlewares/checkAuth";
import { upload } from "../config/multer";
import roleCheck from "../middlewares/roleCheck";
import addProduct from "../controllers/product/addProduct";
import categoriesPreview from "../controllers/categoriesPreview/categoriesPreview";
import getAllProducts from "../controllers/product/getAllProducts";

const router = express.Router();

router.post(
  "/addProduct",
  checkAuth,
  roleCheck("Admin"),
  upload.single("image"),
  addProduct
);

router.get("/searchProducts", checkAuth, categoriesPreview);

router.get("/getAllProducts", checkAuth, getAllProducts);

export default router;
