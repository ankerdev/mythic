import { User } from '../../models';

export interface IContext {
  auth: User;
  [key: string]: unknown;
}

export interface IConnectionParameters {
  first: number;
  last: number;
  after: string;
  before: string;
}

export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IEdge<T> {
  cursor: string;
  node: T;
}

export interface IConnection<T> {
  edges: IEdge<T>[];
  pageInfo: IPageInfo;
}
