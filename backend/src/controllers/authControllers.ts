import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import db from "../db/db";
import dotenv from "dotenv";
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
      throw new Error("Please add all feilds");
    }

    const { rows } = await db.raw(
      `
    SELECT * FROM users
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
      `
        INSERT INTO users (name, username ,email, password)
        VALUES (?, ?, ?, ?)
        RETURNING *
    `,
      [name, username, email, hashedPassword]
    );

    if (newUser) {
      const user = newUser.rows[0];
      res.status(201).json({
        ...user,
        token: generateToken(user.id),
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
    `
        SELECT * FROM users
        WHERE email = ?
        OR username = ?
    `,
    [emailOrUsername, emailOrUsername]
  );

  const userExists = rows.length > 0;
  if (userExists && (await bcrypt.compare(password, rows[0].password))) {
    const user = rows[0];
    res.json({ ...user });
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
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  res.json({ message: "Get User" });
});

/**
 * @desc Generates a JWT Token using your JWT secret
 *@instructions Insert your secret into a .env file under the name JWT_SECRET
 */
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "2h",
  });
};
