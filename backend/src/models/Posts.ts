import db from "../db/db";
export interface Post {
  id?: string; //uuid
  userId: string; //uuid
  title: string;
  content: string;
  community_id: string;
  created_at?: Date;
}

export class Posts {
    
  /**
   *@desc Creates post with the values passed in
   */
  static async create(vals: Post): Promise<Post> {
    const { userId, title, content, community_id } = vals;
    const { rows } = await db.raw(
      `
          INSERT INTO posts ( user_id, title, content, community_id)
          VALUES (?, ?, ?, ?)
          RETURNING *
        `,
      [userId, title, content, community_id]
    );

    return rows[0];
  }
    
  /**
   * @desc Gets all Posts found in the database
   */
  static async findAll() {
    const { rows } = await db.raw(`
         SELECT * FROM posts    
        `);
      
    return rows;
  }

  /**
   * @desc Gets the Post that correlates to the ID passed in
   * @returns The Post with the given ID if found, null if not
   */
  static async findById(communityId: string): Promise<Post | null> {
    const { rows } = await db.raw(
      `SELECT * FROM posts
       WHERE id = ?
        `,
      [communityId]
    );
    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows[0];
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
