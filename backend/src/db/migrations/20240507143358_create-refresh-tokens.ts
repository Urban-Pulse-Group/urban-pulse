import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.raw(`
    CREATE TABLE refresh_tokens (
        id  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id  UUID REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL
    )`)
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`
    DROP TABLE IF EXISTS refresh_tokens;
    `
  );
}

