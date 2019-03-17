import { User } from '../models';

export class Policy {
  before(auth: User) {
    return auth.is_admin;
  }

  canAccess(func: string, auth: User, ...args: any): boolean {
    if (auth && this.before(auth)) {
      return true;
    }

    const policy: (...args: any) => boolean = (<any>this)[func];
    return policy
      ? policy(...[auth, ...args])
      : false;
  }
}
