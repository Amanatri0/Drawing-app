declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

import { JWT_SECRET } from "@repo/backendcommon/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  try {
    if (token == undefined) {
      res.status(401).send({
        message: "Token is invalid ",
      });
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (
      typeof decodedToken == "string" ||
      !decodedToken ||
      !decodedToken.userId
    ) {
      res.status(400).send({
        message: "Token and userId is not correct",
      });
      return;
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Something went wrong in the user Midlleware",
      error: (error as Error).message,
    });
  }
}
