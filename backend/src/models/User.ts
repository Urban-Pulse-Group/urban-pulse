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
  static async findByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
    const { rows } = await db.raw(
      `
      SELECT * FROM users
      WHERE email = ?
      OR username = ?
      `,
      [emailOrUsername, emailOrUsername]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  static async findById(id: string): Promise<User | null> {
    const { rows } = await db.raw(
      `
      SELECT * FROM users
      WHERE id = ?
      `,
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }

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

    return rows.length > 0 ? rows[0] : null;
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}


