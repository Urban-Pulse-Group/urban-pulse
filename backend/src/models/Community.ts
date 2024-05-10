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
  /**
   * @desc Creates a Community with the values passed in
   * @returns Created community if it was successfully created, null if it was not
   */
  static async create(vals: Community): Promise<Community | null> {
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

  /**
   * @desc Finds Community with an ID that is equal to the ID passed in
   * @returns Community with the given ID if it was found, null if it was not
   */
  static async findById(id: string): Promise<Community| null> {
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

 /**
  * @desc Deletes community with the given ID
   * @returns Deleted community if it was found, null if it was not
   */
  static async delete(id: string): Promise<Community | null> {
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
