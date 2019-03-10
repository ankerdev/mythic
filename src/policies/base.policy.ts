import { User } from '../models';

export class Policy {
  before(auth: User) {
    return false;
    // return user.is_admin; // @TODO Implement...
  }

  canAccess(func: string, auth: User, ...args: any): boolean {
    if (this.before(auth)) {
      return true;
    }

    const policy: (...args: any) => boolean = (<any>this)[func];
    return policy
     ? policy(...[auth, ...args])
     : false;
  }
}
