import db from "../db/db";
export interface Thread {
  id?: string; //uuid
  userId: string; //uuid
  content: string;
  postId: string;
  created_at?: Date;
  slugs: string;
}

export class Threads {
  /**
   *@desc Creates Thread with the values passed in
   */
  static async create(vals: Thread): Promise<Thread> {
    const { userId, content, postId } = vals;
    const { rows } = await db.raw(
      `
      WITH inserted_thread AS (
        INSERT INTO threads (user_id, content, post_id)
        VALUES (?, ?, ?)
        RETURNING *
      )
      SELECT 
        inserted_thread.*, 
        users.username AS user_username, 
        users.img AS user_img
      FROM inserted_thread
      JOIN users ON inserted_thread.user_id = users.id;
        `,
      [userId, content, postId]
    );

    return rows[0];
  }

  /**
   * @desc Gets the threads that correlates to the Post id passed in
   * @returns The threads that relates to the given Post id, null if not
   */
  static async findByPost(threadId: string): Promise<Thread | null> {
    const { rows } = await db.raw(
      `SELECT threads.*, users.username AS user_username, users.img AS user_img
      FROM threads
      JOIN users ON threads.user_id = users.id
      WHERE threads.post_id = ?`,
      [threadId]
    );
    const threadExists = rows.length > 0;
    if (!threadExists) {
      return null;
    }
    return rows;
  }

  /**
   * @desc Gets the thread that correlates to the id passed in
   * @returns The thread with the given id, null if not
   */
  static async findById(threadId: string): Promise<Thread | null> {
    const { rows } = await db.raw(
      `SELECT * FROM threads
       WHERE id = ?
        `,
      [threadId]
    );

    console.log(rows);
    const threadExists = rows.length > 0;
    if (!threadExists) {
      return null;
    }
    return rows[0];
  }

  /**
   *
   * @desc Deletes thread with the given ID
   * @returns Deleted thread if successfully deleted
   */
  static async delete(threadId: string): Promise<Thread> {
    const { rows } = await db.raw(
      `
        DELETE FROM threads
        WHERE id = ?
        RETURNING *
        `,
      [threadId]
    );

    return rows[0];
  }

  static async updateLikes(commentId: string, newLikes: number) {
    await db.raw("UPDATE threads SET likes = ? WHERE id = ?", [newLikes, commentId]);
  }
}
