import db from '../db/db';

export interface RefreshToken {
  userId: string;
  token: string;
}

export class RefreshTokens {
  static async create(userId: string, token: string): Promise<void> {
    await db.raw(
      `
      INSERT INTO refresh_tokens (user_id, token)
      VALUES (?, ?)
      `,
      [userId, token]
    );
  }

  static async delete(userId: string, token: string): Promise<void> {
    await db.raw(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = ?
      AND token = ?
      `,
      [userId, token]
    );
  }
}
