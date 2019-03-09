import { KeyVal } from '../types';

export interface IAuthConfig {
  unauthenticatedActions: KeyVal<string[]>;
}

export const auth: IAuthConfig = {
  unauthenticatedActions: {
    root: [
      '__schema',
    ],
    auth: [
      'createAuthenticationToken',
    ],
    user: [
      'createUser',
    ]
  },
};
