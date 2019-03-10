import { CONFIG } from '../config';

export const getActionForQuery = (query: string): string => {
  const queryArray = query.split('\n').map(val => val.replace('{', '').trim());
  if (queryArray.length > 2) {
    return queryArray[1];
  }
  return '';
}

// @IMPROVEMENT This function should get the exact action name instead of using `includes()`
// It could benefit from a function such as the above, but better.
export const isUnauthenticatedAction = (action: string): boolean => {
  return Object
    .values(CONFIG.auth.unauthenticatedActions)
    .flat()
    .some(unauthenticatedAction => action.includes(unauthenticatedAction));
}
