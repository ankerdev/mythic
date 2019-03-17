import { User } from '../models';

export interface IContext {
  auth: User;
  [key: string]: unknown;
}
