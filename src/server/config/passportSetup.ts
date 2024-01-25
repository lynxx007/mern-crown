import "dotenv/config";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/UserModel";

const domain = process.env.DOMAIN;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

const googleAuth = () => {
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${domain}/api/v1${callbackURL}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            const name = profile.displayName.split(" ");
            user = await User.create({
              username: profile._json.given_name,
              firstName: name[0],
              lastName: name[1],
              email: profile._json.email,
              imageUrl: profile._json.picture,
              googleId: profile.id,
              isEmailVerified: profile._json.email_verified,
            });
          }
          done(null, user);
        } catch (error) {
          if (error instanceof Error) {
            done(error);
          }
        }
      }
    )
  );
};
export default googleAuth;
