import User from "../../models/UserModel";
import VerifyToken from "../../models/VerifyToken";
import sendEmail from "../../utils/sendEmail";
import "dotenv/config";
import { randomBytes } from "crypto";
import expressAsyncHandler from "express-async-handler";

const domain = process.env.DOMAIN;

const forgotPasswordRequest = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please add email");
  }

  const existUser = await User.findOne({ email });

  if (!existUser) {
    res.status(400);
    throw new Error("User not found");
  }

  if (!existUser.isEmailVerified) {
    res.status(400);
    throw new Error("Please verify your email first");
  }

  let verificationToken = await VerifyToken.findOne({ _userId: existUser._id });

  if (verificationToken) {
    await verificationToken.deleteOne();
  }

  verificationToken = await VerifyToken.create({
    _userId: existUser._id,
    token: randomBytes(32).toString("hex"),
  });

  await sendEmail(
    existUser.email,
    {
      username: existUser.username,
      link: `${domain}/auth/reset_password?emailToken=${verificationToken.token}&userId=${existUser._id}`,
    },
    "Reset Password Request",
    "./templates/resetPasswordRequest.handlebars"
  );

  res.status(200).json({
    success: true,
    msg: `Reset password link sent to ${existUser.email}`,
  });
});

const resetPasswordHandler = expressAsyncHandler(async (req, res) => {
  const { password, passwordConfirm, userId } = req.body;

  if (!password || !passwordConfirm) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const existPasswordResetToken = await VerifyToken.findOne({
    _userId: userId,
  });

  if (!existPasswordResetToken) {
    res.status(400);
    throw new Error("Invalid token");
  }

  const userPasswordReset = await User.findById(
    existPasswordResetToken._userId
  ).select("-passwordConfirm");

  if (!userPasswordReset) {
    res.status(400);
    throw new Error("User not found");
  }

  userPasswordReset.password = password;
  await userPasswordReset.save();

  await sendEmail(
    userPasswordReset.email,
    { username: userPasswordReset.username, link: `${domain}/signIn` },
    "Password Reset",
    "./templates/resetPasswordSuccess.hbs"
  );

  res.status(200).json({
    success: true,
    msg: "Password reset successfully",
  });
});

export { forgotPasswordRequest, resetPasswordHandler };
