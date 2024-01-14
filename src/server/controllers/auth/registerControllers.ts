import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";
import { randomBytes } from "crypto";
import VerifyToken from "../../models/VerifyToken";
import sendEmail from "../../utils/sendEmail";
import "dotenv/config";

const domain = process.env.DOMAIN;

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, username, passwordConfirm } =
    req.body;

  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !username ||
    !passwordConfirm
  ) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const registeredUser = await User.create({
    email,
    password,
    firstName,
    lastName,
    username,
    passwordConfirm,
  });

  if (!registeredUser) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  if (registeredUser) {
    let emailVerificationToken = await VerifyToken.create({
      _userId: registeredUser._id,
      token: randomBytes(32).toString("hex"),
    });

    await sendEmail(
      registeredUser.email,
      {
        username: registeredUser.username,
        link: `${domain}/api/v1/auth/verify/${emailVerificationToken.token}/${registeredUser._id}`,
      },
      "Verify Email",
      "./templates/accountVerification.handlebars"
    );

    res
      .status(200)
      .json({
        success: true,
        msg: `Verification email has been sent to ${registeredUser.email}. Please check your email.`,
      })
      .redirect("/waitingForVerification");
  }
});

export default registerUser;
