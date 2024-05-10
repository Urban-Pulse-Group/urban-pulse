import knex from 'knex';
import config from './knexfile';

const db = knex(config.test);

export async function migrateTestDB() {
  await db.migrate.latest();
}

export async function rollbackTestDB() {
  await db.migrate.rollback(undefined, true);
}

export async function truncateAllTables() {
  


  const tables = ['refresh_tokens','users', ]; 


  await Promise.all(tables.map((table) => db(table).truncate()));


}

export default db;
