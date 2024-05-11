import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.raw(`
    CREATE TABLE replies (
        id  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id  UUID REFERENCES users(id) ON DELETE CASCADE,
        thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at DATE DEFAULT NOW(),
        likes INT
    )
    `)
}


export async function down(knex: Knex): Promise<void> {
}
