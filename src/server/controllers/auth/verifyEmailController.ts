import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";
import VerifyToken from "../../models/VerifyToken";
import "dotenv/config.js";
import sendEmail from "../../utils/sendEmail";

const domain = process.env.DOMAIN;

const verifyEmail = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select(
    "-passwordConfirm"
  );

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isEmailVerified) {
    res.status(400);
    throw new Error("Email already verified");
  }

  const userToken = await VerifyToken.findOne({
    _userId: user._id,
    token: req.params.emailToken,
  });

  if (!userToken) {
    res.status(400);
    throw new Error("Invalid verification token");
  }

  user.isEmailVerified = true;
  await user.save();

  if (user.isEmailVerified) {
    await sendEmail(
      user.email,
      {
        username: user.username,
        link: `${domain}/signIn`,
      },
      "Welcome",
      "./templates/welcome.handlebars"
    );

    res.redirect("/");
  }
});

export default verifyEmail;
