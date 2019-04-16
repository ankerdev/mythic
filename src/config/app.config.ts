import { CorsOptions } from 'cors';
import { Options as RateLimitOptions } from 'express-rate-limit';
import * as Knex from 'knex';
import { getenv } from '../mythic';
import { IAuthConfig, auth } from './auth.config';
import { cors } from './cors.config';
import { IIPRestrictionConfig, ipRestriction } from './ip-restriction.config';
import { IJWTConfig, jwt } from './jwt.config';
import { knex } from './knex.config';
import { IModelBindingObject, modelBinding } from './model-binding.config';
import { rateLimit } from './rate-limit.config';

interface IConfig {
  port: number;
  auth: IAuthConfig;
  cors: CorsOptions;
  ipRestriction: IIPRestrictionConfig;
  jwt: IJWTConfig;
  knex: Knex;
  modelBinding: IModelBindingObject[];
  rateLimit: RateLimitOptions;
}

export const CONFIG: IConfig = {
  port: getenv('HTTP_PORT', 8000),
  auth,
  cors,
  ipRestriction,
  jwt,
  knex,
  modelBinding,
  rateLimit,
};
