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
      `SELECT posts.*, communities.slugs as community_slugs, communities.title as community_title, communities.img as community_img
       FROM posts
       JOIN communities ON posts.community_id = communities.id
       WHERE posts.title ILIKE ? OR posts.content ILIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
    return result.rows;
  }
}

export default Search;
