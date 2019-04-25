import { ForbiddenError } from 'apollo-server-core';
import { User } from '../../models';

export class Policy {
  private before(auth: User) {
    return auth.isAdmin;
  }

  authorize(func: keyof this, auth: User, ...args: any): boolean {
    if (func === 'authorize') {
      return false;
    }

    if (auth && this.before(auth)) {
      return true;
    }

    const policy: (...args: any) => boolean = (<any>this)[func];
    if (!policy || args.some((arg: any) => !arg) || (policy && !policy(...[auth, ...args]))) {
      throw new ForbiddenError('Unauthorized');
    }

    return true;
  }
}
