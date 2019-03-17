import { Request } from 'express';
import { Response } from '../classes';

interface IHTTP {
  NO_CONTENT: Response;
  NOT_FOUND: Response;
  UNAUTHORIZED: Response;
}

export const HTTP: IHTTP = {
  NO_CONTENT: new Response(204),
  NOT_FOUND: new Response(404, { message: 'Not found' }),
  UNAUTHORIZED: new Response(403, { message: 'Unauthorized' }),
}

export const retrieveTokenFromHeaders = (req: Request): string => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || '';

  if (Array.isArray(token) && token.length > 0) {
    token = token[0];
  }

  return (token as string).replace('Bearer ', '');
}
