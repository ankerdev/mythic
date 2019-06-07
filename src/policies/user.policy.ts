import { Policy } from '../mythic';
import { User } from '../models';

class UserPolicy extends Policy {
  user(auth: User, user: User): boolean {
    return auth.id === user.id;
  }

  users(): boolean {
    return true;
  }

  createUser(): boolean {
    return true;
  }

  updateUser(auth: User, user: User): boolean {
    return auth.id === user.id;
  }

  deleteUser(auth: User, user: User): boolean {
    return auth.id === user.id;
  }
}

export const userPolicy = new UserPolicy();
