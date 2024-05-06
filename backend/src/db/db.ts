import knex, { Knex } from "knex";
import knexConfig from "./knexfile";

const environment = process.env.NODE_ENV ?? "development";
const db: Knex = knex(knexConfig[environment]);

export default db;
