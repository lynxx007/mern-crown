import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";
import { uploadImage } from "../../config/cloudinary";

const updateProfile = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userExist = await User.findById(userId);
  if (!userExist) {
    res.status(400);
    throw new Error("User not found");
  }

  if (req.file) {
    const url = await uploadImage(req.file.path);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, imageUrl: url },
      { new: true, runValidators: true, select: "-refreshToken" }
    );
    res.status(200).json({
      success: true,
      updatedUser,
      msg: "Profile updated successfully",
    });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...req.body },
    { new: true, runValidators: true, select: "-refreshToken" }
  );
  res.status(200).json({
    success: true,
    user: updatedUser,
    msg: "Profile updated successfully",
  });
});

export default updateProfile;
