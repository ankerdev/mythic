import * as Knex from 'knex';
import * as objection from 'objection';
import * as path from 'path';
import { getenv } from '../utils';

export const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: getenv('DB_HOST', '127.0.0.1'),
    user: getenv('DB_USER'),
    password: getenv('DB_PASSWORD'),
    database: getenv('DB_DATABASE'),
  },
  migrations: {
    directory: path.join(__dirname, '../database/migrations/'),
  },
  debug: getenv('APP_TESTING', false),
}

export const knex = Knex(knexConfig);

objection.Model.knex(knex);
