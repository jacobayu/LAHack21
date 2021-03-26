require('dotenv').config();

const sqlConnection = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATA
  };


module.exports = {
    development: {
      client: 'mysql',
      version: '8.0.20',
      connection: sqlConnection,
      migrations: {
        directory: './app/database/migrations',
        tablename: 'knex_migrations'
      },
      seeds:{
        directory: './app/database/seeds'
      },
      useNullAsDefault: true
    },
  
  };