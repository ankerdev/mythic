import { gql } from 'apollo-server-express';

export const authTypeDefs = gql`
  extend type Mutation {
    createAuthenticationToken(input: CreateAuthenticationTokenInput!): String!
  }

  input CreateAuthenticationTokenInput {
    email: String!
    password: String!
  }
`;
