import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/UserModel";
import type { Request, Response, NextFunction } from "express";

import "dotenv/config";

const checkAuth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let jwtToken;

    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer")) {
      res.sendStatus(403);
      return;
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
      jwtToken = authHeader.split(" ")[1];

      jwt.verify(
        jwtToken,
        process.env.JWT_ACCESS_KEY as string,
        async (error, decoded) => {
          if (error) return res.sendStatus(403);

          const { id } = decoded as { id: string; roles: string[] };

          req.user = await User.findById(id).select("-password");

          next();
        }
      );
    }
  }
);

export default checkAuth;
