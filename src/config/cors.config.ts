import { CorsOptions } from 'cors';
import { getenv } from '../utils/env.utils';

export const cors: CorsOptions = {
  origin: getenv('CORS_ALLOW_ORIGIN', '*'),
  optionsSuccessStatus: 200,
};
