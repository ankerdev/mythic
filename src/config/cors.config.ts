import { CorsOptions } from 'cors';
import { env } from 'env';

export const cors: CorsOptions = {
  origin: env('CORS_ALLOW_ORIGIN', '*'),
  optionsSuccessStatus: 200,
};
