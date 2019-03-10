import { SignOptions } from 'jsonwebtoken';
import { getenv } from '../utils';

export interface IJWTConfig {
  secret: string;
  options: SignOptions;
}

export const jwt: IJWTConfig = {
  secret: getenv('JWT_SECRET'),
  options: {
    algorithm: 'HS256',
    expiresIn: '60m', // @TODO 30m
  },
};
