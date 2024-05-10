import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Response } from "express";
import { Users } from "../models/User";
import { RefreshTokens } from "../models/RefreshTokens";
import { refreshAccessToken } from "../utils/jwtHelpers";
import { ProtectedRequest } from "../types/serverTypes";

interface DecodedToken {
  id: string;
}

export const protect = asyncHandler(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    let accessToken: string | null = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      accessToken = req.headers.authorization.split(" ")[1];
    }

    if (accessToken) {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!
      ) as DecodedToken;

      const user = await Users.findById(decoded.id);
      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      req.user = user;
      req.token = accessToken;
      next();
      return;
    }

    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken, res);

      const decoded = jwt.verify(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET!
      ) as DecodedToken;

      const user = await Users.findById(decoded.id);
      if (!user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }


      await RefreshTokens.delete(decoded.id, refreshToken);
      const newRefreshToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "14d" }
      );

      await RefreshTokens.create(decoded.id, newRefreshToken);

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
      });

      req.user = user;
      req.token = newAccessToken;
      next();

    }

    res.status(401);
    throw new Error("Not authorized, no tokens provided");
  }
);
