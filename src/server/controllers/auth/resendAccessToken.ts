import expressAsyncHandler from "express-async-handler";
import User from "../../models/UserModel";
import jwt from "jsonwebtoken";
import "dotenv/config";

const resendAccessToken = expressAsyncHandler(async (req, res) => {
  if (!req.cookies?.jwt) {
    res.sendStatus(401);
    return;
  }

  const existsUser = await User.findOne({
    refreshToken: req.cookies.jwt,
  });

  if (!existsUser) {
    jwt.verify(
      req.cookies.jwt,
      process.env.JWT_REFRESH_KEY as string,
      async (
        err: jwt.VerifyErrors | null,
        decoded: string | jwt.JwtPayload | undefined
      ) => {
        if (err) {
          res.sendStatus(403);
          return;
        }
        const { id } = decoded as { id: string };
        const hackedUser = await User.findById(id);
        if (hackedUser) {
          hackedUser.refreshToken = [];
          await hackedUser.save();
        }
      }
    );
    res.sendStatus(403);
    return;
  }

  const newRefreshTokenArray = existsUser.refreshToken.filter(
    (refToken) => refToken !== req.cookies.jwt
  );

  jwt.verify(
    req.cookies.jwt,
    process.env.JWT_REFRESH_KEY as string,
    async (
      err: jwt.VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined
    ) => {
      if (err) {
        res.sendStatus(403);
        return;
      }

      const newRefreshToken = jwt.sign(
        {
          id: existsUser._id,
        },
        process.env.JWT_REFRESH_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      existsUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await existsUser.save();

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const accessToken = jwt.sign(
        {
          id: existsUser._id,
          roles: existsUser.roles,
        },
        process.env.JWT_ACCESS_KEY as string,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        success: true,
        firstName: existsUser.firstName,
        lastName: existsUser.lastName,
        username: existsUser.username,
        imageUrl: existsUser.imageUrl,
        accessToken,
        address: existsUser.address,
        email: existsUser.email,
        roles: existsUser.roles,
        city: existsUser.city,
        msg: `${existsUser.username} logged in successfully`,
      });
    }
  );
});

export default resendAccessToken;
