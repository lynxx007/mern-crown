import type { IUser } from "../server/models/UserModel";
declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
