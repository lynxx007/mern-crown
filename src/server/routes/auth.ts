import express from "express";
import registerUser from "../controllers/auth/registerControllers";
import verifyEmail from "../controllers/auth/verifyEmailController";
import loginUser from "../controllers/auth/loginController";
import resendVerifyEmail from "../controllers/auth/resendVerifyEmailController";
import logout from "../controllers/auth/logoutController";
import passport from "passport";
import {
  forgotPasswordRequest,
  resetPasswordHandler,
} from "../controllers/auth/forgotPasswordController";
import resendAccessToken from "../controllers/auth/resendAccessToken";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", registerUser);

router.get("/verify/:emailToken/:userId", verifyEmail);

router.post("/login", loginUser);

router.post("/logout", logout);

router.post("/resend-verify-email", resendVerifyEmail);

router.post("/forgot-password-request", forgotPasswordRequest);

router.post("/reset-password", resetPasswordHandler);

router.get("/new_access_token", resendAccessToken);

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    const existingUser = await User.findById(req.user._id);
    jwt.sign(
      {
        _id: req.user._id,
        roles: existingUser?.roles,
        firstName: existingUser?.firstName,
        lastName: existingUser?.lastName,
        imageUrl: existingUser?.imageUrl,
        email: existingUser?.email,
        username: existingUser?.username,
      },
      process.env.JWT_ACCESS_KEY as string,
      {
        expiresIn: "20m",
      },
      (err, token) => {
        res.send(`
        <html>
        <script>
        window.localStorage.setItem("googleToken","${token}");
        window.location.href = "/";
        </script>
        </html>
        `);
        // res.json({ token });
      }
    );
  }
);

export default router;
