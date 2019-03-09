import { DocumentNode } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { testResolvers, userResolvers } from './resolvers'
import { rootTypeDefs, testTypeDefs, userTypeDefs } from './typedefs';
const merge = require('lodash.merge')

export const typeDefs: DocumentNode[] = [
  rootTypeDefs,
  testTypeDefs,
  userTypeDefs,
];

export const resolvers: IResolvers = merge(
  testResolvers,
  userResolvers,
);
