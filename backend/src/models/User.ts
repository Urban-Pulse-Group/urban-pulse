import db from '../db/db';
import bcrypt from 'bcryptjs';

export interface User {
  id?: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  roles?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Users {
  /**
   * Find a user by their email or username.
   * @param emailOrUsername - Email or Username
   * @returns User object or null
   */
  static async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    const { rows } = await db.raw(
      `
      SELECT * FROM users
      WHERE email = ?
      OR username = ?
      `,
      [emailOrUsername, emailOrUsername]
    );

    return rows.length > 0 ? (rows[0] as User) : null;
  }

  /**
   * Find a user by their ID.
   * @param id - User ID
   * @returns User object or null
   */
  static async findById(id: string): Promise<User | null> {
    const { rows } = await db.raw(
      `
      SELECT * FROM users
      WHERE id = ?
      `,
      [id]
    );

    return rows.length > 0 ? (rows[0] as User) : null;
  }

  /**
   * Check if a user with a specific email or username already exists.
   * @param email - User email
   * @param username - Username
   * @returns True if a user exists, otherwise false
   */
  static async exists(email: string, username: string): Promise<boolean> {
    const { rows } = await db.raw(
      `
      SELECT * FROM users
      WHERE email = ?
      OR username = ?
      `,
      [email, username]
    );

    return rows.length > 0;
  }

  /**
   * Create a new user.
   * @param user - User data excluding the ID
   * @returns The created user or null
   */
  static async create(user: Omit<User, 'id'>): Promise<User | null> {
    const { name, username, email, password } = user;

    const { rows } = await db.raw(
      `
      INSERT INTO users (name, username, email, password)
      VALUES (?, ?, ?, ?)
      RETURNING id, name, username, email, roles, created_at
      `,
      [name, username, email, password]
    );

    return rows.length > 0 ? (rows[0] as User) : null;
  }

  /**
   * Verify if the provided password matches the hashed password.
   * @param password - Plain text password
   * @param hashedPassword - Hashed password from the database
   * @returns True if passwords match, otherwise false
   */
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const correct = await bcrypt.compare(password, hashedPassword);
    console.log("correct:", correct)
    return  correct
  }

  /**
   * Hash a plain text password using bcrypt.
   * @param password - Plain text password
   * @returns Hashed password
   */
  static async hashPassword(password: string): Promise<string> {

    return await bcrypt.hash(password, 10);
  }
}

async function testHashing(password="111") {

  const hash = await bcrypt.hash(password, 10);
  console.log('Newly hashed password:', hash);

  // Now compare the original input password against the new hash
  const isMatch = await bcrypt.compare(password, '$2a$10$43.T2gxBjgjhF1I1fLDo8umc/humyTeQJZ8MpZw.CsTIfGJUKya/W');
  console.log('Does the original password match the new hash?', isMatch);
  console.log("hash")
}

const originalPassword = '111'; // Replace with the actual password used
testHashing(originalPassword);