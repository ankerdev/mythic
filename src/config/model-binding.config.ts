import { IResolverObject } from 'graphql-tools';
import { postResolvers, userResolvers } from '../graphql';
import { Post, User } from '../models';
import { BaseModel } from '../mythic';

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
