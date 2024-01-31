import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";

const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id, {
    refreshToken: 0,
  }).lean();

  if (!user) {
    res.status(204);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    user,
    msg: "Welcome Back",
  });
});

export default getUserProfile;
