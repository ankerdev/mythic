import { User } from '../models';

class UserPolicy {
  before(user: User): boolean {
    // return user.is_admin; // @TODO Implement is_admin on user
    return false;
  }

  user(user: User, userTwo: User): boolean {
    return user.id === userTwo.id;
  }

  users(user: User): boolean {
    return false;
  }

  createUser(): boolean {
    return true;
  }

  updateUser(user: User, userTwo: User) {
    return user.id === userTwo.id;
  }

  deleteUser(user: User, userTwo: User) {
    return user.id === userTwo.id;
  }
}

export const userPolicy = new UserPolicy();
