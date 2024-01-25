import expressAsyncHandler from "express-async-handler";
import Product from "../../models/ProductsModel";
import { client } from "../../main";

const categoriesPreview = expressAsyncHandler(async (req, res) => {
  if (req.params.category) {
    const capitalizedCategory =
      req.params.category.charAt(0).toUpperCase() +
      req.params.category.slice(1);

    if (!(await client.exists(capitalizedCategory))) {
      const products = await Product.find({
        category: capitalizedCategory,
      });

      const data = [];
      for (const product of products) {
        for (const item of product.info) {
          await client.rPush(capitalizedCategory, JSON.stringify(item));
          await client.expire(capitalizedCategory, 300);
          data.push(item);
        }
      }

      res.status(200).json(data);
      return;
    }

    const productsData = await client.lRange(capitalizedCategory, 0, -1);
    const parsedProducts = [];
    for (const product of productsData) {
      parsedProducts.push(JSON.parse(product));
    }

    res.status(200).json(parsedProducts);
    return;
  } else {
    if (!(await client.exists("products"))) {
      const result = await Product.find({});
      for (const product of result) {
        await client.rPush("products", JSON.stringify(product));
        await client.expire("products", 300);
      }

      res.status(200).json(result);
      return;
    }

    const productsData = await client.lRange("products", 0, -1);
    const parsedProducts = [];

    for (const product of productsData) {
      parsedProducts.push(JSON.parse(product));
    }

    res.status(200).json(parsedProducts);
    return;
  }
});

export default categoriesPreview;
