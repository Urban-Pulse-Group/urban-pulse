import knex from 'knex';
import config from '../src/db/knexfile';
const db = knex(config.test);

export async function migrateTestDatabase() {
    await db.migrate.latest();
}

export async function rollbackTestDatabase() {
    await db.migrate.rollback(undefined, true);
}

export async function truncateAllTables() {
  const tables = ['users', 'communities', 'posts'];
  await Promise.all(tables.map((table) => db(table).truncate()));
}

export default db;
