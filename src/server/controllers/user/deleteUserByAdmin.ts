import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";

const deleteUserByAdmin = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();

    res.status(200).json({
      success: true,
      msg: `User ${user.firstName} ${user.lastName} deleted successfully`,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export default deleteUserByAdmin;
