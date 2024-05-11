import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE communities RESTART IDENTITY CASCADE');
 
  return knex.raw(`
    INSERT INTO communities (user_id, title, description, category, created_at) VALUES
    ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', 'Downtown', 'Heart of the city with vibrant culture and business.', 'Urban', now()),
    ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', 'Uptown', 'Residential area with lots of parks and schools.', 'Suburban', now()),
    ('e1e9f5f6-3bb2-4412-8fc6-6047a6b2c676', 'Old Town', 'Historic neighborhood with rich heritage and architecture.', 'Historic', now())
  `);
}
