import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import validate from "validator";
import { USER } from "../constants";

interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  imageUrl: string;
  createdAt: Date;
  address: string;
  googleId: string;
  roles: Array<string>;
  refreshToken: Array<string>;
  isEmailVerified: boolean;
  active: boolean;
  city: string;
}

interface IUserMethods {
  comparePassword(givenPassword: string): Promise<boolean>;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;
const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9]+$/.test(value);
        },
        message: "Username can only contain letters and numbers",
      },
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z]+$/.test(value);
        },
        message: "First name can only contain letters",
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z]+$/.test(value);
        },
        message: "Last name can only contain letters",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: {
        validator: function (value: string) {
          return (
            validate.isLength(value, { min: 6 }) &&
            validate.matches(value, /^(.*\d){2}.*/)
          );
        },
        message:
          "Password must be at least 6 characters with at least 2 numbers",
      },
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (this: IUser, value: string): boolean {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Invalid email address",
      },
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    googleId: {
      type: String,
    },
    roles: {
      type: [String],
      default: [USER],
    },
    refreshToken: {
      type: [String],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.comparePassword = async function (givenPassword: string) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model<IUser, UserModel>("User", UserSchema);
export default User;
