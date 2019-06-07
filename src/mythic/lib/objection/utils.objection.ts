import { UserInputError } from 'apollo-server-core';
import * as objection from 'objection';
import { GraphQLPaginationArray, IConnectionParameters } from '../../../declarations';
import { atob } from '../..';
import { BaseModel } from './base-model.objection';

export const getModelClass = (dirname: string, className: string): string => `${dirname}/${className}.model`;

// @TODO Implement client-inputted orderBy?
export const performPaginationForBuilder = async (builder: objection.QueryBuilder<any>, connectionParams: IConnectionParameters): Promise<GraphQLPaginationArray<BaseModel>> => {
  let {
    first,
    last,
    before,
    after,
  } = connectionParams;

  // Check for parameter errors
  if (first && last) {
    throw new UserInputError('Cannot use both first and last parameter');
  } else if (first !== undefined && first <= 0) {
    throw new UserInputError('First most be a number bigger than 0');
  } else if (last !== undefined && last <= 0) {
    throw new UserInputError('Last most be a number bigger than 0');
  }

  // Build query
  let query = builder;

  // Fetch models
  let models = await query.orderBy('createdAt');

  // Set defaults
  let paginatedModels = models;
  let hasNextPage = false;
  let hasPreviousPage = false;

  // @TODO Figure out smart way to determine the indexes of `after` and `before` in the models array

  // Filter models before and after cursors if applicable
  if (after || before) {
    paginatedModels = paginatedModels.filter(model => {
      if (after) {
        const isAfter = new Date(model.createdAt) > new Date(atob(after));
        if (!isAfter) {
          return false;
        }
      }

      if (before) {
        const isBefore = new Date(model.createdAt) < new Date(atob(before));
        if (!isBefore) {
          return false;
        }
      }

      return true;
    });
  }

  // Evaluate hasNextPage and hasPreviousPage
  if (first) {
    hasNextPage = paginatedModels.length > first;
  } else if (before) {
    // @TODO Determine whether edges exist following `before`
  }

  if (last) {
    hasPreviousPage = paginatedModels.length > last;
  } else if (after) {
    // @TODO Determine whether edges exist prios to `after`
  }

  // Slice edges
  if (first) {
    paginatedModels = paginatedModels.slice(0, first);
  } else if (last) {
    paginatedModels = paginatedModels.slice(-last);
  }

  return [paginatedModels, hasNextPage, hasPreviousPage];
}
