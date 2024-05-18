import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`
    CREATE TABLE memberships (
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, community_id)
    );`);
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.raw(`DROP TABLE IF EXISTS user_communities`)
}
