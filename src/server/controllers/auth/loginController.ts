import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../../models/UserModel";
import "dotenv/config";

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add email and password");
  }

  const existUser = await User.findOne({ email }).select("+password");

  if (!existUser || !(await existUser.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  if (!existUser.isEmailVerified) {
    res.status(401);
    throw new Error("Please verify your email first");
  }

  if (!existUser.active) {
    res.status(401);
    throw new Error("Your account has been deactivated");
  }

  const isPasswordValid =
    existUser && (await existUser.comparePassword(password));

  if (isPasswordValid) {
    let newRefreshTokenArray = !req.cookies?.jwt
      ? existUser.refreshToken
      : existUser.refreshToken.filter((token) => token !== req.cookies.jwt);

    if (req.cookies?.jwt) {
      const existRefreshToken = await User.findOne({
        refreshToken: req.cookies.jwt,
      });

      if (!existRefreshToken) newRefreshTokenArray = [];

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
    }

    const refreshToken = jwt.sign(
      {
        id: existUser._id,
      },
      process.env.JWT_REFRESH_KEY as string,
      { expiresIn: "1d" }
    );

    await User.findByIdAndUpdate(existUser._id, {
      refreshToken: [...newRefreshTokenArray, refreshToken],
    });

    const accessToken = jwt.sign(
      {
        id: existUser._id,
        roles: existUser.roles,
      },
      process.env.JWT_ACCESS_KEY as string,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user: existUser,
      msg: `${existUser.username} logged in successfully`,
      accessToken,
    });
  }
});

export default loginUser;
