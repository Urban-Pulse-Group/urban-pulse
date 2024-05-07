import { Response, Request } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import db from "../db/db";
import dotenv from "dotenv";
import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtHelpers";
import { ProtectedRequest } from "../types/serverTypes";
dotenv.config({ path: "../.env" });


/**
 * @desc  Registers a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    if (!name || !email || !password || !username) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const { rows } = await db.raw(
      `SELECT * FROM users
      WHERE email = ?
      OR username = ?
      `,
      [email, username]
    );
    
    const userExists = rows.length > 0;

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await db.raw(
      `INSERT INTO users (name, username ,email, password)
      VALUES (?, ?, ?, ?)
      `,
      [name, username, email, hashedPassword]
    );

    if (newUser) {
      const user = newUser.rows[0];
      delete user.password;
      await generateRefreshToken(res, user.id);

      res.status(201).json({
        ...user,
        token: generateAccessToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

/**
 * @desc Authenticates a user
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    res.status(400);
    throw new Error("Please add all feilds");
  }

  const { rows } = await db.raw(
    `SELECT * FROM users
     WHERE email = ?
     OR username = ?
     `,
    [emailOrUsername, emailOrUsername]
  );

  const userExists = rows.length > 0;
  if (userExists && (await bcrypt.compare(password, rows[0].password))) {
    const user = rows[0];
    delete user.password;
    await generateRefreshToken(res, user.id);

    res.json({
      ...user,
      token: generateAccessToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

/**
 * @desc Gets user data
 * @route GET /api/users/getUser
 * @access Private
 */
export const getUser = asyncHandler(
  async (req: ProtectedRequest, res: Response) => {
    const { id, name, email } = await db.raw(
      `SELECT * FROM users
      WHERE id = ?
      `,
      [req.user?.id]
    );
  }
);

/**
 * @desc Refreshes access token
 * using refresh token received
 * from the client through http cookies
 * @route GET /api/auth/refreshAccessToken
 * @access Private
 */
export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401);
      throw new Error("Refresh token missing");
    }

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
    )
    const accessToken = generateAccessToken(decoded.id);
    await generateRefreshToken(res, decoded.id)
    res.json({ token: accessToken });
  }
);


export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.json({ message: "Successfully logged out (refreshToken not found)" })
    return;
  }
  
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
  
  await db.raw(
    `DELETE FROM refresh_tokens
     WHERE user_id = ?
     AND token = ?
     `,
    [decoded.id, refreshToken]
  )

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  })
  res.json({message: "Successfully logged out"})
    
})
