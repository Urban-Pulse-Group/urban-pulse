import db from "../db/db";
export interface Reply {
  id?: string; //uuid
  userId: string; //uuid
  content: string;
  threadId: string;
    created_at?: Date;
}

export class Replies {
    
  /**
   *@desc Creates Reply with the values passed in
   */
  static async create(vals: Reply): Promise<Reply> {
      const { userId, content, threadId} = vals;
    const { rows } = await db.raw(
      `
          INSERT INTO replies ( user_id, content, thread_id)
          VALUES (?, ?, ?)
          RETURNING *
        `,
      [userId, content, threadId]
    );

    return rows[0];
  }
  
  /**
   * @desc Gets the reply that correlates to the Post id passed in
   * @returns The threads that relates to the given Post id, null if not
   */
  static async findByThread(threadId: string): Promise<Reply| null> {
    const { rows } = await db.raw(
      `SELECT * FROM replies
       WHERE thread_id = ?
        `,
      [threadId]
    );
    const replyExists = rows.length > 0;
    if (!replyExists) {
      return null;
    }
    return rows[0];
  }

    /**
   * @desc Gets the reply that correlates to the id passed in
   * @returns The thread with the given id, null if not
   */
  static async findById(replyId: string): Promise<Reply| null> {
    const { rows } = await db.raw(
      `SELECT * FROM replies
       WHERE id = ?
        `,
        [replyId]
     
    );
      

    const replyExists = rows.length > 0;
    if (!replyExists) {
      return null;
    }
    return rows[0];
  }

    /**
     * 
     * @desc Deletes reply with the given ID
     * @returns Deleted thread if successfully deleted
     */
  static async delete(replyId: string): Promise<Reply> {
    const { rows } = await db.raw(
      `
        DELETE FROM replies
        WHERE id = ?
        RETURNING *
        `,
      [replyId]
    );

    return rows[0];
  }
}
