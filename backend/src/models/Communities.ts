import { countReset } from "console";
import db from "../db/db";
import { Response } from "express";
import slugify from "slugify";
export interface Community {
  id?: string;
  userId: string;
  title: string;
  description: string;
  img: string;
  createdAt?: Date;
  updatedAt?: Date;
  slugs?: string
}

export class Communities {
  /**
   * @desc Creates a Community with the values passed in
   * @returns Created community if it was successfully created, null if it was not
   */
  static async create(
    res: Response,
    vals: Community
  ): Promise<Community | null> {
    const { userId, title, description, img } = vals;
    const slugs = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });
    const { rows } = await db.raw(
      `
      INSERT INTO communities ( user_id, title, description, img, slugs)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *
    `,
      [userId, title.toLowerCase(), description, img ?? "", slugs]
    );

    const communityExists = rows.length > 0;
    if (!communityExists) {
      return null;
    }
    return rows[0];
  }

  static async findAll() {
    const { rows } = await db.raw(`
     SELECT * FROM communities     
   `);
    return rows;
  }

  /**
   * @desc Finds Community with the given slugs ID that is equal to the ID passed in
   * @returns Community with the given ID if it was found, null if it was not
   */
  static async findBySlugs(slugs: string): Promise<Community | null> {
    console.log("slugs:", slugs)
    const { rows } = await db.raw(
      `
      SELECT * FROM communities
      WHERE slugs = ?
    `,
      [slugs]
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
