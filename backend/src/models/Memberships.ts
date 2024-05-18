import db from "../db/db";

export class Memberships {
  /**
   * @desc Join a community
   */
  static async joinCommunity(userId: string, communityId: string): Promise<void> {
    await db.raw(
      `
      INSERT INTO memberships (user_id, community_id)
      VALUES (?, ?)
      ON CONFLICT (user_id, community_id) DO NOTHING
      `,
      [userId, communityId]
    );
  }

  /**
   * @desc Leave a community
   */
  static async leaveCommunity(userId: string, communityId: string): Promise<void> {
    await db.raw(
      `
      DELETE FROM memberships
      WHERE user_id = ? AND community_id = ?
      `,
      [userId, communityId]
    );
  }

  /**
   * @desc Check if a user has joined a community
   */
  static async isUserInCommunity(userId: string, communityId: string): Promise<boolean> {
    const { rows } = await db.raw(
      `
      SELECT 1 FROM memberships
      WHERE user_id = ? AND community_id = ?
      `,
      [userId, communityId]
    );
    return rows.length > 0;
  }

  /**
   * @desc Get all communities the user is apart of
   * 
   */
  static async getUserMemberships(userId: string): Promise<boolean> {
    const { rows } = await db.raw(
      `
      SELECT c.*
      FROM memberships m
      JOIN communities c ON m.community_id = c.id
      WHERE m.user_id = ?
      `,
      [userId]
    );
    return rows;
  }
}
