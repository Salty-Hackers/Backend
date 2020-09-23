const pgConnection = process.env.databaseBASE_URL || "postgresql://postgres@localhost/hobbits";


module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/auth.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      // tableName: 'dbmigrations',
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/auth-testing.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: "./database/seeds",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    },
  },
  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
