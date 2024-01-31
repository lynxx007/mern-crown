import expressAsyncHandler from "express-async-handler";
import Product from "../../models/ProductsModel";
import User from "../../models/UserModel";
import { uploadImage } from "../../config/cloudinary";

const addProduct = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (req.file) {
    const findCategory = await Product.findOne({ category: req.body.category });

    if (!findCategory) {
      res.status(400);
      throw new Error("Category not found");
    }
    const url = await uploadImage(req.file.path);
    findCategory.info.push({
      name: req.body.name,
      price: req.body.price,
      imageUrl: url,
    });
    findCategory.save();

    res.status(201).json({ success: true, msg: "Product added successfully" });
  }
});
export default addProduct;
