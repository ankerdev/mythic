import { Request } from 'express';
import { IConnection } from '../../declarations';
import { BaseModel, btoa } from '..';

export const retrieveTokenFromHeaders = (req: Request): string => {
  let token = req.headers['x-access-token'] || req.headers['authorization'] || '';

  if (Array.isArray(token) && token.length > 0) {
    token = token[0];
  }

  return (token as string).replace('Bearer ', '');
}

export const toConnectionObject = <T extends BaseModel>(nodes: any[]): IConnection<T> => {
  return {
    edges: nodes.map(node => ({ node, cursor: btoa(node.createdAt) })),
    pageInfo: {
      hasNextPage: true,
      hasPreviousPage: false,
    },
  };
}
