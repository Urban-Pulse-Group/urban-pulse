import db from "../db/db";

class Search {
  static async searchCommunities(title: string): Promise<any[]> {
    const result = await db.raw(
      'SELECT * FROM communities WHERE title ILIKE ?',
      [`%${title}%`]
    );
    return result.rows;
  }

  static async searchPosts(query: string): Promise<any[]> {
    const result = await db.raw(
      'SELECT * FROM posts WHERE title ILIKE ? OR content ILIKE ?',
      [`%${query}%`, `%${query}%`]
    );
    return result.rows;
  }
}

export default Search;