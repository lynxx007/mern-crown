import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";
import VerifyToken from "../../models/VerifyToken";
import sendEmail from "../../utils/sendEmail";
import "dotenv/config";
import { randomBytes } from "crypto";

const domain = process.env.DOMAIN;

const resendVerifyEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please add email");
  }

  const existUser = await User.findOne({ email });

  if (!existUser) {
    res.status(400);
    throw new Error("User not found, please register first");
  }

  if (existUser.isEmailVerified) {
    res.status(400);
    throw new Error("Email already verified");
  }

  let existVerificationToken = await VerifyToken.findOne({
    _userId: existUser._id,
  });

  if (existVerificationToken) {
    await existVerificationToken.deleteOne();
  }

  let emailVerificationToken = await VerifyToken.create({
    _userId: existUser._id,
    token: randomBytes(32).toString("hex"),
  });

  await sendEmail(
    existUser.email,
    {
      username: existUser.username,
      link: `${domain}/api/v1/auth/verify/${emailVerificationToken.token}/${existUser._id}`,
    },
    "Verify Email",
    "./templates/accountVerification.handlebars"
  );

  res
    .status(200)
    .json({
      success: true,
      msg: `Verification email sent to ${existUser.email}`,
    })
    .redirect("/waitingForVerification");
});

export default resendVerifyEmail;
