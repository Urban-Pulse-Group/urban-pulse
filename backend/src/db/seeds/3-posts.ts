import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('TRUNCATE TABLE posts RESTART IDENTITY CASCADE');
    return knex.raw(`
      INSERT INTO posts ( user_id, community_id, title, img, slug, content, created_at, likes) VALUES
      ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', (SELECT id FROM communities WHERE title = 'Downtown'), 'City Life', 'path/to/image.jpg', 'city-life', 'Explore the vibrant life of Downtown.', now(), 10),
      ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', (SELECT id FROM communities WHERE title = 'Uptown'), 'Park Retreats', 'path/to/image.jpg', 'park-retreats', 'Discover the green spaces of Uptown.', now(), 15),
      ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', (SELECT id FROM communities WHERE title = 'Old Town'), 'Historic Walks', 'path/to/image.jpg', 'historic-walks', 'Walking through the history of Old Town.', now(), 5)
    `);
};
