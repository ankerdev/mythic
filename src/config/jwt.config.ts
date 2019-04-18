import { env } from 'env';
import { SignOptions } from 'jsonwebtoken';

export interface IJWTConfig {
  secret: string;
  options: SignOptions;
}

export const jwt: IJWTConfig = {
  secret: env('JWT_SECRET'),
  options: {
    algorithm: 'HS256',
    expiresIn: env('JWT_EXPIRES_IN', '30m'),
  },
};
