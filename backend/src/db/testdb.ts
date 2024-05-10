import knex from 'knex';
import { Knex } from 'knex';
import knexConfig from "./knexfile";

const db: Knex = knex(knexConfig["test"]);

export async function migrateTestDB() {
  await db.migrate.latest();
}

export async function rollbackTestDB() {
  await db.migrate.rollback(undefined, true);
}

export async function truncateAllTables() {
  



  await db("refresh_tokens").truncate();
  await db("users").truncate()

 


}

export default db;
