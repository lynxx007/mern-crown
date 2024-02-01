import { Request, Response } from "express";
import { Category } from "../../models/categoriesModel";
import expressAsyncHandler from "express-async-handler";
import { client } from "../../main";
const populateCategoriesHome = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const isDataThere = await client.exists("categories");

    if (isDataThere) {
      const categoriesData = await client.lRange("categories", 0, -1);
      const parsedCategories = [];

      for (const category of categoriesData) {
        parsedCategories.push(JSON.parse(category));
      }

      res.status(200).json(parsedCategories);
      return;
    }

    const categoriesItem = await Category.find({});
    for (const category of categoriesItem) {
      await client.rPush("categories", JSON.stringify(category));
    }
    res.status(200).json(categoriesItem);
  }
);

export default populateCategoriesHome;
