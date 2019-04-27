import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): Post
    posts(
      first: Int,
      last: Int,
      after: String,
      before: String
    ): PostConnection!
  }

  extend type Mutation {
    createPost(input: PostInput!): Post!
    updatePost(input: PostInput!): Post!
    deletePost(id: ID!): ID!
  }

  input PostInput {
    id: ID
    userId: ID
    title: String
    content: String
  }

  type Post implements INode {
    id: ID!
    userId: ID!
    title: String!
    content: String!
    user: User!
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }

  type PostEdge implements IEdge {
    cursor: String!
    node: Post!
  }

  type PostConnection implements IConnection {
    edges: [PostEdge!]!
    pageInfo: PageInfo!
  }
`;
