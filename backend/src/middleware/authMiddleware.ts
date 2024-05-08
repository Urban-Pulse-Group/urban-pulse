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
          process.env.JWT_ACCESS_SECRET!
        ) as DecodedToken;
        console.log("id:", decoded.id)
        const {rows} = await db.raw(
          `
            SELECT * FROM users
            WHERE id = ?
          `,
          [decoded.id]
        );
        req.user = rows[0]
       
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized");
      }
    }
    if (!token) {
      console.log("no token")
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
