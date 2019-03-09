import { gql } from 'apollo-server-express';

export const authTypeDefs = gql`
  extend type Mutation {
    createAuthenticationToken(input: CreateAuthenticationTokenInput!): AuthenticationTokenResponse!
  }

  input CreateAuthenticationTokenInput {
    email: String!
    password: String!
  }

  type AuthenticationTokenResponse implements Response {
    code: Int!
    message: String
    success: Boolean!
    token: String
  }
`;
