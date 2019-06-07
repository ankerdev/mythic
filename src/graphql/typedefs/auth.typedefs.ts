import { gql } from 'apollo-server-express';

export const authTypeDefs = gql`
  extend type Mutation {
    createAuthenticationToken(input: CreateAuthenticationTokenInput!): CreateAuthenticationTokenResponse!
  }

  input CreateAuthenticationTokenInput {
    email: String!
    password: String!
  }

  type CreateAuthenticationTokenResponse {
    token: String!
  }
`;
