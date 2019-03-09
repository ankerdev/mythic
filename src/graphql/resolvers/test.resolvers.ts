import { IResolverObject } from 'graphql-tools';

export const testResolvers: IResolverObject = {
  Query: {
    testQuery: () => 'testQuery',
  },
  Mutation: {
    testMutation: (_, { message }) => {
      return message
    }
  }
};
