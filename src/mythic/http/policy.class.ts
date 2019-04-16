import { User } from '../../models';
import { Response } from './response.class';

export class Policy {
  before(auth: User) {
    return auth.is_admin;
  }

  authorize(func: string, auth: User, ...args: any): boolean {
    if (auth && this.before(auth)) {
      return true;
    }

    const policy: (...args: any) => boolean = (<any>this)[func];
    if (!policy || (policy && !policy(...[auth, ...args]))) {
      throw Response.UNAUTHORIZED;
    }

    return true;
  }
}
