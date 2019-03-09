import { Request } from 'express';

export const notFound = (resource: string) => ({ message: `${resource} not found` });

export const retrieveTokenFromHeaders = (req: Request): string => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || '';

  if (Array.isArray(token) && token.length > 0) {
    token = token[0];
  }

  return (token as string).replace('Bearer ', '');
}
