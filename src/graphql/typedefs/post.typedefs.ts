import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  extend type Query {
    post(id: ID!): PostResponse!
    posts: PostsResponse!
  }

  extend type Mutation {
    createPost(input: PostCreateInput!): PostResponse!
    updatePost(input: PostUpdateInput!): PostResponse!
    deletePost(id: ID!): DeletePostResponse!
  }

  # Types
  type Post {
    id: ID!
    user_id: ID!
    title: String!
    content: String!
    created_at: String!
    updated_at: String!
    deleted_at: String!
    user: User
  }

  # Inputs
  input PostCreateInput {
    user_id: ID!
    title: String!
    content: String!
  }

  input PostUpdateInput {
    id: ID!
    title: String
    content: String
  }

  # Responses
  type PostResponse implements Response {
    code: Int!
    message: String
    success: Boolean!
    post: Post
  }

  type PostsResponse implements Response {
    code: Int!
    message: String
    success: Boolean!
    posts: [Post]!
  }

  type DeletePostResponse implements Response {
    code: Int!
    message: String
    success: Boolean!
  }
`;
