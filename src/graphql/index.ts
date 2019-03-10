export * from './resolvers';
import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { authResolvers, userResolvers } from './resolvers'
import { authTypeDefs, rootTypeDefs, userTypeDefs } from './typedefs';
const merge = require('lodash.merge')

export const typeDefs: DocumentNode[] = [
  rootTypeDefs,
  authTypeDefs,
  userTypeDefs,
];

export const resolvers: IResolvers = merge(
  authResolvers,
  userResolvers,
);
