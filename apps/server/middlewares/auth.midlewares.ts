import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
interface UserPayload {
  email: string;
  role: "owner" | "customer";
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    try {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        const user = decoded as UserPayload;
        req.headers["user_email"] = user.email;
        req.headers["user_role"] = user.role;
        next();
      });
    } catch (error) {
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
  } else {
    return res.status(401).json({
      message: "Authentication failed"
    });
  }
};
