import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    return knex.schema.raw(`
    CREATE TABLE users(
        id  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        roles VARCHAR(50)[] DEFAULT NULL
    );
    `)
}


export async function down(knex: Knex): Promise<void> {
}

