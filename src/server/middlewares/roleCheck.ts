import { Request, Response, NextFunction } from "express";

const roleCheck =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.roles.includes(role)) {
      next();
    } else {
      res.status(403);
      throw new Error("Not authorized as an admin");
    }
  };
export default roleCheck;
