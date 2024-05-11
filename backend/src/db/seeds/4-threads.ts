import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw('TRUNCATE TABLE threads RESTART IDENTITY CASCADE');
    return  knex.raw(`
    INSERT INTO threads (id, user_id, post_id, content, likes) VALUES
    ('55c1a59e-98c7-4fa8-84e7-fc47917e7f6b', 'd8b8b6c7-e487-4761-8d5c-4d56e6e95c62', 'e1e9f5f6-3bb2-4412-8fc6-6047a6b2c475', 'This is a sample thread content.', 15);
  `);
};
