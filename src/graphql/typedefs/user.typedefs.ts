import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  extend type Query {
    user(id: ID!): User
    users(
      first: Int,
      last: Int,
      after: String,
      before: String
    ): UserConnection!
  }

  extend type Mutation {
    createUser(input: UserInput!): User
    updateUser(input: UserInput!): User
    deleteUser(id: ID!): ID!
  }

  input UserInput {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type User implements INode {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    deletedAt: String!
    posts(
      first: Int,
      last: Int,
      after: String,
      before: String
    ): PostConnection!
  }

  type UserEdge implements IEdge {
    cursor: String!
    node: User!
  }

  type UserConnection implements IConnection {
    edges: [UserEdge!]!
    pageInfo: PageInfo!
  }
`;
