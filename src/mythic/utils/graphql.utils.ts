import { gql } from 'apollo-server-core';

interface IGraphQLQueryData {
  operationName: string;
  args: any;
}

export const extractDataForQuery = (query: string): IGraphQLQueryData | null => {
  try {
    const gqlObject = gql`${query}`;
    const { name: { value: operationName }, arguments: args } = (<any>gqlObject.definitions[0]).selectionSet.selections[0];
    return {
      operationName,
      args
    };
  } catch (e) {}
  return null;
}
