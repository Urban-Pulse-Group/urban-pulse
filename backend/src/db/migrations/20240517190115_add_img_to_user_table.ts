import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    ALTER TABLE users
    ADD COLUMN img VARCHAR(255) DEFAULT '';`);
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    ALTER TABLE users
    DROP COLUMN img;
  `);
}
