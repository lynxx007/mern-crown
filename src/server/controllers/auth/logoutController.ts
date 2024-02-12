import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";
import "dotenv/config";

const logout = expressAsyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    res.status(204);
    throw new Error("No token found");
  }

  const existUser = await User.findOne({ refreshToken: cookies.jwt });

  if (!existUser) {
    res.status(204).clearCookie("jwt", {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    throw new Error("No user found");
  }

  existUser.refreshToken = existUser.refreshToken.filter(
    (token) => token !== cookies.jwt
  );
  await existUser.save();

  res.clearCookie("jwt", {
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });
  res.status(200).json({ success: true, msg: `Logged out` });
});

export default logout;
