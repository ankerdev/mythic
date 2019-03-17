import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  extend type Query {
    post(id: String!): PostResponse!
    posts: PostsResponse!
  }

  extend type Mutation {
    createPost(input: PostCreateInput!): PostResponse!
    updatePost(input: PostUpdateInput!): PostResponse!
    deletePost(id: String!): DeletePostResponse!
  }

  # Types
  type Post {
    id: String!
    user_id: String!
    title: String!
    content: String!
    created_at: String!
    updated_at: String!
    deleted_at: String!
    user: User
  }

  # Inputs
  input PostCreateInput {
    user_id: String!
    title: String!
    content: String!
  }

  input PostUpdateInput {
    id: String!
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
