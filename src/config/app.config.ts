import * as Knex from 'knex';
import { getenv } from '../utils';
import { knex } from './knex.config';
import { IJWTConfig, jwt } from './jwt.config';

interface IConfig {
  port: number;
  knex: Knex;
  jwt: IJWTConfig;
}

export const CONFIG: IConfig = {
  port: getenv('HTTP_PORT', 8000),
  knex,
  jwt,
};
