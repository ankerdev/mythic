import * as Knex from 'knex';
import { getenv } from '../utils';
import { knex } from './knex.config';
import { IJWTConfig, jwt } from './jwt.config';
import { IAuthConfig, auth } from './auth.config';
import { IPolicyConfig, policy } from './policy.config';

interface IConfig {
  port: number;
  auth: IAuthConfig;
  knex: Knex;
  jwt: IJWTConfig;
  policy: IPolicyConfig
}

export const CONFIG: IConfig = {
  port: getenv('HTTP_PORT', 8000),
  auth,
  knex,
  jwt,
  policy,
};
