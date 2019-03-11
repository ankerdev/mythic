import * as Knex from 'knex';
import { getenv } from '../utils/env.utils';
import { IAuthConfig, auth } from './auth.config';
import { IJWTConfig, jwt } from './jwt.config';
import { knex } from './knex.config';

interface IConfig {
  port: number;
  auth: IAuthConfig;
  knex: Knex;
  jwt: IJWTConfig;
}

export const CONFIG: IConfig = {
  port: getenv('HTTP_PORT', 8000),
  auth,
  knex,
  jwt,
};
