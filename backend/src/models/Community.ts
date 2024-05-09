import db from "../db/db";

export interface Community {
  id?: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Communities {
  static async create(vals: Community) {
    const { userId, title, description, category } = vals;
    const { rows } = await db.raw(
      `
      INSERT INTO communities ( user_id, title, description, category)
      VALUES (?, ?, ?, ?)
      RETURNING *
    `,
      [userId, title, description, category]
    );

    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows[0]
  }
  static async findAll() {
    const { rows } = await db.raw(`
     SELECT * FROM communities     
   `);
    return rows;
  }
  static async findById(id: string) {
    const { rows } = await db.raw(
      `
      SELECT * FROM communities
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
    DELETE FROM communities
    WHERE id = ?
    RETURNING *
    `,
      [id]
    );
    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows[0];
  }
}
