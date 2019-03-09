import { gql } from 'apollo-server-express';

export const rootTypeDefs = gql`
  type Query {
    _root: String
  }

  type Mutation {
    _root: String
  }

  interface Response {
    code: Int!
    message: String
    success: Boolean!
  }
`;
