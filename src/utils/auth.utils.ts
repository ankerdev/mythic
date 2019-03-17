import { CONFIG } from '../config';

export const getActionForQuery = (query: string): string => {
  const queryArray = query.split('\n').map(val => val.replace('{', '').trim());
  if (queryArray.length > 2) {
    return queryArray[1];
  }
  return '';
}

// @TODO Use same strategy as modelBindingMiddleware (gql) to get exact action name
export const isUnauthenticatedAction = (action: string): boolean => {
  return Object
    .values(CONFIG.auth.unauthenticatedActions)
    .flat()
    .some(unauthenticatedAction => action.includes(unauthenticatedAction));
}
