export * from './resolvers';
import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { authResolvers, postResolvers, userResolvers } from './resolvers';
import { rootTypeDefs, authTypeDefs, postTypeDefs, userTypeDefs } from './typedefs';
const merge = require('lodash.merge');

export const typeDefs: DocumentNode[] = [
  rootTypeDefs,
  authTypeDefs,
  userTypeDefs,
  postTypeDefs,
];

export const resolvers: IResolvers = merge(
  authResolvers,
  userResolvers,
  postResolvers,
);
