import jwt from "jsonwebtoken";

import db from "../db/db";
import { Response } from "express";

/**
 * @desc Generates a JWT Token using your JWT secret
 *@instructions Insert your secret into a .env file under the name JWT_ACCESS_SECRET
 */
export const generateAccessToken = ( id: string) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "2h",
  });
};

/**
 * @desc Generates a JWT  refresh token using your JWT refresh  secret
 *@instructions Insert your secret into a .env file under the name JWT_REFRESH_SECRET
 */
export const generateRefreshToken = async (res: Response, id: string) => {
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "14d",
  });

  const expiresAt: Date = new Date();
  expiresAt.setDate(expiresAt.getDate() + 14);

  await db.raw(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES (?, ?, ?)
     `,
    [id, refreshToken, expiresAt]
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  });
};
