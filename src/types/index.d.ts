import type { User } from "./UserObject";
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
