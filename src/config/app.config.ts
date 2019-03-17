import { CorsOptions } from 'cors';
import * as Knex from 'knex';
import { getenv } from '../utils/env.utils';
import { IAuthConfig, auth } from './auth.config';
import { cors } from './cors.config';
import { IJWTConfig, jwt } from './jwt.config';
import { knex } from './knex.config';
import { IModelBindingObject, modelBinding } from './model-binding.config';

interface IConfig {
  port: number;
  auth: IAuthConfig;
  cors: CorsOptions;
  jwt: IJWTConfig;
  knex: Knex;
  modelBinding: IModelBindingObject[];
}

export const CONFIG: IConfig = {
  port: getenv('HTTP_PORT', 8000),
  auth,
  cors,
  jwt,
  knex,
  modelBinding,
};
