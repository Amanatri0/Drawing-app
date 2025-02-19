declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

import { JWT_SECRET } from "@repo/backend-common/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).send({
      message: "Incorrect credentials",
    });
    return;
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (typeof decodedToken == "string") {
      res.status(401).send({
        message: "Token not valid",
      });
      return;
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(404).send({
      message: "Something went wrong in the middleware",
      error: (error as Error).message,
    });
  }
};
