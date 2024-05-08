import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');


  await knex.raw(`
    INSERT INTO users (id, name, email, password, created_at, updated_at)
    VALUES
      (uuid_generate_v4(), 'Alice', 'alice@example.com', 'password_hash', NOW(), NOW()),
      (uuid_generate_v4(), 'Bob', 'bob@example.com', 'password_hash', NOW(), NOW()),
      (uuid_generate_v4(), 'Charlie', 'charlie@example.com', 'password_hash', NOW(), NOW())
  `);
};
