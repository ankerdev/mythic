import { env } from 'env';
import { Options as RateLimitOptions } from 'express-rate-limit';

export const rateLimit: RateLimitOptions = {
  max: env('RATE_LIMIT_MAX_REQUESTS', 100),
  windowMs: env('RATE_LIMIT_MINUTES', 1) * 60 * 1000,
};
