import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { Users, User } from "../models/User";

import { generateAccessToken, generateRefreshToken } from "../utils/jwtHelpers";
import { ProtectedRequest } from "../types/serverTypes";
import { RefreshTokens } from "../models/RefreshTokens";



dotenv.config({ path: "../.env" });

/**
 * @desc Registers a new user
 * @route POST /api/auth/register
 * @access Public
 */
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, username, email, password } = req.body;

    if (!name || !email || !password || !username) {
      res.status(400);
      console.log("Please add all fields");
      throw new Error("Please add all fields");
    }

    const userExists = await Users.exists(email, username);
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await Users.hashPassword(password);
    const newUser = await Users.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await generateRefreshToken(res, newUser.id!);
      const token = generateAccessToken(newUser.id!);
      console.log("token:", token)
      delete newUser.password;
      res.status(201).json({
        ...newUser,
        token,
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
    throw new Error("Please add all fields");
  }

  const user = await Users.findByEmailOrUsername(emailOrUsername);
  if (user && (await Users.verifyPassword(password, user.password as string))) {
    await generateRefreshToken(res, user.id!);
    const token = generateAccessToken(user.id!);
    delete user.password; 
    res.json({
      ...user,
      token,
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
    if ("token" in req) {
      res.json({ user: req.user, token: req.token });
    } else {
      res.json({ user: req.user });
    }
  }
);

/***
 * @desc Logs out a user by clearing cookies and removing the user's refresh token from the database
 * @route GET /api/auth/logout
 * @access Private
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.json({ message: "Successfully logged out (refreshToken not found)" });
    return;
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!
  ) as JwtPayload;
  await RefreshTokens.delete(decoded.id, refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Successfully logged out" });
});
