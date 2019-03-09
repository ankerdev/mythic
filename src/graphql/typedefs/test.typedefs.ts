import { gql } from 'apollo-server-express';

export const testTypeDefs = gql`
  extend type Query {
    testQuery: String
  }

  extend type Mutation {
    testMutation(message: String!): String
  }
`;
