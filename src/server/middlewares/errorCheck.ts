import { NextFunction, Request, Response } from "express";
import "dotenv/config";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    msg: err.message,
    statusCode,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  return;
};
