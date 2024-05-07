import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import db from "../db/db";
import { NextFunction, Request, Response } from "express";
import { User, UserData } from "../types/userTypes";
import { ProtectedRequest } from "../types/serverTypes";
interface DecodedToken {
  id: string;
}
export const protect = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodedToken;
        req.user = await db.raw(
          `
            SELECT * FROM users
            WHERE id = ?
            EXCEPT SELECT password 
          `,
          [decoded.id]
        );
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
