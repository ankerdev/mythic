import { Request } from 'express';
import { ApiResponse } from '../classes';

interface IHTTP {
  NO_CONTENT: ApiResponse;
  NOT_FOUND: ApiResponse;
  UNAUTHORIZED: ApiResponse;
}

export const HTTP: IHTTP = {
  NO_CONTENT: new ApiResponse(204),
  NOT_FOUND: new ApiResponse(404, { message: 'Not found' }),
  UNAUTHORIZED: new ApiResponse(403, { message: 'Unauthorized' }),
}

export const retrieveTokenFromHeaders = (req: Request): string => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || '';

  if (Array.isArray(token) && token.length > 0) {
    token = token[0];
  }

  return (token as string).replace('Bearer ', '');
}
