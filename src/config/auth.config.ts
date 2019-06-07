import { KeyVal } from '../declarations';

export interface IAuthConfig {
  unauthenticatedOperations: KeyVal<string[]>;
}

export const auth: IAuthConfig = {
  unauthenticatedOperations: {
    root: [
      '__schema',
    ],
    auth: [
      'createAuthenticationToken',
    ],
    user: [
      'createUser',
    ],
  },
};
