import expressAsyncHandler from "express-async-handler";
import Product from "../../models/ProductsModel";

const getAllProducts = expressAsyncHandler(async (req, res) => {
  const totalProducts = await Product.aggregate([
    {
      $project: {
        info: "$info",
      },
    },
    {
      $unwind: "$info",
    },
    {
      $project: {
        _id: "$info._id",
        name: "$info.name",
        price: "$info.price",
        imageUrl: "$info.imageUrl",
        size: "$info.size",
      },
    },
    {
      $group: {
        _id: null,
        info: {
          $push: {
            _id: "$_id",
            name: "$name",
            price: "$price",
            imageUrl: "$imageUrl",
            size: "$size",
          },
        },
      },
    },
  ]);

  res.json({ totalProducts });
});

export default getAllProducts;
