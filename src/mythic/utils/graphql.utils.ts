import { GraphQLError, GraphQLFormattedError } from 'graphql';

export enum HTTPErrors {
  UNAUTHORIZED = 'UNAUTHORIZED'
}

interface IHTTPError {
  code: number;
  message: string;
  type: HTTPErrors;
}

export const httpErrors: { [key in HTTPErrors]: IHTTPError } = {
  UNAUTHORIZED: {
    code: 403,
    message: 'Unauthorized',
    type: HTTPErrors.UNAUTHORIZED
  }
};

export const formatError = (error: GraphQLError): IHTTPError | GraphQLFormattedError => {
  if (error.message in httpErrors) {
    return httpErrors[error.message as keyof { [key in HTTPErrors]: IHTTPError }];
  }

  return error;
}
