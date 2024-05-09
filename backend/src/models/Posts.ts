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
  static async create(vals: Post) {
    const { userId, title, content, community_id } = vals;
    const { rows } = await db.raw(
      `
          INSERT INTO posts ( user_id, title, content, community_id)
          VALUES (?, ?, ?, ?)
          RETURNING *
        `,
      [userId, title, content, community_id]
    );

    const postExists = rows.length > 0;
    if (!postExists) {
      return null;
    }
    return rows[0];
  }
  static async findAll() {
    const { rows } = await db.raw(`
         SELECT * FROM posts    
       `);
    return rows;
  }

  static async find(id: string) {
    const { rows } = await db.raw(
      `
          SELECT * FROM posts
          WHERE id = ?
        `,
      [id]
    );
    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows[0];
  }

  static async delete(id: string) {
    const { rows } = await db.raw(
      `
        DELETE FROM posts
        WHERE id = ?
        RETURNING *
        `,
      [id]
    );
    const postExists = rows.length > 0;
    if (!postExists) {
      return null;
    }
    return rows[0];
  }
}
