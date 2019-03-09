import { Request, Response } from 'express';

// @TODO Add user to context interface

export interface IContext {
  req: Request;
  res: Response;
}
