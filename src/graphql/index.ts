export * from './resolvers';
import { DocumentNode, GraphQLSchema } from 'graphql';
import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import { authResolvers, postResolvers, userResolvers } from './resolvers';
import { authTypeDefs, postTypeDefs, rootTypeDefs, userTypeDefs } from './typedefs';
const merge = require('lodash.merge');

const typeDefs: DocumentNode[] = [
  rootTypeDefs,
  authTypeDefs,
  userTypeDefs,
  postTypeDefs,
];

const resolvers: IResolvers = merge(
  authResolvers,
  userResolvers,
  postResolvers,
);

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});
