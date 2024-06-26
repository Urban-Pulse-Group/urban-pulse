import type { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
dotenv.config();

const getConnectionString = (): string => {
  const connectionString = process.env.PG_CONNECTION_STRING;
  if (!connectionString) {
    console.log(connectionString);
    throw new Error("PG connection string is not defined in environment");
  }
  return connectionString;
};

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: getConnectionString(),
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  test: {
    client: "pg",
    connection: process.env.PG_TEST_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
