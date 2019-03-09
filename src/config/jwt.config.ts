import { getenv } from '../utils';

export interface IJWTConfig {
  secret: string;
}

export const jwt: IJWTConfig = {
  secret: getenv('JWT_SECRET'),
};
