import { Options as RateLimitOptions } from 'express-rate-limit';
import { getenv } from '../utils/env.utils';

export const rateLimit: RateLimitOptions = {
  max: getenv('RATE_LIMIT_MAX_REQUESTS', 100),
  windowMs: getenv('RATE_LIMIT_MINUTES', 1) * 60 * 1000,
};
