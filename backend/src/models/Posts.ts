import db from "../db/db";
import slugify from "slugify";
export interface Post {
  id?: string; //uuid
  userId: string; //uuid
  title: string;
  content: string;
  communityId: string;
  created_at?: Date;
  img?: string;
}

export class Posts {
  /**
   *@desc Creates post with the values passed in
   */
  static async create(vals: Post): Promise<Post> {
    const { userId, title, content, communityId, img } = vals;
    const slugs = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    const { rows } = await db.raw(
      `
          INSERT INTO posts ( user_id, title, content, community_id, slug, img, likes)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          RETURNING *
        `,
      [userId, title, content, communityId, slugs, !img ? "" : img, 0]
    );

    return rows[0];
  }

  /**
   * @desc Gets all Posts found in the database
   */
  static async findAll() {
    const { rows } = await db.raw(
      `SELECT posts.*, users.name FROM posts
       JOIN users ON posts.user_id = users.id
        `
    );

    return rows;
  }

  /**
   * @desc Gets the Post that correlates to the ID passed in
   * @returns The Post with the given ID if found, null if not
   */
  static async findByCommunityId(communityId: string): Promise<Post | null> {
    const { rows } = await db.raw(
      `SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.community_id = ?`,
      [communityId]
    );
    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows;
  }

  static async findById(id: string): Promise<Post | null> {
    const { rows } = await db.raw(
      `SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.id = ?`,
      [id]
    );
    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows[0];
  }

  static async updateLikes(postId: string, newLikes: number) {
    await db.raw("UPDATE posts SET likes = ? WHERE id = ?", [newLikes, postId]);
  }

  /**
   *
   * @desc Deletes Post with the given ID
   * @returns Deleted Post if successfully deleted
   */
  static async delete(id: string): Promise<Post> {
    const { rows } = await db.raw(
      `
        DELETE FROM posts
        WHERE id = ?
        RETURNING *
        `,
      [id]
    );

    return rows[0];
  }
}
