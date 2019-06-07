import { IResolverObject } from 'graphql-tools';
import { IConnection, IConnectionParameters, IContext } from '../../declarations';
import { Post, User } from '../../models';
import { toConnectionObject } from '../../mythic';
import { userPolicy } from '../../policies';

interface IArguments {
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
      return toConnectionObject<User>(
        ...(await User.paginate(connectionParams))
      );
    },
  },

  Mutation: {
    createUser: async (_, { input }: IArguments, { auth }: IContext): Promise<User> => {
      userPolicy.authorize('createUser', auth);
      User.validate(input);
      const user = await User.query().insert(input);
      return user;
    },

    updateUser: async (_, { input }: IArguments, { auth, user }: IModelContext): Promise<User> => {
      userPolicy.authorize('updateUser', auth, user);
      User.validateUpdate(input);
      const updatedUser = await user.$query().patchAndFetch(input);
      return updatedUser;
    },

    deleteUser: async (_, {}, { auth, user }: IModelContext): Promise<string> => {
      userPolicy.authorize('deleteUser', auth, user);
      await user.$query().delete();
      return user.id;
    },
  },

  User: {
    posts: async (user: User, connectionParams: IConnectionParameters): Promise<IConnection<Post>> => {
      return toConnectionObject<Post>(
        ...(await user.paginate(connectionParams, 'posts'))
      );
    }
  }
};
