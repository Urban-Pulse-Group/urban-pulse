import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');

  return await knex.raw(`
    INSERT INTO users ( name, username, email, password, roles, )
    VALUES
      ( 'Alice', 'alice01', 'alice@example.com', 'password_hash', ARRAY['user']),
      ( 'Bob', 'bob01', 'bob@example.com', 'password_hash', ARRAY['admin']),
      ( 'Charlie', 'charlie01', 'charlie@example.com', 'password_hash', ARRAY['user']);
  `);
}
