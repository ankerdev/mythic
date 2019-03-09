import { CONFIG } from "../config";

export const isUnauthenticatedAction = (action: string): boolean => {
  return Object
    .values(CONFIG.auth.unauthenticatedActions)
    .flat()
    .some(unauthenticatedAction => action.includes(unauthenticatedAction));
}
