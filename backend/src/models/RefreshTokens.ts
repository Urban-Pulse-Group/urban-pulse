import db from '../db/db';

export interface RefreshToken {
  userId: string;
  token: string;
}

export class RefreshTokens {
  /**
   * Create a new refresh token for a user.
   * @param userId - User ID
   * @param token - Refresh token
   */
  static async create(userId: string, token: string): Promise<void> {
    let today: Date = new Date();
    await db.raw(
      `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES (?, ?, ?)
      `,
      [userId, token, new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000))  ]
    );
  }

  /**
   * Delete a specific refresh token for a user.
   * @param userId - User ID
   * @param token - Refresh token
   */
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

  /**
   * Find a specific refresh token for a user.
   * @param userId - User ID
   * @param token - Refresh token
   * @returns Refresh token record
   */
  static async find(userId: string, token: string): Promise<RefreshToken | null> {
    const { rows } = await db.raw(
      `
      SELECT * FROM refresh_tokens
      WHERE user_id = ?
      AND token = ?
      `,
      [userId, token]
    );

    return rows.length ? (rows[0] as RefreshToken) : null;
  }

  /**
   * Delete all refresh tokens for a user.
   * @param userId - User ID
   */
  static async deleteAllForUser(userId: string): Promise<void> {
    await db.raw(
      `
      DELETE FROM refresh_tokens
      WHERE user_id = ?
      `,
      [userId]
    );
  }
}
