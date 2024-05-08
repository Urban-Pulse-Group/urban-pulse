import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import db from "../db/db";
import { Response, Request } from "express";

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

/**
 * @desc Refreshes access token
 * using refresh token received
 * from the client through http cookies
 * @route GET /api/auth/refreshAccessToken
 * @access Private
 */
export const refreshAccessToken = 
  async (refreshToken: string, res: Response) => {


    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;

    const { rows } = await db.raw(
      `SELECT * FROM refresh_tokens
       WHERE user_id = ?
       AND token = ?
       AND expires_at > NOW()
       `,
      [decoded.id, refreshToken]
    );

    if (rows.length === 0) {
      res.status(401);
      throw new Error("Invalid or expired refresh token");
    }
    const oldRefreshTokenId = rows[0].id;
    await db.raw(
      `DELETE FROM refresh_tokens
       WHERE id = ?
      `,
      [oldRefreshTokenId]
    );
    const token = generateAccessToken(decoded.id);
    await generateRefreshToken(res, decoded.id);
    return token
  }
