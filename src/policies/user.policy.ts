import { User } from '../models';
import { Policy } from './base.policy';

class UserPolicy extends Policy {
  user(auth: User, userId: string): boolean {
    return auth.id === userId;
  }

  users(): boolean {
    return false;
  }

  createUser(): boolean {
    return true;
  }

  updateUser(auth: User, userId: string): boolean {
    return auth.id === userId;
  }

  deleteUser(auth: User, userId: string): boolean {
    return auth.id === userId;
  }
}

export const userPolicy = new UserPolicy();
