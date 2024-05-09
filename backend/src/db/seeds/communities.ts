import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw("TRUNCATE TABLE communities RESTART IDENTITY CASCADE");
  return await knex.raw(`
    INSERT INTO communities (user_id, title, description, category)
    VALUES
      ( (SELECT id FROM users WHERE email = 'alice@example.com'), 'Alice''s First Post', 'This is a description of Alice''s first post', 'General'),
      ( (SELECT id FROM users WHERE email = 'bob@example.com'), 'Bob''s Insightful Post', 'This is a description of Bob''s insightful post', 'Tech' ),
      ( (SELECT id FROM users WHERE email = 'charlie@example.com'), 'Charlie''s Review', 'This is a description of Charlie''s review', 'Review' );
  `);
}
