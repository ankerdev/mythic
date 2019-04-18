import Knex from 'knex';
import { env } from 'env';
import * as objection from 'objection';
import * as path from 'path';

export const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: env('DB_HOST', '127.0.0.1'),
    user: env('DB_USER'),
    password: env('DB_PASSWORD'),
    database: env('DB_DATABASE'),
  },
  migrations: {
    directory: path.join(__dirname, '../database/migrations/'),
  },
  // debug: env('APP_TESTING', false), // @READ Uncomment to get verbose debug messages
}

export const knex = Knex(knexConfig);

objection.Model.knex(knex);
