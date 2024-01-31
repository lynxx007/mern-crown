import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";

const disableUserByAdmin = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  user.active = false;
  user.save();

  res.status(200).json({
    success: true,
    msg: `User ${user.firstName} ${user.lastName} disabled successfully`,
  });
});

export default disableUserByAdmin;
