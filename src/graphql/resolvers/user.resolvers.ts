import { IResolverObject } from 'graphql-tools';
import { IConnectionParameters, IConnection, IContext } from '../../declarations';
import { Post, User } from '../../models';
import { toConnectionObject } from '../../mythic';
import { userPolicy } from '../../policies';

interface IInput {
  input: User;
}

interface IModelContext {
  auth: User;
  user: User;
}

export const userResolvers: IResolverObject = {
  Query: {
    user: (_, {}, { auth, user }: IModelContext): User => {
      userPolicy.authorize('user', auth, user);
      return user;
    },

    users: async (_, connectionParams: IConnectionParameters, { auth }: IContext): Promise<IConnection<User>> => {
      userPolicy.authorize('users', auth);
      // @TODO Make paginate return [users, hasNextPage, hasPreviousPage] so I can pass it to toConnectionObject()
      const users = await User.paginate(connectionParams);
      return toConnectionObject<User>(users);
    },
  },

  Mutation: {
    createUser: async (_, { input }: IInput, { auth }: IContext): Promise<User> => {
      userPolicy.authorize('createUser', auth);
      User.validate(input);
      const user = await User.query().insert(input);
      return user;
    },

    updateUser: async (_, { input }: IInput, { auth, user }: IModelContext): Promise<User> => {
      userPolicy.authorize('updateUser', auth, user);
      User.validateUpdate(input);
      await user.$query().patchAndFetch(input);
      // @TODO Has this actually updated by now?
      return user;
    },

    deleteUser: async (_, {}, { auth, user }: IModelContext): Promise<string> => {
      userPolicy.authorize('deleteUser', auth, user);
      await user.$query().delete();
      return user.id;
    },
  },

  User: {
    posts: async (user: User): Promise<IConnection<Post>> => {
      // @TODO Finish this as connection with params
      return toConnectionObject<Post>(await user.posts());
    }
  }
};
