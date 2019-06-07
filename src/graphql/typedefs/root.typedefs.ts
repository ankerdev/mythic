import { gql } from 'apollo-server-express';

export const rootTypeDefs = gql`
  type Query {
    _root: String
  }

  type Mutation {
    _root: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  interface INode {
    id: ID!
  }

  interface IEdge {
    cursor: String!
    node: INode!
  }

  interface IConnection {
    edges: [IEdge!]!
    pageInfo: PageInfo!
  }
`;
