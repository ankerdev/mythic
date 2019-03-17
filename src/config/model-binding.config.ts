import { IResolverObject } from 'graphql-tools';
import { postResolvers, userResolvers } from '../graphql';
import { BaseModel } from '../lib';
import { Post, User } from '../models';

export interface IModelBindingObject {
  model: typeof BaseModel;
  resolvers: IResolverObject;
}

export const modelBinding: IModelBindingObject[] = [
  // @READ Add your model bindings here
  {
    model: User,
    resolvers: userResolvers,
  },
  {
    model: Post,
    resolvers: postResolvers,
  },
];
