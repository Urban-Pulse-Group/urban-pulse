import knex from "knex";
import config from "./knexfile";
export const db = knex(config.test);
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
export const migrateTestDB = async () => {
  await db.migrate.latest();
};

export const rollbackTestDB = async () => {
  await db.migrate.rollback(undefined, true);
};


export const truncateAllTables = async () => {
  const tables = ["users", "communities", "posts"];
  await Promise.all(tables.map((table) => db(table).truncate()));
};
