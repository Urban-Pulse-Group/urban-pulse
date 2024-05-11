import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return await knex.schema.raw(`
     CREATE TABLE posts (
        id  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id  UUID REFERENCES users(id) ON DELETE CASCADE, 
        community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        img TEXT,
        slug TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATE DEFAULT NOW()
     )
    `)
}

export async function down(knex: Knex): Promise<void> {
    return await knex.schema.raw(`DROP TABLE IF EXISTS posts`)
}

